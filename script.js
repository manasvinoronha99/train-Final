// Narrative Data Structure
const narrativeData = {
    intro: {
        text: "This cabin has collapsed into darkness",
        nextAction: "showChoices",
        environment: "dark"
    },

    // Option 1: Variety of Responses
    variety: [
        {
            text: "You attempt to communicate with the darkness...",
            environment: "dark",
            flames: []
        },
        {
            text: "A voice responds from the shadows.",
            environment: "dark",
            flames: ["flame-left-1"]
        },
        {
            text: "\"Why have you come here?\" it whispers.",
            choices: [
                { text: "I'm seeking answers", next: "variety_good" },
                { text: "None of your business", next: "variety_bad" },
                { text: "I don't know", next: "variety_neutral" }
            ],
            environment: "dark",
            flames: ["flame-left-1", "flame-right-1"]
        }
    ],

    variety_good: [
        {
            text: "The presence seems to approve of your honesty.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"]
        },
        {
            text: "Light begins to flicker along the walls.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        },
        {
            text: "\"Truth illuminates even the darkest places.\"",
            choices: [
                { text: "Thank you for your guidance", next: "variety_good_end" },
                { text: "What else can you tell me?", next: "variety_continue" }
            ],
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        }
    ],

    variety_bad: [
        {
            text: "The shadows grow colder at your words.",
            environment: "dark",
            flames: ["flame-left-1"]
        },
        {
            text: "\"Defiance only deepens the darkness...\"",
            environment: "darker",
            flames: []
        },
        {
            text: "The lights begin to fade completely.",
            choices: [
                { text: "Wait, I'm sorry", next: "variety_recover" },
                { text: "I'm not afraid", next: "variety_bad_end" }
            ],
            environment: "darker",
            flames: []
        }
    ],

    variety_neutral: [
        {
            text: "The voice considers your uncertainty.",
            environment: "dark",
            flames: ["flame-left-1", "flame-right-1"]
        },
        {
            text: "\"Lost souls often wander here...\"",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"]
        },
        {
            text: "\"But not all who are lost wish to be found.\"",
            choices: [
                { text: "I want to find my way", next: "variety_good_end" },
                { text: "Perhaps I prefer the darkness", next: "variety_bad_end" }
            ],
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2"]
        }
    ],

    variety_good_end: [
        {
            text: "The cabin begins to transform around you.",
            environment: "bright",
            flames: []
        },
        {
            text: "Warm light fills every corner.",
            environment: "bright",
            flames: []
        },
        {
            text: "You have found peace within the darkness.",
            environment: "bright",
            flames: [],
            isEnd: true
        }
    ],

    variety_bad_end: [
        {
            text: "The darkness welcomes you.",
            environment: "darker",
            flames: []
        },
        {
            text: "All light fades from existence.",
            environment: "darkest",
            flames: []
        },
        {
            text: "You become one with the void.",
            environment: "darkest",
            flames: [],
            isEnd: true
        }
    ],

    variety_continue: [
        {
            text: "The presence shares ancient wisdom with you.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        },
        {
            text: "You learn to navigate the darkness.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        },
        {
            text: "Balance between light and shadow is key.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"],
            isEnd: true
        }
    ],

    variety_recover: [
        {
            text: "Your apology echoes through the cabin.",
            environment: "dark",
            flames: ["flame-left-1"]
        },
        {
            text: "A faint light returns, offering another chance.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"]
        },
        {
            text: "\"Humility opens doors that pride closes.\"",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2"],
            isEnd: true
        }
    ],

    // Option 2: Only Good Responses
    good: [
        {
            text: "You speak with kindness and respect.",
            environment: "normal",
            flames: []
        },
        {
            text: "\"Your words carry warmth,\" a gentle voice responds.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"]
        },
        {
            text: "\"Continue on this path, and light shall guide you.\"",
            choices: [
                { text: "I will walk with compassion", next: "good_2" },
                { text: "Thank you for believing in me", next: "good_2" },
                { text: "I seek to bring light to others", next: "good_2" }
            ],
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1"]
        }
    ],

    good_2: [
        {
            text: "Your positive energy begins to transform the space.",
            environment: "normal",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        },
        {
            text: "The walls begin to glow with golden light.",
            environment: "brightening",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        },
        {
            text: "\"You have the gift of illumination.\"",
            choices: [
                { text: "I will use it wisely", next: "good_3" },
                { text: "I want to help others see", next: "good_3" },
                { text: "This is beautiful", next: "good_3" }
            ],
            environment: "brightening",
            flames: ["flame-left-1", "flame-right-1", "flame-left-2", "flame-right-2"]
        }
    ],

    good_3: [
        {
            text: "The cabin transforms completely.",
            environment: "bright",
            flames: []
        },
        {
            text: "Radiant golden light fills every corner.",
            environment: "bright",
            flames: []
        },
        {
            text: "You walk forward into warmth and hope.",
            environment: "bright",
            flames: []
        },
        {
            text: "The path of light has been revealed to you.",
            environment: "bright",
            flames: [],
            isEnd: true
        }
    ],

    // Option 3: Only Bad Responses
    bad: [
        {
            text: "You speak with hostility and anger.",
            environment: "dark",
            flames: []
        },
        {
            text: "\"Such venom...\" a cold voice hisses.",
            environment: "darker",
            flames: []
        },
        {
            text: "\"You invite the darkness with every cruel word.\"",
            choices: [
                { text: "I don't care what you think", next: "bad_2" },
                { text: "Bring it on", next: "bad_2" },
                { text: "The darkness is my ally", next: "bad_2" }
            ],
            environment: "darker",
            flames: []
        }
    ],

    bad_2: [
        {
            text: "The lights begin to die one by one.",
            environment: "darker",
            flames: []
        },
        {
            text: "Cold creeps in from all sides.",
            environment: "darkest",
            flames: []
        },
        {
            text: "\"You have chosen your fate.\"",
            choices: [
                { text: "I embrace the void", next: "bad_3" },
                { text: "Let the darkness consume all", next: "bad_3" },
                { text: "There is nothing left for me", next: "bad_3" }
            ],
            environment: "darkest",
            flames: []
        }
    ],

    bad_3: [
        {
            text: "All light extinguishes.",
            environment: "darkest",
            flames: []
        },
        {
            text: "The cabin becomes a prison of shadows.",
            environment: "darkest",
            flames: []
        },
        {
            text: "You are lost to the darkness forever.",
            environment: "darkest",
            flames: []
        },
        {
            text: "The void has claimed another soul.",
            environment: "darkest",
            flames: [],
            isEnd: true
        }
    ]
};

// Game State
let currentPath = null;
let currentSceneIndex = 0;
let currentSubPath = null;

// DOM Elements
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices');
const continueBtn = document.getElementById('continue-btn');
const cabinBg = document.getElementById('cabin-bg');
const debugScene = document.getElementById('current-scene');
const debugPath = document.getElementById('current-path');

// Initialize
function init() {
    // Show initial scene
    showScene(narrativeData.intro);

    // Set up event listeners
    continueBtn.addEventListener('click', handleContinue);

    // Choice buttons are dynamically created
}

// Show Scene
function showScene(scene) {
    // Update dialogue text
    dialogueText.textContent = scene.text;

    // Update environment
    updateEnvironment(scene.environment);

    // Update flames
    if (scene.flames !== undefined) {
        updateFlames(scene.flames);
    }

    // Handle choices or continue button
    if (scene.choices) {
        continueBtn.classList.add('hidden');
        showChoices(scene.choices);
    } else if (scene.nextAction === "showChoices") {
        continueBtn.classList.add('hidden');
        showInitialChoices();
    } else {
        choicesContainer.classList.add('hidden');
        if (!scene.isEnd) {
            continueBtn.classList.remove('hidden');
        } else {
            continueBtn.textContent = "Restart";
            continueBtn.classList.remove('hidden');
        }
    }

    // Update debug info
    updateDebugInfo();
}

// Show Initial Path Choices
function showInitialChoices() {
    choicesContainer.innerHTML = '';

    const choices = [
        { text: "Option 1: User chooses variety of responses", path: "variety" },
        { text: "Option 2: User chooses only good responses", path: "good" },
        { text: "Option 3: User chooses only bad responses", path: "bad" }
    ];

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => selectPath(choice.path));
        choicesContainer.appendChild(btn);
    });

    choicesContainer.classList.remove('hidden');
}

// Show In-Story Choices
function showChoices(choices) {
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => selectSubPath(choice.next));
        choicesContainer.appendChild(btn);
    });

    choicesContainer.classList.remove('hidden');
}

// Select Initial Path
function selectPath(path) {
    currentPath = path;
    currentSceneIndex = 0;
    currentSubPath = null;

    // Transition to first scene of selected path
    transitionToScene(() => {
        showScene(narrativeData[path][currentSceneIndex]);
    });
}

// Select Sub-Path
function selectSubPath(subPath) {
    currentSubPath = subPath;
    currentSceneIndex = 0;

    // Transition to first scene of sub-path
    transitionToScene(() => {
        showScene(narrativeData[subPath][currentSceneIndex]);
    });
}

// Handle Continue Button
function handleContinue() {
    if (continueBtn.textContent === "Restart") {
        restart();
        return;
    }

    // Determine which scene array to use
    let sceneArray;
    if (currentSubPath) {
        sceneArray = narrativeData[currentSubPath];
    } else if (currentPath) {
        sceneArray = narrativeData[currentPath];
    } else {
        return;
    }

    // Move to next scene
    currentSceneIndex++;

    if (currentSceneIndex < sceneArray.length) {
        transitionToScene(() => {
            showScene(sceneArray[currentSceneIndex]);
        });
    }
}

// Transition Between Scenes
function transitionToScene(callback) {
    dialogueBox.classList.add('fade-out');

    setTimeout(() => {
        callback();
        dialogueBox.classList.remove('fade-out');
        dialogueBox.classList.add('fade-in');

        setTimeout(() => {
            dialogueBox.classList.remove('fade-in');
        }, 500);
    }, 500);
}

// Update Environment
function updateEnvironment(environment) {
    // Remove all environment classes
    cabinBg.classList.remove('dark', 'darker', 'darkest', 'normal', 'brightening', 'bright');

    // Add new environment class
    switch(environment) {
        case 'dark':
            cabinBg.classList.add('dark');
            break;
        case 'darker':
            cabinBg.classList.add('dark');
            cabinBg.style.background = 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)';
            break;
        case 'darkest':
            cabinBg.classList.add('dark');
            cabinBg.style.background = '#000000';
            break;
        case 'normal':
            // Default cabin appearance
            cabinBg.style.background = 'linear-gradient(180deg, #1a1f3a 0%, #0f1322 50%, #1a1f3a 100%)';
            break;
        case 'brightening':
            cabinBg.style.background = 'linear-gradient(180deg, #ffb703 0%, #ffd60a 50%, #ffb703 100%)';
            break;
        case 'bright':
            cabinBg.classList.add('bright');
            break;
    }
}

// Update Flames
function updateFlames(activeFlames) {
    const allFlames = document.querySelectorAll('.flame');

    // Hide all flames first
    allFlames.forEach(flame => {
        flame.classList.remove('active');
    });

    // Show specified flames
    activeFlames.forEach(flameClass => {
        const flame = document.querySelector(`.${flameClass}`);
        if (flame) {
            flame.classList.add('active');
        }
    });
}

// Update Debug Info
function updateDebugInfo() {
    debugScene.textContent = currentSubPath || currentPath || 'intro';
    debugPath.textContent = currentPath || 'none';
}

// Restart
function restart() {
    currentPath = null;
    currentSceneIndex = 0;
    currentSubPath = null;
    continueBtn.textContent = "Continue";

    // Reset environment
    cabinBg.style.background = '';
    updateEnvironment('dark');
    updateFlames([]);

    // Show intro
    transitionToScene(() => {
        showScene(narrativeData.intro);
    });
}

// Start the experience
init();
