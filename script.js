document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Smooth Scrolling Setup
    initializeNavigation();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Initialize touch interactions
    initializeTouchInteractions();
    
    // Initialize responsive optimizations
    initializeResponsiveOptimizations();
    
    // Initialize smooth section transitions and animations
    initializeSectionTransitions();
    
    // Initialize parallax scrolling
    initializeParallaxScrolling();
    
    // Initialize navigation highlighting
    initializeNavigationHighlighting();
    
    // Initialize loading animations
    initializeLoadingAnimations();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Mobile Navigation Setup
    function initializeMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        const navInstrumentLinks = document.querySelectorAll('.nav-instrument');
        
        if (!navToggle || !navInstruments) return;
        
        // Toggle mobile menu
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navToggle.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when clicking on navigation links
        navInstrumentLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navInstruments.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        function openMobileMenu() {
            navToggle.classList.add('active');
            navInstruments.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        function closeMobileMenu() {
            navToggle.classList.remove('active');
            navInstruments.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        });
    }
    
    // Touch Interactions Setup
    function initializeTouchInteractions() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll(
            '.nav-instrument, .status-item, .departure-row, .schedule-row, ' +
            '.gate-row, .highlight-item, .frequency-item, .nav-aid-item, ' +
            '.credential, .form-input, .form-textarea, .submit-button'
        );
        
        touchElements.forEach(element => {
            // Add touch start feedback
            element.addEventListener('touchstart', function(e) {
                if (!this.classList.contains('touch-active')) {
                    this.classList.add('touch-active');
                }
            }, { passive: true });
            
            // Remove touch feedback
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            // Handle touch cancel
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Improve scrolling performance on touch devices
        const scrollableElements = document.querySelectorAll(
            '.flip-board, .aircraft-flip-board, .routes-terminal, ' +
            '.flight-schedule-board, .gate-assignments'
        );
        
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.overflowScrolling = 'touch';
        });
        
        // Handle swipe gestures for navigation (optional enhancement)
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Only handle horizontal swipes that are significant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                const navInstruments = document.querySelector('.nav-instruments');
                
                // Swipe right to open menu (only if menu is closed)
                if (deltaX > 0 && !navInstruments.classList.contains('active')) {
                    const navToggle = document.getElementById('nav-toggle');
                    if (navToggle && touchStartX < 50) { // Only if swipe starts from left edge
                        navToggle.click();
                    }
                }
                // Swipe left to close menu (only if menu is open)
                else if (deltaX < 0 && navInstruments.classList.contains('active')) {
                    const navToggle = document.getElementById('nav-toggle');
                    if (navToggle) {
                        navToggle.click();
                    }
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        }, { passive: true });
    }
    
    // Responsive Optimizations Setup
    function initializeResponsiveOptimizations() {
        // Detect device capabilities
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isHighDPI = window.devicePixelRatio > 1;
        const isLowPerformance = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
        
        // Apply device-specific optimizations
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
        }
        
        if (isHighDPI) {
            document.body.classList.add('high-dpi');
        }
        
        if (isLowPerformance) {
            document.body.classList.add('low-performance');
            // Reduce animation complexity for low-performance devices
            const style = document.createElement('style');
            style.textContent = `
                .low-performance .cloud,
                .low-performance .aircraft {
                    animation-duration: 120s !important;
                    opacity: 0.02 !important;
                }
                .low-performance .parallax-bg {
                    transform: none !important;
                }
                .low-performance .flip-board .letter {
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Optimize font sizes based on screen size
        function optimizeFontSizes() {
            const screenWidth = window.innerWidth;
            const root = document.documentElement;
            
            if (screenWidth < 480) {
                // Extra small mobile
                root.style.setProperty('--base-font-size', '14px');
                root.style.setProperty('--small-font-size', '12px');
                root.style.setProperty('--large-font-size', '18px');
            } else if (screenWidth < 768) {
                // Mobile
                root.style.setProperty('--base-font-size', '15px');
                root.style.setProperty('--small-font-size', '13px');
                root.style.setProperty('--large-font-size', '20px');
            } else if (screenWidth < 1024) {
                // Tablet
                root.style.setProperty('--base-font-size', '16px');
                root.style.setProperty('--small-font-size', '14px');
                root.style.setProperty('--large-font-size', '22px');
            } else {
                // Desktop
                root.style.setProperty('--base-font-size', '16px');
                root.style.setProperty('--small-font-size', '14px');
                root.style.setProperty('--large-font-size', '24px');
            }
        }
        
        // Optimize spacing based on screen size
        function optimizeSpacing() {
            const screenWidth = window.innerWidth;
            const root = document.documentElement;
            
            if (screenWidth < 480) {
                root.style.setProperty('--section-padding', '15px 0');
                root.style.setProperty('--container-padding', '0 8px');
                root.style.setProperty('--element-gap', '8px');
            } else if (screenWidth < 768) {
                root.style.setProperty('--section-padding', '20px 0');
                root.style.setProperty('--container-padding', '0 10px');
                root.style.setProperty('--element-gap', '10px');
            } else if (screenWidth < 1024) {
                root.style.setProperty('--section-padding', '30px 0');
                root.style.setProperty('--container-padding', '0 15px');
                root.style.setProperty('--element-gap', '15px');
            } else {
                root.style.setProperty('--section-padding', '40px 0');
                root.style.setProperty('--container-padding', '0 20px');
                root.style.setProperty('--element-gap', '20px');
            }
        }
        
        // Apply optimizations on load and resize
        optimizeFontSizes();
        optimizeSpacing();
        
        // Throttled resize handler for performance
        const handleResize = throttle(() => {
            optimizeFontSizes();
            optimizeSpacing();
            
            // Close mobile menu on resize to larger screen
            if (window.innerWidth > 768) {
                const navToggle = document.getElementById('nav-toggle');
                const navInstruments = document.querySelector('.nav-instruments');
                
                if (navToggle && navInstruments) {
                    navToggle.classList.remove('active');
                    navInstruments.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }, 250);
        
        window.addEventListener('resize', handleResize);
        
        // Handle viewport height changes (mobile browser address bar)
        function handleViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        handleViewportHeight();
        window.addEventListener('resize', throttle(handleViewportHeight, 100));
        
        // Optimize terminal board for mobile
        function optimizeTerminalBoard() {
            const flipBoard = document.querySelector('.flip-board');
            if (!flipBoard) return;
            
            const screenWidth = window.innerWidth;
            
            if (screenWidth < 768) {
                // Add horizontal scroll indicator for mobile
                const scrollIndicator = document.createElement('div');
                scrollIndicator.className = 'scroll-indicator';
                scrollIndicator.innerHTML = '← Scroll horizontally to view all data →';
                scrollIndicator.style.cssText = `
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 0.8em;
                    padding: 10px;
                    background: rgba(255, 198, 0, 0.1);
                    border-radius: 5px;
                    margin-bottom: 10px;
                    animation: fade-in 0.5s ease-out;
                `;
                
                const existingIndicator = flipBoard.parentNode.querySelector('.scroll-indicator');
                if (!existingIndicator) {
                    flipBoard.parentNode.insertBefore(scrollIndicator, flipBoard);
                    
                    // Hide indicator after user scrolls
                    let hasScrolled = false;
                    flipBoard.addEventListener('scroll', () => {
                        if (!hasScrolled) {
                            hasScrolled = true;
                            setTimeout(() => {
                                scrollIndicator.style.opacity = '0';
                                setTimeout(() => {
                                    if (scrollIndicator.parentNode) {
                                        scrollIndicator.parentNode.removeChild(scrollIndicator);
                                    }
                                }, 300);
                            }, 2000);
                        }
                    }, { once: true });
                }
            }
        }
        
        // Apply terminal board optimization after DOM is ready
        setTimeout(optimizeTerminalBoard, 1000);
    }
    
    // Terminal Board Animation Setup
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const clockChars = '0123456789:';
    
    // Performance optimization flags
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationsInitialized = false;
    
    // Throttle function for performance optimization
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Debounce function for performance optimization
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // --- Core Flip Functionality ---

    function flip(letter, nextChar, callback) {
        if (letter.classList.contains('flipping') || letter.getAttribute('data-char') === nextChar) {
            if (callback) callback();
            return;
        }

        const currentChar = letter.getAttribute('data-char');
        const topHalf = letter.querySelector('.top');
        const bottomHalf = letter.querySelector('.bottom');

        const flipTop = document.createElement('span');
        flipTop.className = 'flip-top';
        flipTop.textContent = currentChar;

        const flipBottom = document.createElement('span');
        flipBottom.className = 'flip-bottom';
        flipBottom.textContent = nextChar;

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            letter.appendChild(flipTop);
            letter.appendChild(flipBottom);
            letter.classList.add('flipping');
            topHalf.textContent = nextChar;

            flipTop.addEventListener('animationend', () => {
                bottomHalf.textContent = nextChar;
                letter.setAttribute('data-char', nextChar);
                
                // Clean up DOM elements
                if (letter.contains(flipTop)) letter.removeChild(flipTop);
                if (letter.contains(flipBottom)) letter.removeChild(flipBottom);
                
                letter.classList.remove('flipping');
                if (callback) callback();
            }, { once: true });
        });
    }

    function createLetter(char) {
        const letterWrapper = document.createElement('span');
        letterWrapper.className = 'letter';
        letterWrapper.setAttribute('data-char', char);

        const topHalf = document.createElement('span');
        topHalf.className = 'top';
        topHalf.textContent = char;

        const bottomHalf = document.createElement('span');
        bottomHalf.className = 'bottom';
        bottomHalf.textContent = char;

        letterWrapper.appendChild(topHalf);
        letterWrapper.appendChild(bottomHalf);
        return letterWrapper;
    }

    // --- Career Highlights Text Animation ---

    function animateToFinalChar(letter, finalChar) {
        let cycle = 0;
        const flipCycles = Math.floor(Math.random() * 3) + 2; // Reduced cycles for better performance

        function flipCycle() {
            cycle++;
            if (cycle >= flipCycles) {
                flip(letter, finalChar); // Final flip, no callback needed
                return;
            }

            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            flip(letter, randomChar, flipCycle); // Pass flipCycle as the callback
        }

        flipCycle();
    }

    // Initialize terminal board animations with intersection observer for performance
    function initializeTerminalAnimations() {
        if (animationsInitialized) return;
        
        // Animate career highlights data
        document.querySelectorAll('.row .organization > span:first-child, .row .achievement > span, .row .year > span, .row .aircraft > span, .row .status > span').forEach((span, spanIndex) => {
            const text = span.textContent.trim();
            span.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                if (char === ' ') {
                    const space = document.createElement('span');
                    space.className = 'letter space';
                    span.appendChild(space);
                    return;
                }
                
                const letterWrapper = createLetter(' ');
                span.appendChild(letterWrapper);
                
                if (prefersReducedMotion) {
                    // Skip animation for users who prefer reduced motion
                    letterWrapper.querySelector('.top').textContent = char;
                    letterWrapper.querySelector('.bottom').textContent = char;
                    letterWrapper.setAttribute('data-char', char);
                } else {
                    // Staggered animation timing for better visual effect
                    const baseDelay = spanIndex * 150; // Reduced delay for better performance
                    const charDelay = index * 60; // Reduced delay between characters
                    const randomDelay = Math.random() * 200; // Reduced random variation
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay + randomDelay);
                }
            });
        });
        
        animationsInitialized = true;
    }
    
    // Use Intersection Observer to trigger animations when hero section is visible
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeTerminalAnimations();
                    heroObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        heroObserver.observe(heroSection);
    } else {
        // Fallback for browsers without Intersection Observer
        initializeTerminalAnimations();
    }

    // --- About Section Status Board Animations ---
    
    function initializeStatusBoard() {
        // Update status board timestamp
        const statusTimestamp = document.getElementById('status-timestamp');
        if (statusTimestamp) {
            function updateStatusTimestamp() {
                const now = new Date();
                const hours = String(now.getUTCHours()).padStart(2, '0');
                const minutes = String(now.getUTCMinutes()).padStart(2, '0');
                const seconds = String(now.getUTCSeconds()).padStart(2, '0');
                statusTimestamp.textContent = `UPDATED: ${hours}:${minutes}:${seconds} UTC`;
            }
            
            updateStatusTimestamp();
            setInterval(updateStatusTimestamp, 1000);
        }
        
        // Animate status text with flip effect
        if (!prefersReducedMotion) {
            const statusTexts = document.querySelectorAll('.status-text');
            statusTexts.forEach((statusText, index) => {
                const originalText = statusText.textContent;
                statusText.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        statusText.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    statusText.appendChild(letterWrapper);
                    
                    // Staggered animation for status indicators
                    const baseDelay = index * 200 + 1000; // Start after 1 second
                    const charDelay = charIndex * 50;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
        }
    }
    
    // Initialize status board when About section comes into view
    const aboutSection = document.getElementById('about');
    if (aboutSection && 'IntersectionObserver' in window) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeStatusBoard();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        aboutObserver.observe(aboutSection);
    } else {
        // Fallback for browsers without Intersection Observer
        setTimeout(initializeStatusBoard, 2000);
    }

    // --- Experience Section Animations ---
    
    function initializeExperienceSection() {
        // Update routes timestamp
        const routesTimestamp = document.getElementById('routes-timestamp');
        if (routesTimestamp) {
            function updateRoutesTimestamp() {
                const now = new Date();
                const hours = String(now.getUTCHours()).padStart(2, '0');
                const minutes = String(now.getUTCMinutes()).padStart(2, '0');
                const seconds = String(now.getUTCSeconds()).padStart(2, '0');
                routesTimestamp.textContent = `LAST UPDATED: ${hours}:${minutes}:${seconds} UTC`;
            }
            
            updateRoutesTimestamp();
            setInterval(updateRoutesTimestamp, 1000);
        }
        
        // Animate aircraft types flip text
        if (!prefersReducedMotion) {
            const flipTexts = document.querySelectorAll('.aircraft-flip-board .flip-text');
            flipTexts.forEach((flipText, index) => {
                const originalText = flipText.textContent;
                flipText.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        flipText.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    flipText.appendChild(letterWrapper);
                    
                    // Staggered animation for aircraft data
                    const baseDelay = index * 300 + 500; // Start after 0.5 seconds
                    const charDelay = charIndex * 80;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate route codes
            const routeCodes = document.querySelectorAll('.route-code');
            routeCodes.forEach((routeCode, index) => {
                const originalText = routeCode.textContent;
                routeCode.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ' || char === '-') {
                        const separator = document.createElement('span');
                        separator.className = 'letter space';
                        separator.textContent = char;
                        routeCode.appendChild(separator);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    routeCode.appendChild(letterWrapper);
                    
                    // Staggered animation for route codes
                    const baseDelay = index * 100 + 1500; // Start after 1.5 seconds
                    const charDelay = charIndex * 60;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate category hours
            const categoryHours = document.querySelectorAll('.category-hours');
            categoryHours.forEach((hours, index) => {
                const originalText = hours.textContent;
                hours.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ' || char === ',') {
                        const separator = document.createElement('span');
                        separator.className = 'letter space';
                        separator.textContent = char;
                        hours.appendChild(separator);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    hours.appendChild(letterWrapper);
                    
                    // Staggered animation for category hours
                    const baseDelay = index * 400 + 2000; // Start after 2 seconds
                    const charDelay = charIndex * 100;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
        }
        
        // Animate flight hours counter with counting effect
        const hoursDigits = document.querySelectorAll('.hours-digit');
        if (hoursDigits.length > 0 && !prefersReducedMotion) {
            const targetHours = [8, 5, 0, 0];
            
            hoursDigits.forEach((digit, index) => {
                let currentValue = 0;
                const targetValue = targetHours[index];
                const increment = Math.max(1, Math.floor(targetValue / 20)); // Animate over ~20 steps
                
                const countInterval = setInterval(() => {
                    if (currentValue >= targetValue) {
                        digit.textContent = targetValue;
                        clearInterval(countInterval);
                        return;
                    }
                    
                    currentValue = Math.min(currentValue + increment, targetValue);
                    digit.textContent = currentValue;
                }, 100 + (index * 50)); // Stagger the counting
            });
        }
    }
    
    // Initialize experience section when it comes into view
    const experienceSection = document.getElementById('experience');
    if (experienceSection && 'IntersectionObserver' in window) {
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeExperienceSection();
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        experienceObserver.observe(experienceSection);
    } else {
        // Fallback for browsers without Intersection Observer
        setTimeout(initializeExperienceSection, 3000);
    }

    // --- Certifications Section Animations ---
    
    function initializeCertificationsSection() {
        // Update medical certificate timestamp
        const medicalTimestamp = document.getElementById('medical-timestamp');
        if (medicalTimestamp) {
            function updateMedicalTimestamp() {
                const now = new Date();
                const hours = String(now.getUTCHours()).padStart(2, '0');
                const minutes = String(now.getUTCMinutes()).padStart(2, '0');
                const seconds = String(now.getUTCSeconds()).padStart(2, '0');
                medicalTimestamp.textContent = `LAST VERIFIED: ${hours}:${minutes}:${seconds} UTC`;
            }
            
            updateMedicalTimestamp();
            setInterval(updateMedicalTimestamp, 1000);
        }
        
        // Initialize countdown timers
        initializeCountdownTimers();
        
        // Animate certificate flip text
        if (!prefersReducedMotion) {
            const certFlipTexts = document.querySelectorAll('.certifications-section .flip-text');
            certFlipTexts.forEach((flipText, index) => {
                const originalText = flipText.textContent;
                flipText.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        flipText.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    flipText.appendChild(letterWrapper);
                    
                    // Staggered animation for certificate data
                    const baseDelay = index * 200 + 500; // Start after 0.5 seconds
                    const charDelay = charIndex * 60;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate rating names
            const ratingNames = document.querySelectorAll('.rating-name.flip-text');
            ratingNames.forEach((ratingName, index) => {
                const originalText = ratingName.textContent;
                ratingName.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        ratingName.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    ratingName.appendChild(letterWrapper);
                    
                    // Staggered animation for rating names
                    const baseDelay = index * 150 + 1500; // Start after 1.5 seconds
                    const charDelay = charIndex * 50;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
        }
    }
    
    function initializeCountdownTimers() {
        const countdownTimers = document.querySelectorAll('.countdown-timer[data-target]');
        
        countdownTimers.forEach(timer => {
            const targetDate = new Date(timer.getAttribute('data-target'));
            const countdownValue = timer.querySelector('.countdown-value');
            const countdownUnit = timer.querySelector('.countdown-unit');
            
            function updateCountdown() {
                const now = new Date();
                const timeDiff = targetDate - now;
                
                if (timeDiff <= 0) {
                    // Certificate has expired
                    countdownValue.textContent = 'EXPIRED';
                    countdownUnit.textContent = '--';
                    timer.classList.add('expired');
                    return;
                }
                
                // Calculate days remaining
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                
                if (daysRemaining <= 30) {
                    // Warning state for certificates expiring soon
                    timer.style.borderColor = 'var(--warning-amber)';
                    countdownValue.style.color = 'var(--warning-amber)';
                } else if (daysRemaining <= 7) {
                    // Critical state for certificates expiring very soon
                    timer.style.borderColor = 'var(--danger-red)';
                    countdownValue.style.color = 'var(--danger-red)';
                }
                
                countdownValue.textContent = daysRemaining;
                countdownUnit.textContent = daysRemaining === 1 ? 'DAY' : 'DAYS';
            }
            
            // Update immediately and then every hour
            updateCountdown();
            setInterval(updateCountdown, 3600000); // Update every hour
        });
        
        // Initialize medical countdown timer
        const medicalCountdown = document.querySelector('.medical-countdown[data-target]');
        if (medicalCountdown) {
            const targetDate = new Date(medicalCountdown.getAttribute('data-target'));
            const countdownValue = medicalCountdown.querySelector('.countdown-value');
            const countdownUnit = medicalCountdown.querySelector('.countdown-unit');
            const statusCircle = document.querySelector('.status-circle');
            const statusText = document.querySelector('.medical-status-indicator .status-text');
            const statusDetails = document.querySelector('.status-details');
            
            function updateMedicalCountdown() {
                const now = new Date();
                const timeDiff = targetDate - now;
                
                if (timeDiff <= 0) {
                    // Medical has expired
                    countdownValue.textContent = 'EXPIRED';
                    countdownUnit.textContent = '--';
                    medicalCountdown.style.borderColor = 'var(--danger-red)';
                    statusCircle.classList.remove('current');
                    statusCircle.classList.add('expired');
                    statusText.textContent = 'EXPIRED';
                    statusText.style.color = 'var(--danger-red)';
                    statusDetails.textContent = 'MEDICAL CERTIFICATE EXPIRED';
                    return;
                }
                
                // Calculate days remaining
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                
                if (daysRemaining <= 30) {
                    // Warning state for medical expiring soon
                    medicalCountdown.style.borderColor = 'var(--warning-amber)';
                    countdownValue.style.color = 'var(--warning-amber)';
                    statusDetails.textContent = 'RENEWAL REQUIRED SOON';
                } else if (daysRemaining <= 7) {
                    // Critical state for medical expiring very soon
                    medicalCountdown.style.borderColor = 'var(--danger-red)';
                    countdownValue.style.color = 'var(--danger-red)';
                    statusDetails.textContent = 'URGENT: RENEWAL REQUIRED';
                }
                
                countdownValue.textContent = daysRemaining;
                countdownUnit.textContent = daysRemaining === 1 ? 'DAY' : 'DAYS';
            }
            
            // Update immediately and then every hour
            updateMedicalCountdown();
            setInterval(updateMedicalCountdown, 3600000); // Update every hour
        }
    }
    
    // --- Career Section Animations ---
    
    function initializeCareerSection() {
        // Animate flight schedule flip text
        if (!prefersReducedMotion) {
            const scheduleFlipTexts = document.querySelectorAll('.career-section .flip-text');
            scheduleFlipTexts.forEach((flipText, index) => {
                const originalText = flipText.textContent;
                flipText.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        flipText.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    flipText.appendChild(letterWrapper);
                    
                    // Staggered animation for career data
                    const baseDelay = index * 200 + 500; // Start after 0.5 seconds
                    const charDelay = charIndex * 60;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate timeline milestones
            const timelineMilestones = document.querySelectorAll('.timeline-milestone');
            timelineMilestones.forEach((milestone, index) => {
                const originalText = milestone.textContent;
                milestone.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        milestone.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    milestone.appendChild(letterWrapper);
                    
                    // Staggered animation for timeline milestones
                    const baseDelay = index * 300 + 1500; // Start after 1.5 seconds
                    const charDelay = charIndex * 80;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate timeline dates
            const timelineDates = document.querySelectorAll('.timeline-date');
            timelineDates.forEach((date, index) => {
                const originalText = date.textContent;
                date.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        date.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    date.appendChild(letterWrapper);
                    
                    // Staggered animation for timeline dates
                    const baseDelay = index * 300 + 1200; // Start after 1.2 seconds
                    const charDelay = charIndex * 100;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
            
            // Animate achievement highlights
            const highlightTitles = document.querySelectorAll('.highlight-title');
            highlightTitles.forEach((title, index) => {
                const originalText = title.textContent;
                title.innerHTML = '';
                
                originalText.split('').forEach((char, charIndex) => {
                    if (char === ' ') {
                        const space = document.createElement('span');
                        space.className = 'letter space';
                        title.appendChild(space);
                        return;
                    }
                    
                    const letterWrapper = createLetter(' ');
                    title.appendChild(letterWrapper);
                    
                    // Staggered animation for achievement titles
                    const baseDelay = index * 400 + 2000; // Start after 2 seconds
                    const charDelay = charIndex * 60;
                    
                    setTimeout(() => {
                        animateToFinalChar(letterWrapper, char);
                    }, baseDelay + charDelay);
                });
            });
        }
        
        // Animate timeline markers with progressive reveal
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const marker = item.querySelector('.marker-icon');
            if (marker && !prefersReducedMotion) {
                // Progressive reveal animation for timeline markers
                setTimeout(() => {
                    marker.style.opacity = '1';
                    marker.style.transform = 'scale(1)';
                }, index * 300 + 1000);
            }
        });
    }
    
    // Initialize career section when it comes into view
    const careerSection = document.getElementById('career');
    if (careerSection && 'IntersectionObserver' in window) {
        const careerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeCareerSection();
                    careerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        careerObserver.observe(careerSection);
    } else {
        // Fallback for browsers without Intersection Observer
        setTimeout(initializeCareerSection, 4000);
    }

    // Initialize certifications section when it comes into view
    const certificationsSection = document.getElementById('certifications');
    if (certificationsSection && 'IntersectionObserver' in window) {
        const certificationsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeCertificationsSection();
                    certificationsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        certificationsObserver.observe(certificationsSection);
    } else {
        // Fallback for browsers without Intersection Observer
        setTimeout(initializeCertificationsSection, 3500);
    }

    // --- UTC Clock Animation ---
    
    function updateUTCClock() {
        const clockElement = document.getElementById('utc-clock');
        if (!clockElement) return;
        
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Clear existing content
        clockElement.innerHTML = '';
        
        // Create letter elements for each character
        timeString.split('').forEach((char, index) => {
            const letterWrapper = createLetter(char);
            clockElement.appendChild(letterWrapper);
            
            // Animate clock digits if not reduced motion
            if (!prefersReducedMotion && Math.random() < 0.1) { // 10% chance to animate each second
                setTimeout(() => {
                    const randomChar = clockChars[Math.floor(Math.random() * clockChars.length)];
                    flip(letterWrapper, randomChar, () => {
                        setTimeout(() => {
                            flip(letterWrapper, char);
                        }, 100);
                    });
                }, Math.random() * 500);
            }
        });
    }
    
    // Update clock every second
    updateUTCClock();
    setInterval(updateUTCClock, 1000);

    // --- Navigation and Smooth Scrolling Functions ---
    
    function initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        const navPanel = document.querySelector('.nav-panel');
        
        // Mobile navigation toggle
        if (navToggle && navInstruments) {
            navToggle.addEventListener('click', () => {
                navInstruments.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-instrument').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navInstruments) navInstruments.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Smooth scroll to target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add scrolled class to navigation on scroll
        let scrollTimeout;
        window.addEventListener('scroll', throttle(() => {
            if (navPanel) {
                if (window.scrollY > 50) {
                    navPanel.classList.add('scrolled');
                } else {
                    navPanel.classList.remove('scrolled');
                }
            }
        }, 16)); // ~60fps
    }
    
    // --- Section Transitions and Animations ---
    
    function initializeSectionTransitions() {
        const sections = document.querySelectorAll('.section');
        const sectionTransitions = document.querySelectorAll('.section-transition');
        
        // Set up intersection observer for section visibility
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const section = entry.target;
                    
                    if (entry.isIntersecting) {
                        // Section is visible
                        section.classList.add('visible');
                        section.classList.remove('section-loading');
                        section.classList.add('section-loaded');
                        
                        // Trigger section transition animation
                        if (section.classList.contains('section-transition')) {
                            section.classList.add('active');
                        }
                        
                        // Add staggered animation to child elements
                        const animatedElements = section.querySelectorAll('.fade-in, .slide-up, .scale-in');
                        animatedElements.forEach((element, index) => {
                            setTimeout(() => {
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    } else {
                        // Section is not visible
                        section.classList.remove('visible');
                        if (section.classList.contains('section-transition')) {
                            section.classList.remove('active');
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px'
            });
            
            sections.forEach(section => {
                sectionObserver.observe(section);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            sections.forEach(section => {
                section.classList.add('visible', 'section-loaded');
                if (section.classList.contains('section-transition')) {
                    section.classList.add('active');
                }
            });
        }
    }
    
    // --- Parallax Scrolling ---
    
    function initializeParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('.parallax-bg, .section.parallax');
        const heroBackground = document.querySelector('.hero-background');
        
        if (prefersReducedMotion) {
            // Disable parallax for users who prefer reduced motion
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
            return;
        }
        
        let ticking = false;
        
        function updateParallax() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach(element => {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const speed = element.dataset.parallaxSpeed || 0.5;
                
                // Check if element is in viewport
                if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
                    const yPos = -(scrollTop - elementTop) * speed;
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
            
            // Special parallax effect for hero background
            if (heroBackground) {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    const heroRect = heroSection.getBoundingClientRect();
                    if (heroRect.bottom > 0 && heroRect.top < windowHeight) {
                        const parallaxValue = scrollTop * 0.3;
                        heroBackground.style.transform = `translate3d(0, ${parallaxValue}px, 0)`;
                    }
                }
            }
            
            ticking = false;
        }
        
        function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Throttled scroll event for parallax
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        
        // Initial parallax update
        updateParallax();
    }
    
    // --- Navigation Highlighting ---
    
    function initializeNavigationHighlighting() {
        const navLinks = document.querySelectorAll('.nav-instrument');
        const sections = document.querySelectorAll('.section[id]');
        
        if ('IntersectionObserver' in window) {
            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const sectionId = entry.target.id;
                    const navLink = document.querySelector(`.nav-instrument[href="#${sectionId}"]`);
                    
                    if (entry.isIntersecting) {
                        // Remove active class from all nav links
                        navLinks.forEach(link => link.classList.remove('active'));
                        
                        // Add active class to current section's nav link
                        if (navLink) {
                            navLink.classList.add('active');
                        }
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-20% 0px -70% 0px'
            });
            
            sections.forEach(section => {
                navObserver.observe(section);
            });
        } else {
            // Fallback: highlight based on scroll position
            function updateActiveNavigation() {
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.id;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        const activeLink = document.querySelector(`.nav-instrument[href="#${sectionId}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                });
            }
            
            window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
            updateActiveNavigation();
        }
    }
    
    // --- Loading Animations ---
    
    function initializeLoadingAnimations() {
        // Add loading animations to dynamic content
        const dynamicElements = document.querySelectorAll('[data-loading]');
        
        dynamicElements.forEach(element => {
            // Add loading spinner initially
            element.classList.add('section-loading');
            
            // Simulate loading completion after a delay
            const loadingDelay = parseInt(element.dataset.loading) || 1000;
            setTimeout(() => {
                element.classList.remove('section-loading');
                element.classList.add('section-loaded');
                
                // Trigger fade-in animation
                if (element.classList.contains('fade-in')) {
                    element.style.opacity = '1';
                }
            }, loadingDelay);
        });
        
        // Progressive image loading
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('fade-in');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: load all images immediately
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('fade-in');
            });
        }
    }
    
    // --- Performance Monitoring ---
    
    function initializePerformanceMonitoring() {
        // Monitor animation performance
        let frameCount = 0;
        let lastTime = performance.now();
        let fps = 60;
        
        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust animation quality based on performance
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                    console.warn('Low performance detected, reducing animation complexity');
                } else if (fps > 50) {
                    document.body.classList.remove('low-performance');
                }
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Start FPS monitoring
        requestAnimationFrame(measureFPS);
        
        // Monitor memory usage if available
        if (performance.memory) {
            setInterval(() => {
                const memoryInfo = performance.memory;
                const memoryUsage = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
                
                if (memoryUsage > 0.8) {
                    console.warn('High memory usage detected:', memoryUsage);
                    // Could trigger cleanup or reduce animation complexity
                }
            }, 10000); // Check every 10 seconds
        }
        
        // Performance observer for long tasks
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', entry.duration + 'ms');
                        }
                    });
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // PerformanceObserver not supported or longtask not available
            }
        }
    }
    
    // --- Utility Functions ---
    
    // Detect if user prefers reduced motion
    function respectsReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Optimize animations based on device capabilities
    function optimizeForDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
        
        if (isMobile || isLowEndDevice) {
            document.body.classList.add('low-performance');
        }
    }
    
    // Initialize device optimizations
    optimizeForDevice();
    
    // Handle visibility change to pause animations when tab is not active
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is hidden
            document.body.classList.add('animations-paused');
        } else {
            // Resume animations when tab becomes visible
            document.body.classList.remove('animations-paused');
        }
    });
    



    // --- Section Transitions and Animations ---
    
    function initializeSectionTransitions() {
        if (prefersReducedMotion) return;
        
        const sections = document.querySelectorAll('.section');
        
        // Create intersection observer for section visibility
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger section transition effect
                    if (entry.target.classList.contains('section-transition')) {
                        entry.target.classList.add('active');
                    }
                    
                    // Add loading animation classes
                    const elements = entry.target.querySelectorAll('.section-header, .terminal-summary, .flight-status-board, .departure-board, .flight-schedule-board, .gate-assignment-board');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('fade-in');
                        }, index * 200);
                    });
                    
                    // Add scale-in animation to cards and boards
                    const cards = entry.target.querySelectorAll('.highlight-item, .status-item, .gate-row');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('scale-in');
                        }, index * 100 + 300);
                    });
                } else {
                    // Optional: Remove visible class when out of view for re-animation
                    // entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    function initializeParallaxScrolling() {
        if (prefersReducedMotion) return;
        
        const parallaxElements = document.querySelectorAll('.hero-background, .parallax-bg');
        let ticking = false;
        let lastScrollY = 0;
        
        // Add will-change property for better performance
        parallaxElements.forEach(element => {
            element.style.willChange = 'transform';
        });
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const scrollDelta = scrolled - lastScrollY;
            
            // Only update if scroll position changed significantly
            if (Math.abs(scrollDelta) < 1) {
                ticking = false;
                return;
            }
            
            parallaxElements.forEach((element, index) => {
                if (element && element.style) {
                    // Different parallax speeds for different elements
                    const speed = index === 0 ? -0.3 : -0.5;
                    const rate = scrolled * speed;
                    element.style.transform = `translate3d(0, ${rate}px, 0)`;
                }
            });
            
            lastScrollY = scrolled;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Use passive scroll listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Clean up will-change on animation end
        window.addEventListener('beforeunload', () => {
            parallaxElements.forEach(element => {
                if (element && element.style) {
                    element.style.willChange = 'auto';
                }
            });
        });
    }
    
    function initializeNavigationHighlighting() {
        const navLinks = document.querySelectorAll('.nav-instrument');
        const sections = document.querySelectorAll('.section');
        const navPanel = document.querySelector('.nav-panel');
        
        // Navigation highlighting observer
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.6,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        sections.forEach(section => {
            navObserver.observe(section);
        });
        
        // Navigation panel scroll effect
        let lastScrollTop = 0;
        const scrollHandler = throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navPanel.classList.add('scrolled');
            } else {
                navPanel.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        }, 16);
        
        window.addEventListener('scroll', scrollHandler);
    }
    
    function initializeLoadingAnimations() {
        // Add loading states to dynamic content
        const dynamicElements = document.querySelectorAll('.flip-text, .status-text, .countdown-value');
        
        dynamicElements.forEach(element => {
            element.classList.add('section-loading');
        });
        
        // Progressive loading animation
        const loadingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add staggered loading animations
                    setTimeout(() => {
                        element.classList.remove('section-loading');
                        element.classList.add('section-loaded', 'slide-up');
                    }, Math.random() * 500); // Random delay for natural feel
                    
                    loadingObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        dynamicElements.forEach(element => {
            loadingObserver.observe(element);
        });
        
        // Add GPU acceleration to animated elements
        const animatedElements = document.querySelectorAll('.flip-board, .status-indicator, .countdown-timer, .aircraft, .cloud');
        animatedElements.forEach(element => {
            element.classList.add('gpu-accelerated');
        });
    }
    
    // Performance monitoring and optimization
    function optimizeAnimationPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        let fps = 60;
        let performanceMode = 'high';
        
        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Adaptive performance optimization
                if (fps < 30 && performanceMode !== 'low') {
                    performanceMode = 'low';
                    document.body.classList.add('low-performance');
                    console.log('Switching to low performance mode (FPS:', fps, ')');
                    
                    // Reduce animation complexity
                    const heavyAnimations = document.querySelectorAll('.cloud, .aircraft');
                    heavyAnimations.forEach(element => {
                        element.style.animationDuration = '120s';
                        element.style.opacity = '0.05';
                    });
                    
                    // Disable parallax on low-end devices
                    const parallaxElements = document.querySelectorAll('.parallax-bg');
                    parallaxElements.forEach(element => {
                        element.style.transform = 'none';
                        element.style.willChange = 'auto';
                    });
                    
                } else if (fps > 50 && performanceMode !== 'high') {
                    performanceMode = 'high';
                    document.body.classList.remove('low-performance');
                    console.log('Switching to high performance mode (FPS:', fps, ')');
                    
                    // Restore full animations
                    const heavyAnimations = document.querySelectorAll('.cloud, .aircraft');
                    heavyAnimations.forEach(element => {
                        element.style.animationDuration = '';
                        element.style.opacity = '';
                    });
                }
                
                // Log performance metrics in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log(`FPS: ${fps}, Performance Mode: ${performanceMode}`);
                }
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Start FPS monitoring only if not in reduced motion mode
        if (!prefersReducedMotion && 'requestAnimationFrame' in window) {
            requestAnimationFrame(measureFPS);
        }
        
        // Battery API optimization (if available)
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 || !battery.charging) {
                    document.body.classList.add('low-performance');
                    console.log('Low battery detected, enabling power saving mode');
                }
            });
        }
        
        // Network-aware optimizations
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('low-performance');
                console.log('Slow network detected, reducing animations');
            }
        }
    }
    
    // Initialize performance monitoring
    optimizeAnimationPerformance();
    
    // --- Navigation Initialization ---
    
    function initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        const navLinks = document.querySelectorAll('.nav-instrument');
        
        // Mobile navigation toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navInstruments.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    navToggle?.classList.remove('active');
                    navInstruments?.classList.remove('active');
                    
                    // Smooth scroll to section with offset for fixed nav
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Add transition effect
                    targetSection.style.transition = 'all 0.3s ease';
                    targetSection.style.transform = 'scale(1.01)';
                    
                    setTimeout(() => {
                        targetSection.style.transform = 'scale(1)';
                        setTimeout(() => {
                            targetSection.style.transition = '';
                        }, 300);
                    }, 100);
                }
            });
        });
        
        // Keyboard navigation support
        navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }


    // --- UTC Clock Functionality ---

    const clockContainer = document.getElementById('utc-clock');
    if (clockContainer) {
        const timeString = '00:00:00';
        const clockDigits = timeString.split('').map(char => {
            const digit = createLetter(char);
            clockContainer.appendChild(digit);
            return digit;
        });

        function updateClock() {
            const now = new Date();
            const hours = String(now.getUTCHours()).padStart(2, '0');
            const minutes = String(now.getUTCMinutes()).padStart(2, '0');
            const seconds = String(now.getUTCSeconds()).padStart(2, '0');
            const newTimeString = `${hours}:${minutes}:${seconds}`;

            newTimeString.split('').forEach((char, index) => {
                flip(clockDigits[index], char);
            });
        }

        setInterval(updateClock, 1000);
        updateClock(); // Initial call
    }

    // Navigation Functions
    function initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        const navLinks = document.querySelectorAll('.nav-instrument');
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navInstruments.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    navToggle.classList.remove('active');
                    navInstruments.classList.remove('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active navigation state
                    updateActiveNavigation(link);
                }
            });
        });
        
        // Update navigation on scroll
        window.addEventListener('scroll', throttle(updateNavigationOnScroll, 100));
        
        // Initialize active navigation
        updateNavigationOnScroll();
    }
    
    function updateActiveNavigation(activeLink) {
        document.querySelectorAll('.nav-instrument').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    function updateNavigationOnScroll() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-instrument');
        const scrollPosition = window.scrollY + 100; // Offset for fixed nav
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const correspondingLink = document.querySelector(`[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Utility function for throttling scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navPanel = document.querySelector('.nav-panel');
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        
        if (!navPanel.contains(e.target) && navInstruments.classList.contains('active')) {
            navToggle.classList.remove('active');
            navInstruments.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const navToggle = document.getElementById('nav-toggle');
        const navInstruments = document.querySelector('.nav-instruments');
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navInstruments.classList.remove('active');
        }
    });
});
// ===== CONTACT SECTION FUNCTIONALITY =====

// Initialize Contact Section
function initializeContactSection() {
    updateFormTimestamp();
    setupContactForm();
    
    // Update timestamp every minute
    setInterval(updateFormTimestamp, 60000);
}

// Update Form Timestamp
function updateFormTimestamp() {
    const timestampElement = document.getElementById('form-timestamp');
    if (timestampElement) {
        const now = new Date();
        const utcTime = now.toISOString().substr(11, 8);
        timestampElement.textContent = `FILED: ${utcTime} UTC`;
    }
}

// Setup Contact Form Functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Form submission handler
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form reset handler
    const resetButton = contactForm.querySelector('.reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', handleFormReset);
    }
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('.field-input, .field-select, .field-textarea');
    formFields.forEach(field => {
        field.addEventListener('input', validateField);
        field.addEventListener('blur', validateField);
    });
}

// Handle Form Submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonStatus = submitButton.querySelector('.button-status');
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    if (!validateAllFields(event.target)) {
        showFormMessage('VALIDATION FAILED - CHECK ALL FIELDS', 'error');
        return;
    }
    
    // Update button state
    submitButton.disabled = true;
    buttonText.textContent = 'FILING...';
    buttonStatus.textContent = 'PROCESSING';
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Success state
        buttonText.textContent = 'FLIGHT PLAN FILED';
        buttonStatus.textContent = 'CONFIRMED';
        submitButton.style.background = 'var(--success-green)';
        submitButton.style.color = 'var(--secondary-bg)';
        
        showFormMessage('FLIGHT PLAN SUCCESSFULLY FILED - CONTACT RECEIVED', 'success');
        
        // Log form data (replace with actual submission)
        console.log('Contact Form Submitted:', data);
        
        // Reset form after delay
        setTimeout(() => {
            event.target.reset();
            resetFormState(submitButton, buttonText, buttonStatus);
            clearFormMessage();
        }, 3000);
        
    }, 2000);
}

// Handle Form Reset
function handleFormReset(event) {
    event.preventDefault();
    
    const form = event.target.closest('form');
    const resetButton = event.target;
    const buttonText = resetButton.querySelector('.button-text');
    const buttonStatus = resetButton.querySelector('.button-status');
    
    // Update button state
    buttonText.textContent = 'CLEARING...';
    buttonStatus.textContent = 'PROCESSING';
    resetButton.style.opacity = '0.7';
    
    setTimeout(() => {
        form.reset();
        clearAllValidationStates(form);
        clearFormMessage();
        
        // Reset button state
        buttonText.textContent = 'CLEAR FORM';
        buttonStatus.textContent = 'STANDBY';
        resetButton.style.opacity = '1';
        
        showFormMessage('FORM CLEARED - READY FOR NEW INPUT', 'info');
        
        setTimeout(clearFormMessage, 2000);
    }, 500);
}

// Validate Individual Field
function validateField(event) {
    const field = event.target;
    const fieldContainer = field.closest('.form-field');
    const indicator = fieldContainer.querySelector('.field-indicator');
    
    if (!indicator) return;
    
    let isValid = false;
    
    switch (field.type) {
        case 'email':
            isValid = field.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
            break;
        case 'tel':
            isValid = !field.value || /^[\+]?[1-9][\d]{0,15}$/.test(field.value.replace(/[\s\-\(\)]/g, ''));
            break;
        case 'text':
            isValid = field.value.trim().length >= 2;
            break;
        case 'textarea':
            isValid = field.value.trim().length >= 10;
            break;
        default:
            if (field.tagName === 'SELECT') {
                isValid = field.value !== '';
            } else {
                isValid = field.value.trim() !== '';
            }
    }
    
    // Update indicator
    if (field.value === '') {
        indicator.style.background = 'var(--text-secondary)';
        indicator.style.boxShadow = 'none';
    } else if (isValid) {
        indicator.style.background = 'var(--success-green)';
        indicator.style.boxShadow = '0 0 8px var(--success-green)';
    } else {
        indicator.style.background = 'var(--danger-red)';
        indicator.style.boxShadow = '0 0 8px var(--danger-red)';
    }
    
    return isValid;
}

// Validate All Fields
function validateAllFields(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        const isValid = validateField({ target: field });
        if (!isValid) allValid = false;
    });
    
    return allValid;
}

// Clear All Validation States
function clearAllValidationStates(form) {
    const indicators = form.querySelectorAll('.field-indicator');
    indicators.forEach(indicator => {
        indicator.style.background = 'var(--text-secondary)';
        indicator.style.boxShadow = 'none';
    });
}

// Reset Form State
function resetFormState(submitButton, buttonText, buttonStatus) {
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
    submitButton.style.background = 'var(--primary-bg)';
    submitButton.style.color = 'var(--text-primary)';
    buttonText.textContent = 'FILE FLIGHT PLAN';
    buttonStatus.textContent = 'READY';
}

// Show Form Message
function showFormMessage(message, type) {
    // Remove existing message
    clearFormMessage();
    
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 15px 20px;
        margin: 15px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: bold;
        letter-spacing: 1px;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: var(--success-green); color: var(--secondary-bg);' : ''}
        ${type === 'error' ? 'background: var(--danger-red); color: var(--text-primary);' : ''}
        ${type === 'info' ? 'background: var(--warning-amber); color: var(--secondary-bg);' : ''}
    `;
    
    form.appendChild(messageDiv);
}

// Clear Form Message
function clearFormMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Add slideIn animation to CSS if not exists
if (!document.querySelector('#contact-animations')) {
    const style = document.createElement('style');
    style.id = 'contact-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize contact section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeContactSection();
});