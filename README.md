# FROGULA KEYHOUSE Landing Page

> An Awwwards-caliber immersive landing page for the FROGULA multi-agent intelligence platform.

![Version](https://img.shields.io/badge/version-3.0.0-purple)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Three.js](https://img.shields.io/badge/Three.js-0.160-white)

## ✨ Features

### 🎨 Visual Design
- **Custom WebGL Shader Background** - Flowing neural network with noise-based displacement
- **Custom Cursor with Trail** - Magnetic physics and context-aware states
- **3D Particle System** - Orbiting data nodes with depth-based interactions
- **Tilt-enabled Cards** - Mouse-responsive 3D transforms

### 🎬 Animations & Interactions
- **Kinetic Typography** - Character-by-character reveals with `SplitText`
- **Text Scramble Effect** - Matrix-style text decoding with `ScrambleText`
- **Typewriter Animation** - Terminal-style text rendering
- **Magnetic Buttons** - Physics-based hover attraction
- **Smooth Scroll** - Scroll-linked parallax effects
- **Section Reveals** - Staggered entrance animations

### 🎯 Premium UX
- **Loading Screen** - Animated progress with system initialization
- **Glass Morphism** - Backdrop-blur cards with gradient borders
- **Scan Line Effects** - CRT monitor aesthetic
- **Grain Texture** - Subtle noise overlay for depth
- **Custom Scrollbar** - Styled to match the dark theme

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd landing-page

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
landing-page/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main landing page
├── components/
│   ├── index.ts             # Component exports
│   ├── Scene3D.tsx          # Three.js WebGL scene
│   ├── CustomCursor.tsx     # Custom cursor with trail
│   ├── MagneticButton.tsx   # Physics buttons
│   ├── TextAnimations.tsx   # Kinetic typography
│   └── UICards.tsx          # Cards & containers
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0a0a12` | Page background |
| `--color-accent-purple` | `#a855f7` | Primary accent |
| `--color-accent-cyan` | `#06b6d4` | Secondary accent |
| `--color-text-primary` | `#ffffff` | Headlines |
| `--color-text-secondary` | `#94a3b8` | Body text |

### Typography
- **Sans-serif**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (Google Fonts)

### Animation Timing
- **Fast**: 150ms
- **Base**: 300ms
- **Slow**: 500ms
- **Easing**: `cubic-bezier(0.19, 1, 0.22, 1)`

## 🛠 Customization

### Adding New Key Cards

```tsx
const newKey = {
  icon: YourIcon,
  title: 'NewKey',
  description: 'Key description here',
  tags: ['Tag1', 'Tag2']
};
```

Add to the `keysData` array in `page.tsx`.

### Modifying the 3D Scene

Edit `components/Scene3D.tsx`:

```tsx
// Adjust particle count
const particleCount = 200; // Default: 200

// Change colors in the shader
vec3 color1 = vec3(0.4, 0.2, 0.9); // Purple
vec3 color2 = vec3(0.1, 0.4, 0.9); // Blue
```

### Customizing Text Animations

```tsx
<ScrambleText 
  text="YOUR TEXT"
  delay={0.5}
  duration={2000} // Scramble duration in ms
/>

<SplitText 
  delay={0.3}
  staggerDelay={0.05} // Delay between characters
/>
```

## 📱 Browser Support

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Mobile browsers** with reduced motion support

## ♿ Accessibility

- Respects `prefers-reduced-motion`
- Custom cursor hidden on touch devices
- Proper focus states on all interactive elements
- Semantic HTML structure

## 📝 License

FROGULA Corp. All rights reserved.

---

Made with ⚡ by the FROGULA team
