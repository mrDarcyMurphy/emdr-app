# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an EMDR therapy application built with Next.js 13 (App Router) that implements bilateral stimulation through visual and auditory cues. The app uses GSAP for smooth animations and Howler.js for spatial audio playback.

## Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Core Animation System

The main animation logic is in `app/page.tsx` and coordinates three synchronized elements:

1. **Visual stimulation**: A light element animated left-to-right using GSAP timeline
2. **Audio stimulation**: Stereo sound files (`om-left.wav`, `om-right.wav`) triggered via Howler.js
3. **Timing synchronization**: Audio cues are precisely timed with `-=0.145924` offset to match visual position

The animation uses `gsap.timeline({repeat: -1})` with `Sine.easeInOut` easing for smooth bilateral movement. Speed is adjustable (0.45-2 seconds) but cannot be changed while animation is running.

### State Management

Uses React hooks for local state:
- `isAnimating`: Controls start/stop of animation loop
- `leftSound/rightSound`: Howl instances initialized once on mount
- `speed`: Animation duration, disabled during playback

### File Structure

```
app/
  ├── page.tsx          # Main EMDR interface with animation logic
  ├── layout.tsx        # Root layout with Inter font
  ├── page.css          # Light element styling (todo: migrate to Tailwind)
  └── globals.css       # Global Tailwind styles
components/
  └── Button.tsx        # Reusable button component
public/
  ├── om-left.wav       # Left channel audio
  └── om-right.wav      # Right channel audio
```

### Styling

The project uses Tailwind CSS for most styling. The `.light` class in `app/page.css` still uses custom CSS with a radial gradient and box-shadow to create the animated element. There's a todo comment to migrate this to Tailwind.

## Technical Details

- **Next.js 13 App Router**: Uses `'use client'` directive for client-side interactivity
- **TypeScript**: Strict mode enabled
- **Client-side only**: All animation/audio logic requires browser APIs
- **GSAP timeline cleanup**: Properly kills timelines in useEffect cleanup to prevent memory leaks
- **Audio timing**: The hardcoded `-=0.145924` offset appears to be calibrated for the specific sound file duration
