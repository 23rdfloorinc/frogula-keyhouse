// ============================================================================
// FROGULA KEYHOUSE - CUSTOM CURSOR WITH TRAIL
// Magnetic effects, blend modes, and context-aware states
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for cursor
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trail follows with more lag
  const trailSpringConfig = { damping: 30, stiffness: 150, mass: 1 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.dataset.cursor === 'pointer';

      const hasCursorText = target.dataset.cursorText;

      setIsHovering(isInteractive);
      setIsPointer(isInteractive);
      setCursorText(hasCursorText || '');
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="rounded-full bg-white flex items-center justify-center"
          animate={{
            width: cursorText ? 80 : isHovering ? 60 : 12,
            height: cursorText ? 80 : isHovering ? 60 : 12,
            opacity: isPointer ? 1 : 0.9
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300
          }}
        >
          {cursorText && (
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isHovering ? 0.5 : 0.3
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 200
          }}
        />
      </motion.div>

      {/* Trail */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <div 
          className="w-8 h-8 rounded-full bg-purple-500/20 blur-md"
          style={{ transform: 'scale(0.5)' }}
        />
      </motion.div>

      {/* Hide default cursor on all interactive elements */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        a, button, [role="button"], input, textarea, select, [data-cursor="pointer"] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
