import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTransform } from '@/lib/carousel-utils';
import type { Project } from '@/types';
import type { CarouselPosition } from '@/lib/carousel-utils';

interface CarouselCardProps {
  project: Project;
  position: CarouselPosition;
  isActive: boolean;
  onClick: (project: Project) => void;
  reducedMotion: boolean;
}

function CarouselCardComponent({
  project,
  position,
  isActive,
  onClick,
  reducedMotion,
}: CarouselCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (!isActive) {
      e.stopPropagation();
      onClick(project);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(project);
  };

  return (
    <article
      className={cn(
        'carousel-card absolute left-1/2 top-1/2',
        'bg-card border rounded-xl overflow-hidden',
        'transition-all duration-700 ease-out',
        'backface-hidden',
        isActive ? 'z-50' : '',
        reducedMotion && 'carousel-card--reduced-motion'
      )}
      style={{
        transform: reducedMotion 
          ? `translateX(-50%) translateY(-50%) scale(${position.scale})`
          : `translateX(-50%) translateY(-50%) ${formatTransform(position)}`,
        opacity: position.opacity,
        zIndex: position.zIndex,
        width: 'var(--card-width, 1000px)',
        height: 'var(--card-height, 700px)',
        backgroundColor: isActive ? 'var(--card)' : 'var(--card)',
        boxShadow: isActive
          ? '0 35px 120px rgba(0, 0, 0, 0.6)'
          : '0 20px 60px rgba(0, 0, 0, 0.3)',
        pointerEvents: isActive ? 'auto' : Math.abs(position.rotateY) <= 45 ? 'auto' : 'none',
        cursor: isActive ? 'default' : 'pointer',
      }}
      onClick={handleCardClick}
      aria-current={isActive ? 'true' : undefined}
      aria-label={`${project.title} - ${project.category}`}
    >
      {/* Image Section */}
      <div className="relative h-[55%] overflow-hidden bg-muted">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          loading={isActive ? 'eager' : 'lazy'}
        />
        
        {/* Category Badge */}
        <Badge 
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
          variant="secondary"
        >
          {project.category}
        </Badge>

        {/* Featured Indicator */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-primary">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 h-[45%] flex flex-col">
        <h3 className="text-2xl font-bold mb-3 line-clamp-2 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-base text-muted-foreground mb-4 line-clamp-3 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 6).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-sm px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 6 && (
            <Badge variant="outline" className="text-sm px-3 py-1">
              +{project.tags.length - 6}
            </Badge>
          )}
        </div>

        {/* Action Buttons - Only visible on active card */}
        {isActive && (
          <div className="flex gap-3 mt-auto">
            {project.demoUrl && (
              <Button
                size="default"
                variant="default"
                className="flex-1"
                onClick={(e) => handleLinkClick(e, project.demoUrl!)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="default"
                variant="outline"
                className="flex-1"
                onClick={(e) => handleLinkClick(e, project.githubUrl!)}
              >
                <Github className="h-4 w-4 mr-2" />
                View Source
              </Button>
            )}
            {!project.demoUrl && !project.githubUrl && (
              <Button
                size="default"
                variant="default"
                className="w-full"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export const CarouselCard = memo(CarouselCardComponent);
