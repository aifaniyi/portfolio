import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';

interface FilterBarProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  projectCount: number;
}

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  projectCount,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('All')}
        >
          All Projects
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Count */}
      <p className="text-center text-sm text-muted-foreground">
        Showing {projectCount} {projectCount === 1 ? 'project' : 'projects'}
      </p>
    </div>
  );
}
