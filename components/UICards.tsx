// ============================================================================
// FROGULA KEYHOUSE - UI COMPONENTS
// Cards, navigation, and specialized sections
// ============================================================================

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KeyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  className?: string;
  tags?: string[];
}

export const KeyCard: React.FC<KeyCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
  className = '',
  tags = []
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / 20);
    mouseY.set((centerY - e.clientY) / 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative group p-8 rounded-2xl
        bg-slate-900/40 backdrop-blur-md
        border border-slate-800/50
        overflow-hidden
        ${className}
      `}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(6,182,212,0.3) 100%)',
          padding: '1px'
        }}
      />

      {/* Inner glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-2xl transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'radial-gradient(400px circle at 50% 0%, rgba(168,85,247,0.15), transparent 50%)'
        }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <motion.div
          className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Icon className="w-7 h-7 text-purple-400" />
        </motion.div>
      </div>

      {/* Content */}
      <h3 className="relative z-10 text-xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mt-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Index number */}
      <div className="absolute top-6 right-6 font-mono text-3xl font-bold text-slate-800">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
};

interface TerminalBlockProps {
  logs: string[];
  className?: string;
  title?: string;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  logs,
  className = '',
  title = 'NEURAL_LOGS'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={`
        relative rounded-xl overflow-hidden
        bg-black/80 backdrop-blur-sm
        border border-slate-800
        ${className}
      `}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="w-16" />
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            className="flex gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <span className="text-purple-500 shrink-0">
              [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
            </span>
            <span className={`
              ${log.includes('ERROR') ? 'text-red-400' : ''}
              ${log.includes('WARN') ? 'text-yellow-400' : ''}
              ${log.includes('SUCCESS') ? 'text-green-400' : ''}
              ${!log.match(/ERROR|WARN|SUCCESS/) ? 'text-slate-300' : ''}
            `}>
              {log}
            </span>
          </motion.div>
        ))}
        
        {/* Blinking cursor */}
        <div className="flex gap-3">
          <span className="text-purple-500">
            [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
          </span>
          <span className="text-green-400">→</span>
          <span className="w-2 h-4 bg-purple-500 animate-blink" />
        </div>
      </div>

      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
          backgroundSize: '100% 4px'
        }}
      />
    </motion.div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative p-6 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2"
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-slate-500 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
};

export default { KeyCard, TerminalBlock, StatCard };
