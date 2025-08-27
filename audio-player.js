// Enhanced Music Player with Fixed MP3 Track
class PsychedelicMusicPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.7;
        this.playlist = [];
        this.visualizer = null;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.source = null;
        
        this.init();
    }
    
    init() {
        this.createPlayer();
        this.setupAudioContext();
        this.loadDefaultPlaylist();
    }
    
    createPlayer() {
        // Create player container (hidden by default)
        const playerContainer = document.createElement('div');
        playerContainer.className = 'music-player-container';
        playerContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: rgba(26, 10, 46, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 20px;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
            transform: translateX(320px);
            display: none;
        `;
        
        // Create player HTML
        playerContainer.innerHTML = `
            <div class="player-header">
                <h3 style="color: #4ecdc4; margin: 0 0 15px 0; font-family: 'Orbitron', monospace;">
                    🎵 Festival-Hochzeit Player
                </h3>
                <button class="close-player" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #ff6b6b;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">✕</button>
            </div>
            
            <div class="track-info" style="margin-bottom: 15px;">
                <div class="track-name" style="
                    color: #ffffff;
                    font-weight: 600;
                    margin-bottom: 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                ">Johanna & Lukas - Festival Mix</div>
                <div class="track-artist" style="
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                ">Hochzeits-Soundtrack</div>
            </div>
            
            <div class="visualizer-container" style="
                height: 60px;
                margin: 15px 0;
                display: flex;
                align-items: end;
                gap: 2px;
            "></div>
            
            <div class="progress-container" style="margin-bottom: 15px;">
                <div class="progress-bar" style="
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                    overflow: hidden;
                    cursor: pointer;
                ">
                    <div class="progress-fill" style="
                        height: 100%;
                        background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
                        width: 0%;
                        transition: width 0.1s ease;
                    "></div>
                </div>
                <div class="time-display" style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.7);
                ">
                    <span class="current-time">0:00</span>
                    <span class="total-time">0:00</span>
                </div>
            </div>
            
            <div class="controls" style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin-bottom: 15px;
            ">
                <button class="prev-btn" style="
                    background: none;
                    border: none;
                    color: #4ecdc4;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">⏮</button>
                
                <button class="play-btn" style="
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border: none;
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                ">▶</button>
                
                <button class="next-btn" style="
                    background: none;
                    border: none;
                    color: #4ecdc4;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">⏭</button>
            </div>
            
            <div class="volume-container" style="
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
            ">
                <span style="color: #4ecdc4; font-size: 14px;">🔊</span>
                <input type="range" class="volume-slider" min="0" max="100" value="70" style="
                    flex: 1;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                    outline: none;
                    cursor: pointer;
                ">
            </div>
            
            <div class="status-info" style="
                text-align: center;
                padding: 10px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 15px;
            ">
                <div style="color: #4ecdc4; font-size: 0.9rem; margin-bottom: 5px;">
                    🎵 Hochzeits-Soundtrack
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                    Automatischer Loop-Modus aktiv
                </div>
            </div>
        `;
        
        document.body.appendChild(playerContainer);
        this.playerContainer = playerContainer;
        
        // Add event listeners
        this.addEventListeners();
        
        // Player stays hidden by default - only shows when user clicks the music button
    }
    
    addEventListeners() {
        const playBtn = this.playerContainer.querySelector('.play-btn');
        const prevBtn = this.playerContainer.querySelector('.prev-btn');
        const nextBtn = this.playerContainer.querySelector('.next-btn');
        const closeBtn = this.playerContainer.querySelector('.close-player');
        const volumeSlider = this.playerContainer.querySelector('.volume-slider');
        const progressBar = this.playerContainer.querySelector('.progress-bar');
        
        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.restartTrack());
        nextBtn.addEventListener('click', () => this.restartTrack());
        closeBtn.addEventListener('click', () => this.closePlayer());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        progressBar.addEventListener('click', (e) => this.seekTo(e));
    }
    
    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
        } catch (error) {
            console.log('Web Audio API not supported');
        }
    }
    
    loadDefaultPlaylist() {
        // Load the fixed MP3 track
        this.loadFixedTrack();
    }
    
    loadFixedTrack() {
        // Try to load the MP3 file from the project directory
        const trackPath = './festival-track.mp3'; // You can rename this file
        
        console.log('Loading MP3 file:', trackPath);
        
        this.audio = new Audio(trackPath);
        this.audio.volume = this.volume;
        this.audio.loop = true; // Enable looping
        
        // Setup audio events
        this.setupAudioEvents();
        
        // Check if track exists and can be loaded
        this.audio.addEventListener('loadstart', () => {
            console.log('Audio loading started...');
        });
        
        this.audio.addEventListener('progress', () => {
            console.log('Audio loading progress...');
        });
        
        this.audio.addEventListener('canplay', () => {
            console.log('Audio can play!');
            this.updateTrackInfo();
            this.updateTotalTime();
        });
        
        // Auto-play immediately when track is loaded
        this.audio.addEventListener('loadeddata', () => {
            console.log('Festival track loaded successfully!');
            this.updateTrackInfo();
            this.updateTotalTime();
            
            // Update status to show music is ready
            const statusInfo = this.playerContainer.querySelector('.status-info');
            if (statusInfo) {
                statusInfo.innerHTML = `
                    <div style="color: #4ecdc4; font-size: 0.9rem; margin-bottom: 5px;">
                        🎵 Musik bereit!
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                        Klicke auf den 🎵 Button für Musik
                    </div>
                `;
            }
            
            // Don't try auto-play here - let the main script handle it
            console.log('Track loaded, ready for user interaction');
        });
        
        // Check if track exists
        this.audio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            // Only show error if it's a network error, not just loading
            if (this.audio && this.audio.error && this.audio.error.code === 4) {
                this.showTrackNotFound();
            }
        });
        
        // No automatic play attempts - let user interaction handle it
        console.log('Audio player initialized, waiting for user interaction');
    }
    
    showTrackNotFound() {
        const trackName = this.playerContainer.querySelector('.track-name');
        const trackArtist = this.playerContainer.querySelector('.track-artist');
        const statusInfo = this.playerContainer.querySelector('.status-info');
        
        // Check if audio element exists and has error
        if (this.audio) {
            console.log('Audio readyState:', this.audio.readyState);
            console.log('Audio networkState:', this.audio.networkState);
            console.log('Audio error:', this.audio.error);
        }
        
        trackName.textContent = 'Track wird geladen...';
        trackArtist.textContent = 'Bitte warten';
        statusInfo.innerHTML = `
            <div style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 5px;">
                ⚠️ MP3-Datei wird geladen
            </div>
            <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                Große Dateien brauchen Zeit zum Laden
            </div>
        `;
        
        // Try to reload after a delay
        setTimeout(() => {
            if (this.audio && this.audio.readyState === 0) {
                console.log('Trying to reload audio...');
                this.audio.load();
            }
        }, 3000);
        
        console.log('Audio loading in progress...');
        
        // Don't show error message if audio is actually loading
        if (this.audio && this.audio.readyState > 0) {
            console.log('Audio is loading, not showing error message');
            return;
        }
    }
    
    setupAudioEvents() {
        if (!this.audio) return;
        
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateTrackInfo();
            this.updateTotalTime();
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
            this.updateCurrentTime();
        });
        
        this.audio.addEventListener('play', () => {
            console.log('🎵 Audio play event fired - music is playing!');
            this.isPlaying = true;
            this.updatePlayButton();
            this.startVisualizer();
            
            // Update music indicator to show it's playing
            const musicIndicator = document.querySelector('.music-visualizer div[style*="musicPulse"]');
            if (musicIndicator) {
                musicIndicator.style.background = '#ff6b6b';
                musicIndicator.innerHTML = '🎵';
            }
        });
        
        this.audio.addEventListener('pause', () => {
            console.log('Audio paused event');
            this.isPlaying = false;
            this.updatePlayButton();
            this.stopVisualizer();
        });
        
        // Add ended event to restart automatically
        this.audio.addEventListener('ended', () => {
            console.log('Audio ended, restarting...');
            this.audio.currentTime = 0;
            this.audio.play().catch(e => {
                console.log('Restart failed:', e);
            });
        });
    }
    
    togglePlay() {
        if (!this.audio) return;
        
        console.log('Toggle play called, isPlaying:', this.isPlaying);
        
        if (this.isPlaying) {
            console.log('Pausing audio...');
            this.audio.pause();
        } else {
            console.log('Playing audio...');
            this.audio.play().catch(e => {
                console.log('Play failed:', e);
            });
        }
    }
    
    restartTrack() {
        if (!this.audio) return;
        
        this.audio.currentTime = 0;
        if (!this.isPlaying) {
            this.audio.play().catch(e => {
                console.log('Play failed:', e);
            });
        }
    }
    
    setVolume(value) {
        this.volume = value;
        if (this.audio) {
            this.audio.volume = value;
        }
    }
    
    seekTo(event) {
        if (!this.audio) return;
        
        const rect = event.target.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
    }
    
    updateTrackInfo() {
        const trackName = this.playerContainer.querySelector('.track-name');
        const trackArtist = this.playerContainer.querySelector('.track-artist');
        
        trackName.textContent = 'Johanna & Lukas - Festival Mix';
        trackArtist.textContent = 'Hochzeits-Soundtrack';
    }
    
    updateProgress() {
        if (!this.audio) return;
        
        const progressFill = this.playerContainer.querySelector('.progress-fill');
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        progressFill.style.width = percent + '%';
    }
    
    updateCurrentTime() {
        if (!this.audio) return;
        
        const currentTime = this.playerContainer.querySelector('.current-time');
        currentTime.textContent = this.formatTime(this.audio.currentTime);
    }
    
    updateTotalTime() {
        if (!this.audio) return;
        
        const totalTime = this.playerContainer.querySelector('.total-time');
        totalTime.textContent = this.formatTime(this.audio.duration);
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    updatePlayButton() {
        const playBtn = this.playerContainer.querySelector('.play-btn');
        playBtn.textContent = this.isPlaying ? '⏸' : '▶';
    }
    
    startVisualizer() {
        if (!this.audioContext || !this.analyser || !this.audio) return;
        
        // Only create source if it doesn't exist
        if (!this.source) {
            try {
                this.source = this.audioContext.createMediaElementSource(this.audio);
                this.source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } catch (error) {
                console.log('Visualizer source creation error:', error);
                return;
            }
        }
        
        this.visualize();
    }
    
    stopVisualizer() {
        // Don't disconnect the source as it might stop the audio
        // Just stop the visualization loop
        console.log('Visualizer stopped (but audio continues)');
    }
    
    visualize() {
        if (!this.analyser || !this.isPlaying) return;
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const visualizerContainer = this.playerContainer.querySelector('.visualizer-container');
        visualizerContainer.innerHTML = '';
        
        const barCount = 32;
        const barWidth = visualizerContainer.offsetWidth / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            const value = this.dataArray[i] || 0;
            const height = (value / 255) * 60;
            
            bar.style.cssText = `
                width: ${barWidth - 1}px;
                height: ${height}px;
                background: linear-gradient(to top, #ff6b6b, #4ecdc4);
                border-radius: 2px;
                transition: height 0.1s ease;
            `;
            
            visualizerContainer.appendChild(bar);
        }
        
        requestAnimationFrame(() => this.visualize());
    }
    
    closePlayer() {
        this.playerContainer.style.transform = 'translateX(320px)';
        setTimeout(() => {
            this.playerContainer.style.display = 'none';
        }, 300);
    }
    
    showPlayer() {
        this.playerContainer.style.display = 'block';
        setTimeout(() => {
            this.playerContainer.style.transform = 'translateX(0)';
        }, 10);
    }
}

// Initialize the music player
let musicPlayer;

// Function to initialize music player (called from main script)
function initMusicPlayer() {
    musicPlayer = new PsychedelicMusicPlayer();
} 