import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Calendar, Award, BookOpen, Eye, Target,
  Cpu, Palette, TrendingUp, Atom, Leaf, Mountain, Train, Plane,
  Car, ExternalLink, ChevronDown, ChevronUp, Star, GraduationCap,
  Globe, Building2, Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutData from '../data/about.json';

/* ───────── icon map for sub-fests ───────── */
const ICON_MAP = {
  cpu: Cpu,
  palette: Palette,
  'trending-up': TrendingUp,
  atom: Atom,
  leaf: Leaf,
};

/* ───────── reusable fade-up wrapper ───────── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ───────── gradient divider ───────── */
const GradientDivider = () => (
  <div className="flex items-center gap-4 py-12">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    <Sparkles className="w-4 h-4 text-cyan-400/60" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
  </div>
);

/* ───────── section heading ───────── */
const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <FadeUp className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
      {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
      <span className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-medium">{subtitle}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
  </FadeUp>
);

/* ===================================================================
   ABOUT PAGE
   =================================================================== */
export default function AboutPage() {
  const navigate = useNavigate();
  const { university: uni, ekatva, subFests, nearestTouristPlaces, howToReach } = aboutData;

  /* scroll to top */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-purple-500/8 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              About {ekatva.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              {ekatva.tagline} — {ekatva.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* ─── SMVDU Overview ─── */}
        <SectionHeading icon={GraduationCap} title="Shri Mata Vaishno Devi University" subtitle="Our University" />

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* text col */}
          <FadeUp className="md:col-span-3 space-y-5">
            <p className="text-gray-300 leading-relaxed">{uni.description}</p>
            <p className="text-gray-400 leading-relaxed">{uni.campusDescription}</p>

            {/* quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { label: 'Established', value: uni.established, icon: Calendar },
                { label: 'Campus', value: uni.campusArea, icon: Building2 },
                { label: 'Altitude', value: uni.altitude, icon: Mountain },
                { label: 'Location', value: 'Katra, J&K', icon: MapPin },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
                  <s.icon className="w-4 h-4 mx-auto mb-1.5 text-cyan-400" />
                  <div className="text-white font-semibold text-sm">{s.value}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* VC card */}
          <FadeUp delay={0.15} className="md:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={uni.vcImage}
                  alt={`Vice-Chancellor ${uni.administration.viceChancellor}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="p-4 -mt-12 relative z-10">
                <p className="text-sm text-cyan-400 font-medium mb-1">Vice-Chancellor</p>
                <p className="text-white font-semibold">{uni.administration.viceChancellor}</p>
                <p className="text-xs text-gray-500 mt-1">Chancellor — {uni.administration.chancellor}</p>
              </div>
            </div>
          </FadeUp>
        </div>

        <GradientDivider />

        {/* ─── Vision & Mission ─── */}
        <SectionHeading icon={Eye} title="Vision & Mission" subtitle="Our Purpose" />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: 'Our Vision', text: uni.vision, icon: Eye, borderClass: 'border-cyan-500/10', bgClass: 'bg-cyan-500/[0.03]', iconBgClass: 'bg-cyan-500/10', iconTextClass: 'text-cyan-400' },
            { title: 'Our Mission', text: uni.mission, icon: Target, borderClass: 'border-purple-500/10', bgClass: 'bg-purple-500/[0.03]', iconBgClass: 'bg-purple-500/10', iconTextClass: 'text-purple-400' },
          ].map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div className={`h-full p-6 rounded-2xl border ${card.borderClass} ${card.bgClass} backdrop-blur`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.iconBgClass} mb-4`}>
                  <card.icon className={`w-5 h-5 ${card.iconTextClass}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{card.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Core Values */}
        <FadeUp>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" /> Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {uni.coreValues.map((val, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <GradientDivider />

        {/* ─── NIRF Rankings ─── */}
        <SectionHeading icon={Award} title="NIRF Rankings 2024" subtitle="Recognition" />

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {uni.rankings.map((r, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center group hover:border-cyan-500/20 transition-colors">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {r.rank}
                </div>
                <div className="text-sm text-white font-medium mb-1">{r.category}</div>
                <div className="text-xs text-gray-500">{r.framework}</div>
              </div>
            </FadeUp>
          ))}
        </div>

        <GradientDivider />

        {/* ─── Sub-Fests ─── */}
        <SectionHeading icon={Sparkles} title="The Sub-Fests of EKATVA" subtitle="Our Legacy" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subFests.map((fest, i) => {
            const Icon = ICON_MAP[fest.icon] || Sparkles;
            return (
              <FadeUp key={fest.id} delay={i * 0.08}>
                <div
                  className="group p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 h-full"
                  style={{ '--fest-color': fest.color }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${fest.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: fest.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{fest.name}</h3>
                  <div className="text-xs font-medium mb-3" style={{ color: fest.color }}>
                    Active since {fest.academicStart}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{fest.description}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <GradientDivider />

        {/* ─── Establishment History ─── */}
        <SectionHeading icon={BookOpen} title="How It All Began" subtitle="Our History" />

        <FadeUp>
          <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Shri Mata Vaishno Devi University was established under an Act of J&K State Legislature in <span className="text-cyan-400 font-medium">1999</span> as
                  the first fully residential and technical university in J&K.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  The university was inaugurated on <span className="text-cyan-400 font-medium">{uni.inaugurated}</span> by{' '}
                  <span className="text-white font-medium">{uni.inauguratedBy}</span>.
                </p>
                <p className="text-gray-400">
                  <span className="text-white font-medium">Motto:</span>{' '}
                  <span className="italic text-cyan-300">"{uni.motto}"</span>
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{uni.logoDescription}</p>
              </div>
            </div>
          </div>
        </FadeUp>

        <GradientDivider />

        {/* ─── Tourist Places ─── */}
        <SectionHeading icon={Mountain} title="Nearby Attractions" subtitle="Explore the Region" />

        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          {nearestTouristPlaces.map((place, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] h-full">
                <MapPin className="w-5 h-5 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">{place.name}</h3>
                <p className="text-xs text-cyan-400/70 mb-2">{place.distance}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{place.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* How to Reach */}
        <FadeUp>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" /> How to Reach
            </h3>
            <p className="text-gray-400 text-sm mb-4">{howToReach.description}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Car, label: 'By Road', text: howToReach.byRoad },
                { icon: Train, label: 'By Rail', text: howToReach.byRail },
                { icon: Plane, label: 'By Air', text: howToReach.byAir },
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <t.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white mb-1">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <GradientDivider />

        {/* ─── Social & CTA ─── */}
        <FadeUp className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Connect with SMVDU</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Follow the official channels for the latest updates about {ekatva.name} and university life.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(uni.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all capitalize flex items-center gap-2"
              >
                {platform} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            Visit Official Website <ExternalLink className="w-4 h-4" />
          </a>
        </FadeUp>
      </div>

      <Footer />
    </div>
  );
}
