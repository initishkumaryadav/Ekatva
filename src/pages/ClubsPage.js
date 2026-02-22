import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Instagram, Linkedin, Users, Filter, Search, X,
} from 'lucide-react';
import { CLUBS_DATA } from '../data/clubs';
import Navbar from '../components/Navbar';

/* ─── Club Card ─── */
function ClubCard({ club, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px at 50% 0%, ${club.color}08, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md"
            style={{
              backgroundColor: `${club.color}20`,
              color: `${club.color}CC`,
              border: `1px solid ${club.color}30`,
            }}
          >
            {club.category === 'professional' ? 'Professional' : 'Cultural'}
          </span>
        </div>

        {/* Social links overlay on hover */}
        <AnimatePresence>
          {hovered && club.links && Object.keys(club.links).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-3 right-3 flex gap-2"
            >
              {club.links.instagram && (
                <a
                  href={club.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full backdrop-blur-md bg-black/60 border border-white/10 flex items-center justify-center text-pink-400 hover:text-pink-300 hover:bg-black/80 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram size={14} />
                </a>
              )}
              {club.links.linkedin && (
                <a
                  href={club.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full backdrop-blur-md bg-black/60 border border-white/10 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-black/80 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={14} />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Color accent line */}
        <div className="w-8 h-0.5 rounded-full mb-3" style={{ backgroundColor: club.color }} />

        <h3 className="font-heading text-base sm:text-lg text-white tracking-wide mb-1.5 group-hover:text-white/90 transition-colors">
          {club.name}
        </h3>
        <p
          className="font-mono text-[10px] sm:text-[11px] tracking-wider mb-3"
          style={{ color: `${club.color}99` }}
        >
          {club.tagline}
        </p>
        <p className="font-body text-xs sm:text-sm text-white/40 leading-relaxed line-clamp-3">
          {club.description}
        </p>

        {/* Social links row (always visible on mobile) */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.05]">
          {club.links?.instagram && (
            <a
              href={club.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-pink-400 transition-colors"
            >
              <Instagram size={13} />
              <span className="font-mono text-[10px]">Instagram</span>
            </a>
          )}
          {club.links?.linkedin && (
            <a
              href={club.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={13} />
              <span className="font-mono text-[10px]">LinkedIn</span>
            </a>
          )}
          {club.links?.website && (
            <a
              href={club.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={13} />
              <span className="font-mono text-[10px]">Website</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function ClubsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter clubs
  const filteredClubs = useMemo(() => {
    let clubs = CLUBS_DATA.clubs;

    if (activeCategory !== 'all') {
      clubs = clubs.filter(c => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      clubs = clubs.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    return clubs;
  }, [activeCategory, searchQuery]);

  const professionalCount = CLUBS_DATA.clubs.filter(c => c.category === 'professional').length;
  const culturalCount = CLUBS_DATA.clubs.filter(c => c.category === 'cultural').length;

  return (
    <div className="bg-[#050505] min-h-screen">
      <Navbar />
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-12 sm:pb-16">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mb-8 sm:mb-12"
          >
            <ArrowLeft size={16} />
            <span className="font-mono text-xs tracking-wider">BACK TO HOME</span>
          </Link>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-3 sm:mb-4">
              SMVDU Clubs
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider text-white mb-4">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Clubs
              </span>
            </h1>
            <p className="font-body text-sm sm:text-base text-white/40 max-w-2xl">
              Meet the vibrant clubs under the Board of Professional and Cultural
              Activities at SMVDU — driving innovation, creativity, and campus spirit.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            <div className="flex items-center gap-2">
              <Users size={16} className="text-cyan-400/60" />
              <span className="font-mono text-xs text-white/40">
                <span className="text-white font-bold">{CLUBS_DATA.clubs.length}</span> Clubs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400/60" />
              <span className="font-mono text-xs text-white/40">
                <span className="text-white font-bold">{professionalCount}</span> Professional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400/60" />
              <span className="font-mono text-xs text-white/40">
                <span className="text-white font-bold">{culturalCount}</span> Cultural
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[#050505]/80 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter size={14} className="text-white/20 mr-1 hidden sm:block" />
              {CLUBS_DATA.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] sm:text-xs tracking-wider transition-all duration-300
                    ${activeCategory === cat.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/10'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative sm:ml-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-8 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] font-body text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        {/* Board of Professional Activities */}
        {(activeCategory === 'all' || activeCategory === 'professional') && (
          <div className="mb-14">
            {activeCategory === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
                  <h2 className="font-heading text-xl sm:text-2xl tracking-wider text-white">
                    Board of Professional Activities
                  </h2>
                </div>
                <p className="font-body text-xs sm:text-sm text-white/30 ml-[19px]">
                  Technical clubs fostering innovation, coding, AI, robotics & engineering excellence
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredClubs
                .filter(c => c.category === 'professional')
                .map((club, i) => (
                  <ClubCard key={club.id} club={club} index={i} />
                ))}
            </div>
          </div>
        )}

        {/* Divider between sections */}
        {activeCategory === 'all' && filteredClubs.some(c => c.category === 'professional') && filteredClubs.some(c => c.category === 'cultural') && (
          <div className="flex items-center gap-4 my-10 sm:my-14">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )}

        {/* Board of Cultural Activities */}
        {(activeCategory === 'all' || activeCategory === 'cultural') && (
          <div>
            {activeCategory === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-pink-400 to-purple-500" />
                  <h2 className="font-heading text-xl sm:text-2xl tracking-wider text-white">
                    Board of Cultural Activities
                  </h2>
                </div>
                <p className="font-body text-xs sm:text-sm text-white/30 ml-[19px]">
                  Creative clubs celebrating art, music, dance, theatre, astronomy & adventure
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredClubs
                .filter(c => c.category === 'cultural')
                .map((club, i) => (
                  <ClubCard key={club.id} club={club} index={i} />
                ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filteredClubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-white/20" />
            </div>
            <p className="font-heading text-lg text-white/40 mb-2">No clubs found</p>
            <p className="font-body text-sm text-white/20">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] font-mono text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] p-8 sm:p-10 text-center"
        >
          <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wide mb-3">
            Want to Join a Club?
          </h3>
          <p className="font-body text-sm text-white/40 max-w-md mx-auto mb-6">
            Reach out to any club through their social media handles or visit the Board of Activities office at SMVDU.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/events"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-mono text-xs tracking-wider text-white hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
            >
              EXPLORE EVENTS
            </Link>
            <Link
              to="/"
              className="px-6 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] font-mono text-xs tracking-wider text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              BACK TO HOME
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
