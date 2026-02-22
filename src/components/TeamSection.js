import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';
import { Zap, Shield, Sword, ArrowRight } from 'lucide-react';
import { TEAM_DATA } from '../data/teamData';

const ROLE_COLORS = {
  'Tech Lead': 'from-cyan-500/30 to-cyan-700/10',
  'Design Lead': 'from-pink-500/30 to-pink-700/10',
  'Event Head': 'from-amber-500/30 to-amber-700/10',
  'PR Lead': 'from-green-500/30 to-green-700/10',
  'Robo Captain': 'from-purple-500/30 to-purple-700/10',
  'Coding Lead': 'from-blue-500/30 to-blue-700/10',
  'Team Lead': 'from-cyan-500/30 to-cyan-700/10',
  'Co-Lead': 'from-pink-500/30 to-pink-700/10',
  'Coordinator': 'from-green-500/30 to-green-700/10',
  'Senior Consultant': 'from-amber-500/30 to-amber-700/10',
  'Member': 'from-purple-500/30 to-purple-700/10',
};

function StatBar({ label, value, max = 100, color }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="font-mono text-[9px] text-white/30 uppercase">{label}</span>
        <span className="font-mono text-[9px] text-white/40">{value}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

function CharacterCard({ member, index }) {
  const { playHover } = useSound();
  const ref = useRef(null);
  const [transform, setTransform] = useState('');
  const gradient = ROLE_COLORS[member.role] || 'from-cyan-500/30 to-purple-700/10';

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('')}
      onMouseEnter={playHover}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className="group"
      data-testid={`team-card-${index}`}
    >
      <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${gradient} border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300 overflow-hidden`}>
        {/* Level badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 border border-yellow-400/20">
          <span className="font-mono text-[9px] text-yellow-400">LVL {member.level || 1}</span>
        </div>

        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
          {member.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span
            className="font-heading text-lg text-white/60"
            style={{ display: member.avatar_url ? 'none' : 'flex' }}
          >
            {member.name?.charAt(0)}
          </span>
        </div>

        <h3 className="font-heading text-sm text-white tracking-wide mb-0.5">{member.name}</h3>
        <p className="font-mono text-[10px] text-cyan-400/60 mb-0.5">{member.role}</p>
        <p className="font-mono text-[9px] text-white/20 mb-1">{member.department}</p>
        <p className="font-body text-xs text-white/30 mb-4 line-clamp-2">{member.bio}</p>

        {/* Stats */}
        <div className="space-y-2">
          <StatBar label="Power" value={Math.min(member.power || 50, 100)} color="bg-cyan-400" />
          <StatBar label="Stamina" value={Math.min(member.stamina || 60, 100)} color="bg-purple-400" />
        </div>

        {/* Stats footer */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1">
            <Sword size={10} className="text-cyan-400/50" />
            <span className="font-mono text-[9px] text-white/30">{member.power}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={10} className="text-purple-400/50" />
            <span className="font-mono text-[9px] text-white/30">{member.stamina}</span>
          </div>
        </div>

        {/* XP bar */}
        <div className="flex items-center gap-2 mt-3">
          <Zap size={10} className="text-yellow-400/60" />
          <div className="flex-1 h-1 rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${((member.xp || 0) % 500) / 5}%` }}
              viewport={{ once: true }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-400/60 to-amber-500/60"
            />
          </div>
          <span className="font-mono text-[8px] text-white/20">{member.xp || 0} XP</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  // Static data — no API call needed
  const team = TEAM_DATA;

  if (team.length === 0) return null;

  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden" data-testid="team-section">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-600/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-purple-400/70 uppercase mb-4">The Squad</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Roster</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.slice(0, 6).map((member, i) => (
            <CharacterCard key={member.id || i} member={member} index={i} />
          ))}
        </div>

        {team.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Link
              to="/team"
              className="group flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-wide text-white/60 hover:text-white border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-300"
              data-testid="team-view-all-btn"
            >
              View Full Team <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
