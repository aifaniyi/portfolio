import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from './Container';
import { SocialLinks } from './SocialLinks';
import { contactInfo } from '@/data';

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations,
              or just having a chat about technology
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Email Card */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send me an email anytime
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <a href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {contactInfo.availability}
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <MapPin className="h-4 w-4 text-primary" />
                    {contactInfo.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Follow Me</h3>
              <p className="text-muted-foreground">
                Connect with me on social media
              </p>
            </div>

            <SocialLinks size="large" showLabels />

            {/* Additional CTA */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Want to work together?
              </p>
              <Button size="lg" asChild>
                <a href={`mailto:${contactInfo.email}`}>
                  Get in Touch
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
