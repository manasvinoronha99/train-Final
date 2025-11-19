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

// Canvas and rendering
const canvas = document.getElementById('cabin-canvas');
const ctx = canvas.getContext('2d');
let passengers = [];

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCabin();
}

// Draw 1-point perspective train cabin
function drawCabin() {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Clear
    ctx.fillStyle = '#1e2430';
    ctx.fillRect(0, 0, w, h);

    // Vanishing point door at center
    ctx.fillStyle = '#2e3440';
    ctx.fillRect(cx - 40, cy - 80, 80, 120);
    ctx.strokeStyle = '#3a3f48';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 40, cy - 80, 80, 120);

    // Floor (aisle)
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.lineTo(cx + 100, cy + h * 0.15);
    ctx.lineTo(cx - 100, cy + h * 0.15);
    ctx.closePath();
    ctx.fillStyle = '#1a1f28';
    ctx.fill();

    // Ceiling
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(cx + 100, cy - h * 0.15);
    ctx.lineTo(cx - 100, cy - h * 0.15);
    ctx.closePath();
    ctx.fillStyle = '#2a3040';
    ctx.fill();

    // Ceiling lights
    for (let i = 0; i < 6; i++) {
        const lightY = cy - h * 0.15 + (h * 0.3 * i / 5);
        const lightX = cx;
        const lightSize = 40 - (i * 5);

        const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightSize);
        gradient.addColorStop(0, 'rgba(106, 123, 168, 0.6)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(lightX - lightSize, lightY - lightSize/2, lightSize * 2, lightSize);
    }

    // Left seats
    for (let i = 0; i < 3; i++) {
        const depth = 0.8 - (i * 0.2);
        const x = w * (0.15 + i * 0.05);
        const y = h * (0.4 + i * 0.1);
        const size = 60 * depth;

        ctx.fillStyle = '#2e3540';
        ctx.fillRect(x - size/2, y, size, size * 0.8);
    }

    // Right seats
    for (let i = 0; i < 3; i++) {
        const depth = 0.8 - (i * 0.2);
        const x = w * (0.85 - i * 0.05);
        const y = h * (0.4 + i * 0.1);
        const size = 60 * depth;

        ctx.fillStyle = '#2e3540';
        ctx.fillRect(x - size/2, y, size, size * 0.8);
    }

    // Windows
    const windows = [
        { x: 0.1, y: 0.25, w: 70, h: 90 },
        { x: 0.15, y: 0.35, w: 60, h: 80 },
        { x: 0.9, y: 0.25, w: 70, h: 90 },
        { x: 0.85, y: 0.35, w: 60, h: 80 }
    ];

    windows.forEach(win => {
        ctx.fillStyle = '#3e4450';
        ctx.fillRect(w * win.x - win.w/2, h * win.y, win.w, win.h);
        ctx.strokeStyle = '#505865';
        ctx.lineWidth = 2;
        ctx.strokeRect(w * win.x - win.w/2, h * win.y, win.w, win.h);
    });

    // Draw passengers
    passengers.forEach(p => {
        drawPassenger(p.x, p.y, p.scale, p.brightness);
    });
}

// Draw passenger silhouette
function drawPassenger(x, y, scale, brightness) {
    const baseColor = interpolateColor('#4a4f58', '#6a7080', brightness);

    // Head
    const headRadius = 25 * scale;
    const gradient = ctx.createRadialGradient(x, y - 40 * scale, 0, x, y - 40 * scale, headRadius);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, adjustBrightness(baseColor, -0.2));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y - 40 * scale, headRadius, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.ellipse(x, y + 10 * scale, 35 * scale, 50 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
}

function interpolateColor(color1, color2, factor) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function adjustBrightness(color, amount) {
    const rgb = color.match(/\d+/g).map(Number);
    const adjusted = rgb.map(val => Math.max(0, Math.min(255, val + amount * 255)));
    return `rgb(${adjusted[0]}, ${adjusted[1]}, ${adjusted[2]})`;
}

// Initialize passengers
function initPassengers() {
    const w = canvas.width;
    const h = canvas.height;

    passengers = [
        { id: 1, x: w * 0.18, y: h * 0.5, scale: 0.8, brightness: 0.5 },
        { id: 2, x: w * 0.25, y: h * 0.6, scale: 0.6, brightness: 0.5 },
        { id: 3, x: w * 0.82, y: h * 0.5, scale: 0.8, brightness: 0.5 },
        { id: 4, x: w * 0.75, y: h * 0.6, scale: 0.6, brightness: 0.5 },
        { id: 5, x: w * 0.35, y: h * 0.7, scale: 0.4, brightness: 0.5 },
        { id: 6, x: w * 0.65, y: h * 0.7, scale: 0.4, brightness: 0.5 }
    ];
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
    if (currentSceneIndex < passengers.length) {
        if (choice.value === 'good') {
            passengers[currentSceneIndex].brightness = Math.min(0.9, passengers[currentSceneIndex].brightness + 0.25);
        } else if (choice.value === 'bad') {
            passengers[currentSceneIndex].brightness = Math.max(0.15, passengers[currentSceneIndex].brightness - 0.25);
        }
        drawCabin();
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
    continueBtn.textContent = 'Continue';

    initPassengers();
    drawCabin();

    trainCabin.classList.remove(
        'env-lighter-1', 'env-lighter-2', 'env-lighter-3',
        'env-darker-1', 'env-darker-2', 'env-darker-3'
    );

    showScene(narrative[0]);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initPassengers();
    drawCabin();
    showScene(narrative[0]);

    continueBtn.addEventListener('click', handleContinue);
    window.addEventListener('resize', resizeCanvas);
});
