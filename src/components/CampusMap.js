import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ExternalLink, ChevronRight, Building2, Users } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { buildVenueEventMap } from '../data/venues';

export default function CampusMap() {
  const [activeVenue, setActiveVenue] = useState(null);
  const [expandedDept, setExpandedDept] = useState(null);

  // Auto-build venue → events map from data files
  const venueData = useMemo(
    () => buildVenueEventMap(EVENTS_DATA.departmentEvents),
    []
  );

  // Group events by department for the active venue
  const groupedEvents = useMemo(() => {
    if (!activeVenue) return [];
    const groups = {};
    activeVenue.events.forEach(ev => {
      if (!groups[ev.shortName]) {
        groups[ev.shortName] = {
          department: ev.department,
          shortName: ev.shortName,
          iconColor: ev.iconColor,
          events: [],
        };
      }
      groups[ev.shortName].events.push(ev);
    });
    return Object.values(groups);
  }, [activeVenue]);

  return (
    <section id="campus" className="relative py-16 sm:py-20 md:py-32 overflow-hidden" data-testid="campus-section">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-3 sm:mb-4">
            Venue Map
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider text-white">
            Campus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Venues
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-white/40 mt-3 sm:mt-4 max-w-xl">
            SMVDU Campus, Katra, J&K — Tap a venue marker to see events & registration links.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── MAP PANEL ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]"
            style={{ paddingBottom: 'min(60%, 400px)', minHeight: '320px' }}
            data-testid="campus-map-container"
          >
            <div className="absolute inset-0">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Topographic contours */}
              <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="40" cy="40" rx="25" ry="20" fill="none" stroke="#00F0FF" strokeWidth="0.2" />
                <ellipse cx="40" cy="40" rx="35" ry="28" fill="none" stroke="#00F0FF" strokeWidth="0.15" />
                <ellipse cx="60" cy="60" rx="20" ry="15" fill="none" stroke="#BD00FF" strokeWidth="0.2" />
                <ellipse cx="60" cy="60" rx="30" ry="25" fill="none" stroke="#BD00FF" strokeWidth="0.15" />
              </svg>

              {/* Roads */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 50 Q 30 30 50 40 T 90 35" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M 20 20 Q 40 50 50 60 T 80 80" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M 5 70 Q 30 60 50 65 T 95 55" fill="none" stroke="#ffffff" strokeWidth="0.3" strokeDasharray="1,2" />
              </svg>

              {/* Venue markers — auto-generated from data */}
              {venueData.map((venue, i) => {
                const isActive = activeVenue?.id === venue.id;
                return (
                  <motion.button
                    key={venue.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 200 }}
                    onClick={() => {
                      setActiveVenue(isActive ? null : venue);
                      setExpandedDept(null);
                    }}
                    className="absolute group z-10 p-2 -m-2"
                    style={{ left: `${venue.x}%`, top: `${venue.y}%`, transform: 'translate(-50%, -50%)' }}
                    data-testid={`campus-venue-${venue.id}`}
                  >
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 w-7 h-7 sm:w-9 sm:h-9 -m-1 rounded-full animate-ping"
                      style={{
                        backgroundColor: `${venue.color}15`,
                        animationDuration: '3s',
                      }}
                    />

                    {/* Marker dot */}
                    <div
                      className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? venue.color : 'rgba(255,255,255,0.08)',
                        border: `1.5px solid ${isActive ? venue.color : `${venue.color}50`}`,
                        boxShadow: isActive ? `0 0 20px ${venue.color}60` : 'none',
                      }}
                    >
                      <MapPin size={10} style={{ color: isActive ? '#000' : `${venue.color}BB` }} />
                    </div>

                    {/* Label */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-7 sm:top-8 whitespace-nowrap pointer-events-none">
                      <span
                        className="font-mono text-[7px] sm:text-[9px] transition-colors"
                        style={{ color: isActive ? `${venue.color}CC` : 'rgba(255,255,255,0.35)' }}
                      >
                        {venue.shortName}
                      </span>
                    </div>

                    {/* Event count badge */}
                    <div
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: venue.color, color: '#000' }}
                    >
                      <span className="font-mono text-[7px] sm:text-[8px] font-bold">{venue.events.length}</span>
                    </div>
                  </motion.button>
                );
              })}

              {/* Mobile: venue tooltip inside map */}
              <AnimatePresence>
                {activeVenue && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-2 left-2 right-2 z-20 p-3 rounded-xl backdrop-blur-2xl bg-black/80 border lg:hidden"
                    style={{ borderColor: `${activeVenue.color}30` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 size={14} style={{ color: activeVenue.color }} className="shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-heading text-xs text-white tracking-wide truncate">{activeVenue.name}</h4>
                          <p className="font-mono text-[9px] text-white/40">{activeVenue.events.length} events</p>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setActiveVenue(null); }} className="text-white/30 hover:text-white/60 shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Coordinates watermark */}
              <div className="absolute bottom-2 left-3 font-mono text-[8px] sm:text-[10px] text-white/10 tracking-widest pointer-events-none">
                SMVDU CAMPUS / KATRA / 32.94°N 74.95°E
              </div>
            </div>
          </motion.div>

          {/* ── SIDEBAR: VENUE DETAIL ──────────────────────── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeVenue ? (
                <motion.div
                  key={activeVenue.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                >
                  {/* Venue header */}
                  <div className="p-4 sm:p-5 border-b border-white/[0.06]" style={{ borderBottomColor: `${activeVenue.color}15` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeVenue.color }} />
                          <h3 className="font-heading text-sm sm:text-base text-white tracking-wide">
                            {activeVenue.name}
                          </h3>
                        </div>
                        <p className="font-body text-[11px] sm:text-xs text-white/40">{activeVenue.description}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <Users size={11} className="text-white/30" />
                          <span className="font-mono text-[10px] text-white/30">
                            {activeVenue.events.length} event{activeVenue.events.length !== 1 ? 's' : ''} scheduled
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveVenue(null)}
                        className="text-white/30 hover:text-white/60 shrink-0 mt-0.5"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Events grouped by department */}
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {groupedEvents.map(group => (
                      <div key={group.shortName} className="border-b border-white/[0.04] last:border-0">
                        {/* Department header (clickable) */}
                        <button
                          onClick={() => setExpandedDept(expandedDept === group.shortName ? null : group.shortName)}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`font-mono text-[10px] font-bold ${group.iconColor}`}>
                              {group.shortName}
                            </span>
                            <span className="font-body text-[11px] text-white/50 truncate">
                              {group.department}
                            </span>
                            <span className="font-mono text-[9px] text-white/20 shrink-0">
                              ({group.events.length})
                            </span>
                          </div>
                          <ChevronRight
                            size={12}
                            className={`text-white/20 transition-transform duration-200 shrink-0 ${
                              expandedDept === group.shortName ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        {/* Event list */}
                        <AnimatePresence>
                          {expandedDept === group.shortName && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3 space-y-1.5">
                                {group.events.map(ev => (
                                  <div
                                    key={ev.id}
                                    className="group/ev flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                  >
                                    <div className="min-w-0">
                                      <p className="font-body text-[11px] sm:text-xs text-white/70 truncate">
                                        {ev.name}
                                      </p>
                                      <p className="font-mono text-[9px] text-white/25 truncate mt-0.5">
                                        {ev.tagline}
                                      </p>
                                    </div>
                                    {ev.registerUrl && (
                                      <a
                                        href={ev.registerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-mono transition-all"
                                        style={{
                                          backgroundColor: `${activeVenue.color}15`,
                                          color: `${activeVenue.color}CC`,
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Register
                                        <ExternalLink size={8} />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Empty state */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                    <MapPin size={20} className="text-cyan-400/50" />
                  </div>
                  <h4 className="font-heading text-sm text-white/60 tracking-wide mb-2">Select a Venue</h4>
                  <p className="font-body text-xs text-white/30 max-w-[200px]">
                    Tap a marker on the map to see events and registration links
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-[240px]">
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
                      <p className="font-heading text-lg text-cyan-400">{venueData.length}</p>
                      <p className="font-mono text-[9px] text-white/30 mt-0.5">VENUES</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
                      <p className="font-heading text-lg text-purple-400">
                        {venueData.reduce((sum, v) => sum + v.events.length, 0)}
                      </p>
                      <p className="font-mono text-[9px] text-white/30 mt-0.5">EVENTS</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
