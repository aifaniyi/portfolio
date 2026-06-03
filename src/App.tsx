import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SkipToContent } from './components/SkipToContent';
import { SEO } from './components/SEO';
import { HeroTwoColumn as Hero } from './components/HeroTwoColumn';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <SEO />
      <SkipToContent />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main id="main-content" className="flex-1 pt-16">
          <Hero />

          <ProjectsSection />

          <AboutSection />

          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
