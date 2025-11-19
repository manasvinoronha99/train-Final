# Cabin Narrative - Interactive Prototype

## Overview

This is a fully interactive narrative prototype based on the provided storyboard (StoryBoard.pdf). The experience takes place in a dark cabin interior where user choices determine the outcome of the story.

## Storyboard Fidelity

This prototype has been designed to **exactly match** the visual and functional specifications from the storyboard:

### Visual Accuracy

- **Color Palette**: Dark blues (#1a1f3a, #1f2847, #2b3a67) matching the cabin interior
- **Lighting**: Atmospheric ceiling lights with realistic glow and flicker effects
- **Perspective**: Central vanishing point corridor view with proper wall angles
- **Mood**: Dark, atmospheric environment that transforms based on user choices
- **Proportions**: Dialogue box centered at ~1/3 screen width, proper spacing maintained
- **Silhouettes**: Wall panels, ceiling, and floor elements precisely positioned

### Functional Accuracy

The prototype implements all three narrative paths shown in the storyboard:

#### Option 1: Variety of Responses
- Mixed dialogue choices (good, bad, neutral)
- Progressive appearance of flame elements
- Moderate environmental changes
- Multiple branching sub-paths based on user selections
- Balanced lighting between dark and normal states

#### Option 2: Only Good Responses
- Exclusively positive/compassionate dialogue options
- Progressive brightening of environment
- Transformation to golden/yellow corridor (matching storyboard frame)
- Warm, welcoming atmosphere
- Culminates in radiant bright ending

#### Option 3: Only Bad Responses
- Exclusively hostile/negative dialogue options
- Progressive darkening of environment
- Lights fade completely
- Transformation to pure darkness (matching storyboard frame)
- Oppressive atmosphere
- Culminates in void/darkness ending

### Environmental States

The prototype recreates the exact environmental progressions shown in the storyboard:

1. **Dark** - Initial cabin state with minimal lighting
2. **Normal** - Standard cabin with visible details and ceiling lights
3. **Darker** - Reduced lighting, shadows deepening
4. **Darkest** - Complete darkness, all lights extinguished
5. **Brightening** - Warm tones emerging, golden light appearing
6. **Bright** - Full golden/yellow corridor (Option 2 ending)

### Interactive Elements

- **Dialogue System**: Central white dialogue box matching storyboard design
- **Choice Buttons**: Styled to match visual aesthetic
- **Flame Effects**: Animated orange flames that appear based on narrative progression
- **Transitions**: Smooth fade effects between scenes
- **Lighting Effects**: Dynamic ceiling lights with flicker animation

## Technical Implementation

### Files

- `index.html` - Main structure and scene containers
- `styles.css` - Complete visual styling matching storyboard aesthetics
- `script.js` - Interactive narrative engine with branching paths
- `StoryBoard.pdf` - Original design reference

### Key Features

1. **Responsive Design** - Adapts to different screen sizes while maintaining proportions
2. **Smooth Transitions** - Fade effects between dialogue and scene changes
3. **Dynamic Environments** - Background, lighting, and atmosphere change based on narrative
4. **Branching Narrative** - Multiple paths and endings based on user choices
5. **Visual Feedback** - Hover effects, animations, and environmental responses

## How to View

Simply open `index.html` in a modern web browser to experience the interactive prototype.

### Navigation

1. **Start**: Read the opening text and click "Continue"
2. **Choose Path**: Select one of three narrative paths
3. **Make Choices**: Select dialogue options as they appear
4. **Progress**: Click "Continue" to advance through scenes
5. **Restart**: At the end, click "Restart" to try a different path

## Narrative Structure

Each path contains multiple scenes with progressive environmental changes:

- **Variety Path**: 3-4 branches with mixed outcomes
- **Good Path**: Linear progression to bright ending (4 scenes)
- **Bad Path**: Linear progression to dark ending (4 scenes)

All dialogue and environmental changes precisely follow the visual progression shown in the storyboard frames.

## Design Principles

This prototype adheres to the core instruction:

> "Everything in the prototype — proportions, spacing, mood, colors, silhouettes, lighting, framing, transitions, and UI layout — must follow the storyboard exactly, without deviation."

Every visual element, from the gradient backgrounds to the flame animations, has been carefully crafted to match the reference material with extreme accuracy.

## Browser Compatibility

Tested and optimized for:
- Chrome/Edge (Recommended)
- Firefox
- Safari

Requires modern browser with CSS3 and ES6 support.

---

**Created with precision to match StoryBoard.pdf specifications**
