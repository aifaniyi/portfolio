import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Container } from './components/Container';
import { DataTestPage } from './pages/DataTestPage';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <Hero />

          <Section id="projects">
            <Container>
              <h2 className="text-3xl font-bold mb-8">Projects</h2>
              <DataTestPage />
            </Container>
          </Section>

          <Section id="about">
            <Container>
              <h2 className="text-3xl font-bold mb-8">About</h2>
              <p className="text-muted-foreground">
                About section coming soon...
              </p>
            </Container>
          </Section>

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
