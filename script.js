document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // --- Pilot Data ---
    const pilotProfile = {
        personal: {
            name: "HARRY",
            title: "First Officer | Boeing 777",
            location: "Seoul, South Korea",
            summary: "A results-driven and safety-focused airline pilot with over 4,000 hours of flight time and a strong background in international operations. Type-rated on the Boeing 777 and experienced in long-haul routes across the Pacific.",
            contact: {
                email: "harry@email.com",
                linkedin: "linkedin.com/in/harry"
            },
            qualifications: [
                "Airline Transport Pilot (ATP)",
                "Boeing 777 Type Rating",
                "Class 1 Medical",
                "International Operations"
            ]
        },
        hero: {
            flight: "HP2024",
            destination: "YOUR COMPANY",
            gate: "HIRE",
            status: "APPLYING"
        },
        experience: {
            totalHours: 4250,
            aircraftTypes: ["B777", "A320", "C172"],
            specializations: ["Long-Haul Flights", "Trans-Pacific Routes", "Crew Resource Management"],
            routes: ["ICN-LAX", "ICN-JFK", "ICN-LHR", "ICN-CDG", "ICN-SYD"]
        },
        certifications: {
            licenses: [
                { type: "Airline Transport Pilot", number: "123456789", expiration: "2025-12-31" }
            ],
            ratings: ["Boeing 777", "Instrument Rating"],
            medical: { class: "Class 1", expiration: "2025-06-30" }
        },
        career: [
            { company: "Korean Air", position: "First Officer", startDate: "2020", endDate: "Present", achievements: ["Operated over 200 international flights.", "Completed recurrent training with excellent marks."] },
            { company: "Asiana Airlines", position: "First Officer", startDate: "2018", endDate: "2020", achievements: ["Flew A320 on regional routes.", "Assisted in fuel-saving initiatives."] },
            { company: "Flight School", position: "Flight Instructor", startDate: "2016", endDate: "2018", achievements: ["Trained over 20 students for their private pilot license."] }
        ]
    };

    // --- Core Flip Functionality ---
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

    // --- UTC Clock ---
    function setupClock() {
        const clockContainer = document.getElementById('utc-clock');
        if (!clockContainer) return;
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
    }

    // --- Populate Sections ---
    function populateHero() {
        document.querySelector('.header-title').textContent = `${pilotProfile.personal.name} - ${pilotProfile.personal.title}`;

        const flipBoard = document.getElementById('flip-board');
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `
            <div class="flight"><span>${pilotProfile.hero.flight}</span></div>
            <div class="time"><span>NOW</span></div>
            <div class="destination"><span>${pilotProfile.hero.destination}</span></div>
            <div class="gate"><span>${pilotProfile.hero.gate}</span></div>
            <div class="status"><span>${pilotProfile.hero.status}</span></div>
        `;
        flipBoard.appendChild(row);

        row.querySelectorAll('span').forEach(span => {
            animateText(span, span.textContent);
        });
    }

    function populateAbout() {
        document.getElementById('professional-summary').textContent = pilotProfile.personal.summary;
        const qualificationsList = document.getElementById('key-qualifications');
        pilotProfile.personal.qualifications.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            qualificationsList.appendChild(li);
        });
        const contactGrid = document.getElementById('contact-info');
        contactGrid.innerHTML = `
            <p><strong>Email:</strong> ${pilotProfile.personal.contact.email}</p>
            <p><strong>LinkedIn:</strong> <a href="https://${pilotProfile.personal.contact.linkedin}" target="_blank">${pilotProfile.personal.contact.linkedin}</a></p>
        `;
    }

    function populateExperience() {
        document.getElementById('total-hours').textContent = pilotProfile.experience.totalHours;
        const aircraftTypesContainer = document.getElementById('aircraft-types');
        pilotProfile.experience.aircraftTypes.forEach(type => {
            const typeSpan = document.createElement('span');
            animateText(typeSpan, type);
            aircraftTypesContainer.appendChild(typeSpan);
        });

        const specializationsList = document.getElementById('specializations');
        pilotProfile.experience.specializations.forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            specializationsList.appendChild(li);
        });

        const routesDisplay = document.getElementById('routes-display');
        pilotProfile.experience.routes.forEach(route => {
            const routeSpan = document.createElement('span');
            routeSpan.textContent = route;
            routesDisplay.appendChild(routeSpan);
        });
    }

    function populateCertifications() {
        const certList = document.getElementById('certifications-list');
        pilotProfile.certifications.licenses.forEach(l => {
            const item = document.createElement('div');
            item.className = 'cert-item';
            item.innerHTML = `
                <h4>${l.type}</h4>
                <p>Number: ${l.number}</p>
                <p>Expires: ${l.expiration}</p>
            `;
            certList.appendChild(item);
        });
        const medicalItem = document.createElement('div');
        medicalItem.className = 'cert-item';
        medicalItem.innerHTML = `
            <h4>Medical Certificate</h4>
            <p>Class: ${pilotProfile.certifications.medical.class}</p>
            <p>Expires: ${pilotProfile.certifications.medical.expiration}</p>
        `;
        certList.appendChild(medicalItem);
    }

    function populateCareer() {
        const timeline = document.getElementById('career-timeline');
        pilotProfile.career.forEach(job => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-content">
                    <h3>${job.position} - ${job.company}</h3>
                    <span class="timeline-date">${job.startDate} - ${job.endDate}</span>
                    <ul>
                        ${job.achievements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
            `;
            timeline.appendChild(item);
        });
    }


    function populateContact() {
        const contactGrid = document.getElementById('contact-methods');
        contactGrid.innerHTML = `
            <div>
                <h4>Location</h4>
                <p>${pilotProfile.personal.location}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p><a href="mailto:${pilotProfile.personal.contact.email}">${pilotProfile.personal.contact.email}</a></p>
            </div>
            <div>
                <h4>LinkedIn</h4>
                <p><a href="https://${pilotProfile.personal.contact.linkedin}" target="_blank">${pilotProfile.personal.contact.linkedin}</a></p>
            </div>
        `;
    }


    // --- Initial Population ---
    setupClock();
    populateHero();
    populateAbout();
    populateExperience();
    populateCertifications();
    populateCareer();
    populateContact();
});
