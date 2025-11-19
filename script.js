// Passenger narrative data - unique for each passenger
const passengerNarratives = [
    {
        id: 0,
        text: 'This figure sits hunched, clutching something close. Their silhouette trembles slightly, as if cold or afraid.',
        question: 'What do you carry with you on this journey?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'good' },
            { text: 'Regrets I cannot escape', value: 'bad' },
            { text: 'The weight of forgotten promises', value: 'neutral' }
        ]
    },
    {
        id: 1,
        text: 'A figure gazes toward the window, their posture suggesting distant thoughts.',
        question: 'What do you see when you look outside?',
        choices: [
            { text: 'Possibilities waiting to unfold', value: 'good' },
            { text: 'Everything slipping away', value: 'bad' },
            { text: 'The endless passage of time', value: 'neutral' }
        ]
    },
    {
        id: 2,
        text: 'This passenger sits perfectly still, as if frozen in a moment long past.',
        question: 'What memory holds you here?',
        choices: [
            { text: 'A moment of connection I wish to relive', value: 'good' },
            { text: 'The last time I felt anything at all', value: 'bad' },
            { text: 'A choice I made that I cannot undo', value: 'neutral' }
        ]
    },
    {
        id: 3,
        text: 'A figure reaches toward the aisle, their hand suspended in empty air.',
        question: 'What are you reaching for?',
        choices: [
            { text: 'Someone who might reach back', value: 'good' },
            { text: 'Nothing—just habit', value: 'bad' },
            { text: 'Something I once knew', value: 'neutral' }
        ]
    },
    {
        id: 4,
        text: 'This silhouette seems to breathe in rhythm with the train\'s movement.',
        question: 'Where does this journey lead?',
        choices: [
            { text: 'Toward something new', value: 'good' },
            { text: 'Nowhere—it never did', value: 'bad' },
            { text: 'It doesn\'t matter anymore', value: 'neutral' }
        ]
    },
    {
        id: 5,
        text: 'A figure leans against the seat, their form partially obscured by shadow.',
        question: 'What truth do you carry in silence?',
        choices: [
            { text: 'That light exists even in darkness', value: 'good' },
            { text: 'That I am already lost', value: 'bad' },
            { text: 'That some things cannot be spoken', value: 'neutral' }
        ]
    }
];

// Game state
const passengerBrightness = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const interactedWith = new Set();
let choiceScores = { good: 0, bad: 0, neutral: 0 };

// Canvas setup
const c = document.getElementById("scene");
const ctx = c.getContext("2d");

// Draw the train cabin using EXACT code from user's HTML
function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    // Colors extracted from the image
    const wall = "#3f415e";
    const darkerWall = "#2d2f4a";
    const bench = "#15172d";
    const metal = "#0d0d0d";
    const light = "#c7c7aa";

    // Background walls
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, c.width, c.height);

    // Side angled walls (diagonals)
    ctx.fillStyle = darkerWall;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 900);
    ctx.lineTo(800, 450);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1600, 0);
    ctx.lineTo(1600, 900);
    ctx.lineTo(800, 450);
    ctx.closePath();
    ctx.fill();

    // Floor
    ctx.fillStyle = "#3d3f5a";
    ctx.fillRect(0, 450, 1600, 450);

    // Benches
    ctx.fillStyle = bench;
    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.lineTo(800, 650);
    ctx.lineTo(800, 900);
    ctx.lineTo(0, 900);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1600, 450);
    ctx.lineTo(800, 650);
    ctx.lineTo(800, 900);
    ctx.lineTo(1600, 900);
    ctx.closePath();
    ctx.fill();

    // Vertical poles
    ctx.strokeStyle = metal;
    ctx.lineWidth = 10;

    const poleXs = [230, 430, 630, 970, 1170, 1370];
    poleXs.forEach(x => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 900);
        ctx.stroke();
    });

    // Angled ceiling rails
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1600, 450);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1600, 0);
    ctx.lineTo(0, 450);
    ctx.stroke();

    // Ceiling lights
    const lights = [
        { x: 800, y: 90, r: 65 },
        { x: 800, y: 200, r: 55 },
        { x: 800, y: 310, r: 45 },
        { x: 800, y: 410, r: 25 }
    ];

    ctx.fillStyle = light;
    lights.forEach(l => {
        ctx.beginPath();
        ctx.ellipse(l.x, l.y, l.r, l.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
    });

    // Back door
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(760, 350);
    ctx.lineTo(840, 350);
    ctx.lineTo(840, 550);
    ctx.lineTo(760, 550);
    ctx.closePath();
    ctx.fill();

    // Door light dot
    ctx.fillStyle = "#e8e6a5";
    ctx.beginPath();
    ctx.arc(800, 460, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw passengers with dynamic brightness
    // Left side
    passenger(180, 600, 1.1, 0.1, passengerBrightness[0]);
    passenger(400, 550, 0.7, 0.1, passengerBrightness[1]);
    passenger(615, 520, 0.45, 0, passengerBrightness[2]);

    // Right side
    passenger(1420, 600, 1.1, -0.1, passengerBrightness[3]);
    passenger(1200, 550, 0.7, -0.1, passengerBrightness[4]);
    passenger(985, 520, 0.45, 0, passengerBrightness[5]);
}

// Function to draw simplified passengers with brightness control
function passenger(x, y, scale = 1, lean = 0, brightness = 0.5) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(lean);

    // Calculate color based on brightness (0 = dark, 1 = light)
    const baseGray = Math.floor(80 + (brightness * 175)); // 80-255 range
    const figureColor = `rgb(${baseGray}, ${baseGray}, ${baseGray})`;

    // head
    ctx.fillStyle = figureColor;
    ctx.beginPath();
    ctx.arc(0, -120, 35, 0, Math.PI * 2);
    ctx.fill();

    // body
    ctx.beginPath();
    ctx.moveTo(-20, -80);
    ctx.lineTo(20, -80);
    ctx.lineTo(40, 80);
    ctx.lineTo(-40, 80);
    ctx.closePath();
    ctx.fill();

    // legs
    ctx.beginPath();
    ctx.moveTo(-20, 80);
    ctx.lineTo(-5, 160);
    ctx.lineTo(15, 160);
    ctx.lineTo(5, 80);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// Setup hover interactions
function setupPassengerInteractions() {
    passengerNarratives.forEach((narrative, index) => {
        const zone = document.getElementById(`passenger-${index}`);

        zone.addEventListener('mouseenter', (e) => {
            if (!interactedWith.has(index)) {
                showDialogue(narrative, e.clientX, e.clientY);
            }
        });

        zone.addEventListener('mouseleave', () => {
            if (!interactedWith.has(index)) {
                hideDialogue();
            }
        });
    });
}

// Show dialogue bubble
function showDialogue(narrative, mouseX, mouseY) {
    const bubble = document.getElementById('dialogue-bubble');
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueQuestion = document.getElementById('dialogue-question');
    const choicesContainer = document.getElementById('choices-container');

    dialogueText.textContent = narrative.text;
    dialogueQuestion.textContent = narrative.question;

    // Clear and create choice buttons
    choicesContainer.innerHTML = '';
    narrative.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => handleChoice(narrative.id, choice.value);
        choicesContainer.appendChild(btn);
    });

    // Position bubble near mouse
    bubble.style.left = Math.min(mouseX + 20, window.innerWidth - 420) + 'px';
    bubble.style.top = Math.min(mouseY - 50, window.innerHeight - 300) + 'px';
    bubble.classList.add('visible');
}

// Hide dialogue bubble
function hideDialogue() {
    const bubble = document.getElementById('dialogue-bubble');
    bubble.classList.remove('visible');
}

// Handle choice selection
function handleChoice(passengerId, choiceValue) {
    // Mark passenger as interacted
    interactedWith.add(passengerId);

    // Track choice
    choiceScores[choiceValue]++;

    // Update passenger brightness
    if (choiceValue === 'good') {
        passengerBrightness[passengerId] = Math.min(1.0, passengerBrightness[passengerId] + 0.35);
    } else if (choiceValue === 'bad') {
        passengerBrightness[passengerId] = Math.max(0.15, passengerBrightness[passengerId] - 0.35);
    }
    // neutral doesn't change individual brightness

    // Redraw cabin with new passenger brightness
    draw();

    // Update overall cabin brightness
    updateCabinBrightness();

    // Hide dialogue
    hideDialogue();

    // Check if all passengers interacted with
    if (interactedWith.size === 6) {
        setTimeout(showEnding, 1000);
    }
}

// Update overall cabin brightness based on cumulative choices
function updateCabinBrightness() {
    const total = choiceScores.good + choiceScores.bad + choiceScores.neutral;
    if (total === 0) return;

    const goodPercent = choiceScores.good / total;
    const badPercent = choiceScores.bad / total;

    const cabin = document.getElementById('train-cabin');
    cabin.classList.remove('env-lighter-1', 'env-lighter-2', 'env-lighter-3',
                           'env-darker-1', 'env-darker-2', 'env-darker-3');

    if (goodPercent > 0.6) {
        cabin.classList.add('env-lighter-3');
    } else if (goodPercent > 0.4) {
        cabin.classList.add('env-lighter-2');
    } else if (goodPercent > 0.2) {
        cabin.classList.add('env-lighter-1');
    } else if (badPercent > 0.6) {
        cabin.classList.add('env-darker-3');
    } else if (badPercent > 0.4) {
        cabin.classList.add('env-darker-2');
    } else if (badPercent > 0.2) {
        cabin.classList.add('env-darker-1');
    }
}

// Show ending based on dominant choice type
function showEnding() {
    let dominantPath = 'neutral';
    let maxScore = choiceScores.neutral;

    if (choiceScores.good > maxScore) {
        dominantPath = 'good';
        maxScore = choiceScores.good;
    }
    if (choiceScores.bad > maxScore) {
        dominantPath = 'bad';
    }

    const endings = {
        good: 'Light begins to fill the cabin. The passengers around you seem to glow with warmth. You have brought illumination to the darkness. Your journey continues with hope.',
        bad: 'The darkness deepens. All light fades from existence. You become one with the void that surrounds you. The cabin grows cold and silent.',
        neutral: 'You exist in the space between light and darkness. Neither claims you completely. The journey continues, balanced on the edge of shadow and light.'
    };

    document.getElementById('ending-text').textContent = endings[dominantPath];
    document.getElementById('ending-overlay').classList.add('visible');
}

// Restart the experience
function restart() {
    // Reset all state
    interactedWith.clear();
    choiceScores = { good: 0, bad: 0, neutral: 0 };
    passengerBrightness.fill(0.5);

    // Reset visual states
    const cabin = document.getElementById('train-cabin');
    cabin.classList.remove('env-lighter-1', 'env-lighter-2', 'env-lighter-3',
                           'env-darker-1', 'env-darker-2', 'env-darker-3');

    document.getElementById('ending-overlay').classList.remove('visible');

    // Redraw cabin
    draw();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    draw();
    setupPassengerInteractions();
});
