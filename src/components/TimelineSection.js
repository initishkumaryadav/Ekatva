import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS_DATA } from '../data/events';
import { Clock, MapPin, Sparkles, Calendar } from 'lucide-react';

/* ── Helpers ─────────────────────────────────────────────── */

function parseDates(dateStr) {
  const multi = dateStr.match(/^(\d{1,2})[–-](\d{1,2})\/(\d{2})\/(\d{4})$/);
  if (multi) {
    const [, s, e, m, y] = multi;
    const dates = [];
    for (let d = +s; d <= +e; d++) dates.push(new Date(+y, +m - 1, d));
    return dates;
  }
  const single = dateStr.match(/^(\d{1,2})\/(\d{2})\/(\d{4})$/);
  if (single) {
    const [, d, m, y] = single;
    return [new Date(+y, +m - 1, +d)];
  }
  return [];
}

function startMinutes(timeStr) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 0;
  let h = +m[1], min = +m[2];
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

function startLabel(timeStr) {
  const m = timeStr.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
  return m ? m[1] : timeStr;
}

/* Dept styling — text colour + subtle border accent (no harsh gradient boxes) */
const DEPT_STYLE = {
  CSE:    { text: 'text-cyan-300',    border: 'border-cyan-500/30',   bg: 'bg-cyan-500/8',    dot: '#22d3ee' },
  ECE:    { text: 'text-violet-300',  border: 'border-violet-500/30', bg: 'bg-violet-500/8',  dot: '#a78bfa' },
  EE:     { text: 'text-yellow-300',  border: 'border-yellow-500/30', bg: 'bg-yellow-500/8',  dot: '#facc15' },
  ME:     { text: 'text-rose-300',    border: 'border-rose-500/30',   bg: 'bg-rose-500/8',    dot: '#fb7185' },
  CE:     { text: 'text-amber-300',   border: 'border-amber-500/30',  bg: 'bg-amber-500/8',   dot: '#fbbf24' },
  BT:     { text: 'text-emerald-300', border: 'border-emerald-500/30',bg: 'bg-emerald-500/8', dot: '#34d399' },
  ARCH:   { text: 'text-pink-300',    border: 'border-pink-500/30',   bg: 'bg-pink-500/8',    dot: '#f472b6' },
  MATH:   { text: 'text-indigo-300',  border: 'border-indigo-500/30', bg: 'bg-indigo-500/8',  dot: '#818cf8' },
  LANG:   { text: 'text-fuchsia-300', border: 'border-fuchsia-500/30',bg: 'bg-fuchsia-500/8', dot: '#e879f9' },
  ECON:   { text: 'text-teal-300',    border: 'border-teal-500/30',   bg: 'bg-teal-500/8',    dot: '#2dd4bf' },
  PHY:    { text: 'text-sky-300',     border: 'border-sky-500/30',    bg: 'bg-sky-500/8',     dot: '#38bdf8' },
  EKATVA: { text: 'text-white',       border: 'border-cyan-400/40',   bg: 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10', dot: '#a855f7' },
};
const defaultStyle = { text: 'text-white/70', border: 'border-white/10', bg: 'bg-white/5', dot: '#666' };

/* ── Component ───────────────────────────────────────────── */

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useState(0);

  const days = useMemo(() => {
    const dateMap = new Map();

    /* Special events — Opening Ceremony is pinned first via special flag */
    const specials = [
      { date: '09/03/2026', time: '09:00 AM', name: 'Opening Ceremony', venue: 'Main Auditorium', description: 'Grand inauguration with chief guest address and cultural performances', dept: 'EKATVA', _priority: -1 },
      { date: '11/03/2026', time: '07:00 PM', name: 'Closing Ceremony', venue: 'Main Auditorium', description: 'Grand finale with prize distribution and farewell', dept: 'EKATVA', _priority: 999 },
    ];

    const allEvents = [];
    /* Add specials FIRST so they appear before dept events at same time */
    specials.forEach(e => allEvents.push(e));
    EVENTS_DATA.departmentEvents.forEach(dept => {
      dept.events.forEach(ev => allEvents.push({ ...ev, dept: dept.shortName, _priority: 0 }));
    });

    allEvents.forEach(ev => {
      parseDates(ev.date).forEach(d => {
        const key = d.toISOString().split('T')[0];
        if (!dateMap.has(key)) dateMap.set(key, { date: d, events: [] });
        dateMap.get(key).events.push(ev);
      });
    });

    const festStart = new Date(2026, 2, 9);
    const dayTitles = ['Inauguration & Kickoff', 'Competitions & Exhibitions', 'Finals & Closing', 'Encore & Wrap-Up'];

    return Array.from(dateMap.values())
      .filter(v => v.date >= festStart)
      .sort((a, b) => a.date - b.date)
      .map((v, idx) => {
        const tMap = new Map();
        v.events.forEach(ev => {
          const mins = startMinutes(ev.time);
          if (!tMap.has(mins)) tMap.set(mins, { label: startLabel(ev.time), mins, events: [] });
          tMap.get(mins).events.push(ev);
        });
        /* Sort events within each block: priority first, then alphabetical */
        const timeBlocks = Array.from(tMap.values()).sort((a, b) => a.mins - b.mins);
        timeBlocks.forEach(block => {
          block.events.sort((a, b) => (a._priority ?? 0) - (b._priority ?? 0));
        });
        return {
          day: idx + 1,
          date: v.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: dayTitles[idx] || `Day ${idx + 1}`,
          timeBlocks,
          eventCount: v.events.length,
        };
      });
  }, []);

  const dayData = days[activeDay];
  if (!dayData) return null;

  return (
    <section id="timeline" className="relative py-24 md:py-32 overflow-hidden" data-testid="timeline-section">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Heading ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4 flex items-center gap-2">
            <Calendar size={14} className="text-cyan-400/50" /> Schedule
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            {days.length}-Day{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Timeline</span>
          </h2>
          <p className="font-body text-sm text-white/30 mt-3 max-w-lg">
            Every event across all departments, organized by schedule. Events at the same time are grouped together.
          </p>
        </motion.div>

        {/* ── Day Tabs ───────────────────────────────────── */}
        <div className="flex gap-3 mb-12 flex-wrap" data-testid="timeline-day-tabs">
          {days.map((day, idx) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(idx)}
              data-testid={`timeline-day-${day.day}`}
              className={`relative px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                activeDay === idx
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 border border-white/[0.06] hover:border-white/10'
              }`}
            >
              {activeDay === idx && (
                <motion.div
                  layoutId="day-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-600/15 border border-cyan-400/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Day {day.day}
                <span className="hidden sm:inline text-white/25">/ {day.date}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[10px] text-white/40 font-mono tabular-nums">
                  {day.eventCount}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* ── Timeline Content ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Day header */}
            <div className="mb-8 flex items-end gap-4">
              <div>
                <h3 className="font-heading text-xl md:text-2xl text-white tracking-wide">{dayData.title}</h3>
                <p className="font-mono text-xs text-white/25 mt-1">{dayData.date}</p>
              </div>
              <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
            </div>

            <div className="relative">
              {/* Vertical timeline rail */}
              <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/25 via-purple-500/15 to-transparent rounded-full" />

              <div className="space-y-1">
                {dayData.timeBlocks.map((block, bi) => {
                  /* Pick the dominant dept colour for the dot */
                  const dominantDept = block.events[0]?.dept || '';
                  const dotColor = (DEPT_STYLE[dominantDept] || defaultStyle).dot;
                  const isSpecial = block.events[0]?._priority < 0 || block.events[0]?._priority > 100;

                  return (
                    <motion.div
                      key={block.label + bi}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: bi * 0.05, duration: 0.35 }}
                      className="relative pl-11 md:pl-14 py-3"
                      data-testid={`timeline-block-${bi}`}
                    >
                      {/* Glowing dot on the rail */}
                      <div className="absolute left-[9px] md:left-[13px] top-[22px] z-10">
                        <div
                          className="w-[14px] h-[14px] rounded-full border-[2.5px] bg-[#0a0a0a]"
                          style={{
                            borderColor: dotColor,
                            boxShadow: `0 0 8px ${dotColor}40, 0 0 20px ${dotColor}15`,
                          }}
                        />
                      </div>

                      {/* Time label row */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-xs font-medium text-cyan-300/90 flex items-center gap-1.5 bg-cyan-400/[0.06] px-2.5 py-1 rounded-md border border-cyan-400/[0.08]">
                          <Clock size={11} className="opacity-60" /> {block.label}
                        </span>
                        {block.events.length > 1 && (
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/35 font-mono border border-white/[0.04]">
                            {block.events.length} simultaneous
                          </span>
                        )}
                        {isSpecial && (
                          <Sparkles size={12} className="text-purple-400/60 animate-pulse" />
                        )}
                      </div>

                      {/* Event cards grid */}
                      <div className={`grid gap-3 ${
                        block.events.length === 1 ? 'grid-cols-1 max-w-2xl'
                        : block.events.length === 2 ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {block.events.map((event) => {
                          const s = DEPT_STYLE[event.dept] || defaultStyle;
                          const isCeremony = event._priority < 0 || event._priority > 100;

                          return (
                            <motion.div
                              key={event.name}
                              whileHover={{ y: -2 }}
                              transition={{ duration: 0.2 }}
                              className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
                                isCeremony
                                  ? 'bg-gradient-to-br from-cyan-500/[0.06] via-purple-500/[0.04] to-transparent border border-cyan-400/15 hover:border-cyan-400/30'
                                  : `bg-white/[0.02] border ${s.border} hover:bg-white/[0.04] hover:border-opacity-60`
                              }`}
                            >
                              {/* Subtle top accent line */}
                              <div
                                className="h-[2px] w-full opacity-40 group-hover:opacity-70 transition-opacity"
                                style={{ background: `linear-gradient(90deg, ${dotColor}60, transparent)` }}
                              />

                              <div className="p-4">
                                {/* Dept badge + time */}
                                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                                  <span className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-md text-[10px] font-mono font-medium tracking-wide ${s.bg} ${s.text} border ${s.border}`}>
                                    {event.dept}
                                  </span>
                                  <span className="font-mono text-[10px] text-white/30">{event.time}</span>
                                </div>

                                {/* Event name */}
                                <h4 className={`font-heading text-[15px] md:text-base tracking-wide leading-snug mb-1.5 ${
                                  isCeremony ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300' : 'text-white/90'
                                }`}>
                                  {isCeremony && <Sparkles size={13} className="inline mr-1.5 text-purple-400/70" />}
                                  {event.name}
                                </h4>

                                {/* Venue */}
                                <p className="font-mono text-[10px] text-white/30 flex items-center gap-1 mb-2">
                                  <MapPin size={10} className="opacity-50 shrink-0" /> {event.venue}
                                </p>

                                {/* Description */}
                                <p className="font-body text-xs text-white/25 leading-relaxed line-clamp-2 group-hover:text-white/35 transition-colors">
                                  {event.description}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
