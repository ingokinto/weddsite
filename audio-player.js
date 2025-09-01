// Simple, Robust Music Player
class SimpleMusicPlayer {
    constructor() {
        console.log('🎵 SimpleMusicPlayer constructor called');
        
        // Create audio element
        this.audio = new Audio();
        this.isPlaying = false;
        this.isInitialized = false;
        
        // Set audio properties
        this.audio.src = './festival-track.mp3';
        this.audio.loop = true;
        this.audio.volume = 0.7;
        this.audio.preload = 'auto';
        
        // Create simple UI
        this.createSimpleUI();
        
        // Setup audio events
        this.setupAudioEvents();
        
        // Mark as initialized
        this.isInitialized = true;
        console.log('🎵 SimpleMusicPlayer initialized successfully');
    }
    
    createSimpleUI() {
        // Remove any existing player UI
        const existingPlayer = document.querySelector('.music-player-container');
        if (existingPlayer) {
            existingPlayer.remove();
        }
        
        // Create simple floating button
        const buttonHTML = `
            <div id="music-control-button" class="music-control-button">
                <span id="music-icon">▶</span>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
        
        // Add click event
        const button = document.getElementById('music-control-button');
        button.addEventListener('click', () => this.togglePlay());
        
        // Add CSS
        if (!document.getElementById('music-control-styles')) {
            const style = document.createElement('style');
            style.id = 'music-control-styles';
            style.textContent = `
                .music-control-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1000;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    font-size: 24px;
                    color: white;
                }
                
                .music-control-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                }
                
                .music-control-button:active {
                    transform: scale(0.95);
                }
                
                .music-control-button.playing {
                    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupAudioEvents() {
        // Track loaded
        this.audio.addEventListener('loadeddata', () => {
            console.log('🎵 Track loaded successfully');
        });
        
        // Play event
        this.audio.addEventListener('play', () => {
            console.log('🎵 Music started playing');
            this.isPlaying = true;
            this.updateButton();
        });
        
        // Pause event
        this.audio.addEventListener('pause', () => {
            console.log('🎵 Music paused');
            this.isPlaying = false;
            this.updateButton();
        });
        
        // Error handling
        this.audio.addEventListener('error', (error) => {
            console.error('🎵 Audio error:', error);
            this.showError();
        });
        
        // When audio ends (shouldn't happen due to loop, but just in case)
        this.audio.addEventListener('ended', () => {
            console.log('🎵 Track ended, restarting due to loop');
        });
    }
    
    updateButton() {
        const button = document.getElementById('music-control-button');
        const icon = document.getElementById('music-icon');
        
        if (this.isPlaying) {
            button.classList.add('playing');
            icon.textContent = '⏸';
        } else {
            button.classList.remove('playing');
            icon.textContent = '▶';
        }
    }
    
    showError() {
        const button = document.getElementById('music-control-button');
        button.style.background = '#ff6b6b';
        button.title = 'MP3-Datei fehlt - Bitte füge "festival-track.mp3" hinzu';
    }
    
    async togglePlay() {
        if (!this.isInitialized) {
            console.log('🎵 Player not yet initialized');
            return;
        }
        
        try {
            if (this.isPlaying) {
                console.log('🎵 Pausing music');
                this.audio.pause();
            } else {
                console.log('🎵 Starting music');
                await this.audio.play();
            }
        } catch (error) {
            console.error('🎵 Error toggling play:', error);
        }
    }
    
    async startMusic() {
        if (!this.isInitialized) {
            console.log('🎵 Player not yet initialized');
            return;
        }
        
        if (this.isPlaying) {
            console.log('🎵 Music already playing');
            return;
        }
        
        try {
            console.log('🎵 Starting music via startMusic()');
            await this.audio.play();
        } catch (error) {
            console.error('🎵 Error starting music:', error);
        }
    }
    
    stopMusic() {
        if (this.isPlaying) {
            console.log('🎵 Stopping music');
            this.audio.pause();
        }
    }
}

// Global instance
let musicPlayer = null;

// Initialize function
function initMusicPlayer() {
    console.log('🎵 initMusicPlayer called');
    
    // Prevent multiple instances
    if (musicPlayer) {
        console.log('🎵 Music player already exists, returning existing instance');
        return musicPlayer;
    }
    
    try {
        musicPlayer = new SimpleMusicPlayer();
        console.log('🎵 Music player created successfully');
        return musicPlayer;
    } catch (error) {
        console.error('🎵 Failed to create music player:', error);
        return null;
    }
}

// Global start function
window.startMusic = () => {
    if (musicPlayer && musicPlayer.startMusic) {
        musicPlayer.startMusic();
    } else {
        console.log('🎵 Music player not ready yet');
    }
}; 