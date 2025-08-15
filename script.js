document.addEventListener('DOMContentLoaded', () => {
    const destinations = document.querySelectorAll('.destination > span:first-child');

    destinations.forEach(span => {
        const text = span.textContent;
        span.textContent = '';
        text.split('').forEach(char => {
            const letter = document.createElement('div');
            letter.className = 'letter';
            letter.textContent = char;
            span.appendChild(letter);
        });
    });

    const letters = document.querySelectorAll('.letter');

    function flipRandomLetter() {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        randomLetter.classList.add('flip');
        setTimeout(() => {
            randomLetter.classList.remove('flip');
        }, 600); // Corresponds to the animation duration
    }

    setInterval(flipRandomLetter, 200); // Flip a new letter every 200ms
});
