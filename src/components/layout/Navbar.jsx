import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Tentang Kami' },
  { path: '/akademik', label: 'Akademik' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/ppdb', label: 'PPDB', isCta: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img src="/images/logo.png" alt="Logo SMP UMAIS Bogor" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">SMP UMAIS</span>
              <span className="logo-tagline">Shalihah · Cerdas · Kreatif</span>
            </div>
          </Link>

          <div className="navbar-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''} ${item.isCta ? 'nav-link-cta' : ''}`
                }
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <img src="/images/logo.png" alt="Logo SMP UMAIS" className="logo-img" style={{ width: '40px' }} />
                <div>
                  <div className="logo-name" style={{ color: 'var(--pink-700)' }}>SMP UMAIS</div>
                  <div className="logo-tagline">Shalihah · Cerdas · Kreatif</div>
                </div>
              </div>
              <div className="mobile-menu-links">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `mobile-link ${isActive ? 'mobile-link-active' : ''} ${item.isCta ? 'mobile-link-cta' : ''}`
                      }
                      end={item.path === '/'}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="mobile-menu-footer">
                <p>📞 0838-0841-7406</p>
                <p>✉️ umaisbogor@gmail.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
