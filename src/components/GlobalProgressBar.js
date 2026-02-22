import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function GlobalProgressBar() {
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
      setXp(Math.floor(scrollPercent * 10));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1" data-testid="global-progress-bar">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      {/* XP Counter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: progress > 2 ? 1 : 0, x: 0 }}
        className="fixed top-3 right-4 z-[61] hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/60 border border-cyan-400/20"
        data-testid="xp-counter"
      >
        <Zap size={12} className="text-yellow-400" />
        <span className="font-mono text-[10px] text-cyan-400 tracking-wider">{xp} XP</span>
      </motion.div>
    </div>
  );
}
