# Claude AI Assistant Guide

This document provides context and best practices for AI assistants working on this React + Vite + shadcn/ui project.

## Project Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useReducer, useContext)
- **Routing**: React Router (if applicable)

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── [feature]/    # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── pages/            # Route pages/views
├── types/            # TypeScript type definitions
├── styles/           # Global styles and Tailwind config
└── App.tsx           # Root component
```

## Best Practices

### Component Development

1. **Functional Components**: Always use functional components with hooks
2. **Component Organization**: One component per file, named exports for components
3. **Props Interface**: Define TypeScript interfaces for all props
4. **Component Composition**: Prefer composition over prop drilling

```tsx
// Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### State Management

1. **Local State First**: Use useState for component-local state
2. **Lift State Up**: Share state by lifting to nearest common ancestor
3. **Context for Global State**: Use Context API for theme, auth, or app-wide state
4. **Avoid Prop Drilling**: Use composition or context instead

### Performance Optimization

1. **Lazy Loading**: Use React.lazy() for route-based code splitting
2. **Memoization**: Apply useMemo and useCallback for expensive computations
3. **Virtual Scrolling**: Use libraries like react-window for long lists
4. **Image Optimization**: Lazy load images and use appropriate formats

```tsx
// Lazy loading routes
const HomePage = lazy(() => import('./pages/HomePage'));
```

### Styling with Tailwind CSS

1. **Use Tailwind Classes**: Prefer utility classes over custom CSS
2. **Component Variants**: Use cva (class-variance-authority) for variant management
3. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:)
4. **Dark Mode**: Implement using Tailwind's dark: prefix and shadcn/ui theme provider

```tsx
// Using cva for variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
  }
);
```

### shadcn/ui Usage

1. **Install Components**: Use CLI to add only needed components
2. **Customize**: Modify components in src/components/ui/ as needed
3. **Accessibility**: shadcn/ui components are built with accessibility in mind
4. **Composition**: Combine primitives to create complex UI patterns

```bash
npx shadcn-ui@latest add button
```

### TypeScript Guidelines

1. **Strict Mode**: Enable strict TypeScript checking
2. **Type Everything**: Avoid 'any' types, use proper interfaces/types
3. **Type Inference**: Let TypeScript infer when obvious
4. **Utility Types**: Use Pick, Omit, Partial for type transformations

```tsx
// Good type usage
type User = {
  id: string;
  name: string;
  email: string;
};

type UserPreview = Pick<User, 'id' | 'name'>;
```

### Custom Hooks

1. **Extract Logic**: Move reusable logic into custom hooks
2. **Naming**: Prefix with 'use' (e.g., useAuth, useFetch)
3. **Single Responsibility**: Each hook should have one clear purpose
4. **Return Values**: Return objects for multiple values, arrays for ordered pairs

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### Error Handling

1. **Error Boundaries**: Implement for graceful error handling
2. **Try-Catch**: Use for async operations
3. **User Feedback**: Show toast/alert for errors
4. **Loading States**: Always show loading indicators

### Code Quality

1. **ESLint**: Follow configured linting rules
2. **Prettier**: Maintain consistent formatting
3. **Comments**: Write self-documenting code, comment only complex logic
4. **Imports**: Group imports (React, libraries, local, styles)

```tsx
// Import order
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import './styles.css';
```

### Testing (if applicable)

1. **Unit Tests**: Test utility functions and custom hooks
2. **Component Tests**: Test user interactions and rendering
3. **Integration Tests**: Test feature workflows
4. **E2E Tests**: Test critical user paths

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA Labels**: Add when semantic HTML isn't enough
3. **Keyboard Navigation**: Ensure all interactions work with keyboard
4. **Color Contrast**: Maintain WCAG AA standards minimum

### Performance Monitoring

1. **React DevTools**: Profile component renders
2. **Lighthouse**: Run regular audits
3. **Bundle Analysis**: Monitor bundle size with vite-bundle-analyzer

## Common Patterns

### Data Fetching

```tsx
function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

### Form Handling

```tsx
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Vite-Specific

1. **Environment Variables**: Use VITE_ prefix for env vars
2. **Fast Refresh**: Leverage HMR for rapid development
3. **Assets**: Import assets directly in components
4. **Plugins**: Use Vite plugins for additional functionality

```tsx
// Environment variables
const apiUrl = import.meta.env.VITE_API_URL;

// Asset imports
import logo from './assets/logo.svg';
```

## Code Modification Guidelines

When modifying this codebase:
- Maintain existing patterns and conventions
- Preserve TypeScript types and interfaces
- Keep components small and focused
- Update tests when changing logic
- Follow the established folder structure
- Use existing shadcn/ui components before creating new ones
- Ensure changes are responsive and accessible
