Live Project: https://ghumo-india-rho.vercel.app/

# Ghumo India

Ghumo India is a React + Vite travel discovery app focused on Indian states, destinations, experiences, food, and festivals. It uses client-side routing to move between the home page, destination pages, experiences, and the about section, with a content-rich visual layout built from local JSON and image assets.

## Features

- Browse Indian states and explore state-specific details
- Discover destinations, highlights, festivals, and regional food
- Navigate between multiple pages with React Router
- Styled with Tailwind CSS and animated with Framer Motion
- Uses locally hosted assets for fast, offline-friendly content delivery

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- Lucide React and React Icons

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Project Structure

```text
public/
	assets/         # Images for festivals, food, gallery, and highlights
	data/           # Static JSON data used by the app
src/
	components/     # Reusable UI sections and cards
	data/           # Destination and experience data modules
	pages/          # Route-level pages
	routes/         # Routing helpers, if needed
```

## Main Routes

- `/` - Home page
- `/state/:slug` - Individual state detail page
- `/experiences` - Experiences listing
- `/destinations` - Destinations listing
- `/about` - About page

## Notes

- The app is designed around static content, so most updates happen by editing the JSON and data files under `public/data` and `src/data`.
- If you add new images, keep them inside `public/assets` so they can be referenced consistently across the app.
