import * as React from 'react';
import { cn } from '@/lib/utils';

const Timeline = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props} />
  )
);
Timeline.displayName = 'Timeline';

const TimelineItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { position?: 'left' | 'right' }>(
  ({ className, position = 'right', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex md:items-center mb-8 last:mb-0',
        position === 'left' ? 'md:flex-row-reverse' : 'md:flex-row',
        className
      )}
      {...props}
    />
  )
);
TimelineItem.displayName = 'TimelineItem';

const TimelineLine = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute top-0 bottom-0 w-px bg-border left-4 md:left-1/2 md:-translate-x-1/2',
        className
      )}
      {...props}
    />
  )
);
TimelineLine.displayName = 'TimelineLine';

const TimelineDot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-border z-10',
        className
      )}
      {...props}
    />
  )
);
TimelineDot.displayName = 'TimelineDot';

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('ml-10 md:ml-0 md:w-[calc(50%-2rem)]', className)} {...props} />
  )
);
TimelineContent.displayName = 'TimelineContent';

const TimelineDate = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xs font-semibold text-muted-foreground', className)}
      {...props}
    />
  )
);
TimelineDate.displayName = 'TimelineDate';

export {
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineDate,
};
