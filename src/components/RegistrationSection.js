import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar, MapPin, Users } from 'lucide-react';

const UNSTOP_URL = 'https://unstop.com'; // ← Replace with your actual Unstop registration link

export default function RegistrationSection() {
  return (
    <section id="register" className="relative py-24 md:py-32 overflow-hidden" data-testid="register-section">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">Join Us</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            Register for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ekatva 2026</span>
          </h2>
        </motion.div>

        {/* Registration CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

            <div className="relative">
              {/* Event Info */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-cyan-400/70" />
                  <span className="font-mono text-xs sm:text-sm text-white/50">March 14–16, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-400/70" />
                  <span className="font-mono text-xs sm:text-sm text-white/50">SMVDU, Katra, J&K</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-cyan-400/70" />
                  <span className="font-mono text-xs sm:text-sm text-white/50">5000+ Participants</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-xl">
                Be a part of the biggest annual tech & cultural fest of Shri Mata Vaishno Devi University. 
                Register on Unstop to secure your spot across 60+ events, workshops, and competitions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={UNSTOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="reg-unstop-btn"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading text-sm tracking-widest text-white/90 hover:text-white bg-gradient-to-r from-cyan-500/70 to-purple-600/70 hover:from-cyan-500/85 hover:to-purple-600/85 border border-cyan-400/15 hover:border-cyan-400/25 transition-all duration-300 group"
                >
                  REGISTER ON UNSTOP
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-xs tracking-widest text-white/50 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                >
                  EXPLORE EVENTS
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Powered by badge */}
              <p className="mt-8 font-mono text-[10px] tracking-widest text-white/20 uppercase">
                Powered by Unstop · Organized by BPA, SMVDU
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
