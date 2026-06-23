import { personalInfo } from '@/data';
import { Check, Award } from 'lucide-react';

export function BioSection() {
  return (
    <div className="space-y-8">
      {/* Bio Text */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {personalInfo.bio}
        </p>
      </div>

      {/* Expertise Areas */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Areas of Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personalInfo.expertise.map((area) => (
            <div
              key={area}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="mt-0.5 p-1 rounded-full bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Certifications</h3>
        <div className="flex flex-wrap gap-3">
          {personalInfo.certifications.map((cert) => (
            <a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              {cert.badge ? (
                <img src={cert.badge} alt={cert.name} className="h-12 w-12 shrink-0" />
              ) : (
                <Award className="h-5 w-5 text-primary shrink-0" />
              )}
              <span className="text-sm font-medium">{cert.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
