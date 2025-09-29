import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.2, // Smooth scroll duration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical', // Vertical scroll only
      gestureDirection: 'vertical', // Vertical gesture
      smooth: true, // Enable smooth scrolling
      mouseMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Don't loop
      autoRaf: true, // Auto requestAnimationFrame
      raf: (callback: FrameRequestCallback) => requestAnimationFrame(callback), // Custom RAF
    });

    // RAF loop for smooth scrolling
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return lenisRef.current;
};
