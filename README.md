# Creator Demo

An AI-native landing page and interactive demo for a school-facing career guidance product.

This demo is designed to show how a student can switch between two guidance modes:
- **Postgraduate Mode**: for graduate-school planning and application support
- **Employment Mode**: for job search strategy, resume direction, and career planning

The current version is a polished frontend demo built with Vite, React, TypeScript, and Tailwind CSS. The chat experience is intentionally simulated so the site can be deployed as a fast, stable static demo.

## What This Demo Shows

- A clean landing-page experience for school or hackathon presentations
- A dual-mode AI assistant interaction model
- Streaming-style demo responses
- Source-style reference cards for trust and explainability
- A presentation-friendly product narrative for postgraduate and employment planning

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS

## Local Development

```bash
npm install
npm run dev
```

The local development server runs on `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deployment

This project is prepared for static hosting.

### GitHub Pages

```bash
npm run build:pages
```

The recommended permanent URL is:

`https://chuxainpei.github.io/creator-demo/`

### Vercel

- Build command: `npm run build`
- Output directory: `dist`

The repo includes [vercel.json](/Users/bran/creator/vercel.json) so Vercel can detect the setup quickly.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

The repo includes [netlify.toml](/Users/bran/creator/netlify.toml) and a static [public/_redirects](/Users/bran/creator/public/_redirects) file.

## Notes

- This repo is focused on the **demo site only**
- Backend and internal experimentation workspaces are intentionally excluded from version control here
- Environment files such as `.env` and `.env.local` are ignored for safety
