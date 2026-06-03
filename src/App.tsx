import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroTwoColumn as Hero } from './components/HeroTwoColumn';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { Section } from './components/Section';
import { Container } from './components/Container';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <Hero />

          <ProjectsSection />

          <AboutSection />

          <Section id="contact">
            <Container>
              <h2 className="text-3xl font-bold mb-8">Contact</h2>
              <p className="text-muted-foreground">
                Contact section coming soon...
              </p>
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
