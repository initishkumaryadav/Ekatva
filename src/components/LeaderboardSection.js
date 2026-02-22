import { motion } from 'framer-motion';
import { Trophy, Users, Award, TrendingUp, Crown, Medal, Star } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';

const RANK_STYLES = [
  {
    bg: 'bg-gradient-to-r from-yellow-500/15 to-yellow-600/5',
    border: 'border-yellow-400/30',
    badge: 'bg-gradient-to-br from-yellow-400/30 to-amber-500/20 text-yellow-400 ring-1 ring-yellow-400/20',
    glow: 'shadow-[0_0_30px_-5px_rgba(250,204,21,0.2)]',
    barGradient: 'from-yellow-400 via-amber-400 to-yellow-500',
    barBg: 'bg-yellow-400/10',
  },
  {
    bg: 'bg-gradient-to-r from-slate-300/10 to-slate-400/5',
    border: 'border-slate-300/20',
    badge: 'bg-gradient-to-br from-slate-300/25 to-slate-400/15 text-slate-300 ring-1 ring-slate-300/15',
    glow: 'shadow-[0_0_20px_-5px_rgba(148,163,184,0.1)]',
    barGradient: 'from-slate-300 via-slate-400 to-slate-300',
    barBg: 'bg-slate-300/10',
  },
  {
    bg: 'bg-gradient-to-r from-amber-600/10 to-amber-700/5',
    border: 'border-amber-600/20',
    badge: 'bg-gradient-to-br from-amber-600/25 to-orange-600/15 text-amber-500 ring-1 ring-amber-600/15',
    glow: 'shadow-[0_0_20px_-5px_rgba(217,119,6,0.1)]',
    barGradient: 'from-amber-500 via-orange-500 to-amber-600',
    barBg: 'bg-amber-500/10',
  },
];

const DEFAULT_STYLE = {
  bg: 'bg-white/[0.02]',
  border: 'border-white/[0.06]',
  badge: 'bg-white/5 text-white/40',
  glow: '',
  barGradient: 'from-cyan-400/70 via-purple-400/60 to-indigo-500/70',
  barBg: 'bg-white/5',
};

const RankIcon = ({ rank }) => {
  if (rank === 0) return <Crown size={20} strokeWidth={2.5} />;
  if (rank === 1) return <Medal size={18} />;
  if (rank === 2) return <Star size={16} />;
  return <span className="font-heading text-sm font-bold">{rank + 1}</span>;
};

export default function LeaderboardSection() {
  const leaderboard = EVENTS_DATA.leaderboard;

  if (!leaderboard || leaderboard.length === 0) return null;

  const maxPts = leaderboard[0]?.points || 1;

  return (
    <section id="leaderboard" className="relative py-24 md:py-32 overflow-hidden" data-testid="leaderboard-section">
      {/* Background effects */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/[0.02] rounded-full blur-[150px]" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-yellow-400/70 uppercase mb-4 flex items-center justify-center gap-2">
            <Trophy size={14} className="text-yellow-400/50" />
            Rankings
            <Trophy size={14} className="text-yellow-400/50" />
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            Department <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Leaderboard</span>
          </h2>
          <p className="mt-3 font-mono text-xs text-white/25 tracking-wide">Real-time department standings</p>
        </motion.div>

        {/* Leaderboard list */}
        <div className="flex flex-col gap-5">
          {leaderboard.map((dept, i) => {
            const style = RANK_STYLES[i] || DEFAULT_STYLE;
            const pct = Math.max((dept.points / maxPts) * 100, 3);

            return (
              <motion.div
                key={dept.department}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className={`relative rounded-2xl ${style.bg} border ${style.border} ${style.glow} hover:scale-[1.01] hover:border-white/10 transition-all duration-300 group`}
                data-testid={`leaderboard-${dept.department}`}
              >
                <div className="flex items-center gap-5 p-5 md:p-6">
                  {/* Rank badge */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 ${style.badge} transition-transform group-hover:scale-110 duration-300`}>
                    <RankIcon rank={i} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name + awards row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-heading text-lg md:text-xl text-white tracking-wide truncate">{dept.department}</h3>
                        {i < 3 && <Award size={15} className={i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : 'text-amber-500'} />}
                      </div>
                      {/* Points - visible on larger screens inline */}
                      <div className="hidden sm:flex items-baseline gap-1.5 shrink-0 ml-4">
                        <p className="font-heading text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                          {dept.points?.toLocaleString()}
                        </p>
                        <p className="font-mono text-[9px] text-white/25 tracking-widest uppercase">pts</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className={`h-3 md:h-3.5 rounded-full ${style.barBg} overflow-hidden backdrop-blur-sm`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={`h-full rounded-full bg-gradient-to-r ${style.barGradient} relative`}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex gap-5">
                        <span className="font-mono text-[11px] text-white/35 flex items-center gap-1.5 hover:text-white/50 transition-colors">
                          <Users size={12} /> {dept.participants || 0} members
                        </span>
                        <span className="font-mono text-[11px] text-white/35 flex items-center gap-1.5 hover:text-white/50 transition-colors">
                          <TrendingUp size={12} /> {dept.wins || 0} wins
                        </span>
                      </div>
                      {/* Points - visible on mobile */}
                      <div className="flex sm:hidden items-baseline gap-1 shrink-0">
                        <p className="font-heading text-lg text-cyan-400">{dept.points?.toLocaleString()}</p>
                        <p className="font-mono text-[8px] text-white/20 tracking-wider">PTS</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle top-rank accent line */}
                {i === 0 && (
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
