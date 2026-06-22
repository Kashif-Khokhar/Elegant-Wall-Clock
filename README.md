# Elegant Wall Clock

A polished React + TypeScript + Vite application featuring a customizable analog wall clock, timezone-aware digital display, alarm scheduler, and animated theme-driven styling.

## Features

- Smooth analog clock with sweep seconds and accurate hour/minute hand movement
- Configurable theme modes: neumorphism, glassmorphism, cyberpunk, and luxury
- Local and global timezone selection with dynamic background imagery
- Alarm scheduling tied to the selected timezone
- Soft Web Audio chime preview and alarm sound playback
- Searchable worldwide timezone selector for quick location lookup
- Responsive UI optimized for desktop and larger screens

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint project

```bash
npm run lint
```

## Project Structure

- `src/App.tsx` — application state, animation loop, background transitions, and alarm logic
- `src/components/Clock.tsx` — styled analog clock face, hands, and theme variants
- `src/components/Controls.tsx` — theme selection, timezone controls, alarm settings, and search input
- `src/utils/timezones.ts` — timezone definitions, display metadata, and background mapping

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (utility classes)
- ESLint

## Notes

The app uses `requestAnimationFrame` for smooth clock updates and the Web Audio API to generate gentle chime tones. Backgrounds adapt to the selected timezone using curated city/country imagery and dynamic image queries.
