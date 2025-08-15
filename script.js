document.addEventListener('DOMContentLoaded', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const clockChars = '0123456789:';

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

    // --- Destination Text Animation ---

    function animateToFinalChar(letter, finalChar) {
        let cycle = 0;
        const flipCycles = Math.floor(Math.random() * 5) + 3;

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

    document.querySelectorAll('.row .destination > span:first-child, .row .flight > span, .row .time > span, .row .gate > span, .row .status > span').forEach(span => {
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
            setTimeout(() => {
                animateToFinalChar(letterWrapper, char);
            }, index * 100 + Math.random() * 500);
        });
    });

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
});
