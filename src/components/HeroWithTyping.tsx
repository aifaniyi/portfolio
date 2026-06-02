import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypingEffect } from '@/components/TypingEffect';
import { personalInfo, socialLinks } from '@/data';

export function HeroWithTyping() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Avatar/Image */}
          <div className="flex justify-center mb-8">
            <img
              src="/me.jpg"
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-primary/20"
            />
          </div>

          {/* Greeting */}
          <div className="space-y-2">
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in">
              Hi, I'm
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
              {personalInfo.name}
            </h1>
          </div>

          {/* Title with typing effect */}
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary min-h-[3rem] animate-fade-in animation-delay-200">
            <TypingEffect text={personalInfo.title} speed={50} />
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up animation-delay-600">
            <Button size="lg" onClick={scrollToProjects} className="min-w-40">
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="min-w-40"
            >
              Get in Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-8 animate-fade-in-up animation-delay-800">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform !== 'email' ? '_blank' : undefined}
                rel={
                  link.platform !== 'email' ? 'noopener noreferrer' : undefined
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to projects"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </button>
    </section>
  );
}
