import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Campus', href: '#campus' },
  { label: 'Register', href: '#register' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 200);
      setLastY(y);

      // Scroll spy — only track hash links (homepage sections), not route links
      const hashLinks = NAV_LINKS.filter(l => l.href.startsWith('#'));
      let found = false;
      for (let i = hashLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(hashLinks[i].href.slice(1));
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(hashLinks[i].href.slice(1));
          found = true;
          break;
        }
      }
      if (!found) setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    // Hash link — if we're on the homepage, scroll directly; otherwise navigate home with hash
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 md:top-6 left-4 right-4 mx-auto max-w-fit z-50 rounded-full px-4 md:px-6 py-3 flex items-center justify-between md:justify-start gap-2 md:gap-4 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'backdrop-blur-xl bg-transparent border border-transparent'
        }`}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 font-heading text-sm md:text-base tracking-widest text-white mr-2 md:mr-4 whitespace-nowrap"
          data-testid="nav-logo"
        >
          <img src="/logo_ekatva.webp" alt="Ekatva Logo" className="h-10 md:h-12 w-auto object-contain" />
          EKATVA
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              data-testid={`nav-link-${link.href.slice(1)}`}
              className={`relative px-3 py-2 text-sm font-body tracking-wide transition-colors duration-200 rounded-full ${
                (link.href.startsWith('#') && activeSection === link.href.slice(1)) || (link.href.startsWith('/') && window.location.pathname === link.href)
                  ? 'text-cyan-300'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {((link.href.startsWith('#') && activeSection === link.href.slice(1)) || (link.href.startsWith('/') && window.location.pathname === link.href)) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-cyan-400/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white p-1"
          data-testid="nav-mobile-toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 rounded-2xl backdrop-blur-2xl bg-black/90 border border-white/10 p-6 md:hidden"
            data-testid="nav-mobile-menu"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                data-testid={`nav-mobile-link-${link.href.slice(1)}`}
                className={`block w-full text-left py-3 px-4 rounded-lg text-base font-body transition-colors ${
                  (link.href.startsWith('#') && activeSection === link.href.slice(1)) || (link.href.startsWith('/') && window.location.pathname === link.href)
                    ? 'text-cyan-300 bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </motion.button>
            ))}


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
