import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EVENTS_DATA } from '../data/events';
import {
  Code, Beaker, Building2, HardHat, Zap, Cpu, Briefcase, Cog, Calculator, TrendingUp, Atom,
  ArrowRight,
} from 'lucide-react';

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

/* ─── Tilt card wrapper ─── */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`);
  };

  const handleMouseLeave = () => setTransform('');

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function CompetitionsGrid() {
  const navigate = useNavigate();
  const departments = EVENTS_DATA.departmentEvents;

  const handleDeptClick = (shortName) => {
    navigate(`/events#dept-${shortName.toLowerCase()}`);
  };

  return (
    <section id="events" className="relative py-24 md:py-32 overflow-hidden" data-testid="events-section">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-600/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">Competitions</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            Battle <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Grounds</span>
          </h2>
        </motion.div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" data-testid="events-bento-grid">
          {departments.map((dept, i) => {
            const Icon = DEPT_ICONS[dept.shortName] || Code;

            return (
              <motion.div
                key={dept.shortName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <TiltCard
                  className={`group rounded-2xl backdrop-blur-xl bg-white/[0.02] border ${dept.border} hover:bg-white/[0.05] hover:shadow-[0_0_40px_-8px] hover:shadow-current/10 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden`}
                >
                  {/* Card Header */}
                  <div className={`px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/[0.04] ${dept.bg}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] ${dept.iconColor}`}>
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">
                        {dept.shortName}
                      </span>
                    </div>
                    <h3 className={`font-heading text-lg sm:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${dept.gradient}`}>
                      {dept.department}
                    </h3>
                    <p className="font-mono text-[11px] text-white/30 mt-1">
                      {dept.events.length} event{dept.events.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Event Names List */}
                  <div className="px-5 sm:px-6 py-4 flex-1">
                    <ul className="space-y-2">
                      {dept.events.map((event) => (
                        <li key={event.id} className="flex items-start gap-2 group/item">
                          <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${dept.gradient}`} />
                          <span className="font-body text-sm text-white/50 group-hover/item:text-white/70 transition-colors leading-snug">
                            {event.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer – CTA */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                    <button
                      onClick={() => handleDeptClick(dept.shortName)}
                      className={`w-full py-2.5 rounded-xl font-mono text-xs tracking-widest flex items-center justify-center gap-2 transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] ${dept.iconColor} group/btn`}
                    >
                      VIEW EVENTS
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
