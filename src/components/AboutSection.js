import { motion } from 'framer-motion';
import { EVENTS_DATA } from '../data/events';
import { Users, Trophy, Calendar, School } from 'lucide-react';

const ICONS = [Users, Trophy, Calendar, School];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" data-testid="about-section">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">About The Fest</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white mb-6 leading-tight">
              Where Technology<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Meets Divinity</span>
            </h2>
            <p className="font-body text-base text-white/50 leading-relaxed mb-6">
              Ekatva is the annual techfest of Shri Mata Vaishno Devi University, nestled in the sacred hills of Katra, Jammu & Kashmir. For three electrifying days, students from across India converge to compete, innovate, and celebrate the spirit of technology.
            </p>
            <p className="font-body text-base text-white/40 leading-relaxed">
              From intense hackathons and adrenaline-pumping RoboWars to cutting-edge AI workshops and immersive tech exhibitions — Ekatva is where the brightest minds push boundaries and forge the future.
            </p>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4"
          >
            {EVENTS_DATA.stats.map((stat, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(0, 240, 255, 0.2)' }}
                  className="p-4 sm:p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.06] group transition-all duration-300 hover:bg-white/[0.06]"
                  data-testid={`stat-${stat.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5 text-cyan-400/60 mb-3 group-hover:text-cyan-400 transition-colors" />
                  <p className="font-heading text-2xl md:text-3xl text-white tracking-wide mb-1">{stat.value}</p>
                  <p className="font-body text-sm text-white/40">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
