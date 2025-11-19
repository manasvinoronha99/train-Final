# Train Cabin Narrative - Interactive Experience

## Overview

This is a fully interactive narrative experience built to **EXACTLY** match the specifications in the project document. Every visual element, interaction mechanic, and narrative choice has been implemented with extreme fidelity to the storyboard and written requirements.

## Storyboard Progression

The experience follows a precise four-scene progression before entering the main interactive loop:

### Scene 1: Cabin Collapses into Darkness (6 seconds)
- Complete darkness with subtle texture
- Faint rectangular framing slowly revealed
- Centered text: "This cabin has collapsed into darkness"
- Light gray, thin-weight, atmospheric typography
- Smooth fade transition to Scene 2

### Scene 2: Black-and-White Cabin Interior (4 seconds)
- Full monochrome grayscale cabin view
- 1-point perspective with distant door as vanishing point
- Seats, aisle, poles, luggage racks, passenger silhouettes
- Soft, low-contrast, desaturated lighting
- Caption: "Black and White → Cabin Interior"
- Cross-fade transition to Scene 3

### Scene 3: Interior with Initial Subtle Coloring (4 seconds)
- Identical composition to Scene 2
- Subtle color begins to appear:
  - Windows: faint soft blue tint
  - Overhead light: very slight warmth
  - Passengers remain grayscale
- Caption: "Interior with initial start coloring"
- Transition to Scene 4

### Scene 4: Representation of Interaction Types (5 seconds)
- Three visual boxes displaying interaction possibilities:
  - "Variety of possible responses"
  - "Only good responses"
  - "Only bad responses"
- **IMPORTANT**: These boxes are NOT interactive - they are visual representations only
- Matches storyboard styling exactly (size, color, rounded corners, glow)
- Transition to main interactive experience

### Scene 5: Main Interactive Experience
- Full hoverable passenger interactions
- No time limit - user explores at their own pace

## Visual Design Specifications

### 1-Point Perspective Train Cabin

All scenes use the same geometric structure:

- **Vanishing Point**: Distant door at far center
- **Two rows of seats**: Flanking the aisle, receding into perspective
- **Overhead luggage racks**: Running along both sides
- **Vertical poles**: Positioned at regular intervals
- **Window frames**: Along both sides with subtle glow
- **Floor/Aisle**: Creating depth through perspective tapering

### Passenger Silhouettes

- **No faces, no eyes, no hard outlines**
- Simple soft gradient shapes (head + body)
- Slight posture variation
- Always ambiguous
- Initial brightness: 0.5 (mid-range)
- Dynamic brightness changes based on user choices

### Color Palette

**Base Atmosphere**: Dark, dreamlike, mysterious
- Deep navy: `#1a1f28`
- Dark indigo: `#2b3555`
- Dark gray: `#2a2c30`

**Passenger Silhouettes**:
- Grayscale mode: `#4a4c50` to `#6a6c70`
- Color mode: `#4a4f58` to `#6a7080`

**Windows**:
- Grayscale: `#3a3c40`
- Subtle blue (color mode): `#3a3f48`

## Interaction Mechanics

### Hover Discovery (NO UI Hints)

- User must explore by moving cursor
- No labels, no instructions, no indicators
- Figures only reveal themselves through hover

### On Hover:

1. Figure brightens slightly (+0.1 brightness)
2. Cloud-like dialogue bubble appears
3. Bubble contains:
   - Short background text
   - A philosophical question
   - Three narrative response options

### Cloud-Like Dialogue Bubble

- Semi-transparent background: `rgba(25, 32, 48, 0.92)`
- Irregular, cloud-like edges (using blur effects)
- Positioned near hovered passenger
- Subtle border glow

### Response Effects

**Positive Choice**:
- Passenger brightens significantly (+0.25, max 0.9)
- Gains clearer contour
- Appears more human

**Negative Choice**:
- Passenger darkens significantly (-0.25, min 0.15)
- Edges become indistinct
- Sinks into shadow

**Neutral Choice**:
- Passenger brightness unchanged
- No visual modification

**All changes are permanent** - once interacted, passengers maintain their new brightness level.

### Environmental Response

The entire cabin atmosphere adjusts based on cumulative user choices:

**Many Positive Choices** (balance > 0.3):
- `env-lighter-1`, `env-lighter-2`, `env-lighter-3` classes applied
- Gradual brightness increase (1.1x → 1.2x → 1.3x)
- Slight contrast reduction
- Cabin becomes warmer and clearer

**Many Negative Choices** (balance < -0.3):
- `env-darker-1`, `env-darker-2`, `env-darker-3` classes applied
- Gradual brightness decrease (0.9x → 0.8x → 0.7x)
- Contrast increase
- Shadows deepen, visibility reduces

**Environmental transitions are SLOW** (4-second CSS transitions)

## Narrative Content

Six passengers, each with unique philosophical questions:

1. **Passenger 1**: "What do you carry with you on this journey?"
2. **Passenger 2**: "What do you see when you look outside?"
3. **Passenger 3**: "What memory holds you here?"
4. **Passenger 4**: "What are you reaching for?"
5. **Passenger 5**: "Where does this journey lead?"
6. **Passenger 6**: "What truth do you carry in silence?"

Each question has three response options that feel narrative and atmospheric - **never** explicitly labeled as "good", "bad", or "neutral".

Examples:
- "Hope for what lies ahead" (positive-leaning)
- "The weight of forgotten promises" (neutral)
- "Regrets I cannot escape" (negative-leaning)

## Technical Implementation

### File Structure

```
index.html    - Scene containers and canvas elements
styles.css    - All visual styling, transitions, atmospherics
script.js     - State machine, canvas rendering, interaction system
```

### Key Classes

**CabinRenderer**: Draws 1-point perspective train cabin
- Handles all geometric elements (door, seats, windows, poles, racks)
- Renders passenger silhouettes with dynamic brightness
- Supports three modes: 'grayscale', 'color', 'interactive'

**SceneManager**: Controls storyboard progression
- Manages scene transitions with precise timing
- Initializes canvas renderers for each scene
- Triggers interactive mode after sequence completes

**InteractionSystem**: Handles all user interactions
- Creates invisible hover hitboxes over passengers
- Manages dialogue bubble display/hiding
- Tracks choices and updates passenger/environment brightness
- Implements permanent visual changes

### State Tracking

```javascript
STATE = {
    current: 'darkness',              // Current scene
    environmentBrightness: 0,         // -3 to +3
    positiveChoices: 0,               // Counter
    negativeChoices: 0,               // Counter
    interactedPassengers: Set()       // Prevents re-interaction
}
```

## Absolute Prohibitions (NOT Included)

✗ No instructions ("Click here", "Hover over a figure")
✗ No UI indicators (icons, arrows, popups)
✗ No cartoon art or realism
✗ No breaking of 1-point perspective geometry
✗ No loud colors or neon accents
✗ No audio (unless requested)
✗ No modern game UI (menus, HUDs, glossy boxes)
✗ No horror elements or grotesque figures
✗ No scenes not in storyboard

## Design Principles

Everything remains:
- **Minimal** - No extraneous elements
- **Atmospheric** - Dark, dreamlike, mysterious
- **Interpretive** - Ambiguous figures and questions
- **Consistent** - Faithful to storyboard and specifications

## Experience Flow

```
User loads page
  ↓
Scene 1: Darkness (6s)
  ↓
Scene 2: B&W Cabin (4s)
  ↓
Scene 3: Subtle Color (4s)
  ↓
Scene 4: Interaction Types Display (5s)
  ↓
Scene 5: Interactive Mode Enabled
  ↓
User hovers over passengers (discovery)
  ↓
Cloud-like dialogue appears
  ↓
User makes narrative choice
  ↓
Passenger brightness changes permanently
  ↓
Environment adjusts gradually
  ↓
Repeat with remaining passengers
  ↓
Final environmental state reflects user's journey
```

## Browser Compatibility

Tested and optimized for:
- Chrome/Edge (Recommended)
- Firefox
- Safari

Requires:
- Modern browser with HTML5 Canvas support
- CSS3 filters and transitions
- ES6 JavaScript (classes, arrow functions, template literals)

## Specification Compliance

This implementation follows **every requirement** from the project specification document:

✓ Four-scene storyboard progression with exact timings
✓ 1-point perspective train cabin (all geometric elements)
✓ Passenger silhouettes (soft gradients, no faces)
✓ Hover discovery (no UI hints whatsoever)
✓ Cloud-like dialogue bubbles
✓ Permanent passenger brightness changes
✓ Gradual environmental response
✓ Atmospheric narrative questions
✓ Dark, dreamlike visual tone
✓ Subtle color palette (navy, indigo, gray)
✓ Slow, smooth transitions (never instant)
✓ No prohibited elements (see list above)

## Performance Notes

- Canvas rendering is optimized for smooth 60fps
- Transition effects use CSS hardware acceleration
- Hover detection uses invisible DOM elements (lighter than constant mouse tracking)
- Resize events redraw canvases to maintain proportions
- State is tracked efficiently with minimal re-renders

---

**Built with extreme fidelity to specification. No deviations, substitutions, or additional features.**
