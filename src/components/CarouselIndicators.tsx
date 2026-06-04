import { cn } from '@/lib/utils';

interface CarouselIndicatorsProps {
  total: number;
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function CarouselIndicators({
  total,
  active,
  onSelect,
  className,
}: CarouselIndicatorsProps) {
  return (
    <div 
      className={cn(
        'absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2',
        'flex flex-col items-center gap-3',
        className
      )}
    >
      {/* Dot Indicators */}
      <div 
        className="flex gap-2"
        role="tablist"
        aria-label="Project navigation"
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === active}
            aria-label={`Go to project ${index + 1}`}
            onClick={() => onSelect(index)}
            className={cn(
              'transition-all duration-300 ease-out',
              'border-0 cursor-pointer',
              'hover:bg-muted-foreground hover:scale-110',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              index === active
                ? 'w-8 md:w-10 h-2.5 rounded-full bg-primary'
                : 'w-2.5 h-2.5 rounded-full bg-muted'
            )}
          />
        ))}
      </div>

      {/* Text Counter */}
      <p 
        className="text-sm md:text-base text-muted-foreground font-medium"
        aria-live="polite"
        aria-atomic="true"
      >
        Project {active + 1} of {total}
      </p>
    </div>
  );
}
