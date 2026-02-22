import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS_DATA } from '../data/events';
import { Clock, MapPin } from 'lucide-react';

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useState(1);
  const dayData = EVENTS_DATA.timeline.find(d => d.day === activeDay);

  return (
    <section id="timeline" className="relative py-24 md:py-32 overflow-hidden" data-testid="timeline-section">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">Schedule</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            3-Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Timeline</span>
          </h2>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex gap-3 mb-12 flex-wrap" data-testid="timeline-day-tabs">
          {EVENTS_DATA.timeline.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              data-testid={`timeline-day-${day.day}`}
              className={`relative px-6 py-3 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                activeDay === day.day
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 border border-white/5 hover:border-white/10'
              }`}
            >
              {activeDay === day.day && (
                <motion.div
                  layoutId="day-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                Day {day.day} <span className="hidden sm:inline text-white/30 ml-1">/ {day.date}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="font-heading text-xl md:text-2xl text-white tracking-wide">{dayData.title}</h3>
              <p className="font-mono text-xs text-white/30 mt-1">{dayData.date}</p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent" />

              <div className="space-y-1">
                {dayData.events.map((event, i) => (
                  <motion.div
                    key={event.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative pl-10 md:pl-14 py-4 group"
                    data-testid={`timeline-event-${i}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-1.5 md:left-2.5 top-6 w-3 h-3 rounded-full border-2 border-cyan-400/40 bg-[#050505] group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300" />

                    <div className="p-4 md:p-6 rounded-xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.05] group-hover:border-white/[0.1] transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-cyan-400/70 flex items-center gap-1">
                          <Clock size={12} /> {event.time}
                        </span>
                        <span className="font-mono text-xs text-purple-400/50 flex items-center gap-1">
                          <MapPin size={12} /> {event.venue}
                        </span>
                      </div>
                      <h4 className="font-heading text-base md:text-lg text-white tracking-wide mb-1">{event.name}</h4>
                      <p className="font-body text-sm text-white/40">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
