import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Scene = lazy(() => import('./Scene'));

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<HeroFallback />}>
          <Scene />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-[#050505] to-transparent" />

      {/* Content */}
      <div className="relative z-[2] text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-cyan-400/80 mb-4 uppercase">
            Shri Mata Vaishno Devi University Presents
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider sm:tracking-widest text-white mb-6"
          data-testid="hero-title"
        >
          <span className="inline-block drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">EKATVA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-base md:text-lg text-white/50 mb-2 tracking-wide"
        >
          The Annual Techfest
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-mono text-xs md:text-sm text-purple-400/70 tracking-[0.2em] mb-10"
        >
          MARCH 9 - 11, 2026 &bull; KATRA, J&K
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="hero-register-btn"
            className="group relative px-8 py-4 rounded-full font-body text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/80 to-purple-600/80 group-hover:from-cyan-500/90 group-hover:to-purple-600/90 transition-all duration-300" />
            <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/40" />
            <span className="relative z-10 text-white/90 group-hover:text-white font-semibold transition-colors">Register Now</span>
          </button>
          <button
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="hero-explore-btn"
            className="px-8 py-4 rounded-full font-body text-sm tracking-wider uppercase border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
          >
            Explore Events
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
