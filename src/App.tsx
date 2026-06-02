import { ThemeProvider } from './components/ThemeProvider';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Portfolio</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-xl">Welcome to your portfolio</h2>
          <p className="text-muted-foreground mt-2">
            Epic 1 setup complete. Ready to build!
          </p>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
