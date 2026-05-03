// ============================================================================
// FROGULA KEYHOUSE - MAIN LANDING PAGE
// Awwwards-caliber immersive experience
// ============================================================================

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Brain, Globe, ShieldCheck, BarChart3, Network, 
  Terminal, Zap, ChevronRight, Key, Command,
  Database, Lock, Eye, Activity, Cpu, ArrowRight
} from 'lucide-react';

// Components
import { Scene3D } from '../components/Scene3D';
import { CustomCursor } from '../components/CustomCursor';
import { MagneticButton, GlowButton } from '../components/MagneticButton';
import { KeyCard, TerminalBlock, StatCard } from '../components/UICards';
import { ScrambleText, SplitText, TypewriterText, RevealText } from '../components/TextAnimations';

// ============================================================================
// DATA
// ============================================================================

const keysData = [
  {
    icon: Brain,
    title: 'HeadKey',
    description: 'Neural orchestration engine. Coordinates multi-agent workflows with adaptive decision trees.',
    tags: ['AI', 'Planning', 'Coordination']
  },
  {
    icon: Database,
    title: 'VaultKey',
    description: 'Secure credential vault with zero-knowledge encryption and biometric access controls.',
    tags: ['Security', 'Encryption', 'Access']
  },
  {
    icon: Globe,
    title: 'AnywhereKey',
    description: 'Universal API gateway. Connect to any service with adaptive protocol translation.',
    tags: ['API', 'Integration', 'Cloud']
  },
  {
    icon: Eye,
    title: 'GhostKey',
    description: 'Anomaly detection and behavioral analysis. Identifies threats before they materialize.',
    tags: ['Analysis', 'ML', 'Detection']
  },
  {
    icon: ShieldCheck,
    title: 'ThornKey',
    description: 'Active defense perimeter. Real-time threat mitigation with autonomous response.',
    tags: ['Defense', 'Security', 'Auto']
  },
  {
    icon: Activity,
    title: 'PulseKey',
    description: 'System health monitoring with predictive maintenance and performance optimization.',
    tags: ['Health', 'Monitor', 'Metrics']
  }
];

const statsData = [
  { value: '23', label: 'Sub-Agents' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<50ms', label: 'Latency' },
  { value: '∞', label: 'Scale' }
];

const systemLogs = [
  'Initializing FROGULA CORE v3.0.0...',
  'SUCCESS: Loaded 23 specialized sub-agents',
  '[HeadKey] Neural orchestration active',
  '[ThornKey] Defensive perimeter established',
  '[VaultKey] Encryption keys generated',
  '[GhostKey] Anomaly baseline calibrated',
  '[AnywhereKey] API gateway online',
  'System ready. Awaiting commands.'
];

// ============================================================================
// LOADING SCREEN
// ============================================================================

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Logo */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <Key className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-black tracking-widest text-white">
            FROGULA<span className="text-purple-500">.</span>KEYHOUSE
          </span>
        </div>
      </motion.div>

      {/* Loading bar */}
      <div className="w-72 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Status text */}
      <motion.div
        className="mt-6 font-mono text-sm text-slate-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {progress < 30 && 'Initializing neural networks...'}
        {progress >= 30 && progress < 60 && 'Loading sub-agent modules...'}
        {progress >= 60 && progress < 90 && 'Calibrating security protocols...'}
        {progress >= 90 && 'System ready'}
      </motion.div>

      {/* Progress percentage */}
      <div className="mt-2 font-mono text-purple-400 text-lg">
        {Math.min(Math.round(progress), 100)}%
      </div>
    </motion.div>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.a 
          href="#"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <Key className="w-6 h-6 text-purple-500 transition-transform group-hover:rotate-45" />
          <span className="font-bold tracking-widest text-white text-sm md:text-base">
            FROGULA<span className="text-purple-500">.</span>KEYHOUSE
          </span>
        </motion.a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-mono">
          {['ARCHIVE', 'GRIMOIRE', 'DOCS'].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="relative text-slate-400 hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton variant="primary" size="sm">
          <Command className="w-4 h-4" />
          Connect
        </MagneticButton>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <ScrambleText 
            text="SOVEREIGN INTELLIGENCE SYSTEM"
            className="text-purple-400 text-sm tracking-[0.3em]"
            delay={0.5}
          />
        </motion.div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none">
          <SplitText delay={0.3} staggerDelay={0.05}>
            SOVEREIGN
          </SplitText>
          <br />
          <SplitText delay={0.5} staggerDelay={0.05}>
            CORE
          </SplitText>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          An experimental dashboard for visualizing multi-agent intelligence.
          <br />
          <span className="text-purple-500 font-mono text-base md:text-lg">
            Part Archive • Part Playground • Part War Room
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <GlowButton href="#matrix">
            Enter The Keyhouse
            <ArrowRight className="w-5 h-5" />
          </GlowButton>
          
          <MagneticButton variant="outline" size="md">
            <Zap className="w-4 h-4" />
            Watch Demo
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 text-slate-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          className="font-mono text-xs text-slate-600 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
            FROGULA_KEYHOUSE_v3.0.0
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// KEYS MATRIX SECTION
// ============================================================================

const KeysMatrixSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="matrix" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <RevealText direction="up">
              <span className="text-purple-500 font-mono text-sm tracking-widest mb-4 block">
                [CLASS: CORE]
              </span>
            </RevealText>
            
            <RevealText direction="up" delay={0.1}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                THE KEY MATRIX
              </h2>
            </RevealText>
            
            <RevealText direction="up" delay={0.2}>
              <p className="text-slate-400 max-w-lg">
                23 specialized sub-agents working in harmony. Each key unlocks 
                a different dimension of intelligence.
              </p>
            </RevealText>
          </div>

          <div className="hidden md:block">
            <TypewriterText 
              text="[SYSTEM: ONLINE]"
              className="font-mono text-green-400 text-sm"
              delay={0.5}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keysData.map((key, i) => (
            <KeyCard
              key={key.title}
              icon={key.icon}
              title={key.title}
              description={key.description}
              index={i}
              tags={key.tags}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800/50 pt-12">
          {statsData.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// NEURAL LOGS SECTION
// ============================================================================

const NeuralLogsSection = () => {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <RevealText direction="left">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-green-500" />
                <span className="text-green-500 font-mono text-sm tracking-widest">
                  SYSTEM_METRICS
                </span>
              </div>
            </RevealText>

            <RevealText direction="left" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                NEURAL LOGS
              </h2>
            </RevealText>

            <RevealText direction="left" delay={0.2}>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Real-time visibility into the internal monologue of the FROGULA Core. 
                Track the decision-making pipeline from <span className="text-purple-400">HeadKey</span> {' '}
                to <span className="text-cyan-400">PulseKey</span> with complete transparency.
              </p>
            </RevealText>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: Activity, title: 'Phase Tracking', desc: 'Monitor execution in real-time' },
                { icon: Network, title: 'Dependency Mapping', desc: 'Visualize agent relationships' },
                { icon: Lock, title: 'Audit Trail', desc: 'Complete logging for compliance' }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <TerminalBlock 
            logs={systemLogs}
            title="LIVE_TELEMETRY"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// VISUALIZER SECTION
// ============================================================================

const VisualizerSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-cyan-500 font-mono text-sm tracking-widest mb-4 block">
              [INTERFACE: ACTIVE]
            </span>
          </RevealText>
          
          <RevealText delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              VISUALIZER ENGINE
            </h2>
          </RevealText>
          
          <RevealText delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Experience your data in three dimensions. The Visualizer Engine 
              transforms complex intelligence into intuitive spatial representations.
            </p>
          </RevealText>
        </div>

        {/* Visualizer preview */}
        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-cyan-900/20" />
          
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Central visual element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full border border-purple-500/20" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full border border-cyan-500/20" />
              </motion.div>

              {/* Center icon */}
              <motion.div
                className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px rgba(168,85,247,0.3)',
                    '0 0 40px rgba(168,85,247,0.5)',
                    '0 0 20px rgba(168,85,247,0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cpu className="w-10 h-10 text-purple-400" />
              </motion.div>

              {/* Orbiting dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-cyan-400"
                  style={{
                    top: '50%',
                    left: '50%'
                  }}
                  animate={{
                    x: Math.cos(i * Math.PI / 3) * 120 - 6,
                    y: Math.sin(i * Math.PI / 3) * 120 - 6,
                  }}
                  transition={{
                    duration: 0.1
                  }}
                />
              ))}
            </div>
          </div>

          {/* Overlay UI */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs text-slate-400">
                LIVE_PREVIEW
              </span>
            </div>
            <div className="font-mono text-xs text-slate-500">
              RES: 1920x1080 | FPS: 60
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-cyan-400">
                  DEMON_KEY // PREVIEW_ENGINE
                </span>
                <span className="text-xs text-slate-600">|</span>
                <span className="font-mono text-xs text-slate-500">
                  Waiting for input stream...
                </span>
              </div>
              <MagneticButton variant="ghost" size="sm">
                Launch
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
              backgroundSize: '100% 4px'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
  return (
    <footer className="relative py-20 px-6 border-t border-slate-900">
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Key className="w-6 h-6 text-slate-600" />
            <span className="font-bold tracking-widest text-slate-400">
              FROGULA.KEYHOUSE
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm font-mono">
            {['TWITTER', 'GITHUB', 'DISCORD', 'LINKEDIN'].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="text-slate-500 hover:text-purple-500 transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-700 font-mono">
            © 2024 FROGULA CORP.
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function FrogulaLanding() {
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 3D Background */}
      <Scene3D />

      {/* Main content */}
      <main 
        className={`
          relative z-10 min-h-screen
          bg-slate-950 text-slate-200
          selection:bg-purple-500 selection:text-white
          ${isLoading ? 'overflow-hidden' : ''}
        `}
      >
        <Navigation />
        <HeroSection />
        <KeysMatrixSection />
        <NeuralLogsSection />
        <VisualizerSection />
        <Footer />
      </main>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 2px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite reverse;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </>
  );
}
