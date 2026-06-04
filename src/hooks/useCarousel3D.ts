import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getCarouselConfig,
  calculateSwipe,
  normalizeIndex,
  debounce,
  prefersReducedMotion,
} from '@/lib/carousel-utils';
import type { Project } from '@/types';

export interface UseCarousel3DProps {
  projects: Project[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export interface UseCarousel3DReturn {
  activeIndex: number;
  isAnimating: boolean;
  config: ReturnType<typeof getCarouselConfig>;
  reducedMotion: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  handleDragStart: (clientX: number) => void;
  handleDragMove: (clientX: number) => void;
  handleDragEnd: () => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  currentX: number;
  threshold: number;
}

export function useCarousel3D({
  projects,
  autoplay = false,
  autoplayInterval = 5000,
}: UseCarousel3DProps): UseCarousel3DReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [config, setConfig] = useState(() => getCarouselConfig(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  ));
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    threshold: 50,
  });
  
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayPausedRef = useRef(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update config on window resize
  useEffect(() => {
    const handleResize = debounce(() => {
      setConfig(getCarouselConfig(window.innerWidth));
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Navigate to next project
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => normalizeIndex(prev + 1, projects.length));
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, [isAnimating, projects.length]);

  // Navigate to previous project
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => normalizeIndex(prev - 1, projects.length));
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, [isAnimating, projects.length]);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(normalizeIndex(index, projects.length));
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, [isAnimating, activeIndex, projects.length]);

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    dragStateRef.current = {
      isDragging: true,
      startX: clientX,
      currentX: clientX,
      threshold: 50,
    };
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!dragStateRef.current.isDragging) return;
    dragStateRef.current.currentX = clientX;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragStateRef.current.isDragging) return;
    
    const { startX, currentX } = dragStateRef.current;
    const swipe = calculateSwipe(startX, currentX, dragStateRef.current.threshold);
    
    if (swipe.direction === 'left') {
      goToNext();
    } else if (swipe.direction === 'right') {
      goToPrevious();
    }
    
    dragStateRef.current.isDragging = false;
  }, [goToNext, goToPrevious]);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (!autoplay || autoplayPausedRef.current) return;
    
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    
    autoplayTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, goToNext]);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedRef.current = true;
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    autoplayPausedRef.current = false;
    startAutoplay();
  }, [startAutoplay]);

  // Setup and cleanup autoplay
  useEffect(() => {
    if (autoplay && !isAnimating) {
      startAutoplay();
    }
    
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, isAnimating, startAutoplay]);

  // Cleanup animation timeout
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return {
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
  };
}
