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
                if (typeof initMusicPlayer === 'function' && !musicPlayer) {
                    initMusicPlayer();
                    
                    // Start music after a short delay to ensure player is ready
                    setTimeout(() => {
                        if (window.startMusic) {
                            console.log('🎵 Auto-starting music after password unlock!');
                            window.startMusic();
                        }
                    }, 1000);
                } else if (musicPlayer && window.startMusic) {
                    // If player already exists, just start music
                    setTimeout(() => {
                        console.log('🎵 Starting existing music player after password unlock!');
                        window.startMusic();
                    }, 500);
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

        // Reduced pulse effect frequency for better performance
        if (seconds % 30 === 0) {
            const countdownItems = document.querySelectorAll('.countdown-item');
            countdownItems.forEach(item => {
                item.style.transform = 'scale(1.05)';
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

    // Optimized navbar background change on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(26, 10, 46, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(26, 10, 46, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optimized parallax effect for fractal background
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const fractalBg = document.querySelector('.fractal-bg');
                if (fractalBg) {
                    fractalBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
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

    // Optimized floating particles effect - reduced frequency
    function createParticle() {
        const particle = document.createElement('div');
        const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2', '#ffd700', '#00ff88'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2; // Reduced size
        
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
            box-shadow: 0 0 ${size * 1.5}px ${randomColor};
            animation: floatUp ${Math.random() * 3 + 8}s linear infinite;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }

    // Create particles less frequently for better performance
    setInterval(createParticle, 5000); // Increased from 3s to 5s

    // Optimized fractal particles - reduced frequency
    function createFractalParticle() {
        const particle = document.createElement('div');
        const shapes = ['polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', 'polygon(50% 0%, 0% 100%, 100% 100%)'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const colors = ['#ff6b6b', '#4ecdc4', '#ff1493', '#8a2be2'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = 'fractal-particle';
        particle.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            background: ${randomColor};
            clip-path: ${randomShape};
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: fractalFloat 15s ease-in-out infinite;
            opacity: 0.4;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Create fractal particles less frequently
    setInterval(createFractalParticle, 8000); // Increased from 4s to 8s

    // Add CSS for enhanced particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(1.2);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.3);
                opacity: 0;
            }
        }
        
        @keyframes fractalFloat {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-25vh) rotate(90deg) scale(1.1);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(0.7);
                opacity: 0.3;
            }
            75% {
                transform: translateY(-75vh) rotate(270deg) scale(1);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.2);
                opacity: 0;
            }
        }
        
        .floating-particle {
            box-shadow: 0 0 8px currentColor;
        }
        
        .fractal-particle {
            box-shadow: 0 0 12px currentColor;
        }
    `;
    document.head.appendChild(style);

    // Optimized hover effects for cards
    document.querySelectorAll('.day-card, .anreise-card, .food-card, .ticket-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Simplified typing effect for hero title
    function typeWriter(element, text, speed = 150) {
        let i = 0;
        element.textContent = '';
        element.setAttribute('data-text', text);
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
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
                typeWriter(heroTitle, originalText, 200); // Increased speed
            }, 1000);
        }
    });

    // Simplified psychedelic background waves - reduced complexity
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
            opacity: 0.2;
        `;
        
        // Reduced number of waves for better performance
        for (let i = 0; i < 2; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background: conic-gradient(from ${i * 180}deg, 
                    transparent, 
                    rgba(255, 107, 107, 0.08), 
                    transparent, 
                    rgba(78, 205, 196, 0.08), 
                    transparent);
                animation: waveRotate ${20 + i * 10}s linear infinite;
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

    // Initialize psychedelic waves with delay
    setTimeout(createPsychedelicWaves, 3000);

    // Simplified psychedelic effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
        
        // Simplified hover effect
        title.addEventListener('mouseenter', function() {
            this.style.animation = 'sectionTitleGlow 2s ease-in-out infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.animation = 'sectionTitleGlow 5s ease-in-out infinite';
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
            animation: pulse 3s ease-in-out infinite;
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
            animation: musicPulse 2s ease-in-out infinite;
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
                transform: scale(1.05);
                box-shadow: 0 0 25px rgba(255, 107, 107, 0.7);
            }
        }
        
        @keyframes musicPulse {
            0%, 100% {
                transform: scale(1);
                background: #4ecdc4;
            }
            50% {
                transform: scale(1.1);
                background: #ff6b6b;
            }
        }
    `;
    document.head.appendChild(musicStyle);

    // Initialize music visualizer and auto-start music (without showing player)
    setTimeout(() => {
        createMusicVisualizer();
        
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
    }, 1000); // Reduced delay from 3000ms to 1000ms

    // Optimized scroll progress indicator
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
        
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset;
                    const docHeight = document.body.offsetHeight - window.innerHeight;
                    const scrollPercent = (scrollTop / docHeight) * 100;
                    progressBar.style.width = scrollPercent + '%';
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
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

    // Enhanced psychedelic cursor trail effect
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
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            
            // Use the new green/yellow color palette
            const colors = ['#10b981', '#059669', '#047857', '#fbbf24', '#f59e0b'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            cursorTrail.style.left = trailX - 10 + 'px';
            cursorTrail.style.top = trailY - 10 + 'px';
            cursorTrail.style.background = `radial-gradient(circle, ${randomColor}80, transparent)`;
            cursorTrail.style.boxShadow = `0 0 20px ${randomColor}60`;
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }

    // Create interactive floating elements with mouse repulsion
    function createPsychedelicElements() {
        const animations = [
            'psychedelicRotate 18s linear infinite',
            'psychedelicRotateReverse 22s linear infinite',
            'psychedelicRotateFast 14s linear infinite',
            'psychedelicRotateSlow 35s linear infinite',
            'psychedelicRotate 25s linear infinite reverse',
            'psychedelicRotateReverse 30s linear infinite reverse',
            'psychedelicRotateFast 16s linear infinite reverse',
            'psychedelicRotateSlow 40s linear infinite reverse'
        ];
        
        const elements = [];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            const size = Math.random() * 80 + 40;
            const isCircle = Math.random() > 0.5;
            
            // Random starting position
            const x = Math.random() * (window.innerWidth - size);
            const y = Math.random() * (window.innerHeight - size);
            
            element.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, 
                    rgba(16, 185, 129, ${Math.random() * 0.2 + 0.1}), 
                    rgba(251, 191, 36, ${Math.random() * 0.2 + 0.1}),
                    rgba(5, 150, 105, ${Math.random() * 0.15 + 0.05})
                );
                border-radius: ${isCircle ? '50%' : '20px'};
                pointer-events: none;
                z-index: -1;
                animation: ${animations[i % animations.length]};
                top: ${y}px;
                left: ${x}px;
                transform-origin: center;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(element);
            elements.push({
                element: element,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2, // Random velocity
                vy: (Math.random() - 0.5) * 2,
                size: size
            });
        }
        
        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animation loop for movement and repulsion
        function animateElements() {
            elements.forEach(item => {
                // Add repulsion from mouse
                const dx = item.x - mouseX;
                const dy = item.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 150;
                
                if (distance < repulsionRadius) {
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const angle = Math.atan2(dy, dx);
                    item.vx += Math.cos(angle) * force * 0.5;
                    item.vy += Math.sin(angle) * force * 0.5;
                }
                
                // Update position
                item.x += item.vx;
                item.y += item.vy;
                
                // Add some friction
                item.vx *= 0.98;
                item.vy *= 0.98;
                
                // Bounce off walls
                if (item.x <= 0 || item.x >= window.innerWidth - item.size) {
                    item.vx *= -0.8;
                    item.x = Math.max(0, Math.min(window.innerWidth - item.size, item.x));
                }
                if (item.y <= 0 || item.y >= window.innerHeight - item.size) {
                    item.vy *= -0.8;
                    item.y = Math.max(0, Math.min(window.innerHeight - item.size, item.y));
                }
                
                // Apply position
                item.element.style.left = item.x + 'px';
                item.element.style.top = item.y + 'px';
            });
            
            requestAnimationFrame(animateElements);
        }
        
        animateElements();
    }
    
    // Apply varied animations to UI elements
    function applyVariedAnimations() {
        // Countdown numbers with different animations
        const countdownNumbers = document.querySelectorAll('.countdown-number');
        const countdownAnimations = [
            'countdownGlow 3s ease-in-out infinite',
            'countdownGlowReverse 4s ease-in-out infinite',
            'countdownGlowFast 2.5s ease-in-out infinite',
            'countdownGlowReverse 3.5s ease-in-out infinite'
        ];
        
        countdownNumbers.forEach((number, index) => {
            number.style.animation = countdownAnimations[index % countdownAnimations.length];
        });
        
        // Section titles with different animations
        const sectionTitles = document.querySelectorAll('.section-title');
        const titleAnimations = [
            'sectionTitleGlow 5s ease-in-out infinite',
            'sectionTitleGlowReverse 6s ease-in-out infinite',
            'sectionTitleGlowSlow 7s ease-in-out infinite',
            'sectionTitleGlow 4.5s ease-in-out infinite',
            'sectionTitleGlowReverse 5.5s ease-in-out infinite'
        ];
        
        sectionTitles.forEach((title, index) => {
            title.style.animation = titleAnimations[index % titleAnimations.length];
        });
        
        // Buttons with different pulse animations
        const buttons = document.querySelectorAll('.cta-button, .ticket-button, .submit-button');
        const buttonAnimations = [
            'cardPulse 3s ease-in-out infinite',
            'cardPulse 4s ease-in-out infinite reverse',
            'cardPulse 2.5s ease-in-out infinite',
            'cardPulse 3.5s ease-in-out infinite reverse'
        ];
        
        buttons.forEach((button, index) => {
            button.style.animation = buttonAnimations[index % buttonAnimations.length];
        });
        
        // Cards with different pulse animations
        const cards = document.querySelectorAll('.day-card, .anreise-card, .food-card, .ticket-card');
        const cardAnimations = [
            'cardPulse 4s ease-in-out infinite',
            'cardPulse 5s ease-in-out infinite reverse',
            'cardPulse 3s ease-in-out infinite',
            'cardPulse 4.5s ease-in-out infinite reverse'
        ];
        
        cards.forEach((card, index) => {
            card.style.animation = cardAnimations[index % cardAnimations.length];
        });
        
        console.log('🎨 Applied varied animations to UI elements');
    }

    // Initialize psychedelic effects with delay
    setTimeout(() => {
        createCursorTrail();
        createPsychedelicElements();
        createPsychedelicWaves();
        applyVariedAnimations();
        console.log('✨ Psychedelic effects initialized');
    }, 1000);

    // Simplified loading screen
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
                <div class="runic-text" style="font-size: 2rem; color: #4ecdc4; margin-bottom: 1rem;">
                    ᚷᛁᛒᚢ ᚨᚢᛃᚨ ᛊᛁᛒᛃᚨ ᛒᚨᚱᚾᚨ
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
        }, 1500); // Reduced loading time
    });

    console.log('Johanna & Lukas Festival-Hochzeit 2026 - Website loaded successfully!'); 

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

// Initialize music player only once after a delay
setTimeout(() => {
    if (typeof initMusicPlayer === 'function' && !musicPlayer) {
        console.log('🎵 Initializing music player...');
        initMusicPlayer();
    }
}, 1000); // Reduced delay for faster music initialization 

    
    
    // Create additional psychedelic wave effects with varied rotations
    function createPsychedelicWaves() {
        const waveContainer = document.createElement('div');
        waveContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(waveContainer);
        
        // Create multiple wave layers with different rotation speeds and directions
        const animations = [
            { name: 'psychedelicRotate', duration: 20, direction: 'normal' },
            { name: 'psychedelicRotateReverse', duration: 35, direction: 'normal' },
            { name: 'psychedelicRotateFast', duration: 15, direction: 'normal' },
            { name: 'psychedelicRotateSlow', duration: 50, direction: 'normal' },
            { name: 'psychedelicRotate', duration: 25, direction: 'reverse' }
        ];
        
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            const anim = animations[i];
            wave.style.cssText = `
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(
                    from ${i * 72}deg,
                    transparent,
                    rgba(16, 185, 129, 0.03),
                    transparent,
                    rgba(251, 191, 36, 0.03),
                    transparent,
                    rgba(5, 150, 105, 0.02),
                    transparent
                );
                animation: ${anim.name} ${anim.duration}s linear infinite ${anim.direction};
                transform-origin: center;
            `;
            waveContainer.appendChild(wave);
        }
    } 