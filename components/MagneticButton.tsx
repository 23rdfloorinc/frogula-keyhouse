// ============================================================================
// FROGULA KEYHOUSE - MAGNETIC BUTTON
// Physics-based hover effects with magnetic attraction
// ============================================================================

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magneticStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * magneticStrength);
    y.set(distanceY * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const variantStyles = {
    primary: `bg-purple-600 text-white hover:bg-purple-500 border-transparent`,
    secondary: `bg-white text-slate-950 hover:bg-slate-100 border-transparent`,
    outline: `bg-transparent text-purple-400 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10`,
    ghost: `bg-transparent text-slate-400 hover:text-white border-transparent hover:bg-white/5`
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg'
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-lg font-bold uppercase tracking-widest
        border transition-colors duration-300
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"
        animate={{
          x: isHovered ? ['0%', '200%'] : '0%'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut'
        }}
      />

      {/* Ripple effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  className = '',
  onClick,
  href
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      className={`
        relative group overflow-hidden rounded-full
        bg-white text-slate-950 
        px-10 py-4 font-bold uppercase tracking-widest
        transition-all duration-300
        hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow spot that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.3), transparent 50%)`
        }}
      />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 animate-spin-slow" 
          style={{ padding: '2px', filter: 'blur(4px)' }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </Component>
  );
};

export default { MagneticButton, GlowButton };
