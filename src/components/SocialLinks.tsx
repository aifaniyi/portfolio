import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import { socialLinks } from '@/data';
import type { SocialPlatform } from '@/types';

interface SocialLinksProps {
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  className?: string;
}

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
};

const sizeClasses = {
  small: {
    container: 'w-10 h-10',
    icon: 'h-5 w-5',
  },
  medium: {
    container: 'w-12 h-12',
    icon: 'h-6 w-6',
  },
  large: {
    container: 'w-16 h-16',
    icon: 'h-8 w-8',
  },
};

export function SocialLinks({ size = 'medium', showLabels = false, className = '' }: SocialLinksProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        const isEmail = link.platform === 'email';

        return (
          <a
            key={link.platform}
            href={link.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className="group flex flex-col items-center gap-2"
            aria-label={link.label}
          >
            <div
              className={`${sizeClass.container} rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25`}
            >
              <Icon className={sizeClass.icon} />
            </div>
            {showLabels && (
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {link.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
