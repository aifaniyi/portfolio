import { Container } from './Container';
import { BioSection } from './BioSection';
import { SkillsSection } from './SkillsSection';
import { personalInfo } from '@/data';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <Container>
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Image */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="relative z-10">
                  <img
                    src="/me.jpg"
                    alt={personalInfo.name}
                    className="w-full max-w-sm rounded-2xl object-cover shadow-2xl ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl -z-0 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3 space-y-12">
              <BioSection />
            </div>
          </div>

          {/* Full Width Skills Section */}
          <div className="pt-8">
            <SkillsSection />
          </div>
        </div>
      </Container>
    </section>
  );
}
