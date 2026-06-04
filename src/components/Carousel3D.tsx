import { useEffect, useMemo, useCallback, useRef } from 'react';
import { CarouselCard } from './CarouselCard';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';
import { useCarousel3D } from '@/hooks/useCarousel3D';
import { 
  calculateCardPosition, 
  getVisibleIndices, 
  supports3D,
  getCardDimensions,
} from '@/lib/carousel-utils';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface Carousel3DProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export function Carousel3D({
  projects,
  onProjectClick,
  autoplay = false,
  autoplayInterval = 5000,
  className,
}: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  
  const {
    activeIndex,
    isAnimating,
    config,
    reducedMotion,
    goToNext,
    goToPrevious,
    goToIndex,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    pauseAutoplay,
    resumeAutoplay,
  } = useCarousel3D({ projects, autoplay, autoplayInterval });

  const has3DSupport = useMemo(() => supports3D(), []);
  
  // Get card dimensions based on current viewport
  const cardDimensions = useMemo(() => {
    if (typeof window === 'undefined') return { width: 600, height: 400 };
    return getCardDimensions(window.innerWidth);
  }, []);

  // Get visible card indices
  const visibleIndices = useMemo(() => {
    return getVisibleIndices(activeIndex, projects.length, 2);
  }, [activeIndex, projects.length]);

  // Get visible projects with their positions
  const visibleProjects = useMemo(() => {
    return visibleIndices.map((index) => {
      const project = projects[index];
      const position = calculateCardPosition(index, activeIndex, config);
      return { project, position, index };
    });
  }, [visibleIndices, projects, activeIndex, config]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Home':
          e.preventDefault();
          goToIndex(0);
          break;
        case 'End':
          e.preventDefault();
          goToIndex(projects.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, goToIndex, projects.length]);

  // Handle mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
    pauseAutoplay();
  }, [handleDragStart, pauseAutoplay]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
    setTimeout(resumeAutoplay, 3000);
  }, [handleDragEnd, resumeAutoplay]);

  // Handle touch drag
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
    pauseAutoplay();
  }, [handleDragStart, pauseAutoplay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
    setTimeout(resumeAutoplay, 3000);
  }, [handleDragEnd, resumeAutoplay]);

  // Handle card click
  const handleCardClick = useCallback((project: Project, index: number) => {
    if (index === activeIndex) {
      // Center card - open detail
      onProjectClick(project);
    } else {
      // Adjacent card - bring to center
      goToIndex(index);
    }
  }, [activeIndex, onProjectClick, goToIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setTimeout(resumeAutoplay, 3000);
  }, [resumeAutoplay]);

  if (!has3DSupport && !reducedMotion) {
    // Fallback to simple view if 3D not supported
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          3D carousel not supported. Please use grid view.
        </p>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className={cn(
        'carousel-3d-container relative w-full overflow-hidden',
        'h-[700px] md:h-[850px] lg:h-[950px]',
        className
      )}
      style={{
        ['--card-width' as string]: `${cardDimensions.width}px`,
        ['--card-height' as string]: `${cardDimensions.height}px`,
      }}
      role="region"
      aria-label="Project Carousel"
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Perspective Container */}
      <div
        className={cn(
          'carousel-3d-perspective absolute inset-0',
          'flex items-center justify-center'
        )}
        style={{
          perspective: `${config.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D Stage */}
        <div
          ref={stageRef}
          className={cn(
            'carousel-3d-stage relative',
            'transition-transform duration-700 ease-out'
          )}
          style={{
            width: `${cardDimensions.width}px`,
            height: `${cardDimensions.height}px`,
            transformStyle: reducedMotion ? 'flat' : 'preserve-3d',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Render visible cards */}
          {visibleProjects.map(({ project, position, index }) => (
            <CarouselCard
              key={project.id}
              project={project}
              position={position}
              isActive={index === activeIndex}
              onClick={(p) => handleCardClick(p, index)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <CarouselControls
        onPrevious={goToPrevious}
        onNext={goToNext}
        disabled={isAnimating}
      />

      {/* Position Indicators */}
      <CarouselIndicators
        total={projects.length}
        active={activeIndex}
        onSelect={goToIndex}
      />

      {/* Skip Link for Accessibility */}
      <a
        href="#after-carousel"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip carousel
      </a>
    </section>
  );
}
