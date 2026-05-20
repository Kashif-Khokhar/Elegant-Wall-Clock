# Elegant Wall Clock

A modern React + TypeScript + Vite app showcasing an elegant wall clock with dynamic time and timezone controls.

## Features

- Responsive analog clock with smooth hand animation
- Digital time display
- Timezone selection from a curated list
- Theme switching and visual styling modes
- Alarm support with timezone-aware scheduling
- Background images that update with selected location

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

## Project Structure

- `src/App.tsx` — main application shell and layout
- `src/components/Clock.tsx` — analog clock UI and hands
- `src/components/Controls.tsx` — timezone, theme, and alarm controls
- `src/utils/timezones.ts` — timezone data and background image mappings

## Notes

This project is built with Vite, React, and TypeScript. It uses Tailwind-style utility classes for styling and is optimized for a polished, interactive clock experience.
