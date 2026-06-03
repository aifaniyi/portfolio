import { personalInfo } from '@/data';
import { Check } from 'lucide-react';

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
    </div>
  );
}
