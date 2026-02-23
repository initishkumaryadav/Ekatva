import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Linkedin, Youtube, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-24 border-t border-white/[0.04]" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src="/smvdu_logo.webp" alt="SMVDU Logo" className="h-12 w-auto" />
              <h3 className="font-heading text-2xl tracking-widest text-white">EKATVA</h3>
            </div>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-2">
              The annual techfest of Shri Mata Vaishno Devi University. Where technology meets divinity in the sacred hills of Katra.
            </p>
            <p className="font-mono text-xs text-cyan-400/50 tracking-wider mb-6">MARCH 9 &ndash; 11, 2026 &bull; KATRA, J&amp;K</p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, url: 'https://www.instagram.com/smvduniversityofficial/', label: 'Instagram' },
                { icon: Linkedin, url: 'https://www.linkedin.com/school/shri-mata-vaishno-devi-university', label: 'LinkedIn' },
                { icon: Youtube, url: 'https://www.youtube.com/SMVDUniversity', label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-heading text-sm tracking-wider text-white/60 uppercase mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'About', to: '/about' },
                { label: 'Events', to: '/events' },
                { label: 'Team', to: '/team' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Clubs', to: '/clubs' },
              ].map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                  className="block font-body text-sm text-white/30 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {[
                { label: 'Campus', href: '#campus' },
                { label: 'Register', href: '#register' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                  className="block font-body text-sm text-white/30 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-heading text-sm tracking-wider text-white/60 uppercase mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-cyan-400/50 mt-0.5 shrink-0" />
                <p className="font-body text-sm text-white/40">
                  Shri Mata Vaishno Devi University,<br />
                  Katra, Reasi, J&K - 182320
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400/50 shrink-0" />
                <a href="mailto:ekatva@smvdu.ac.in" className="font-body text-sm text-white/40 hover:text-cyan-400/70 transition-colors">
                  ekatva@smvdu.ac.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-cyan-400/50 shrink-0" />
                <a href="tel:+919622337733" className="font-body text-sm text-white/40 hover:text-cyan-400/70 transition-colors">
                  +91 96223 37733
                </a>
              </div>
              <a
                href="https://smvdu.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 font-body text-sm text-cyan-400/50 hover:text-cyan-400 transition-colors"
              >
                smvdu.ac.in <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/15">
            &copy; 2026 Ekatva Techfest, SMVDU. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/15">
            Crafted with precision and passion
          </p>
        </div>
      </div>
    </footer>
  );
}
