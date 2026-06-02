# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and shadcn/ui.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── ThemeProvider.tsx
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Route pages
├── types/            # TypeScript types
├── styles/           # Global styles
└── data/             # Project data
```

## Development

The project uses:
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** in strict mode
- **Tailwind CSS** for styling
- **Path aliases** (@/ for src/)

## Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

## License

MIT
