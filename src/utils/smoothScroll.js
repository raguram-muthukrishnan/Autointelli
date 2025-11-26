import Lenis from 'lenis';

let lenisInstance = null;

export const initSmoothScroll = () => {
  // Only initialize once
  if (lenisInstance) return lenisInstance;

  // Create Lenis instance for smooth scrolling
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    autoResize: true
  });

  // RAF loop for Lenis
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenisInstance;
};

export const destroySmoothScroll = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

export const getLenisInstance = () => lenisInstance;
