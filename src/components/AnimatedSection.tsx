import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right';
  delay?: number;
}

const animations = {
  'fade-in': 'opacity-0 animate-fade-in',
  'fade-in-up': 'opacity-0 translate-y-8 animate-fade-in-up',
  'fade-in-left': 'opacity-0 -translate-x-8 animate-fade-in',
  'fade-in-right': 'opacity-0 translate-x-8 animate-fade-in',
};

export function AnimatedSection({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        !isVisible && animations[animation],
        isVisible && 'opacity-100 translate-y-0 translate-x-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
