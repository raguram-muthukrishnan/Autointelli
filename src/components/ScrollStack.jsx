import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

// Easing function for smooth animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Debug instrumentation (set to true to enable logging)
const DEBUG = false;
const debugLog = (...args) => DEBUG && console.log('[ScrollStack]', ...args);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const rafScheduledRef = useRef(false);
  const rafIdRef = useRef(null);
  const lenisRef = useRef(null);
  
  // Cached measurements (computed once, reused every frame)
  const cachedMeasurementsRef = useRef({
    cards: [],
    cardOffsets: [],
    endElementOffset: 0,
    containerHeight: 0,
    stackPositionPx: 0,
    scaleEndPositionPx: 0,
    cardPinRanges: [] // Per-card pin start/end
  });
  
  // Last applied transforms (for change detection)
  const lastTransformsRef = useRef(new Map());
  
  // Smoothed values for lerp interpolation
  const smoothedValuesRef = useRef(new Map());
  
  // Stable callback refs (prevent re-renders)
  const onStackCompleteRef = useRef(onStackComplete);
  useLayoutEffect(() => {
    onStackCompleteRef.current = onStackComplete;
  }, [onStackComplete]);
  
  // Performance instrumentation
  const perfRef = useRef({
    frameCount: 0,
    lastFpsLog: performance.now(),
    layoutReadCount: 0
  });

  // Parse percentage to pixels
  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  // Calculate progress with easing
  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    const linear = (scrollTop - start) / (end - start);
    return easeOutCubic(linear); // Apply easing
  };

  // Cache all measurements (called on mount and resize)
  const cacheMeasurements = () => {
    debugLog('Caching measurements...');
    perfRef.current.layoutReadCount = 0;
    
    const cache = cachedMeasurementsRef.current;
    const containerHeight = useWindowScroll ? window.innerHeight : scrollerRef.current?.clientHeight || 0;
    perfRef.current.layoutReadCount++;
    
    cache.containerHeight = containerHeight;
    cache.stackPositionPx = parsePercentage(stackPosition, containerHeight);
    cache.scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    
    // Get all cards
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scrollerRef.current?.querySelectorAll('.scroll-stack-card') || []
    );
    cache.cards = cards;
    
    // Cache card offsets (one layout read per card)
    cache.cardOffsets = cards.map(card => {
      perfRef.current.layoutReadCount++;
      if (useWindowScroll) {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return card.offsetTop;
    });
    
    // Cache end element offset
    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    
    if (endElement) {
      perfRef.current.layoutReadCount++;
      if (useWindowScroll) {
        const rect = endElement.getBoundingClientRect();
        cache.endElementOffset = rect.top + window.scrollY;
      } else {
        cache.endElementOffset = endElement.offsetTop;
      }
    }
    
    // Pre-calculate per-card pin ranges
    cache.cardPinRanges = cache.cardOffsets.map((cardTop, i) => {
      const pinStart = cardTop - cache.stackPositionPx - itemStackDistance * i;
      // Each card has its own pinEnd based on its position + spacing
      const pinEnd = cache.endElementOffset - containerHeight / 2 - (cache.cards.length - 1 - i) * itemStackDistance;
      return { pinStart, pinEnd };
    });
    
    debugLog(`Cached ${cache.cards.length} cards, ${perfRef.current.layoutReadCount} layout reads`);
  };

  // Update transforms (called in RAF callback)
  const updateCardTransforms = () => {
    const cache = cachedMeasurementsRef.current;
    if (!cache.cards.length) return;
    
    // PHASE 1: READ - Get current scroll position (only read)
    const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
    
    // PHASE 2: COMPUTE - Calculate all transforms (no DOM access)
    const transforms = [];
    let topCardIndex = 0;
    
    // First pass: determine top card index (for blur calculation)
    for (let i = 0; i < cache.cards.length; i++) {
      const cardTop = cache.cardOffsets[i];
      const triggerStart = cardTop - cache.stackPositionPx - itemStackDistance * i;
      if (scrollTop >= triggerStart) {
        topCardIndex = i;
      }
    }
    
    // Second pass: calculate transforms for all cards
    for (let i = 0; i < cache.cards.length; i++) {
      const cardTop = cache.cardOffsets[i];
      const { pinStart, pinEnd } = cache.cardPinRanges[i];
      
      // Calculate scale progress
      const triggerStart = cardTop - cache.stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - cache.scaleEndPositionPx;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      
      // Remove rotation to prevent horizontal shifting
      const rotation = 0;
      
      // Calculate blur (no nested loops, use cached topCardIndex)
      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }
      
      // Reduce opacity for cards behind the top card
      let opacity = 1;
      if (i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        opacity = Math.max(0.3, 1 - depthInStack * 0.25); // More transparent for cards behind (0.3 to 1.0)
      } else if (i === topCardIndex) {
        opacity = 1; // Front card is fully opaque
      } else {
        opacity = 0.95; // Cards ahead are slightly transparent
      }
      
      // Calculate translateY
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + cache.stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + cache.stackPositionPx + itemStackDistance * i;
      }
      
      // Get or initialize smoothed values for this card
      let smoothed = smoothedValuesRef.current.get(i);
      if (!smoothed) {
        smoothed = {
          translateY: translateY,
          scale: scale,
          opacity: opacity,
          blur: blur
        };
        smoothedValuesRef.current.set(i, smoothed);
      }
      
      // Apply lerp smoothing (0.15 = smooth but responsive)
      const lerpFactor = 0.15;
      smoothed.translateY += (translateY - smoothed.translateY) * lerpFactor;
      smoothed.scale += (scale - smoothed.scale) * lerpFactor;
      smoothed.opacity += (opacity - smoothed.opacity) * lerpFactor;
      smoothed.blur += (blur - smoothed.blur) * lerpFactor;
      
      // Round to whole pixels to prevent sub-pixel jitter
      transforms.push({
        index: i,
        translateY: Math.round(smoothed.translateY), // Whole pixels only
        translateX: 0, // Ensure no horizontal shift
        scale: Math.round(smoothed.scale * 1000) / 1000, // 3 decimal precision
        blur: Math.round(smoothed.blur * 2) / 2, // Round to 0.5px increments
        opacity: Math.round(smoothed.opacity * 100) / 100, // 2 decimal precision
        isPinned
      });
    }
    
    // PHASE 3: WRITE - Apply all transforms (batched DOM writes)
    for (const transform of transforms) {
      const card = cache.cards[transform.index];
      if (!card) continue;
      
      const lastTransform = lastTransformsRef.current.get(transform.index);
      
      // Only update if changed (whole pixel threshold with tighter tolerance)
      const hasChanged =
        !lastTransform ||
        lastTransform.translateY !== transform.translateY ||
        Math.abs(lastTransform.scale - transform.scale) > 0.002 ||
        lastTransform.blur !== transform.blur ||
        Math.abs(lastTransform.opacity - transform.opacity) > 0.01;
      
      if (hasChanged) {
        // Use translate3d with explicit 0 for X and Z for GPU acceleration
        const transformStr = `translate3d(0px, ${transform.translateY}px, 0px) scale(${transform.scale})`;
        const filterStr = transform.blur > 0 ? `blur(${transform.blur}px)` : 'none';
        
        // Apply transform with GPU acceleration (force composite layer)
        card.style.transform = transformStr;
        card.style.filter = filterStr;
        card.style.opacity = transform.opacity;
        
        // Store applied transform
        lastTransformsRef.current.set(transform.index, transform);
      }
    }
    
    // Check stack completion (last card)
    const lastTransform = transforms[transforms.length - 1];
    if (lastTransform) {
      if (lastTransform.isPinned && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackCompleteRef.current?.();
      } else if (!lastTransform.isPinned && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
    
    // Performance tracking
    perfRef.current.frameCount++;
    const now = performance.now();
    if (now - perfRef.current.lastFpsLog > 1000) {
      debugLog(`FPS: ${perfRef.current.frameCount}, Layout reads: ${perfRef.current.layoutReadCount}`);
      perfRef.current.frameCount = 0;
      perfRef.current.lastFpsLog = now;
      perfRef.current.layoutReadCount = 0;
    }
  };

  // Continuous RAF loop for smooth updates
  const startAnimationLoop = () => {
    const animate = () => {
      updateCardTransforms();
      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);
  };
  
  const stopAnimationLoop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };
  
  // Scroll handler (just marks that scroll happened, RAF handles updates)
  const handleScroll = () => {
    // RAF loop handles all updates continuously
    // No need to schedule here - loop is always running
  };

  // Setup scroll listener (stable, no dependencies)
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    
    // Initialize cards
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });
    
    // Cache measurements
    cacheMeasurements();
    
    // Setup scroll listener (passive, no RAF scheduling here)
    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });
      
      lenis.on('scroll', handleScroll);
      
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      
      lenisRef.current = lenis;
    }
    
    // Setup resize observer to recache measurements
    const resizeObserver = new ResizeObserver(() => {
      debugLog('Resize detected, recaching measurements');
      cacheMeasurements();
    });
    
    resizeObserver.observe(document.body);
    
    // Initial update
    updateCardTransforms();
    
    // Start continuous RAF loop for smooth updates
    startAnimationLoop();
    
    // Cleanup
    return () => {
      stopAnimationLoop();
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      resizeObserver.disconnect();
      stackCompletedRef.current = false;
      lastTransformsRef.current.clear();
      smoothedValuesRef.current.clear();
      rafScheduledRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - stable setup

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
