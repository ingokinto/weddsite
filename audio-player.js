// Enhanced Music Player with Fixed MP3 Track
class PsychedelicMusicPlayer {
    constructor() {
        console.log('🎵 PsychedelicMusicPlayer constructor called');
        this.audio = new Audio();
        this.isPlaying = false;
        this.volume = 0.7;
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.dataArray = null;
        
        console.log('🎵 Audio element created:', this.audio);
        
        this.createPlayerUI();
        this.setupAudioContext();
        this.loadFixedTrack();
        this.setupAudioEvents();
    }
    
    createPlayerUI() {
        console.log('🎵 Creating player UI');
        
        const playerHTML = `
            <div class="music-player-container" style="display: none;">
                <div class="music-player">
                    <div class="player-header">
                        <h3>🎵 Musik Player</h3>
                        <button class="close-btn" onclick="musicPlayer.closePlayer()">×</button>
                    </div>
                    <div class="track-info">
                        <div class="track-name">Johanna & Lukas - Festival Mix</div>
                        <div class="track-artist">Hochzeits-Soundtrack</div>
                    </div>
                    <div class="controls">
                        <button class="play-btn" onclick="musicPlayer.togglePlay()">▶</button>
                        <div class="progress-container">
                            <div class="progress-bar" onclick="musicPlayer.seekTo(event)">
                                <div class="progress-fill"></div>
                            </div>
                        </div>
                        <div class="time-display">
                            <span class="current-time">0:00</span>
                            <span class="total-time">0:00</span>
                        </div>
                    </div>
                    <div class="visualizer-container"></div>
                    <div class="status-info">🎵 Musik bereit!</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', playerHTML);
        this.playerContainer = document.querySelector('.music-player-container');
        console.log('🎵 Player UI created:', this.playerContainer);
    }
    
    setupAudioContext() {
        console.log('🎵 Setting up audio context');
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            console.log('🎵 Audio context setup successful');
        } catch (error) {
            console.log('🎵 Audio context setup failed:', error);
        }
    }
    
    loadFixedTrack() {
        console.log('🎵 Loading MP3 file: ./festival-track.mp3');
        
        this.audio.src = './festival-track.mp3';
        this.audio.loop = true;
        this.audio.volume = 0.7;
        
        console.log('🎵 Audio src set:', this.audio.src);
        console.log('🎵 Audio loop:', this.audio.loop);
        console.log('🎵 Audio volume:', this.audio.volume);
    }
    
    setupAudioEvents() {
        console.log('🎵 Setting up audio events');
        
        this.audio.addEventListener('loadeddata', () => {
            console.log('🎵 Track loaded successfully!');
            this.updateTrackInfo();
            this.updateTotalTime();
            
            const statusInfo = this.playerContainer.querySelector('.status-info');
            if (statusInfo) {
                statusInfo.innerHTML = '🎵 Musik bereit - Klick zum Starten!';
            }
        });
        
        this.audio.addEventListener('play', () => {
            console.log('🎵 Music is playing!');
            this.isPlaying = true;
            this.updatePlayButton();
            
            const musicIndicator = document.querySelector('.music-visualizer div[style*="musicPulse"]');
            if (musicIndicator) {
                musicIndicator.style.background = '#ff6b6b';
                musicIndicator.innerHTML = '🎵';
            }
            
            // Start visualizer after a delay to ensure audio is stable
            setTimeout(() => {
                this.startVisualizer();
            }, 1000);
            
            // Monitor audio to prevent stopping
            const audioMonitor = setInterval(() => {
                if (this.audio && this.audio.paused && this.isPlaying) {
                    console.log('🎵 Audio stopped unexpectedly, restarting...');
                    this.audio.play().catch(e => {
                        console.log('🎵 Restart failed:', e);
                        clearInterval(audioMonitor);
                    });
                }
            }, 500);
            
            // Clear monitor after 10 seconds
            setTimeout(() => {
                clearInterval(audioMonitor);
            }, 10000);
        });
        
        this.audio.addEventListener('pause', () => {
            console.log('🎵 Music paused');
            this.isPlaying = false;
            this.updatePlayButton();
        });
        
        this.audio.addEventListener('ended', () => {
            console.log('🎵 Track ended, restarting...');
            this.audio.currentTime = 0;
            this.audio.play().catch(e => console.log('🎵 Restart failed:', e));
        });
        
        this.audio.addEventListener('error', (error) => {
            console.log('🎵 Audio error:', error);
            this.showTrackNotFound();
        });
    }
    
    showTrackNotFound() {
        console.log('🎵 Showing track not found message');
        const statusInfo = this.playerContainer.querySelector('.status-info');
        if (statusInfo) {
            statusInfo.innerHTML = `
                <div style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 5px;">
                    MP3-Datei fehlt
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                    Bitte füge "festival-track.mp3" zum Projekt hinzu
                </div>
            `;
        }
    }
    
    togglePlay() {
        console.log('🎵 Toggle play called, isPlaying:', this.isPlaying);
        
        if (!this.audio) {
            console.log('🎵 No audio element!');
            return;
        }
        
        if (this.isPlaying) {
            console.log('🎵 Pausing audio...');
            this.audio.pause();
        } else {
            console.log('🎵 Playing audio...');
            this.audio.play().catch(e => {
                console.log('🎵 Play failed:', e);
            });
        }
    }
    
    startVisualizer() {
        console.log('🎵 Starting visualizer');
        if (!this.audioContext || !this.analyser || !this.audio) {
            console.log('🎵 Visualizer setup incomplete');
            return;
        }
        
        // Only create source if it doesn't exist
        if (!this.source) {
            try {
                console.log('🎵 Creating media element source');
                this.source = this.audioContext.createMediaElementSource(this.audio);
                this.source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
                console.log('🎵 Visualizer source created successfully');
            } catch (error) {
                console.log('🎵 Visualizer source creation error:', error);
                return;
            }
        }
        
        this.visualize();
    }
    
    visualize() {
        if (!this.analyser || !this.isPlaying) return;
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const visualizerContainer = this.playerContainer.querySelector('.visualizer-container');
        if (!visualizerContainer) return;
        
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
        
        // Continue visualization only if still playing
        if (this.isPlaying) {
            requestAnimationFrame(() => this.visualize());
        }
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
    
    updatePlayButton() {
        const playBtn = this.playerContainer.querySelector('.play-btn');
        playBtn.textContent = this.isPlaying ? '⏸' : '▶';
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    seekTo(event) {
        if (!this.audio) return;
        
        const rect = event.target.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
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
    console.log('🎵 initMusicPlayer called');
    musicPlayer = new PsychedelicMusicPlayer();
    console.log('🎵 Music player created:', musicPlayer);
} 