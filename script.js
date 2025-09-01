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
                        if (musicPlayer && musicPlayer.startMusic) {
                            console.log('🎵 Auto-starting music after password unlock!');
                            musicPlayer.startMusic();
                        }
                    }, 1000);
                } else if (musicPlayer && musicPlayer.startMusic) {
                    // If player already exists, just start music
                    setTimeout(() => {
                        console.log('🎵 Starting existing music player after password unlock!');
                        musicPlayer.startMusic();
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
    // Smart mobile optimization - keep psychedelic effects but optimize them
    const isMobile = window.innerWidth <= 768;
    const isLowEndMobile = window.innerWidth <= 480;
    
    if (isMobile) {
        console.log('📱 Mobile device detected - applying smart performance optimization');
        
        // Disable smooth scrolling on mobile for better performance
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Add smart mobile optimization styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                /* Reduce animation complexity but keep them */
                .floating-shapes div {
                    animation-duration: 8s !important;
                    animation-iteration-count: infinite !important;
                }
                
                .wave-patterns {
                    animation-duration: 12s !important;
                }
                
                .psychedelic-patterns {
                    animation-duration: 15s !important;
                }
                
                /* Optimize cursor trail for mobile */
                .cursor-trail {
                    display: none !important;
                }
                
                /* Reduce fractal complexity on very small screens */
                @media (max-width: 480px) {
                    .fractal-bg {
                        background-size: 200px 200px !important;
                    }
                    
                    .floating-shapes div {
                        animation-duration: 10s !important;
                    }
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
    
    // Intelligent psychedelic effects for mobile
    function createMobilePsychedelicEffects() {
        if (!isMobile) return;
        
        console.log('🎨 Creating mobile-optimized psychedelic effects');
        
        // Create mobile-friendly floating particles
        const createMobileParticle = () => {
            const particle = document.createElement('div');
            const colors = ['rgba(139, 69, 19, 0.3)', 'rgba(160, 82, 45, 0.3)', 'rgba(205, 133, 63, 0.3)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                width: ${isLowEndMobile ? '8px' : '12px'};
                height: ${isLowEndMobile ? '8px' : '12px'};
                background: ${randomColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                opacity: 0.6;
                animation: mobileFloat ${isLowEndMobile ? '15s' : '12s'} ease-in-out infinite;
            `;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), isLowEndMobile ? 15000 : 12000);
        };
        
        // Create mobile-friendly wave effects
        const createMobileWave = () => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: ${isLowEndMobile ? '40px' : '60px'};
                background: linear-gradient(45deg, 
                    rgba(139, 69, 19, 0.1), 
                    rgba(160, 82, 45, 0.1), 
                    rgba(205, 133, 63, 0.1)
                );
                pointer-events: none;
                z-index: -1;
                animation: mobileWave ${isLowEndMobile ? '8s' : '6s'} ease-in-out infinite;
                transform-origin: bottom;
            `;
            
            document.body.appendChild(wave);
            
            setTimeout(() => wave.remove(), isLowEndMobile ? 8000 : 6000);
        };
        
        // Add mobile-optimized CSS animations
        const mobilePsychedelicStyle = document.createElement('style');
        mobilePsychedelicStyle.textContent = `
            @keyframes mobileFloat {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-50vh) scale(1.2);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) scale(0.5);
                    opacity: 0;
                }
            }
            
            @keyframes mobileWave {
                0%, 100% {
                    transform: scaleY(1) skewX(0deg);
                    opacity: 0.1;
                }
                25% {
                    transform: scaleY(1.2) skewX(5deg);
                    opacity: 0.2;
                }
                50% {
                    transform: scaleY(0.8) skewX(-3deg);
                    opacity: 0.15;
                }
                75% {
                    transform: scaleY(1.1) skewX(2deg);
                    opacity: 0.25;
                }
            }
        `;
        document.head.appendChild(mobilePsychedelicStyle);
        
        // Start mobile psychedelic effects with reduced frequency
        const particleInterval = isLowEndMobile ? 8000 : 5000;
        const waveInterval = isLowEndMobile ? 12000 : 8000;
        
        setInterval(createMobileParticle, particleInterval);
        setInterval(createMobileWave, waveInterval);
        
        // Create initial effects
        setTimeout(createMobileParticle, 1000);
        setTimeout(createMobileWave, 2000);
        
        console.log('🎨 Mobile psychedelic effects initialized');
    }
    
    // Initialize mobile psychedelic effects
    if (isMobile) {
        createMobilePsychedelicEffects();
    }
    
    // Intelligent performance monitoring for psychedelic effects
    function setupPerformanceMonitoring() {
        if (!isMobile) return;
        
        console.log('📊 Setting up intelligent performance monitoring');
        
        let frameRate = 60;
        let lastTime = performance.now();
        let frameCount = 0;
        let lowPerformanceMode = false;
        
        // Monitor frame rate
        function monitorFrameRate() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                frameRate = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust effects based on performance
                if (frameRate < 30 && !lowPerformanceMode) {
                    console.log('📊 Low performance detected, reducing effects');
                    enableLowPerformanceMode();
                } else if (frameRate > 45 && lowPerformanceMode) {
                    console.log('📊 Performance improved, restoring effects');
                    disableLowPerformanceMode();
                }
            }
            
            requestAnimationFrame(monitorFrameRate);
        }
        
        // Low performance mode
        function enableLowPerformanceMode() {
            lowPerformanceMode = true;
            
            // Reduce animation complexity
            const style = document.createElement('style');
            style.id = 'low-performance-mode';
            style.textContent = `
                .floating-shapes::before,
                .floating-shapes::after,
                .wave-patterns::before,
                .wave-patterns::after {
                    animation-duration: 20s !important;
                    opacity: 0.05 !important;
                }
                
                .psychedelic-patterns {
                    animation-duration: 30s !important;
                    opacity: 0.02 !important;
                }
                
                .fractal-bg {
                    animation-duration: 40s !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Normal performance mode
        function disableLowPerformanceMode() {
            lowPerformanceMode = false;
            
            const lowPerfStyle = document.getElementById('low-performance-mode');
            if (lowPerfStyle) {
                lowPerfStyle.remove();
            }
        }
        
        // Battery status monitoring
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                battery.addEventListener('levelchange', () => {
                    if (battery.level < 0.2) {
                        console.log('🔋 Low battery detected, reducing effects');
                        enableLowPerformanceMode();
                    } else if (battery.level > 0.5 && lowPerformanceMode) {
                        console.log('🔋 Battery level improved, restoring effects');
                        disableLowPerformanceMode();
                    }
                });
                
                // Initial battery check
                if (battery.level < 0.2) {
                    enableLowPerformanceMode();
                }
            });
        }
        
        // Start monitoring
        requestAnimationFrame(monitorFrameRate);
        
        // Check for reduced motion preference
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('♿ Reduced motion preference detected');
            enableLowPerformanceMode();
        }
        
        console.log('📊 Performance monitoring initialized');
    }
    
    // Initialize performance monitoring
    if (isMobile) {
        setupPerformanceMonitoring();
    }

    // Countdown Timer
    function updateCountdown() {
        const festivalDate = new Date('June 26, 2026 14:00:00').getTime();
        const now = new Date().getTime();
        const distance = festivalDate - now;
        
        // Reduce update frequency on mobile for better performance
        const updateInterval = window.innerWidth <= 768 ? 5000 : 1000; // 5 seconds on mobile, 1 second on desktop

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

    // Update countdown with mobile optimization
    const countdownInterval = window.innerWidth <= 768 ? 5000 : 1000;
    setInterval(updateCountdown, countdownInterval);
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
    const scrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(15, 8, 5, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(15, 8, 5, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Reduce scroll event frequency on mobile
    const scrollThrottle = window.innerWidth <= 768 ? 100 : 16; // 10fps on mobile, 60fps on desktop
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            scrollHandler();
            scrollTimeout = null;
        }, scrollThrottle);
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

    // Ticket button interactions - now links to Mews booking
    document.querySelectorAll('.ticket-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add click effect on desktop (not mobile)
            if (window.innerWidth > 768) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
            
            // Log the click for tracking
            const card = this.closest('.ticket-card');
            const title = card ? card.querySelector('h3').textContent : 'Unknown';
            console.log('🎉 RSVP link clicked for:', title);
        });
        
        // Add touch-specific handling for mobile
        if (window.innerWidth <= 768) {
            button.addEventListener('touchstart', function(e) {
                // Prevent double-tap zoom on mobile
                e.preventDefault();
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        }
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

    // Mobile detection (already defined above)
    const isSmallMobile = window.innerWidth <= 480;
    
    // Create particles based on device capability
    if (!isSmallMobile) {
        const particleInterval = isMobile ? 5000 : 2000; // Less frequent on mobile
        setInterval(createParticle, particleInterval);
    }

    // Optimized fractal particles - reduced frequency
    function createFractalParticle() {
        const particle = document.createElement('div');
        const shapes = ['polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', 'polygon(50% 0%, 0% 100%, 100% 100%)'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const colors = ['#8b4513', '#a0522d', '#cd853f', '#d2691e'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = 'fractal-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${isMobile ? '10px' : '15px'};
            height: ${isMobile ? '10px' : '15px'};
            background: ${randomColor};
            clip-path: ${randomShape};
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: fractalFloat ${isMobile ? '20s' : '15s'} ease-in-out infinite;
            opacity: ${isMobile ? '0.2' : '0.4'};
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, isMobile ? 20000 : 15000);
    }

    // Create fractal particles based on device capability
    if (!isSmallMobile) {
        const fractalInterval = isMobile ? 8000 : 3000; // Much less frequent on mobile
        setInterval(createFractalParticle, fractalInterval);
    }

    // Add CSS for enhanced particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg) scale(1) skew(0deg);
                opacity: 1;
            }
            25% {
                transform: translateY(-25vh) rotate(90deg) scale(1.4) skew(5deg);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(0.8) skew(-5deg);
                opacity: 0.6;
            }
            75% {
                transform: translateY(-75vh) rotate(270deg) scale(1.6) skew(3deg);
                opacity: 0.4;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.3) skew(0deg);
                opacity: 0;
            }
        }
        
        @keyframes fractalFloat {
            0% {
                transform: translateY(0) rotate(0deg) scale(1) skew(0deg);
                opacity: 0.4;
            }
            20% {
                transform: translateY(-20vh) rotate(72deg) scale(1.3) skew(5deg);
                opacity: 0.7;
            }
            40% {
                transform: translateY(-40vh) rotate(144deg) scale(0.6) skew(-5deg);
                opacity: 0.5;
            }
            60% {
                transform: translateY(-60vh) rotate(216deg) scale(1.5) skew(3deg);
                opacity: 0.3;
            }
            80% {
                transform: translateY(-80vh) rotate(288deg) scale(0.8) skew(-3deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.2) skew(0deg);
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
        
        // More waves for psychedelic effect
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background: conic-gradient(from ${i * 72}deg, 
                    transparent, 
                    rgba(139, 69, 19, 0.15), 
                    transparent, 
                    rgba(160, 82, 45, 0.15), 
                    transparent,
                    rgba(205, 133, 63, 0.12),
                    transparent);
                animation: waveRotate ${8 + i * 3}s linear infinite;
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

    // Simple music player initialization
    setTimeout(() => {
        // Initialize music player
        if (typeof initMusicPlayer === 'function') {
            initMusicPlayer();
        }
        
        // Single click listener for document to start music
        const startMusicOnClick = () => {
            if (musicPlayer && musicPlayer.startMusic) {
                musicPlayer.startMusic();
            }
            document.removeEventListener('click', startMusicOnClick);
        };
        
        // Add click listener to document
        document.addEventListener('click', startMusicOnClick);
    }, 1000);

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
        // Skip on mobile devices
        if (isMobile) return;
        
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
            
            // Use the new forest/wood color palette
            const colors = ['#8b4513', '#a0522d', '#cd853f', '#d2691e', '#daa520', '#b8860b'];
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
        // Skip on very small devices
        if (isSmallMobile) return;
        
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
        const numElements = isMobile ? 8 : 15; // Fewer elements on mobile
        
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            const size = isMobile ? (Math.random() * 40 + 20) : (Math.random() * 80 + 40);
            const isCircle = Math.random() > 0.5;
            
            // Random starting position
            const x = Math.random() * (window.innerWidth - size);
            const y = Math.random() * (window.innerHeight - size);
            
            element.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, 
                    rgba(139, 69, 19, ${isMobile ? (Math.random() * 0.2 + 0.1) : (Math.random() * 0.4 + 0.2)}), 
                    rgba(160, 82, 45, ${isMobile ? (Math.random() * 0.2 + 0.1) : (Math.random() * 0.4 + 0.2)}),
                    rgba(205, 133, 63, ${isMobile ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.3 + 0.1)})
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
                vx: (Math.random() - 0.5) * (isMobile ? 1 : 2), // Slower on mobile
                vy: (Math.random() - 0.5) * (isMobile ? 1 : 2),
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

    // RSVP button functionality - now links to Mews booking system
    const rsvpButtons = document.querySelectorAll('.ticket-button');
    rsvpButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.ticket-card');
            const title = card.querySelector('h3').textContent;
            console.log('🎉 RSVP link clicked for:', title);
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
        
        // Adjust number of waves based on device capability
        const numWaves = isSmallMobile ? 0 : (isMobile ? 2 : 5);
        
        if (numWaves > 0) {
            // Create multiple wave layers with different rotation speeds and directions
            const animations = [
                { name: 'psychedelicRotate', duration: isMobile ? 30 : 20, direction: 'normal' },
                { name: 'psychedelicRotateReverse', duration: isMobile ? 45 : 35, direction: 'normal' },
                { name: 'psychedelicRotateFast', duration: isMobile ? 25 : 15, direction: 'normal' },
                { name: 'psychedelicRotateSlow', duration: isMobile ? 60 : 50, direction: 'normal' },
                { name: 'psychedelicRotate', duration: isMobile ? 35 : 25, direction: 'reverse' }
            ];
            
            for (let i = 0; i < numWaves; i++) {
                const wave = document.createElement('div');
                const anim = animations[i];
                const waveOpacity = isMobile ? 0.02 : 0.03;
                
                wave.style.cssText = `
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(
                        from ${i * (360 / numWaves)}deg,
                        transparent,
                        rgba(139, 69, 19, ${waveOpacity}),
                        transparent,
                        rgba(160, 82, 45, ${waveOpacity}),
                        transparent,
                        rgba(205, 133, 63, ${waveOpacity * 0.8}),
                        transparent
                    );
                    animation: ${anim.name} ${anim.duration}s linear infinite ${anim.direction};
                    transform-origin: center;
                `;
                waveContainer.appendChild(wave);
            }
        }
    } 