import { Button } from '@/components/ui/button';
import { Table2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LayoutType = 'table' | 'timeline';

interface LayoutToggleProps {
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  className?: string;
}

export function LayoutToggle({
  layout,
  onLayoutChange,
  className,
}: LayoutToggleProps) {
  return (
    <div 
      className={cn(
        'flex items-center gap-1 bg-muted rounded-lg p-1',
        className
      )}
      role="tablist"
      aria-label="Layout view options"
    >
      <Button
        variant={layout === 'timeline' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLayoutChange('timeline')}
        className="gap-2"
        role="tab"
        aria-selected={layout === 'timeline'}
        aria-label="Timeline view"
      >
        <Clock className="h-4 w-4" />
        <span className="hidden sm:inline">Timeline</span>
      </Button>

      <Button
        variant={layout === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLayoutChange('table')}
        className="gap-2"
        role="tab"
        aria-selected={layout === 'table'}
        aria-label="Table view"
      >
        <Table2 className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
    </div>
  );
}
