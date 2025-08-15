document.addEventListener('DOMContentLoaded', () => {
    const destinations = document.querySelectorAll('.destination > span:first-child');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Setup the initial HTML structure for each letter
    destinations.forEach(span => {
        const text = span.textContent.trim();
        span.innerHTML = ''; // Clear original content
        text.split('').forEach(char => {
            if (char === ' ') {
                const space = document.createElement('span');
                space.className = 'letter space';
                span.appendChild(space);
                return;
            }

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
            span.appendChild(letterWrapper);
        });
    });

    const letters = document.querySelectorAll('.letter:not(.space)');

    function flipLetter(letter) {
        if (letter.classList.contains('flipping')) {
            return; // Don't flip a letter that is already flipping
        }

        const currentChar = letter.getAttribute('data-char');
        let nextChar = chars[Math.floor(Math.random() * chars.length)];
        while (nextChar === currentChar) {
            nextChar = chars[Math.floor(Math.random() * chars.length)];
        }

        const topHalf = letter.querySelector('.top');
        const bottomHalf = letter.querySelector('.bottom');

        // Create the flipping elements
        const flipTop = document.createElement('span');
        flipTop.className = 'flip-top';
        flipTop.textContent = currentChar;

        const flipBottom = document.createElement('span');
        flipBottom.className = 'flip-bottom';
        flipBottom.textContent = nextChar;

        letter.appendChild(flipTop);
        letter.appendChild(flipBottom);

        // Start the animation
        letter.classList.add('flipping');
        topHalf.textContent = nextChar; // Set the new character on the static top half

        // Listen for the animation to end
        flipTop.addEventListener('animationend', () => {
            // Clean up the DOM
            bottomHalf.textContent = nextChar;
            letter.setAttribute('data-char', nextChar);
            letter.removeChild(flipTop);
            letter.removeChild(flipBottom);
            letter.classList.remove('flipping');
        }, { once: true });
    }

    // Set an interval to randomly flip letters
    setInterval(() => {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        flipLetter(randomLetter);
    }, 400); // Adjust timing as needed
});
