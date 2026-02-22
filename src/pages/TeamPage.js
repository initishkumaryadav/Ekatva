import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Code, Megaphone, Handshake, GraduationCap, Crown, Mail, Linkedin, ChevronDown } from 'lucide-react';
import { TEAM_DATA } from '../data/teamData';
import Navbar from '../components/Navbar';

const CATEGORY_CONFIG = {
  'Core Team': {
    icon: Crown,
    gradient: 'from-cyan-400 to-purple-500',
    border: 'border-cyan-400/20',
    bg: 'bg-gradient-to-br from-cyan-500/5 to-purple-600/5',
    iconColor: 'text-cyan-400',
    description: 'The driving force behind Ekatva — leading the vision, strategy, and execution of the entire fest.',
  },
  'Website Team': {
    icon: Code,
    gradient: 'from-blue-400 to-cyan-500',
    border: 'border-blue-400/20',
    bg: 'bg-gradient-to-br from-blue-500/5 to-cyan-600/5',
    iconColor: 'text-blue-400',
    description: 'Building the digital experience — from frontend design to backend infrastructure.',
  },
  'Sponsor Team': {
    icon: Handshake,
    gradient: 'from-amber-400 to-orange-500',
    border: 'border-amber-400/20',
    bg: 'bg-gradient-to-br from-amber-500/5 to-orange-600/5',
    iconColor: 'text-amber-400',
    description: 'Forging partnerships and securing sponsorships to make the fest possible.',
  },
  'PR Team': {
    icon: Megaphone,
    gradient: 'from-green-400 to-emerald-500',
    border: 'border-green-400/20',
    bg: 'bg-gradient-to-br from-green-500/5 to-emerald-600/5',
    iconColor: 'text-green-400',
    description: 'Spreading the word — managing outreach, social media, and public relations.',
  },
  'School Coordinators': {
    icon: GraduationCap,
    gradient: 'from-pink-400 to-purple-400',
    border: 'border-pink-400/20',
    bg: 'bg-gradient-to-br from-pink-500/5 to-purple-500/5',
    iconColor: 'text-pink-400',
    description: 'Representing each school of SMVDU — the bridge between departments and the fest.',
  },
};

const CATEGORY_ORDER = ['Core Team', 'Website Team', 'Sponsor Team', 'PR Team', 'School Coordinators'];

/* ─── Member Card ─── */
function MemberCard({ member, index, config }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState('');

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(`perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt('')}
      style={{ transform: tilt, transition: 'transform 0.15s ease-out' }}
      className="group"
      data-testid={`team-member-${member.id}`}
    >
      <div className={`relative h-full rounded-2xl ${config.bg} border ${config.border} hover:border-white/[0.15] transition-all duration-300 overflow-hidden`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${config.gradient} opacity-40 group-hover:opacity-80 transition-opacity`} />

        <div className="p-5 sm:p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 rounded-full overflow-hidden border-2 border-white/[0.06] group-hover:border-white/[0.15] transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/10">
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <div className={`w-full h-full bg-gradient-to-br ${config.gradient} opacity-20 items-center justify-center ${member.avatar_url ? 'hidden' : 'flex'}`}>
              <span className="font-heading text-3xl text-white/60">{member.name?.charAt(0)}</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-heading text-sm sm:text-base text-white tracking-wide mb-1 line-clamp-1">{member.name}</h3>

          {/* Role badge */}
          <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent border border-white/[0.06]`}>
            {member.role}
          </span>

          {/* Department + Roll */}
          <div className="mt-2.5 space-y-0.5">
            <p className="font-body text-xs text-white/40">{member.department}</p>
            {member.roll && (
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-wider">{member.roll}</p>
            )}
          </div>

          {/* Social placeholder — user can add links later */}
          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-cyan-400 hover:border-cyan-400/30 cursor-pointer transition-all">
              <Linkedin size={12} />
            </div>
            <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-cyan-400 hover:border-cyan-400/30 cursor-pointer transition-all">
              <Mail size={12} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Category Section ─── */
function CategorySection({ category, members, index }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['Core Team'];
  const Icon = config.icon;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="scroll-mt-28"
      id={`team-${category.replace(/\s+/g, '-').toLowerCase()}`}
      data-testid={`team-category-${category.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Section Header */}
      <div className="pt-8 sm:pt-10 pb-10 sm:pb-14">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center ${config.iconColor}`}>
              <Icon size={20} />
            </div>
            <div>
              <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                {category}
              </h2>
              <p className="font-body text-xs sm:text-sm text-white/30 mt-1 max-w-md">{config.description}</p>
            </div>
          </div>
          <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent ml-4" />
          <span className="font-mono text-[10px] text-white/20 tracking-widest whitespace-nowrap">{members.length} MEMBER{members.length !== 1 ? 'S' : ''}</span>
        </div>
      </div>

      {/* Members Grid */}
      <div className={`grid gap-4 sm:gap-5 ${
        category === 'Core Team'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      }`}>
        {members.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} config={config} />
        ))}
      </div>
    </motion.section>
  );
}

/* ─── Team Page ─── */
export default function TeamPage() {
  const team = TEAM_DATA;
  const loading = false;
  const [activeFilter, setActiveFilter] = useState('all');

  // Group by category
  const grouped = {};
  CATEGORY_ORDER.forEach(cat => { grouped[cat] = []; });
  team.forEach(m => {
    const cat = m.category || 'Core Team';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(m);
  });

  const visibleCategories = activeFilter === 'all'
    ? CATEGORY_ORDER
    : [activeFilter];

  return (
    <div className="min-h-screen bg-[#050505] text-white" data-testid="team-page">
      <Navbar />
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[150px]" />
      </div>

      {/* Sticky Header */}

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
              <Users size={14} className="text-cyan-400/60" />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/40 uppercase">{team.length} Members &bull; {CATEGORY_ORDER.length} Teams</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4"
          >
            Meet The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">People</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-white/40 max-w-2xl mx-auto mb-8"
          >
            The passionate students of SMVDU who work tirelessly behind the scenes to bring Ekatva to life — from concept to execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <ChevronDown size={20} className="text-white/20 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="sticky top-0 z-30 border-b border-white/[0.04] bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto py-3 scrollbar-none" data-testid="team-filter-tabs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-full font-body text-[11px] sm:text-xs tracking-wide whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                  : 'text-white/30 hover:text-white/60 border border-transparent'
              }`}
            >
              All Teams
            </button>
            {CATEGORY_ORDER.map(cat => {
              const config = CATEGORY_CONFIG[cat];
              const Icon = config.icon;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  data-testid={`team-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-body text-[11px] sm:text-xs tracking-wide whitespace-nowrap transition-all ${
                    activeFilter === cat
                      ? 'bg-white/[0.06] text-white border border-white/[0.1]'
                      : 'text-white/30 hover:text-white/60 border border-transparent'
                  }`}
                >
                  <Icon size={12} />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <p className="font-body text-sm text-white/20">Loading team data...</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="text-white/10 mx-auto mb-4" />
            <p className="font-body text-sm text-white/30">No team members found.</p>
          </div>
        ) : (
          <div className="space-y-24 sm:space-y-28 md:space-y-36">
            {visibleCategories.map((category, idx) => {
              const members = grouped[category];
              if (!members || members.length === 0) return null;
              return (
                <CategorySection
                  key={category}
                  category={category}
                  members={members}
                  index={idx}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="relative border-t border-white/[0.04] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="font-body text-sm text-white/30 mb-4">Want to be part of the team?</p>
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
