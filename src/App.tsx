import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { Container } from './components/Container';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <Section id="home" className="min-h-[calc(100vh-4rem)]">
            <Container>
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Welcome to Portfolio
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Epic 2 setup complete. Core UI components ready!
                </p>
              </div>
            </Container>
          </Section>

          <Section id="projects">
            <Container>
              <h2 className="text-3xl font-bold mb-8">Projects</h2>
              <p className="text-muted-foreground">
                Projects section coming soon...
              </p>
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
