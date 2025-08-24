// Simple Professional Pilot Portfolio JavaScript
console.log('🚀 Professional Pilot Portfolio Loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Ready - Initializing...');
    
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initUTCClock();
    initSmoothScrolling();
    initFlipBoard();
    
    console.log('✅ All systems initialized');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('✅ Navigation initialized');
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
    
    console.log('✅ Mobile menu initialized');
}

// Close mobile menu
function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// UTC Clock functionality
function initUTCClock() {
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
        updateClock();
        
        console.log('✅ UTC clock initialized');
    }
}

// Smooth scrolling for all internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Add some visual feedback for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.experience-card, .cert-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Simple error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Flip Board Animation
function initFlipBoard() {
    const flipBoard = document.getElementById('flip-board');
    
    if (flipBoard) {
        // International education data mapped to airport format
        const careerData = [
            {
                flight: "SQ101",
                time: "2005",
                destination: "SINGAPORE",
                gate: "SIN",
                status: "ELEM SCHOOL"
            },
            {
                flight: "KE102",
                time: "2008",
                destination: "KOREA",
                gate: "ICN",
                status: "ELEM SCHOOL"
            },
            {
                flight: "MU103",
                time: "2011",
                destination: "SHANGHAI CHINA",
                gate: "PVG",
                status: "MIDDLE SCHOOL"
            },
            {
                flight: "CX104",
                time: "2014",
                destination: "HONG KONG",
                gate: "HKG",
                status: "HIGH SCHOOL"
            },
            {
                flight: "AA105",
                time: "2017",
                destination: "USA MINNESOTA",
                gate: "MSP",
                status: "COLLEGE"
            },
            {
                flight: "YH106",
                time: "2024",
                destination: "PILOT SCHOOL",
                gate: "GRAD",
                status: "COMPLETED"
            }
        ];
        
        // Create rows with flip animation
        careerData.forEach((data, index) => {
            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'row';
                row.innerHTML = `
                    <div class="flight"><span>${data.flight}</span></div>
                    <div class="time"><span>${data.time}</span></div>
                    <div class="destination"><span>${data.destination}</span></div>
                    <div class="gate"><span>${data.gate}</span></div>
                    <div class="status"><span>${data.status}</span></div>
                `;
                flipBoard.appendChild(row);
                
                // Animate each text field
                row.querySelectorAll('span').forEach(span => {
                    animateText(span, span.textContent);
                });
            }, index * 1000); // Stagger row creation
        });
        
        console.log('✅ Flip board initialized');
    }
}

// Core flip functionality from your example
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

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

    letter.appendChild(flipTop);
    letter.appendChild(flipBottom);
    letter.classList.add('flipping');

    topHalf.textContent = nextChar;

    flipTop.addEventListener('animationend', () => {
        bottomHalf.textContent = nextChar;
        letter.setAttribute('data-char', nextChar);
        letter.removeChild(flipTop);
        letter.removeChild(flipBottom);
        letter.classList.remove('flipping');
        if (callback) callback();
    }, { once: true });
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

function animateText(element, finalString) {
    element.innerHTML = '';
    finalString.split('').forEach((char, index) => {
        if (char === ' ') {
            const space = document.createElement('span');
            space.className = 'letter space';
            element.appendChild(space);
            return;
        }

        const letterWrapper = createLetter(' ');
        element.appendChild(letterWrapper);

        setTimeout(() => {
            let cycle = 0;
            const flipCycles = Math.floor(Math.random() * 5) + 3;

            function flipCycle() {
                cycle++;
                if (cycle >= flipCycles) {
                    flip(letterWrapper, char);
                    return;
                }

                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                flip(letterWrapper, randomChar, flipCycle);
            }

            flipCycle();
        }, index * 100 + Math.random() * 500);
    });
}

// Log when everything is loaded
window.addEventListener('load', function() {
    console.log('🎉 Professional Pilot Portfolio fully loaded!');
});