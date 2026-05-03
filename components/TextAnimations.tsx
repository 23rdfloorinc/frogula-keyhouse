// ============================================================================
// FROGULA KEYHOUSE - ADVANCED TEXT ANIMATIONS
// Character-by-character reveals, kinetic typography, and scramble effects
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  duration = 2000 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, duration / (text.length * 3));

    return () => clearInterval(interval);
  }, [isInView, text, duration]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: 'chars' | 'words';
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  type = 'chars'
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  const items = type === 'chars' ? children.split('') : children.split(' ');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{ perspective: '1000px' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  speed = 50,
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText}
      {showCursor && isInView && displayText.length < text.length && (
        <span className="animate-blink">|</span>
      )}
      {showCursor && displayText.length === text.length && (
        <span className="animate-blink opacity-50">|</span>
      )}
    </span>
  );
};

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 }
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ 
          opacity: 0, 
          ...directionMap[direction] 
        }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0, 
          y: 0 
        } : {}}
        transition={{ 
          duration, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default {
  ScrambleText,
  SplitText,
  GlitchText,
  TypewriterText,
  RevealText
};
