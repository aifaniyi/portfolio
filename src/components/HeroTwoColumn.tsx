import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypingEffect } from '@/components/TypingEffect';
import { personalInfo, socialLinks } from '@/data';

export function HeroTwoColumn() {
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-24 lg:gap-32 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <img
                src="/me.jpg"
                alt={personalInfo.name}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl ring-4 ring-primary/20"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full -z-10" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-2 animate-fade-in-up">
              <p className="text-lg md:text-xl text-muted-foreground">
                Hi, I'm
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight">
                {personalInfo.name}
              </h1>
            </div>

            {/* Title with typing effect */}
            <div className="text-xl md:text-2xl font-semibold text-primary min-h-[2.5rem] animate-fade-in animation-delay-200">
              <TypingEffect text={personalInfo.title} speed={50} />
            </div>

            {/* Tagline */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up animation-delay-400">
              {personalInfo.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4 animate-fade-in-up animation-delay-600">
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

            {/* Social Links & Certification */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in-up animation-delay-800">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.platform !== 'email' ? '_blank' : undefined}
                  rel={
                    link.platform !== 'email'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
              <a
                href="https://www.credly.com/badges/ae2fa27b-dc04-4ffb-b775-63a8e9dde040/public_url"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AWS Certified Solutions Architect – Professional"
              >
                <img
                  src="/aws-certified-solutions-architect-professional.png"
                  alt="AWS Certified Solutions Architect – Professional"
                  className="h-12 w-12"
                />
              </a>
            </div>
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
