/* ============================================================================
   TRAIN CABIN NARRATIVE EXPERIENCE
   Implements storyboard progression and interactive narrative system
   ============================================================================ */

// ============================================================================
// STATE MACHINE
// Manages scene progression through storyboard sequence
// ============================================================================

const STATE = {
    current: 'darkness',
    environmentBrightness: 0, // -3 to +3 range
    positiveChoices: 0,
    negativeChoices: 0,
    interactedPassengers: new Set()
};

const SCENES = {
    darkness: { duration: 6000, next: 'bw-cabin' },
    'bw-cabin': { duration: 4000, next: 'color-intro' },
    'color-intro': { duration: 4000, next: 'interaction-types' },
    'interaction-types': { duration: 5000, next: 'interactive' },
    interactive: { duration: null, next: null } // End state
};

// ============================================================================
// PASSENGER NARRATIVE DATA
// Questions and responses for each figure
// Subtle, atmospheric, no explicit moral indicators
// ============================================================================

const PASSENGER_NARRATIVES = [
    {
        id: 'passenger-1',
        background: 'This figure sits hunched, clutching something close. Their silhouette trembles slightly.',
        question: 'What do you carry with you on this journey?',
        choices: [
            { text: 'Hope for what lies ahead', value: 'positive' },
            { text: 'The weight of forgotten promises', value: 'neutral' },
            { text: 'Regrets I cannot escape', value: 'negative' }
        ]
    },
    {
        id: 'passenger-2',
        background: 'A figure gazes toward the window, their posture suggesting distant thoughts.',
        question: 'What do you see when you look outside?',
        choices: [
            { text: 'Possibilities waiting to unfold', value: 'positive' },
            { text: 'The endless passage of time', value: 'neutral' },
            { text: 'Everything slipping away', value: 'negative' }
        ]
    },
    {
        id: 'passenger-3',
        background: 'This passenger sits perfectly still, as if frozen in a moment long past.',
        question: 'What memory holds you here?',
        choices: [
            { text: 'A moment of connection I wish to relive', value: 'positive' },
            { text: 'A choice I made that I cannot undo', value: 'neutral' },
            { text: 'The last time I felt anything at all', value: 'negative' }
        ]
    },
    {
        id: 'passenger-4',
        background: 'A figure reaches toward the aisle, their hand suspended in empty air.',
        question: 'What are you reaching for?',
        choices: [
            { text: 'Someone who might reach back', value: 'positive' },
            { text: 'Something I once knew', value: 'neutral' },
            { text: 'Nothing—just habit', value: 'negative' }
        ]
    },
    {
        id: 'passenger-5',
        background: 'This silhouette seems to breathe in rhythm with the train's movement.',
        question: 'Where does this journey lead?',
        choices: [
            { text: 'Toward something new', value: 'positive' },
            { text: 'It doesn't matter anymore', value: 'neutral' },
            { text: 'Nowhere—it never did', value: 'negative' }
        ]
    },
    {
        id: 'passenger-6',
        background: 'A figure leans against the seat, their form partially obscured by shadow.',
        question: 'What truth do you carry in silence?',
        choices: [
            { text: 'That light exists even in darkness', value: 'positive' },
            { text: 'That some things cannot be spoken', value: 'neutral' },
            { text: 'That I am already lost', value: 'negative' }
        ]
    }
];

// ============================================================================
// CANVAS DRAWING - 1-POINT PERSPECTIVE TRAIN CABIN
// All scenes use same geometry with different coloring
// ============================================================================

class CabinRenderer {
    constructor(canvas, mode = 'grayscale') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mode = mode; // 'grayscale', 'color', 'interactive'
        this.passengers = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.cx = this.w / 2;
        this.cy = this.h / 2;
    }

    // Main render function
    draw() {
        this.clear();
        this.drawCabinStructure();
        this.drawSeats();
        this.drawWindows();
        this.drawOverheadRacks();
        this.drawPoles();
        this.drawDoor();
        this.drawPassengers();
    }

    clear() {
        // Base background color depends on mode
        if (this.mode === 'grayscale') {
            this.ctx.fillStyle = '#1a1c20';
        } else if (this.mode === 'color') {
            this.ctx.fillStyle = '#1a1f28';
        } else {
            this.ctx.fillStyle = '#1e2430';
        }
        this.ctx.fillRect(0, 0, this.w, this.h);
    }

    // Distant door at vanishing point
    drawDoor() {
        const doorWidth = 80;
        const doorHeight = 120;
        const doorX = this.cx - doorWidth / 2;
        const doorY = this.cy - doorHeight / 2 - this.h * 0.1;

        if (this.mode === 'grayscale') {
            this.ctx.fillStyle = '#2a2c30';
        } else if (this.mode === 'color') {
            this.ctx.fillStyle = '#2a2f38';
        } else {
            this.ctx.fillStyle = '#2e3440';
        }

        this.ctx.fillRect(doorX, doorY, doorWidth, doorHeight);

        // Door frame
        this.ctx.strokeStyle = this.mode === 'grayscale' ? '#3a3c40' : '#3a3f48';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(doorX, doorY, doorWidth, doorHeight);

        // Door window
        const windowW = 40;
        const windowH = 60;
        this.ctx.fillStyle = this.mode === 'grayscale' ? '#505258' : '#505865';
        this.ctx.fillRect(
            this.cx - windowW / 2,
            doorY + 20,
            windowW,
            windowH
        );
    }

    // Floor and ceiling creating perspective
    drawCabinStructure() {
        // Ceiling
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.w, 0);
        this.ctx.lineTo(this.cx + 100, this.cy - this.h * 0.15);
        this.ctx.lineTo(this.cx - 100, this.cy - this.h * 0.15);
        this.ctx.closePath();

        if (this.mode === 'grayscale') {
            this.ctx.fillStyle = '#252830';
        } else if (this.mode === 'color') {
            this.ctx.fillStyle = '#282d38';
        } else {
            this.ctx.fillStyle = '#2a3040';
        }
        this.ctx.fill();

        // Floor (aisle)
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.h);
        this.ctx.lineTo(this.w, this.h);
        this.ctx.lineTo(this.cx + 100, this.cy + this.h * 0.15);
        this.ctx.lineTo(this.cx - 100, this.cy + this.h * 0.15);
        this.ctx.closePath();

        if (this.mode === 'grayscale') {
            this.ctx.fillStyle = '#1a1c20';
        } else if (this.mode === 'color') {
            this.ctx.fillStyle = '#1c2128';
        } else {
            this.ctx.fillStyle = '#1e2430';
        }
        this.ctx.fill();
    }

    // Seats along both sides with perspective
    drawSeats() {
        const seatPositions = [
            // Left side
            { x: 0.15, y: 0.4, depth: 0.8 },
            { x: 0.2, y: 0.5, depth: 0.6 },
            { x: 0.25, y: 0.6, depth: 0.4 },
            // Right side
            { x: 0.85, y: 0.4, depth: 0.8 },
            { x: 0.8, y: 0.5, depth: 0.6 },
            { x: 0.75, y: 0.6, depth: 0.4 }
        ];

        seatPositions.forEach(pos => {
            const x = this.w * pos.x;
            const y = this.h * pos.y;
            const size = 60 * pos.depth;

            if (this.mode === 'grayscale') {
                this.ctx.fillStyle = '#2a2c30';
            } else if (this.mode === 'color') {
                this.ctx.fillStyle = '#2c3138';
            } else {
                this.ctx.fillStyle = '#2e3540';
            }

            this.ctx.fillRect(x - size / 2, y, size, size * 0.8);

            // Seat back
            this.ctx.fillStyle = this.mode === 'grayscale' ? '#202228' : '#222830';
            this.ctx.fillRect(x - size / 2, y - size * 0.3, size, size * 0.3);
        });
    }

    // Windows along sides
    drawWindows() {
        const windowPositions = [
            // Left side
            { x: 0.1, y: 0.25, depth: 0.9 },
            { x: 0.15, y: 0.35, depth: 0.7 },
            { x: 0.2, y: 0.45, depth: 0.5 },
            // Right side
            { x: 0.9, y: 0.25, depth: 0.9 },
            { x: 0.85, y: 0.35, depth: 0.7 },
            { x: 0.8, y: 0.45, depth: 0.5 }
        ];

        windowPositions.forEach(pos => {
            const x = this.w * pos.x;
            const y = this.h * pos.y;
            const w = 70 * pos.depth;
            const h = 90 * pos.depth;

            // Window glow
            if (this.mode === 'grayscale') {
                this.ctx.fillStyle = '#3a3c40';
            } else if (this.mode === 'color') {
                // Subtle blue tint for colored mode
                this.ctx.fillStyle = '#3a3f48';
            } else {
                this.ctx.fillStyle = '#3e4450';
            }

            this.ctx.fillRect(x - w / 2, y, w, h);

            // Window frame
            this.ctx.strokeStyle = this.mode === 'grayscale' ? '#505258' : '#505865';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x - w / 2, y, w, h);
        });
    }

    // Overhead luggage racks
    drawOverheadRacks() {
        // Left rack
        this.ctx.beginPath();
        this.ctx.moveTo(this.w * 0.05, this.h * 0.15);
        this.ctx.lineTo(this.w * 0.35, this.h * 0.15);
        this.ctx.lineTo(this.cx - 110, this.cy - this.h * 0.12);
        this.ctx.lineTo(this.cx - 150, this.cy - this.h * 0.12);
        this.ctx.closePath();

        if (this.mode === 'grayscale') {
            this.ctx.fillStyle = '#2a2c30';
        } else {
            this.ctx.fillStyle = '#2c3138';
        }
        this.ctx.fill();

        // Right rack
        this.ctx.beginPath();
        this.ctx.moveTo(this.w * 0.95, this.h * 0.15);
        this.ctx.lineTo(this.w * 0.65, this.h * 0.15);
        this.ctx.lineTo(this.cx + 110, this.cy - this.h * 0.12);
        this.ctx.lineTo(this.cx + 150, this.cy - this.h * 0.12);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Vertical poles
    drawPoles() {
        const polePositions = [
            { x: 0.3, depth: 0.7 },
            { x: 0.4, depth: 0.5 },
            { x: 0.6, depth: 0.5 },
            { x: 0.7, depth: 0.7 }
        ];

        polePositions.forEach(pos => {
            const x = this.w * pos.x;
            const width = 6 * pos.depth;

            this.ctx.fillStyle = this.mode === 'grayscale' ? '#3a3c40' : '#3e4350';
            this.ctx.fillRect(
                x - width / 2,
                this.cy - this.h * 0.15,
                width,
                this.h * 0.3
            );
        });
    }

    // Draw passengers with current brightness levels
    drawPassengers() {
        this.passengers.forEach(passenger => {
            this.drawPassengerSilhouette(
                passenger.x,
                passenger.y,
                passenger.scale,
                passenger.brightness
            );
        });
    }

    // Individual passenger silhouette
    // Simple head + body shapes with soft gradients
    drawPassengerSilhouette(x, y, scale, brightness = 0.5) {
        const ctx = this.ctx;

        // Base color depends on mode and brightness
        let baseColor;
        if (this.mode === 'grayscale') {
            baseColor = this.interpolateColor('#4a4c50', '#6a6c70', brightness);
        } else {
            baseColor = this.interpolateColor('#4a4f58', '#6a7080', brightness);
        }

        // Head
        const headRadius = 25 * scale;
        const gradient = ctx.createRadialGradient(
            x, y - 40 * scale,
            0, x, y - 40 * scale,
            headRadius
        );
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, this.adjustBrightness(baseColor, -0.2));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(x, y - 40 * scale, headRadius * 0.8, headRadius, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (shoulders and torso)
        const bodyGradient = ctx.createLinearGradient(
            x, y - 20 * scale,
            x, y + 60 * scale
        );
        bodyGradient.addColorStop(0, baseColor);
        bodyGradient.addColorStop(1, this.adjustBrightness(baseColor, -0.3));

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(x, y + 10 * scale, 35 * scale, 50 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle posture variation (shoulders)
        ctx.fillStyle = this.adjustBrightness(baseColor, -0.1);
        ctx.beginPath();
        ctx.ellipse(x - 25 * scale, y - 5 * scale, 15 * scale, 20 * scale, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 25 * scale, y - 5 * scale, 15 * scale, 20 * scale, 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Helper: Interpolate between two hex colors
    interpolateColor(color1, color2, factor) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    adjustBrightness(color, amount) {
        const rgb = color.match(/\d+/g).map(Number);
        const adjusted = rgb.map(val => Math.max(0, Math.min(255, val + amount * 255)));
        return `rgb(${adjusted[0]}, ${adjusted[1]}, ${adjusted[2]})`;
    }

    // Set passenger positions and initial brightness
    initializePassengers() {
        this.passengers = [
            { id: 'passenger-1', x: this.w * 0.18, y: this.h * 0.5, scale: 0.8, brightness: 0.5 },
            { id: 'passenger-2', x: this.w * 0.25, y: this.h * 0.6, scale: 0.6, brightness: 0.5 },
            { id: 'passenger-3', x: this.w * 0.82, y: this.h * 0.5, scale: 0.8, brightness: 0.5 },
            { id: 'passenger-4', x: this.w * 0.75, y: this.h * 0.6, scale: 0.6, brightness: 0.5 },
            { id: 'passenger-5', x: this.w * 0.35, y: this.h * 0.7, scale: 0.4, brightness: 0.5 },
            { id: 'passenger-6', x: this.w * 0.65, y: this.h * 0.7, scale: 0.4, brightness: 0.5 }
        ];
    }

    updatePassengerBrightness(passengerId, newBrightness) {
        const passenger = this.passengers.find(p => p.id === passengerId);
        if (passenger) {
            passenger.brightness = newBrightness;
            this.draw();
        }
    }
}

// ============================================================================
// SCENE MANAGEMENT
// Controls progression through storyboard sequence
// ============================================================================

class SceneManager {
    constructor() {
        this.scenes = {
            darkness: document.getElementById('scene-darkness'),
            'bw-cabin': document.getElementById('scene-bw-cabin'),
            'color-intro': document.getElementById('scene-color-intro'),
            'interaction-types': document.getElementById('scene-interaction-types'),
            interactive: document.getElementById('scene-interactive')
        };

        this.renderers = {};
    }

    initialize() {
        // Initialize canvas renderers
        this.renderers['bw-cabin'] = new CabinRenderer(
            document.getElementById('bw-cabin-canvas'),
            'grayscale'
        );
        this.renderers['bw-cabin'].draw();

        this.renderers['color-intro'] = new CabinRenderer(
            document.getElementById('color-cabin-canvas'),
            'color'
        );
        this.renderers['color-intro'].draw();

        this.renderers['interaction-types'] = new CabinRenderer(
            document.getElementById('types-cabin-canvas'),
            'color'
        );
        this.renderers['interaction-types'].draw();

        this.renderers.interactive = new CabinRenderer(
            document.getElementById('main-cabin-canvas'),
            'interactive'
        );
        this.renderers.interactive.initializePassengers();
        this.renderers.interactive.draw();

        // Start progression
        this.startProgression();
    }

    startProgression() {
        // Scene 1: Darkness (6 seconds)
        setTimeout(() => {
            this.transition('darkness', 'bw-cabin');
        }, SCENES.darkness.duration);

        // Scene 2: B&W Cabin (4 seconds after scene 1)
        setTimeout(() => {
            this.transition('bw-cabin', 'color-intro');
        }, SCENES.darkness.duration + SCENES['bw-cabin'].duration);

        // Scene 3: Color intro (4 seconds after scene 2)
        setTimeout(() => {
            this.transition('color-intro', 'interaction-types');
        }, SCENES.darkness.duration + SCENES['bw-cabin'].duration + SCENES['color-intro'].duration);

        // Scene 4: Interaction types (5 seconds after scene 3)
        setTimeout(() => {
            this.transition('interaction-types', 'interactive');
            // Enable interactive features
            interactionSystem.enable();
        }, SCENES.darkness.duration + SCENES['bw-cabin'].duration + SCENES['color-intro'].duration + SCENES['interaction-types'].duration);
    }

    transition(fromScene, toScene) {
        this.scenes[fromScene].classList.remove('active');
        this.scenes[toScene].classList.add('active');
        STATE.current = toScene;
    }
}

// ============================================================================
// INTERACTION SYSTEM
// Handles hover discovery, dialogue, and choice tracking
// ============================================================================

class InteractionSystem {
    constructor(renderer) {
        this.renderer = renderer;
        this.passengersContainer = document.getElementById('passengers-container');
        this.dialogueBubble = document.getElementById('dialogue-bubble');
        this.currentPassenger = null;
        this.hitboxes = [];
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
        this.createHitboxes();
    }

    createHitboxes() {
        // Create invisible hover areas for each passenger
        this.renderer.passengers.forEach((passenger, index) => {
            const hitbox = document.createElement('div');
            hitbox.className = 'passenger-hitbox';
            hitbox.dataset.passengerId = passenger.id;

            // Position and size based on passenger scale
            const size = 120 * passenger.scale;
            hitbox.style.left = `${passenger.x - size / 2}px`;
            hitbox.style.top = `${passenger.y - size}px`;
            hitbox.style.width = `${size}px`;
            hitbox.style.height = `${size}px`;

            // Hover events
            hitbox.addEventListener('mouseenter', () => {
                if (!STATE.interactedPassengers.has(passenger.id)) {
                    this.onPassengerHover(passenger.id, passenger.x, passenger.y);
                }
            });

            hitbox.addEventListener('mouseleave', () => {
                this.hideDialogue();
            });

            this.passengersContainer.appendChild(hitbox);
            this.hitboxes.push(hitbox);
        });
    }

    onPassengerHover(passengerId, x, y) {
        if (!this.enabled) return;

        // Find narrative for this passenger
        const narrative = PASSENGER_NARRATIVES.find(n => n.id === passengerId);
        if (!narrative) return;

        this.currentPassenger = passengerId;

        // Brighten passenger slightly on hover
        const passenger = this.renderer.passengers.find(p => p.id === passengerId);
        if (passenger && !STATE.interactedPassengers.has(passengerId)) {
            this.renderer.updatePassengerBrightness(passengerId, passenger.brightness + 0.1);
        }

        // Show dialogue
        this.showDialogue(narrative, x, y);
    }

    showDialogue(narrative, x, y) {
        // Position bubble near passenger
        this.dialogueBubble.style.left = `${x + 80}px`;
        this.dialogueBubble.style.top = `${y - 100}px`;

        // Set content
        document.querySelector('.bubble-background').textContent = narrative.background;
        document.querySelector('.bubble-question').textContent = narrative.question;

        // Set up choice buttons
        const choiceButtons = document.querySelectorAll('.choice-option');
        choiceButtons.forEach((btn, index) => {
            const choice = narrative.choices[index];
            btn.textContent = choice.text;
            btn.dataset.value = choice.value;

            // Remove old listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Add new listener
            newBtn.addEventListener('click', () => {
                this.onChoiceSelected(this.currentPassenger, choice.value);
            });
        });

        // Show bubble
        this.dialogueBubble.classList.remove('hidden');
        this.dialogueBubble.classList.add('visible');
    }

    hideDialogue() {
        this.dialogueBubble.classList.remove('visible');
        this.dialogueBubble.classList.add('hidden');

        // Reset hover brightness if not interacted
        if (this.currentPassenger && !STATE.interactedPassengers.has(this.currentPassenger)) {
            const passenger = this.renderer.passengers.find(p => p.id === this.currentPassenger);
            if (passenger) {
                this.renderer.updatePassengerBrightness(this.currentPassenger, passenger.brightness - 0.1);
            }
        }
    }

    onChoiceSelected(passengerId, choiceValue) {
        // Mark as interacted
        STATE.interactedPassengers.add(passengerId);

        // Track choice
        if (choiceValue === 'positive') {
            STATE.positiveChoices++;
        } else if (choiceValue === 'negative') {
            STATE.negativeChoices++;
        }

        // Adjust passenger brightness permanently
        const passenger = this.renderer.passengers.find(p => p.id === passengerId);
        if (passenger) {
            let newBrightness;
            if (choiceValue === 'positive') {
                newBrightness = Math.min(0.9, passenger.brightness + 0.25);
            } else if (choiceValue === 'negative') {
                newBrightness = Math.max(0.15, passenger.brightness - 0.25);
            } else {
                newBrightness = passenger.brightness;
            }
            this.renderer.updatePassengerBrightness(passengerId, newBrightness);
        }

        // Update environment
        this.updateEnvironment();

        // Hide dialogue
        this.hideDialogue();
    }

    updateEnvironment() {
        const totalChoices = STATE.positiveChoices + STATE.negativeChoices;
        if (totalChoices === 0) return;

        const balance = (STATE.positiveChoices - STATE.negativeChoices) / totalChoices;

        // Remove all environment classes
        const scene = document.getElementById('scene-interactive');
        scene.classList.remove(
            'env-lighter-1', 'env-lighter-2', 'env-lighter-3',
            'env-darker-1', 'env-darker-2', 'env-darker-3'
        );

        // Apply gradual environmental change
        if (balance > 0.6) {
            scene.classList.add('env-lighter-3');
            STATE.environmentBrightness = 3;
        } else if (balance > 0.3) {
            scene.classList.add('env-lighter-2');
            STATE.environmentBrightness = 2;
        } else if (balance > 0) {
            scene.classList.add('env-lighter-1');
            STATE.environmentBrightness = 1;
        } else if (balance < -0.6) {
            scene.classList.add('env-darker-3');
            STATE.environmentBrightness = -3;
        } else if (balance < -0.3) {
            scene.classList.add('env-darker-2');
            STATE.environmentBrightness = -2;
        } else if (balance < 0) {
            scene.classList.add('env-darker-1');
            STATE.environmentBrightness = -1;
        }
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

let sceneManager;
let interactionSystem;

window.addEventListener('DOMContentLoaded', () => {
    sceneManager = new SceneManager();
    sceneManager.initialize();

    // Initialize interaction system (will be enabled after storyboard sequence)
    interactionSystem = new InteractionSystem(sceneManager.renderers.interactive);
});
