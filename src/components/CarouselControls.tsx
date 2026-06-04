import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
  className?: string;
}

export function CarouselControls({
  onPrevious,
  onNext,
  disabled = false,
  className,
}: CarouselControlsProps) {
  return (
    <div 
      className={cn(
        'absolute top-1/2 left-0 right-0 -translate-y-1/2',
        'flex justify-between items-center',
        'pointer-events-none px-6 md:px-8',
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'pointer-events-auto',
          'h-12 w-12 md:h-14 md:w-14 rounded-full',
          'bg-background/90 backdrop-blur-sm',
          'border-2 shadow-xl',
          'hover:bg-accent hover:scale-110',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        onClick={onPrevious}
        disabled={disabled}
        aria-label="Previous project"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          'pointer-events-auto',
          'h-12 w-12 md:h-14 md:w-14 rounded-full',
          'bg-background/90 backdrop-blur-sm',
          'border-2 shadow-xl',
          'hover:bg-accent hover:scale-110',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        onClick={onNext}
        disabled={disabled}
        aria-label="Next project"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
    </div>
  );
}
