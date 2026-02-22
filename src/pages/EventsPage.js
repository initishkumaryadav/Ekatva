import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Calendar, MapPin, ExternalLink, Search,
  Code, Beaker, Building2, HardHat, Zap, Cpu, Briefcase, Cog, Calculator, TrendingUp, Atom,
  X,
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import Navbar from '../components/Navbar';

/* ─── Icon map per department shortName ─── */
const DEPT_ICONS = {
  CSE: Code,
  BT: Beaker,
  ARCH: Building2,
  CE: HardHat,
  EE: Zap,
  ECE: Cpu,
  MGMT: Briefcase,
  ME: Cog,
  MATH: Calculator,
  ECON: TrendingUp,
  PHY: Atom,
};

/* ─── Event Card ─── */
function EventCard({ event, config, onClick }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState('');

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(`perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt('')}
      style={{ transform: tilt, transition: 'transform 0.15s ease-out' }}
      onClick={() => onClick(event)}
      className="group cursor-pointer"
    >
      <div className={`relative h-full rounded-2xl ${config.bg} border ${config.border} hover:border-white/[0.15] transition-all duration-300 overflow-hidden`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${config.gradient} opacity-40 group-hover:opacity-80 transition-opacity`} />

        {/* Image */}
        <div className="relative w-full h-40 sm:h-44 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className={`w-full h-full bg-gradient-to-br ${config.gradient} opacity-20 items-center justify-center hidden absolute inset-0`}>
            <span className="font-heading text-3xl text-white/60">{event.name?.charAt(0)}</span>
          </div>
          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="p-4 sm:p-5">
          {/* Name */}
          <h3 className="font-heading text-sm sm:text-base text-white tracking-wide mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
            {event.name}
          </h3>

          {/* Tagline */}
          <p className={`text-[11px] sm:text-xs font-mono bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-2`}>
            {event.tagline}
          </p>

          {/* Description */}
          <p className="font-body text-xs text-white/35 line-clamp-2 mb-3 leading-relaxed">
            {event.description}
          </p>

          {/* Register button */}
          {event.registerUrl && (
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent border ${config.border} hover:border-white/[0.15] transition-all`}
            >
              <ExternalLink size={10} className={config.iconColor} /> Register
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Department Section ─── */
function DepartmentSection({ dept, index, onEventClick }) {
  const Icon = DEPT_ICONS[dept.shortName] || Code;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="scroll-mt-24"
      id={`dept-${dept.shortName.toLowerCase()}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center ${dept.iconColor}`}>
            <Icon size={20} />
          </div>
          <div>
            <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${dept.gradient}`}>
              {dept.department}
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/30 mt-0.5">{dept.events.length} event{dept.events.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent ml-4" />
      </div>

      {/* Events Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dept.events.map((event) => (
          <EventCard key={event.id} event={event} config={dept} onClick={onEventClick} />
        ))}
      </div>

      {/* Divider */}
      <div className="mt-10 sm:mt-12 md:mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </motion.section>
  );
}

/* ─── Event Detail Modal ─── */
function EventModal({ event, config, onClose }) {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-white/[0.08] shadow-[0_8px_60px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-8 relative">
          {/* Name */}
          <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wide mb-2">{event.name}</h3>

          {/* Tagline */}
          <p className={`text-xs sm:text-sm font-mono bg-gradient-to-r ${config?.gradient || 'from-cyan-400 to-purple-500'} bg-clip-text text-transparent mb-4`}>
            {event.tagline}
          </p>

          {/* Description */}
          <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Register */}
          {event.registerUrl ? (
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-wide bg-gradient-to-r ${config?.gradient || 'from-cyan-400 to-purple-500'} text-white hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.3)] transition-all duration-200`}
            >
              <ExternalLink size={14} /> Register Now
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs text-white/30 border border-white/[0.06]">
              Registration coming soon
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Events Page ─── */
export default function EventsPage() {
  const departments = EVENTS_DATA.departmentEvents;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const location = useLocation();

  /* Scroll to department section when navigating with a hash (e.g. /events#dept-cse) */
  useEffect(() => {
    if (location.hash) {
      // Small delay to let the page render the sections first
      const timer = setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const totalEvents = departments.reduce((sum, d) => sum + d.events.length, 0);

  // Filter departments
  const visibleDepartments = activeFilter === 'all'
    ? departments
    : departments.filter(d => d.shortName === activeFilter);

  // Search filter
  const filteredDepartments = searchTerm
    ? visibleDepartments.map(dept => ({
        ...dept,
        events: dept.events.filter(ev =>
          ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ev.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ev.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter(dept => dept.events.length > 0)
    : visibleDepartments;

  const handleEventClick = (event, config) => {
    setSelectedEvent(event);
    // find the config for the event
    const dept = departments.find(d => d.events.some(e => e.id === event.id));
    setSelectedConfig(dept || config);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-pink-600/[0.02] rounded-full blur-[130px]" />
      </div>

      {/* Sticky Header */}

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
              <Calendar size={14} className="text-cyan-400/60" />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/40 uppercase">
                {totalEvents} Events &bull; {departments.length} Departments
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4"
          >
            Explore{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Events
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-white/40 max-w-2xl mx-auto mb-8"
          >
            Discover all competitions, workshops, and activities across every department at EKATVA 2026.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 font-body text-sm focus:border-cyan-400/30 focus:outline-none transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-8"
          >
            <ChevronDown size={20} className="text-white/20 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Department Filter Tabs */}
      <div className="sticky top-0 z-30 border-b border-white/[0.04] bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto py-3 scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-full font-body text-[11px] sm:text-xs tracking-wide whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                  : 'text-white/30 hover:text-white/60 border border-transparent'
              }`}
            >
              All Departments
            </button>
            {departments.map(dept => {
              const Icon = DEPT_ICONS[dept.shortName] || Code;
              return (
                <button
                  key={dept.shortName}
                  onClick={() => setActiveFilter(dept.shortName)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-body text-[11px] sm:text-xs tracking-wide whitespace-nowrap transition-all ${
                    activeFilter === dept.shortName
                      ? 'bg-white/[0.06] text-white border border-white/[0.1]'
                      : 'text-white/30 hover:text-white/60 border border-transparent'
                  }`}
                >
                  <Icon size={12} />
                  {dept.shortName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-20">
            <Search size={40} className="text-white/10 mx-auto mb-4" />
            <p className="font-body text-sm text-white/30">No events found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {filteredDepartments.map((dept, idx) => (
              <DepartmentSection
                key={dept.shortName}
                dept={dept}
                index={idx}
                onEventClick={(ev) => handleEventClick(ev, dept)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            config={selectedConfig}
            onClose={() => { setSelectedEvent(null); setSelectedConfig(null); }}
          />
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <section className="relative border-t border-white/[0.04] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="font-body text-sm text-white/30 mb-4">Ready to participate?</p>
          <Link
            to="/#register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-wide bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-200"
          >
            Register for Ekatva 2026
          </Link>
          <p className="font-mono text-[10px] text-white/15 mt-8 tracking-widest">EKATVA &bull; SMVDU &bull; KATRA, J&K</p>
        </div>
      </section>
    </div>
  );
}
