# Train Cabin - Interactive Narrative Prototype

## Overview

This is a fully interactive narrative prototype based on the provided storyboard (StoryBoard.pdf) and example prototype (Example. pdf.png). The experience takes place inside a train cabin where the user's choices shape both the narrative and the visual environment.

## Design Fidelity

This prototype has been designed to **exactly match** the visual and functional specifications from the storyboard and example:

### Visual Design (Matching Example Prototype)

**Train Cabin Interior:**
- Top-down/isometric perspective view of train cabin
- Dark blue atmospheric color palette (#1e2740, #2b3555, #0a0e1a)
- Passenger silhouettes positioned throughout the cabin
- Windows along both sides showing the exterior
- Central ceiling section with lights running down the middle
- Center aisle creating depth perspective
- Cabin door visible at the far end

**Passenger Silhouettes:**
- Gray/blue gradient silhouettes (#6a7ba8, #5a6a98, #4a5a88)
- Positioned in various seats throughout the cabin
- Simple head and body shapes creating atmospheric presence
- Semi-transparent to maintain mood

**Dialogue Interface:**
- **Left-aligned** dialogue box (matching example, NOT centered)
- Semi-transparent dark blue background (rgba(30, 39, 64, 0.92))
- Border with atmospheric blue accent (#4a5a88)
- Two text sections:
  - Narrative description (regular text)
  - Question prompt (italic text)
- Choice buttons with dark styling and left-aligned text
- Serif font (Georgia) for narrative feel

### Narrative Structure

**How It Works:**

The storyboard shows three "options" - these are NOT choices the user selects upfront. Instead, they represent the three possible narrative paths that emerge organically based on the user's individual choices throughout the story:

- **Option 1 (Variety of Responses)**: User makes mixed choices → flames appear, balanced environment
- **Option 2 (Good Responses)**: User makes mostly positive/hopeful choices → cabin transforms to bright golden light
- **Option 3 (Bad Responses)**: User makes mostly negative/dark choices → cabin descends into complete darkness

**Narrative Flow:**

1. **Introduction**: "This cabin has collapsed into darkness"
2. **Interactive Scenes**: User is presented with philosophical/emotional choices at each scene
3. **Choice Tracking**: Each choice is categorized (good/neutral/bad) and tracked
4. **Dynamic Environment**: The cabin visually transforms based on cumulative choices
5. **Multiple Endings**: Three possible endings based on the dominant choice type

**Example Choices:**
- "What do you carry with you on this journey?"
  - Hope for what lies ahead (good)
  - Regrets I cannot escape (bad)
  - The weight of forgotten promises (neutral)

### Environmental States

The prototype recreates the exact environmental progressions shown in the storyboard:

1. **Dark** (Initial State)
   - Deep blue gradients
   - Dim ceiling lights
   - Mysterious atmosphere

2. **Darker** (Bad Path Progression)
   - Near-black environment
   - Lights fade out completely
   - Oppressive darkness

3. **Bright** (Good Path Ending)
   - Golden/yellow transformation (#ffb703, #ffd60a)
   - Bright illuminated cabin
   - Warm, hopeful atmosphere
   - Matches the bright corridor frames in storyboard

4. **Flames** (Neutral/Mixed Path)
   - Orange flames appear along cabin walls (#ff6b35, #f77f00, #dc2f02)
   - Animated flicker effects
   - Progressive appearance based on choices
   - Matches the flame-filled frames in storyboard

### Interactive Features

- **Choice-Based Narrative**: Every decision shapes the outcome
- **Dynamic Visuals**: Environment responds to user choices in real-time
- **Smooth Transitions**: Fade effects between scenes
- **Atmospheric Lighting**: Pulsing ceiling lights, flame animations
- **Multiple Endings**: Three distinct conclusions based on player path
- **Restart Functionality**: Replay with different choices

## Technical Implementation

### Files

- `index.html` - Train cabin structure with passenger silhouettes
- `styles.css` - Visual styling matching storyboard aesthetics (8.5KB)
- `script.js` - Choice tracking and narrative engine (10.5KB)
- `StoryBoard.pdf` - Original design reference
- `Example. pdf.png` - Visual style reference

### Key Features

1. **Responsive Design** - Adapts to different screen sizes
2. **Choice Tracking System** - Monitors good/neutral/bad choices
3. **Dynamic Environment Changes** - Visual transformations based on narrative path
4. **Passenger Silhouettes** - Atmospheric figures positioned throughout cabin
5. **Flame System** - Progressive flame appearances for mixed/neutral paths
6. **Left-Aligned UI** - Dialogue box positioned on left side (matching example)

## How to Experience

Simply open `index.html` in a modern web browser.

### Navigation

1. **Start**: Read opening text, click "Continue"
2. **Make Choices**: Select responses that resonate with you
3. **Watch Environment Change**: The cabin transforms based on your choices
4. **Reach Your Ending**: Experience one of three conclusions
5. **Restart**: Try different choices to see alternate paths

## Design Philosophy

This prototype follows the core principle from the original request:

> "Your task is to replicate the storyboard visuals with extreme accuracy."

The train cabin interior, passenger silhouettes, left-aligned dialogue box, color palette, and atmospheric lighting all precisely match the reference materials. The three narrative paths emerge naturally from user choices rather than being explicitly selected.

## Storyboard Interpretation

The storyboard's three "options" are narrative outcomes, not menu selections:
- The user experiences a single flowing narrative
- Their individual choices determine which path they follow
- The environment dynamically reflects their cumulative decisions
- Three distinct endings based on the dominant choice type (good/neutral/bad)

## Browser Compatibility

Optimized for:
- Chrome/Edge (Recommended)
- Firefox
- Safari

Requires modern browser with CSS3 and ES6 JavaScript support.

---

**Created to match StoryBoard.pdf and Example. pdf.png with precision**
