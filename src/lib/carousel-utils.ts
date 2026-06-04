/**
 * 3D Carousel utility functions for positioning, animations, and calculations
 */

export interface CarouselPosition {
  rotateY: number;
  translateZ: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export interface CarouselConfig {
  radius: number;
  angleStep: number;
  perspective: number;
}

/**
 * Get carousel configuration based on viewport width
 */
export function getCarouselConfig(width: number): CarouselConfig {
  if (width >= 1024) {
    // Desktop
    return {
      radius: 1400,
      angleStep: 26,
      perspective: 2200,
    };
  } else if (width >= 640) {
    // Tablet
    return {
      radius: 1100,
      angleStep: 30,
      perspective: 1800,
    };
  } else {
    // Mobile
    return {
      radius: 900,
      angleStep: 33,
      perspective: 1500,
    };
  }
}

/**
 * Calculate card position in 3D space
 */
export function calculateCardPosition(
  index: number,
  activeIndex: number,
  config: CarouselConfig
): CarouselPosition {
  const position = index - activeIndex;
  const absPosition = Math.abs(position);
  
  // Calculate rotation angle
  const rotateY = position * config.angleStep;
  
  // Calculate scale based on distance from center
  const scale = calculateScale(absPosition);
  
  // Calculate opacity based on distance from center
  const opacity = calculateOpacity(absPosition);
  
  // Calculate z-index for proper layering
  const zIndex = calculateZIndex(absPosition);
  
  return {
    rotateY,
    translateZ: -config.radius,
    scale,
    opacity,
    zIndex,
  };
}

/**
 * Calculate scale based on distance from center
 */
export function calculateScale(distance: number): number {
  switch (distance) {
    case 0:
      return 1.0; // Center card
    case 1:
      return 0.85; // Adjacent cards
    case 2:
      return 0.6; // Distant cards
    default:
      return 0.4; // Very distant cards (usually hidden)
  }
}

/**
 * Calculate opacity based on distance from center
 */
export function calculateOpacity(distance: number): number {
  switch (distance) {
    case 0:
      return 1.0; // Center card - fully opaque, blocks everything behind
    case 1:
      return 0.3; // Adjacent cards - very transparent
    case 2:
      return 0.1; // Distant cards - barely visible
    default:
      return 0; // Very distant cards (hidden)
  }
}

/**
 * Calculate z-index based on distance from center
 */
export function calculateZIndex(distance: number): number {
  switch (distance) {
    case 0:
      return 10; // Center card on top
    case 1:
      return 5; // Adjacent cards
    case 2:
      return 1; // Distant cards
    default:
      return 0; // Very distant cards
  }
}

/**
 * Get visible card indices (center ± 2)
 */
export function getVisibleIndices(
  activeIndex: number,
  totalCards: number,
  visibleRange: number = 2
): number[] {
  const indices: number[] = [];
  
  for (let i = -visibleRange; i <= visibleRange; i++) {
    const index = (activeIndex + i + totalCards) % totalCards;
    indices.push(index);
  }
  
  return indices;
}

/**
 * Normalize index to wrap around
 */
export function normalizeIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

/**
 * Check if 3D transforms are supported
 */
export function supports3D(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return CSS.supports('transform-style', 'preserve-3d');
  } catch {
    return false;
  }
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce function for resize events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Calculate swipe direction and distance
 */
export interface SwipeResult {
  direction: 'left' | 'right' | 'none';
  distance: number;
}

export function calculateSwipe(
  startX: number,
  endX: number,
  threshold: number = 50
): SwipeResult {
  const distance = endX - startX;
  const absDistance = Math.abs(distance);
  
  if (absDistance < threshold) {
    return { direction: 'none', distance: 0 };
  }
  
  return {
    direction: distance > 0 ? 'right' : 'left',
    distance: absDistance,
  };
}

/**
 * Get card dimensions based on viewport
 */
export function getCardDimensions(width: number): { width: number; height: number } {
  if (width >= 1024) {
    return { width: 1000, height: 700 };
  } else if (width >= 640) {
    return { width: 700, height: 550 };
  } else {
    return { width: Math.min(width * 0.92, 550), height: 480 };
  }
}

/**
 * Format transform string for card positioning
 */
export function formatTransform(position: CarouselPosition): string {
  return `rotateY(${position.rotateY}deg) translateZ(${position.translateZ}px) scale(${position.scale})`;
}
