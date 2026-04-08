import { useState, useEffect, useCallback } from 'react';
import { Image, Newspaper, Share2, Calendar, Tag, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './GalleryPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/smpumaisbogor/';
const FACEBOOK_URL = 'https://www.facebook.com/umaisbogor';

const tabs = [
  { id: 'photos', label: 'Galeri Foto', icon: <Image size={16} /> },
  { id: 'news', label: 'Berita & Acara', icon: <Newspaper size={16} /> },
  { id: 'social', label: 'Media Sosial', icon: <Share2 size={16} /> },
];

const photos = [
  { src: '/images/hero-school.png', caption: 'Kampus SMP UMAIS Bogor', category: 'Sekolah' },
  { src: '/images/classroom.png', caption: 'Kegiatan Belajar Mengajar', category: 'Akademik' },
  { src: '/images/facilities.png', caption: 'Fasilitas Sekolah', category: 'Fasilitas' },
  { src: '/images/hero-school.png', caption: 'Upacara Bendera', category: 'Kegiatan' },
  { src: '/images/classroom.png', caption: 'Majelis Tahfidz', category: 'Keislaman' },
  { src: '/images/facilities.png', caption: 'Wisuda & Kelulusan', category: 'Acara' },
];

/**
 * Fetch Instagram oEmbed for a post URL.
 * Uses the official Facebook/Instagram oEmbed API (no auth needed for public posts).
 */
async function fetchInstagramEmbed(postUrl) {
  try {
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}&omitscript=true`;
    const res = await fetch(oembedUrl);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch {
    return null;
  }
}

// Known recent post URLs from @smpumaisbogor
// Update these periodically with latest posts or fetch dynamically
const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DICEfmchf3a/',
  'https://www.instagram.com/p/DIBAxK2hbJJ/',
  'https://www.instagram.com/p/DH-VV5ohWlN/',
  'https://www.instagram.com/p/DH8dZmwhxEP/',
  'https://www.instagram.com/p/DH50FQphFiJ/',
  'https://www.instagram.com/p/DH3UAgahYtL/',
];

function InstagramEmbed({ postUrl }) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchInstagramEmbed(postUrl).then((data) => {
      if (cancelled) return;
      if (data && data.html) {
        setHtml(data.html);
      } else {
        setError(true);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [postUrl]);

  // After injecting HTML, trigger Instagram's embed.js to render
  useEffect(() => {
    if (html && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [html]);

  if (loading) {
    return (
      <div className="ig-embed-placeholder">
        <Loader2 size={24} className="spin" />
        <span>Memuat postingan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ig-embed-placeholder ig-embed-fallback"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        <span>Lihat di Instagram</span>
        <ExternalLink size={14} />
      </a>
    );
  }

  return (
    <div
      className="ig-embed-card"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [igScriptLoaded, setIgScriptLoaded] = useState(false);

  // Load Instagram embed script once
  useEffect(() => {
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      setIgScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => setIgScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Re-process embeds when tab switches to news
  useEffect(() => {
    if (activeTab === 'news' && igScriptLoaded && window.instgrm) {
      setTimeout(() => window.instgrm.Embeds.process(), 300);
    }
  }, [activeTab, igScriptLoaded]);

  return (
    <>
      <PageHeader
        title="Galeri & Berita"
        breadcrumbs={[{ label: 'Galeri & Berita' }]}
      />

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <ScrollReveal>
            <div className="gallery-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`gallery-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'photos' && (
                <div className="photo-grid">
                  {photos.map((photo, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div
                        className="photo-item"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <img src={photo.src} alt={photo.caption} loading="lazy" />
                        <div className="photo-overlay">
                          <span className="photo-category">{photo.category}</span>
                          <span className="photo-caption">{photo.caption}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {activeTab === 'news' && (
                <div className="ig-feed-section">
                  <ScrollReveal>
                    <div className="ig-feed-header">
                      <div className="ig-feed-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--pink-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        <div>
                          <h3>@smpumaisbogor</h3>
                          <p>Postingan terbaru dari Instagram resmi SMP UMAIS Bogor</p>
                        </div>
                      </div>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-pink btn-sm"
                      >
                        Buka Instagram <ExternalLink size={14} />
                      </a>
                    </div>
                  </ScrollReveal>

                  <div className="ig-feed-grid">
                    {INSTAGRAM_POSTS.map((url, i) => (
                      <ScrollReveal key={i} delay={i * 0.08}>
                        <InstagramEmbed postUrl={url} />
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal delay={0.3}>
                    <div className="ig-feed-footer">
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Lihat Semua Postingan di Instagram <ExternalLink size={16} />
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="social-embed-section">
                  <ScrollReveal>
                    <div className="social-embed-grid">
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-embed-card"
                      >
                        <div className="social-embed-header" style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                          <h3>Instagram</h3>
                        </div>
                        <div className="social-embed-body">
                          <p className="social-handle">@smpumaisbogor</p>
                          <p>Ikuti kami di Instagram untuk update kegiatan, foto, dan informasi terbaru.</p>
                          <span className="social-cta">
                            Buka Instagram <ExternalLink size={14} />
                          </span>
                        </div>
                      </a>

                      <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-embed-card"
                      >
                        <div className="social-embed-header" style={{ background: 'linear-gradient(135deg, #1877f2, #0d6efd)' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                          <h3>Facebook</h3>
                        </div>
                        <div className="social-embed-body">
                          <p className="social-handle">UMAIS Bogor</p>
                          <p>Sukai halaman Facebook kami untuk berita lengkap dan interaksi dengan komunitas.</p>
                          <span className="social-cta">
                            Buka Facebook <ExternalLink size={14} />
                          </span>
                        </div>
                      </a>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <div className="social-note">
                      <p>
                        📸 Kami rutin membagikan kegiatan sekolah, prestasi siswi, info PPDB, 
                        dan konten edukatif di media sosial. Follow dan like untuk tetap terhubung!
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
              <p className="lightbox-caption">{selectedPhoto.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
