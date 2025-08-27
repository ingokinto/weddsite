// Password Lock System
document.addEventListener('DOMContentLoaded', function() {
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const correctPassword = 'johanna'; // The bride's name
    
    // Check if already unlocked (stored in sessionStorage)
    if (sessionStorage.getItem('websiteUnlocked') === 'true') {
        passwordOverlay.classList.add('unlocked');
        return;
    }
    
    // Handle password form submission
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredPassword = passwordInput.value.toLowerCase().trim();
        
        if (enteredPassword === correctPassword) {
            // Success - unlock website
            sessionStorage.setItem('websiteUnlocked', 'true');
            
            // Add success animation
            passwordForm.classList.add('password-success');
            
            // Show success message
            const button = passwordForm.querySelector('.password-button');
            const originalText = button.textContent;
            button.textContent = '🎉 Zugang gewährt!';
            button.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
            
            // Hide overlay after delay
            setTimeout(() => {
                passwordOverlay.classList.add('unlocked');
                
                // Initialize and start music immediately
                if (typeof initMusicPlayer === 'function') {
                    initMusicPlayer();
                    
                    // Start music after a short delay to ensure player is ready
                    setTimeout(() => {
                        if (window.startMusic) {
                            console.log('🎵 Auto-starting music after password unlock!');
                            window.startMusic();
                        }
                    }, 1000);
                }
                
                // Reset button
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                    passwordForm.classList.remove('password-success');
                }, 1000);
            }, 1500);
            
            console.log('🔓 Website unlocked successfully!');
            
        } else {
            // Wrong password
            passwordInput.classList.add('password-error');
            passwordInput.value = '';
            passwordInput.placeholder = '❌ Falsches Passwort - versuche es erneut';
            
            // Remove error class after animation
            setTimeout(() => {
                passwordInput.classList.remove('password-error');
                passwordInput.placeholder = 'Passwort eingeben';
            }, 500);
            
            console.log('❌ Wrong password entered:', enteredPassword);
        }
    });
    
    // Focus on password input when page loads
    passwordInput.focus();
    
    // Allow Enter key to submit
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordForm.dispatchEvent(new Event('submit'));
        }
    });
});

// Main website functionality (only runs after password is entered)
document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const festivalDate = new Date('June 26, 2026 14:00:00').getTime();
        const now = new Date().getTime();
        const distance = festivalDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Add pulse effect when seconds change
        if (seconds % 10 === 0) {
            const countdownItems = document.querySelectorAll('.countdown-item');
            countdownItems.forEach(item => {
                item.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            });
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 10, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 10, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax effect for fractal background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const fractalBg = document.querySelector('.fractal-bg');
        if (fractalBg) {
            fractalBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Ticket button interactions
    document.querySelectorAll('.ticket-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show ticket purchase modal or redirect
            alert('Ticket-Kauf wird bald verfügbar sein! ');
        });
    });

    // Contact form handling - REMOVED (replaced with new version below)

    // Enhanced floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2', '#ffd700', '#00ff88'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 2;
        
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${randomColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            box-shadow: 0 0 ${size * 2}px ${randomColor};
            animation: floatUp ${Math.random() * 4 + 6}s linear infinite;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Create particles more frequently
    setInterval(createParticle, 3000); // Reduced from 1.5s to 3s

    // Create fractal particles
    function createFractalParticle() {
        const particle = document.createElement('div');
        const shapes = ['polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', 'polygon(50% 0%, 0% 100%, 100% 100%)'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = 'fractal-particle';
        particle.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: ${randomColor};
            clip-path: ${randomShape};
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: fractalFloat 12s ease-in-out infinite;
            opacity: 0.6;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }

    // Create fractal particles
    setInterval(createFractalParticle, 4000); // Reduced frequency

    // Add CSS for enhanced particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes fractalFloat {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-25vh) rotate(90deg) scale(1.2);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(0.8);
                opacity: 0.4;
            }
            75% {
                transform: translateY(-75vh) rotate(270deg) scale(1.1);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.3);
                opacity: 0;
            }
        }
        
        .floating-particle {
            box-shadow: 0 0 10px currentColor;
        }
        
        .fractal-particle {
            box-shadow: 0 0 15px currentColor;
        }
    `;
    document.head.appendChild(style);

    // Add hover effects for cards
    document.querySelectorAll('.day-card, .anreise-card, .food-card, .ticket-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced typing effect for hero title with psychedelic colors
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        element.setAttribute('data-text', text);
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                
                // Add rainbow effect to each character
                const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2', '#ffd700', '#00ff88'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                element.style.textShadow = `0 0 20px ${randomColor}`;
                
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect when page loads
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 150);
            }, 1000);
        }
    });

    // Add psychedelic background waves
    function createPsychedelicWaves() {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'psychedelic-waves';
        waveContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.3;
        `;
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background: conic-gradient(from ${i * 120}deg, 
                    transparent, 
                    rgba(255, 107, 107, 0.1), 
                    transparent, 
                    rgba(78, 205, 196, 0.1), 
                    transparent, 
                    rgba(255, 20, 147, 0.1), 
                    transparent);
                animation: waveRotate ${15 + i * 5}s linear infinite;
            `;
            waveContainer.appendChild(wave);
        }
        
        document.body.appendChild(waveContainer);
    }

    // Add wave rotation animation
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes waveRotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(waveStyle);

    // Initialize psychedelic waves
    setTimeout(createPsychedelicWaves, 2000);

    // Add psychedelic effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
        
        // Add rainbow effect on hover
        title.addEventListener('mouseenter', function() {
            this.style.animation = 'sectionTitleGlow 1s ease-in-out infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.animation = 'sectionTitleGlow 4s ease-in-out infinite';
        });
    });

    // Enhanced music player button with auto-play indicator
    function createMusicVisualizer() {
        const visualizer = document.createElement('div');
        visualizer.className = 'music-visualizer';
        visualizer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
            animation: pulse 2s ease-in-out infinite;
            transition: all 0.3s ease;
        `;
        
        visualizer.innerHTML = '🎵';
        visualizer.title = 'Music Player öffnen (Musik läuft automatisch)';
        
        // Add music playing indicator
        const musicIndicator = document.createElement('div');
        musicIndicator.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: #4ecdc4;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: white;
            animation: musicPulse 1s ease-in-out infinite;
        `;
        musicIndicator.innerHTML = '▶';
        musicIndicator.title = 'Musik bereit - Klick zum Starten';
        visualizer.appendChild(musicIndicator);
        
        // Add click to start music indicator
        const clickIndicator = document.createElement('div');
        clickIndicator.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 107, 107, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 10px;
            white-space: nowrap;
            opacity: 0.8;
            transition: opacity 0.3s ease;
            cursor: pointer;
        `;
        clickIndicator.innerHTML = '🎵 Klick für Musik';
        visualizer.appendChild(clickIndicator);
        
        // Make the entire visualizer clickable for music
        visualizer.addEventListener('click', () => {
            // Show player first
            if (typeof initMusicPlayer === 'function') {
                if (!musicPlayer) {
                    initMusicPlayer();
                }
                if (musicPlayer && musicPlayer.showPlayer) {
                    musicPlayer.showPlayer();
                }
            } else {
                alert('Lade Musik-Player... 🎶');
            }
            
            // Then try to start music using central function
            window.startMusic();
        });
        
        visualizer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.8)';
        });
        
        visualizer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
        });
        
        document.body.appendChild(visualizer);
    }

    // Add CSS for music visualizer
    const musicStyle = document.createElement('style');
    musicStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 30px rgba(255, 107, 107, 0.8);
            }
        }
        
        @keyframes musicPulse {
            0%, 100% {
                transform: scale(1);
                background: #4ecdc4;
            }
            50% {
                transform: scale(1.2);
                background: #ff6b6b;
            }
        }
    `;
    document.head.appendChild(musicStyle);

    // Initialize music visualizer and auto-start music (without showing player)
    setTimeout(() => {
        createMusicVisualizer();
        // Auto-initialize music player in background
        if (typeof initMusicPlayer === 'function') {
            initMusicPlayer();
        }
        
        // Global flag to prevent multiple starts
        let musicStarted = false;
        
        // Simple music start function
        window.startMusic = () => {
            console.log('🎵 startMusic called');
            console.log('🎵 musicPlayer:', musicPlayer);
            console.log('🎵 musicPlayer.audio:', musicPlayer?.audio);
            console.log('🎵 musicPlayer.isPlaying:', musicPlayer?.isPlaying);
            
            if (!musicPlayer) {
                console.log('🎵 No music player!');
                return;
            }
            
            if (!musicPlayer.audio) {
                console.log('🎵 No audio element!');
                return;
            }
            
            if (musicPlayer.isPlaying) {
                console.log('🎵 Already playing!');
                return;
            }
            
            console.log('🎵 Attempting to play MP3...');
            
            musicPlayer.audio.play().then(() => {
                console.log('🎵 SUCCESS: MP3 play promise resolved!');
                musicPlayer.isPlaying = true;
                musicPlayer.updatePlayButton();
                musicPlayer.startVisualizer();
                
                // Update music indicator
                const musicIndicator = document.querySelector('.music-visualizer div[style*="musicPulse"]');
                if (musicIndicator) {
                    musicIndicator.style.background = '#ff6b6b';
                    musicIndicator.innerHTML = '🎵';
                }
            }).catch(e => {
                console.log('🎵 ERROR: MP3 play promise rejected:', e);
                console.log('🎵 Error name:', e.name);
                console.log('🎵 Error message:', e.message);
            });
        };
        
        // Single click listener for document
        const startMusicOnClick = () => {
            window.startMusic();
            document.removeEventListener('click', startMusicOnClick);
        };
        
        // Add click listener to document
        document.addEventListener('click', startMusicOnClick);
    }, 2000);

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Initialize scroll progress
    createScrollProgress();

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                window.scrollBy(0, 100);
                break;
            case 'ArrowUp':
                e.preventDefault();
                window.scrollBy(0, -100);
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo(0, 0);
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo(0, document.body.scrollHeight);
                break;
        }
    });

    // Add psychedelic cursor trail effect
    function createCursorTrail() {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(cursorTrail);
        
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2', '#ffd700'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            cursorTrail.style.left = trailX - 10 + 'px';
            cursorTrail.style.top = trailY - 10 + 'px';
            cursorTrail.style.background = randomColor;
            cursorTrail.style.boxShadow = `0 0 20px ${randomColor}`;
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }

    // Initialize cursor trail
    setTimeout(createCursorTrail, 3000);

    // Add loading screen
    window.addEventListener('load', () => {
        const loadingScreen = document.createElement('div');
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loadingScreen.innerHTML = `
            <div style="text-align: center;">
                <div style="font-family: 'Orbitron', monospace; font-size: 2rem; color: #4ecdc4; margin-bottom: 1rem;">
                    NEVER STOP DREAMING
                </div>
                <div style="width: 50px; height: 50px; border: 3px solid #4ecdc4; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
        `;
        
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        document.body.appendChild(loadingScreen);
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    });

    console.log('💒 Johanna & Lukas Festival-Hochzeit 2026 - Website loaded successfully! 🎵'); 

    // Contact form functionality
    const contactForm = document.querySelector('.kontakt-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            if (name && email && message) {
                // Show success message
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Nachricht gesendet! ✓';
                submitButton.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                }, 3000);
                
                console.log('📧 Contact form submitted:', { name, email, message });
            }
        });
    }

    // RSVP button functionality
    const rsvpButtons = document.querySelectorAll('.ticket-button');
    rsvpButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.ticket-card');
            const title = card.querySelector('h3').textContent;
            
            // Show success message
            const originalText = button.textContent;
            button.textContent = 'Zugesagt! ✓';
            button.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            }, 3000);
            
            console.log('🎉 RSVP submitted for:', title);
        });
    }); 
});

// Initialize music player after a delay
setTimeout(() => {
    if (typeof initMusicPlayer === 'function') {
        initMusicPlayer();
    }
}, 2000); 