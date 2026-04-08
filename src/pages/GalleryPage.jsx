import { useState } from 'react';
import { Image, Newspaper, Share2, Calendar, Tag, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './GalleryPage.css';

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

const newsData = [
  {
    title: 'PPDB Gelombang Terakhir Dibuka!',
    date: '1 April 2026',
    category: 'PPDB',
    excerpt: 'Pendaftaran Peserta Didik Baru gelombang terakhir telah dibuka. Periode pendaftaran 01 April – 30 Mei 2026. Jangan sampai kehabisan kursi!',
    image: '/images/hero-school.png',
  },
  {
    title: 'Khataman Al-Qur\'an Angkatan ke-10',
    date: '15 Maret 2026',
    category: 'Keislaman',
    excerpt: 'Alhamdulillah, 25 santri-siswi telah menyelesaikan hafalan Al-Qur\'an. Acara khataman berlangsung khidmat dihadiri wali murid.',
    image: '/images/classroom.png',
  },
  {
    title: 'Juara Olimpiade Sains Kota Bogor',
    date: '20 Februari 2026',
    category: 'Prestasi',
    excerpt: 'Siswi SMP UMAIS meraih juara 1 dan 3 dalam Olimpiade Sains tingkat Kota Bogor bidang Matematika dan IPA.',
    image: '/images/facilities.png',
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
                <div className="news-list">
                  {newsData.map((news, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <article className="news-card">
                        <div className="news-img">
                          <img src={news.image} alt={news.title} loading="lazy" />
                        </div>
                        <div className="news-content">
                          <div className="news-meta">
                            <span className="news-date">
                              <Calendar size={12} /> {news.date}
                            </span>
                            <span className="news-category-tag">
                              <Tag size={12} /> {news.category}
                            </span>
                          </div>
                          <h3>{news.title}</h3>
                          <p>{news.excerpt}</p>
                        </div>
                      </article>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {activeTab === 'social' && (
                <div className="social-embed-section">
                  <ScrollReveal>
                    <div className="social-embed-grid">
                      <a
                        href="https://www.instagram.com/smpumaisbogor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-embed-card"
                      >
                        <div className="social-embed-header" style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' }}>
                          <Instagram size={32} />
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
                        href="https://www.facebook.com/umaisbogor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-embed-card"
                      >
                        <div className="social-embed-header" style={{ background: 'linear-gradient(135deg, #1877f2, #0d6efd)' }}>
                          <Facebook size={32} />
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
