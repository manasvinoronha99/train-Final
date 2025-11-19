// Narrative Structure
const narrative = [
    {
        id: 'intro',
        text: 'This cabin has collapsed into darkness',
        question: '',
        choices: null,
        environment: 'dark',
        flames: []
    },
    {
        id: 'scene1',
        text: 'You find yourself in a train cabin, surrounded by shadowy figures. The air is cold and heavy with silence.',
        question: 'What do you feel in this moment?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'good' },
            { text: 'Regrets I cannot escape', value: 'bad' },
            { text: 'The weight of forgotten promises', value: 'neutral' }
        ],
        environment: 'dark',
        flames: []
    },
    {
        id: 'scene2',
        text: 'A figure sits hunched nearby, clutching something close. Their silhouette trembles slightly, as if cold or afraid.',
        question: 'What do you carry with you on this journey?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'good' },
            { text: 'Regrets I cannot escape', value: 'bad' },
            { text: 'The weight of forgotten promises', value: 'neutral' }
        ],
        environment: null, // Will be determined by choices
        flames: []
    },
    {
        id: 'scene3',
        text: 'The cabin seems to respond to your presence. Shadows shift along the walls.',
        question: 'How do you respond to the darkness?',
        choices: [
            { text: 'I seek to bring light to others', value: 'good' },
            { text: 'I embrace the void', value: 'bad' },
            { text: 'I observe and accept what is', value: 'neutral' }
        ],
        environment: null,
        flames: []
    },
    {
        id: 'scene4',
        text: 'Other passengers begin to stir. Some look toward you, their faces obscured by shadow.',
        question: 'What truth do you speak to them?',
        choices: [
            { text: 'We can find our way together', value: 'good' },
            { text: 'We are already lost', value: 'bad' },
            { text: 'Each must find their own path', value: 'neutral' }
        ],
        environment: null,
        flames: []
    },
    {
        id: 'scene5',
        text: 'The train continues through the endless night. Your choices have shaped the journey.',
        question: 'What will you remember from this passage?',
        choices: [
            { text: 'The warmth of connection', value: 'good' },
            { text: 'The cold of isolation', value: 'bad' },
            { text: 'The journey itself', value: 'neutral' }
        ],
        environment: null,
        flames: []
    }
];

// Ending scenes based on path
const endings = {
    good: {
        text: 'Light begins to fill the cabin. The passengers around you seem to glow with warmth. You have brought illumination to the darkness.',
        environment: 'bright',
        flames: []
    },
    bad: {
        text: 'The darkness deepens. All light fades from existence. You become one with the void that surrounds you.',
        environment: 'darker',
        flames: []
    },
    neutral: {
        text: 'Flames flicker into existence along the cabin walls, casting dancing shadows. Neither light nor darkness claims you completely. You exist in the space between.',
        environment: 'dark',
        flames: ['flame-1', 'flame-2', 'flame-3', 'flame-4']
    }
};

// Game State
let currentSceneIndex = 0;
let choiceScores = {
    good: 0,
    bad: 0,
    neutral: 0
};

// DOM Elements
const trainCabin = document.getElementById('train-cabin');
const narrativeText = document.getElementById('narrative-text');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const continueBtn = document.getElementById('continue-btn');
const dialogueInterface = document.getElementById('dialogue-interface');

// Initialize
function init() {
    showScene(narrative[0]);
    continueBtn.addEventListener('click', handleContinue);
}

// Show Scene
function showScene(scene) {
    // Update text
    narrativeText.textContent = scene.text;
    questionText.textContent = scene.question || '';

    // Update environment if specified
    if (scene.environment) {
        updateEnvironment(scene.environment);
    } else {
        // Dynamically determine environment based on choices so far
        updateEnvironmentByChoices();
    }

    // Update flames
    updateFlames(scene.flames);

    // Show choices or continue button
    if (scene.choices) {
        showChoices(scene.choices);
        continueBtn.classList.add('hidden');
    } else {
        choicesContainer.classList.add('hidden');
        continueBtn.classList.remove('hidden');
    }

    // Add transition effect
    dialogueInterface.classList.add('fade-transition');
    setTimeout(() => {
        dialogueInterface.classList.remove('fade-transition');
    }, 800);
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

// Handle Choice Selection
function handleChoice(choice) {
    // Track the choice
    choiceScores[choice.value]++;

    // Move to next scene
    currentSceneIndex++;

    if (currentSceneIndex < narrative.length) {
        transitionToScene(() => {
            showScene(narrative[currentSceneIndex]);
        });
    } else {
        // Show ending based on choices
        showEnding();
    }
}

// Handle Continue Button
function handleContinue() {
    if (continueBtn.textContent === 'Restart') {
        restart();
        return;
    }

    currentSceneIndex++;

    if (currentSceneIndex < narrative.length) {
        transitionToScene(() => {
            showScene(narrative[currentSceneIndex]);
        });
    } else {
        showEnding();
    }
}

// Show Ending
function showEnding() {
    // Determine which path based on choice scores
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

    updateEnvironment(ending.environment);
    updateFlames(ending.flames);

    continueBtn.textContent = 'Restart';
    continueBtn.classList.remove('hidden');
}

// Update Environment
function updateEnvironment(environment) {
    trainCabin.classList.remove('dark', 'darker', 'bright');

    if (environment) {
        trainCabin.classList.add(environment);
    }
}

// Update Environment Based on Choices
function updateEnvironmentByChoices() {
    const total = choiceScores.good + choiceScores.bad + choiceScores.neutral;

    if (total === 0) {
        updateEnvironment('dark');
        return;
    }

    // Calculate percentages
    const goodPercent = choiceScores.good / total;
    const badPercent = choiceScores.bad / total;

    if (goodPercent > 0.5) {
        // Moving toward light
        updateEnvironment('dark'); // Still dark but getting lighter
        // Add progressive flames for neutral path
        const flamesCount = Math.min(2, Math.floor(choiceScores.neutral * 2));
        const flameIds = [];
        for (let i = 1; i <= flamesCount; i++) {
            flameIds.push(`flame-${i}`);
        }
        updateFlames(flameIds);
    } else if (badPercent > 0.5) {
        // Moving toward darkness
        updateEnvironment('darker');
        updateFlames([]);
    } else {
        // Balanced/neutral
        updateEnvironment('dark');
        // Progressive flames
        const flamesCount = Math.min(4, choiceScores.neutral + 1);
        const flameIds = [];
        for (let i = 1; i <= flamesCount; i++) {
            flameIds.push(`flame-${i}`);
        }
        updateFlames(flameIds);
    }
}

// Update Flames
function updateFlames(activeFlames) {
    const allFlames = document.querySelectorAll('.flame');

    // Hide all flames
    allFlames.forEach(flame => {
        flame.classList.remove('active');
    });

    // Show specified flames
    if (Array.isArray(activeFlames)) {
        activeFlames.forEach(flameClass => {
            const flame = document.querySelector(`.${flameClass}`);
            if (flame) {
                flame.classList.add('active');
            }
        });
    }
}

// Transition Between Scenes
function transitionToScene(callback) {
    dialogueInterface.style.opacity = '0';

    setTimeout(() => {
        callback();
        dialogueInterface.style.opacity = '1';
    }, 400);
}

// Restart
function restart() {
    currentSceneIndex = 0;
    choiceScores = {
        good: 0,
        bad: 0,
        neutral: 0
    };
    continueBtn.textContent = 'Continue';

    transitionToScene(() => {
        showScene(narrative[0]);
    });
}

// Start the experience
init();
