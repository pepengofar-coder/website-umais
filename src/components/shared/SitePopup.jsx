import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContent } from '../../lib/content';
import './SitePopup.css';

export default function SitePopup() {
  const { content } = useSiteContent();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const popup = content.popup || {};

  useEffect(() => {
    if (!popup.enabled) return;

    // Don't show on admin page
    if (location.pathname.startsWith('/admin')) return;

    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('umais_popup_dismissed');
    if (dismissed) return;

    // Show popup after a 2 second delay
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [popup.enabled, location.pathname]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem('umais_popup_dismissed', 'true');
  };

  if (!popup.enabled) return null;

  const isExternal = popup.buttonLink?.startsWith('http');

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="site-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className="site-popup"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Close button */}
            <button className="site-popup-close" onClick={handleClose} aria-label="Tutup">
              <X size={20} />
            </button>

            {/* Colored banner area */}
            <div className="site-popup-banner" style={{ background: popup.bgColor || '#be185d' }}>
              {/* Decorative circles */}
              <div className="popup-deco popup-deco-1" />
              <div className="popup-deco popup-deco-2" />
              <div className="popup-deco popup-deco-3" />

              {popup.image ? (
                <img src={popup.image} alt="" className="site-popup-img" />
              ) : (
                <div className="site-popup-emoji">📢</div>
              )}

              <h2 className="site-popup-title">{popup.title}</h2>
              <p className="site-popup-subtitle">{popup.subtitle}</p>
            </div>

            {/* Content area */}
            <div className="site-popup-body">
              <p className="site-popup-desc">{popup.description}</p>

              <div className="site-popup-actions">
                {isExternal ? (
                  <a
                    href={popup.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-popup-btn"
                    style={{ background: popup.bgColor || '#be185d' }}
                    onClick={handleClose}
                  >
                    {popup.buttonText || 'Selengkapnya'}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link
                    to={popup.buttonLink || '/ppdb'}
                    className="site-popup-btn"
                    style={{ background: popup.bgColor || '#be185d' }}
                    onClick={handleClose}
                  >
                    {popup.buttonText || 'Selengkapnya'}
                    <ArrowRight size={16} />
                  </Link>
                )}

                <button className="site-popup-dismiss" onClick={handleClose}>
                  Nanti saja
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
