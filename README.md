# Elegant Wall Clock

A polished React + TypeScript + Vite application featuring a customizable analog wall clock, timezone-aware digital display, alarm scheduler, and animated theme-driven styling.

## Features

- Smooth analog clock with sweep seconds and accurate hour/minute hand movement
- Configurable theme modes with polished visual styles
- Local and global timezone selection with dynamic backgrounds
- Alarm scheduling tied to the selected timezone
- Searchable timezone selector for quick location lookup
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

- `src/App.tsx` — application state, clock update loop, background transitions, and alarm logic
- `src/components/Clock.tsx` — analog clock face, hands, and theme styling
- `src/components/Controls.tsx` — theme selection, timezone controls, alarm configuration, and search
- `src/utils/timezones.ts` — timezone definitions, labels, and metadata

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production output
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project
