import { Button } from '@/components/ui/button';
import { Grid3x3, Table2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LayoutType = 'grid' | 'table';

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
        variant={layout === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLayoutChange('grid')}
        className="gap-2"
        role="tab"
        aria-selected={layout === 'grid'}
        aria-label="Grid view"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
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
