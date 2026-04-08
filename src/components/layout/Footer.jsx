import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="var(--pink-900)" />
        </svg>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/images/logo.png" alt="Logo SMP UMAIS" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                <div>
                  <div className="footer-brand-name">SMP UMAIS</div>
                  <div className="footer-brand-tagline">Shalihah · Cerdas · Kreatif</div>
                </div>
              </div>
              <p className="footer-desc">
                SMP Ummul Mukminin Aisyah Islamic School Kota Bogor. 
                Membangun generasi muslimah berakhlak mulia dan berwawasan internasional.
              </p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/smpumaisbogor/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.facebook.com/umaisbogor" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://wa.me/6283808417406" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-section">
              <h4 className="footer-heading">Navigasi</h4>
              <ul className="footer-links">
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/tentang">Tentang Kami</Link></li>
                <li><Link to="/akademik">Akademik</Link></li>
                <li><Link to="/galeri">Galeri & Berita</Link></li>
                <li><Link to="/ppdb">PPDB</Link></li>
              </ul>
            </div>

            {/* Academic */}
            <div className="footer-section">
              <h4 className="footer-heading">Program</h4>
              <ul className="footer-links">
                <li><Link to="/akademik">Kurikulum Terpadu</Link></li>
                <li><Link to="/akademik">Tahfidz Al-Qur'an</Link></li>
                <li><Link to="/akademik">English Program</Link></li>
                <li><Link to="/akademik">Ekstrakurikuler</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4 className="footer-heading">Kontak</h4>
              <ul className="footer-contact">
                <li>
                  <MapPin size={14} />
                  <span>Kota Bogor, Jawa Barat, Indonesia</span>
                </li>
                <li>
                  <Phone size={14} />
                  <span>0838-0841-7406</span>
                </li>
                <li>
                  <Mail size={14} />
                  <span>umaisbogor@gmail.com</span>
                </li>
                <li>
                  <MessageCircle size={14} />
                  <a href="https://wa.me/6283808417406" target="_blank" rel="noopener noreferrer">
                    WhatsApp Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} SMP Ummul Mukminin Aisyah Islamic School Kota Bogor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
