import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';

/* ─── Tilt wrapper ─── */
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

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('')}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function GalleryPreview() {
  const navigate = useNavigate();

  // Pick featured items (max 6 images + 2 videos)
  const featuredImages = GALLERY_DATA.images.filter(i => i.featured).slice(0, 6);
  const featuredVideos = GALLERY_DATA.videos.filter(v => v.featured).slice(0, 2);

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/[0.02] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">Memories</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Gallery</span>
            </h2>
            <button
              onClick={() => navigate('/gallery')}
              className="self-start sm:self-auto flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 hover:text-white/70 transition-colors group"
            >
              VIEW ALL
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {featuredVideos.map((vid, i) => (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard className="group rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-purple-400/20 hover:border-purple-400/30 transition-all duration-300"
                >
                  <div
                    className="aspect-video relative overflow-hidden"
                    onClick={() => navigate('/gallery')}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                        <Play size={22} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="font-body text-sm text-white/80">{vid.title}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Featured Photos – Masonry-ish grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {featuredImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`${i === 0 || i === 3 ? 'row-span-2' : ''}`}
            >
              <TiltCard
                className="group rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-all duration-300 h-full"
              >
                <div className="h-full relative overflow-hidden" onClick={() => navigate('/gallery')}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <p className="font-body text-xs sm:text-sm text-white leading-snug">{img.caption}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => navigate('/gallery')}
            className="px-8 py-3 rounded-xl font-mono text-xs tracking-widest flex items-center gap-3 transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] text-white/60 hover:text-white group"
          >
            <ImageIcon size={16} />
            EXPLORE FULL GALLERY
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
