import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, Play, Image as ImageIcon,
  Film, Filter, Maximize2,
} from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import Navbar from '../components/Navbar';

/* ─── Lightbox Component ─── */
function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex];
  const isVideo = !!item?.youtubeId;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
        <X size={24} />
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Content */}
      <div className="max-w-5xl w-full mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <motion.img
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={item.src}
            alt={item.caption}
            className="max-h-[80vh] max-w-full object-contain rounded-2xl"
          />
        )}
        <p className="mt-4 font-body text-sm sm:text-base text-white/70 text-center">
          {item.caption || item.title}
        </p>
        <p className="mt-1 font-mono text-xs text-white/30">
          {currentIndex + 1} / {items.length}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Image Thumbnail Card ─── */
function ImageCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 ${
        item.featured ? 'sm:col-span-2 sm:row-span-2' : ''
      }`}
    >
      <div className={`${item.featured ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
        <p className="font-body text-sm text-white leading-snug">{item.caption}</p>
        <p className="font-mono text-[10px] text-white/40 mt-1">{item.category}</p>
      </div>

      {/* Expand icon */}
      <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
        <Maximize2 size={14} />
      </div>
    </motion.div>
  );
}

/* ─── Video Thumbnail Card ─── */
function VideoCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 ${
        item.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
            <Play size={22} className="text-white ml-1" fill="white" />
          </div>
        </div>
      </div>

      {/* Title bar */}
      <div className="p-3 sm:p-4">
        <p className="font-body text-sm text-white/70 group-hover:text-white transition-colors truncate">{item.title}</p>
        <p className="font-mono text-[10px] text-white/30 mt-1">{item.category}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Gallery Page ─── */
export default function GalleryPage() {
  const { categories, images, videos } = GALLERY_DATA;
  const [activeCategory, setActiveCategory] = useState('All');
  const [mediaType, setMediaType] = useState('all'); // 'all' | 'photos' | 'videos'
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Filter by category
  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(vid => vid.category === activeCategory);

  // Open lightbox
  const openImageLightbox = (index) => {
    setLightboxItems(filteredImages);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (index) => {
    setLightboxItems(filteredVideos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-12 sm:pb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> BACK TO HOME
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-3">Memories</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wider">
              Event{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Gallery
              </span>
            </h1>
            <p className="font-body text-white/40 mt-4 max-w-xl text-sm sm:text-base">
              Relive the best moments of Ekatva 2026 — from electrifying performances to intense competitions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[11px] tracking-wider whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-white/10 text-white border border-white/[0.12]'
                    : 'text-white/40 hover:text-white/60 border border-transparent hover:border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media type toggle */}
          <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1 border border-white/[0.06]">
            {[
              { key: 'all', icon: Filter, label: 'All' },
              { key: 'photos', icon: ImageIcon, label: 'Photos' },
              { key: 'videos', icon: Film, label: 'Videos' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setMediaType(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[11px] tracking-wider transition-all ${
                  mediaType === key ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        {/* Videos Section */}
        {(mediaType === 'all' || mediaType === 'videos') && filteredVideos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-purple-400">
                <Film size={18} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl tracking-wider text-white">Videos</h2>
              <span className="font-mono text-xs text-white/30 ml-2">{filteredVideos.length}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((vid, i) => (
                <VideoCard key={vid.id} item={vid} index={i} onClick={() => openVideoLightbox(i)} />
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        {(mediaType === 'all' || mediaType === 'photos') && filteredImages.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-cyan-400">
                <ImageIcon size={18} />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl tracking-wider text-white">Photos</h2>
              <span className="font-mono text-xs text-white/30 ml-2">{filteredImages.length}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-3 sm:gap-4">
              {filteredImages.map((img, i) => (
                <ImageCard key={img.id} item={img} index={i} onClick={() => openImageLightbox(i)} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon size={48} className="mx-auto text-white/10 mb-4" />
            <p className="font-body text-white/30">No media found in this category.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            items={lightboxItems}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex((p) => Math.max(0, p - 1))}
            onNext={() => setLightboxIndex((p) => Math.min(lightboxItems.length - 1, p + 1))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
