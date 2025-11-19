// Narrative Data
const narrative = [
    {
        id: 'intro',
        text: 'This cabin has collapsed into darkness',
        question: '',
        choices: null
    },
    {
        id: 'scene1',
        text: 'You find yourself in a train cabin, surrounded by shadowy figures. The air is cold and heavy with silence.',
        question: 'What do you feel in this moment?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'good' },
            { text: 'Regrets I cannot escape', value: 'bad' },
            { text: 'The weight of forgotten promises', value: 'neutral' }
        ]
    },
    {
        id: 'scene2',
        text: 'A figure sits hunched nearby, clutching something close. Their silhouette trembles slightly.',
        question: 'What do you carry with you on this journey?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'good' },
            { text: 'Regrets I cannot escape', value: 'bad' },
            { text: 'The weight of forgotten promises', value: 'neutral' }
        ]
    },
    {
        id: 'scene3',
        text: 'The cabin seems to respond to your presence. Shadows shift along the walls.',
        question: 'How do you respond to the darkness?',
        choices: [
            { text: 'I seek to bring light to others', value: 'good' },
            { text: 'I embrace the void', value: 'bad' },
            { text: 'I observe and accept what is', value: 'neutral' }
        ]
    },
    {
        id: 'scene4',
        text: 'Other passengers begin to stir. Some look toward you, their faces obscured by shadow.',
        question: 'What truth do you speak to them?',
        choices: [
            { text: 'We can find our way together', value: 'good' },
            { text: 'We are already lost', value: 'bad' },
            { text: 'Each must find their own path', value: 'neutral' }
        ]
    },
    {
        id: 'scene5',
        text: 'The train continues through the endless night. Your choices have shaped the journey.',
        question: 'What will you remember from this passage?',
        choices: [
            { text: 'The warmth of connection', value: 'good' },
            { text: 'The cold of isolation', value: 'bad' },
            { text: 'The journey itself', value: 'neutral' }
        ]
    }
];

const endings = {
    good: {
        text: 'Light begins to fill the cabin. The passengers around you seem to glow with warmth. You have brought illumination to the darkness.'
    },
    bad: {
        text: 'The darkness deepens. All light fades from existence. You become one with the void that surrounds you.'
    },
    neutral: {
        text: 'You exist in the space between light and darkness. Neither claims you completely. The journey continues.'
    }
};

// Game State
let currentSceneIndex = 0;
let choiceScores = { good: 0, bad: 0, neutral: 0 };

// Passenger brightness tracking (0 = darkest, 1 = brightest)
let passengerBrightness = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

// Canvas setup
const c = document.getElementById("scene");
const ctx = c.getContext("2d");

// Draw the train cabin (using exact code from user's HTML)
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

    // Calculate color based on brightness (darker to lighter)
    const baseGray = Math.floor(100 + (brightness * 155)); // 100-255 range
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

// DOM Elements
const narrativeText = document.getElementById('narrative-text');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const continueBtn = document.getElementById('continue-btn');
const trainCabin = document.getElementById('train-cabin');

// Show Scene
function showScene(scene) {
    narrativeText.textContent = scene.text;
    questionText.textContent = scene.question || '';

    if (scene.choices) {
        showChoices(scene.choices);
        continueBtn.classList.add('hidden');
    } else {
        choicesContainer.classList.add('hidden');
        continueBtn.classList.remove('hidden');
    }

    updateEnvironmentByChoices();
}

// Show Choices
function showChoices(choices) {
    choicesContainer.innerHTML = '';

    choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleChoice(choice));
        choicesContainer.appendChild(btn);
    });

    choicesContainer.classList.remove('hidden');
}

// Handle Choice
function handleChoice(choice) {
    choiceScores[choice.value]++;

    // Update passenger brightness based on choice
    // Each scene corresponds to a passenger (scenes 1-6 map to passengers 0-5)
    const passengerIndex = currentSceneIndex - 1; // Subtract 1 because intro is scene 0

    if (passengerIndex >= 0 && passengerIndex < passengerBrightness.length) {
        if (choice.value === 'good') {
            passengerBrightness[passengerIndex] = Math.min(1.0, passengerBrightness[passengerIndex] + 0.3);
        } else if (choice.value === 'bad') {
            passengerBrightness[passengerIndex] = Math.max(0.1, passengerBrightness[passengerIndex] - 0.3);
        }
        // Neutral doesn't change brightness
        draw(); // Redraw with new brightness
    }

    currentSceneIndex++;

    if (currentSceneIndex < narrative.length) {
        showScene(narrative[currentSceneIndex]);
    } else {
        showEnding();
    }
}

// Handle Continue
function handleContinue() {
    if (continueBtn.textContent === 'Restart') {
        restart();
        return;
    }

    currentSceneIndex++;

    if (currentSceneIndex < narrative.length) {
        showScene(narrative[currentSceneIndex]);
    } else {
        showEnding();
    }
}

// Show Ending
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

    const ending = endings[dominantPath];

    narrativeText.textContent = ending.text;
    questionText.textContent = '';
    choicesContainer.classList.add('hidden');

    continueBtn.textContent = 'Restart';
    continueBtn.classList.remove('hidden');
}

// Update Environment
function updateEnvironmentByChoices() {
    const total = choiceScores.good + choiceScores.bad + choiceScores.neutral;
    if (total === 0) return;

    const goodPercent = choiceScores.good / total;
    const badPercent = choiceScores.bad / total;

    trainCabin.classList.remove(
        'env-lighter-1', 'env-lighter-2', 'env-lighter-3',
        'env-darker-1', 'env-darker-2', 'env-darker-3'
    );

    if (goodPercent > 0.6) {
        trainCabin.classList.add('env-lighter-3');
    } else if (goodPercent > 0.4) {
        trainCabin.classList.add('env-lighter-2');
    } else if (goodPercent > 0.2) {
        trainCabin.classList.add('env-lighter-1');
    } else if (badPercent > 0.6) {
        trainCabin.classList.add('env-darker-3');
    } else if (badPercent > 0.4) {
        trainCabin.classList.add('env-darker-2');
    } else if (badPercent > 0.2) {
        trainCabin.classList.add('env-darker-1');
    }
}

// Restart
function restart() {
    currentSceneIndex = 0;
    choiceScores = { good: 0, bad: 0, neutral: 0 };
    passengerBrightness = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    continueBtn.textContent = 'Continue';

    draw();

    trainCabin.classList.remove(
        'env-lighter-1', 'env-lighter-2', 'env-lighter-3',
        'env-darker-1', 'env-darker-2', 'env-darker-3'
    );

    showScene(narrative[0]);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    draw();
    showScene(narrative[0]);
    continueBtn.addEventListener('click', handleContinue);
});
