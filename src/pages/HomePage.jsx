import { useSiteContent } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Globe, Award, Heart, GraduationCap,
  Users, Star, ArrowRight, MessageCircle, Calendar,
  BookOpenCheck, Microscope, Palette, Dumbbell, Quote,
  ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ScrollReveal from '../components/shared/ScrollReveal';
import './HomePage.css';

/* ===== HERO ===== */
function HeroSection() {
  const { content } = useSiteContent();
  const { hero, stats } = content;

  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={hero.image || '/images/hero-school.png'} alt="SMP UMAIS Bogor Campus" />
        <div className="hero-overlay" />
      </div>
      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-badge">
            <Star size={12} />
            {hero.badge}
          </div>
          <h1>
            {hero.headline}
          </h1>
          <p className="hero-subtitle">
            {hero.subtitle}
          </p>
          <div className="hero-actions">
            <Link to="/ppdb" className="btn btn-primary btn-lg">
              <Calendar size={18} />
              Pendaftaran PPDB
            </Link>
            <a
              href={`https://wa.me/${content.contact.whatsapp}?text=Assalamu'alaikum, saya ingin bertanya mengenai SMP UMAIS Bogor.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <MessageCircle size={18} />
              Hubungi Kami
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-stats glass-dark"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-number">{stats.alumni}</span>
            <span className="hero-stat-label">Alumni Berprestasi</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">{stats.teachers}</span>
            <span className="hero-stat-label">Tenaga Pendidik</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">{stats.years}</span>
            <span className="hero-stat-label">Tahun Berdiri</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronLeft size={20} style={{ transform: 'rotate(-90deg)' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ===== OVERVIEW CARDS ===== */
const overviewData = [
  {
    icon: <Heart size={28} />,
    title: 'Nilai Islami',
    description: 'Menanamkan akhlakul karimah dan nilai-nilai Islam dalam setiap aspek pembelajaran.',
    color: 'var(--pink-500)',
  },
  {
    icon: <Globe size={28} />,
    title: 'Standar Nasional',
    description: 'Kurikulum yang memenuhi standar pendidikan nasional untuk daya saing di tingkat nasional.',
    color: 'var(--pink-600)',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Kurikulum Terpadu',
    description: 'Perpaduan kurikulum nasional, Cambridge, dan program Tahfidz Al-Qur\'an.',
    color: 'var(--pink-700)',
  },
  {
    icon: <Award size={28} />,
    title: 'Prestasi Unggulan',
    description: 'Meraih berbagai prestasi di tingkat kota, provinsi, hingga nasional.',
    color: 'var(--pink-800)',
  },
];

function OverviewSection() {
  const { content } = useSiteContent();

  return (
    <section className="section overview-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-pink">Keunggulan Kami</span>
            <h2>{content.overviewTitle}</h2>
            <div className="divider divider-center" />
            <p>{content.overviewDesc}</p>
          </div>
        </ScrollReveal>

        <div className="overview-grid">
          {overviewData.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="card overview-card">
                <div className="overview-icon" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== VISI MISI ===== */
function VisionMission() {
  const { content } = useSiteContent();

  return (
    <section className="section section-alt visi-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-gold">Fondasi Kami</span>
            <h2>Visi & Misi</h2>
            <div className="divider divider-center" />
          </div>
        </ScrollReveal>

        <div className="visi-grid">
          <ScrollReveal direction="left">
            <div className="visi-card visi-card-main">
              <div className="visi-icon">🌟</div>
              <h3>Visi</h3>
              <p>"{content.visi}"</p>
              <div className="ornament-line">
                <span>✦</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="visi-card">
              <div className="visi-icon">🎯</div>
              <h3>Misi</h3>
              <ul className="misi-list">
                {content.misi?.map((item, i) => (
                  <li key={i}>
                    <span className="misi-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ===== FACILITIES PREVIEW ===== */
function FacilityPreview() {
  const { content } = useSiteContent();
  const defaultImages = ['/images/facilities.png', '/images/classroom.png', '/images/hero-school.png'];
  const facilities = content.facilities || [];

  return (
    <section className="section facilities-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-pink">Fasilitas</span>
            <h2>Lingkungan Belajar yang Inspiratif</h2>
            <div className="divider divider-center" />
            <p>
              Kami menyediakan fasilitas terbaik dan lingkungan yang kondusif
              untuk mendukung proses belajar mengajar yang berkualitas.
            </p>
          </div>
        </ScrollReveal>

        <div className="facilities-grid">
          {facilities.map((fac, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="facility-card">
                <div className="facility-img-wrap">
                  <img src={fac.image || defaultImages[i]} alt={fac.title} loading="lazy" />
                  <div className="facility-img-overlay">
                    <span>{fac.title}</span>
                  </div>
                </div>
                <div className="facility-info">
                  <h3>{fac.title}</h3>
                  <p>{fac.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/tentang" className="btn btn-outline-pink">
              Lihat Semua Fasilitas
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===== PPDB BANNER ===== */
function PPDBBanner() {
  const { content } = useSiteContent();

  return (
    <section className="section ppdb-banner-section">
      <div className="container">
        <ScrollReveal>
          <div className="ppdb-banner">
            <div className="ppdb-banner-bg" />
            <div className="ppdb-banner-content">
              <span className="badge badge-gold" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                📢 {content.ppdb.wave}
              </span>
              <h2>Pendaftaran Peserta Didik Baru<br />Tahun Ajaran 2026/2027</h2>
              <p>{content.ppdb.startDate} – {content.ppdb.endDate} • Jangan sampai kehabisan kursi, daftar segera!</p>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <Link to="/ppdb" className="btn btn-primary btn-lg" style={{ background: 'white', color: 'var(--pink-700)', boxShadow: 'var(--shadow-lg)' }}>
                  <GraduationCap size={18} />
                  Daftar Sekarang
                </Link>
                <a
                  href={`https://wa.me/${content.contact.whatsapp}?text=Assalamu'alaikum, saya ingin mendaftar PPDB SMP UMAIS Bogor.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <MessageCircle size={18} />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===== TESTIMONIALS (Dynamic from content) ===== */
function TestimonialSection() {
  const { content } = useSiteContent();
  const testimonials = content.testimonials || [];
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = useCallback((e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    setTouchStart(null);
  }, [touchStart, testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[current] || testimonials[0];

  return (
    <section className="section section-alt testimonial-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-pink">Testimoni</span>
            <h2>Apa Kata Wali Murid?</h2>
            <div className="divider divider-center" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="testimonial-carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="testimonial-nav-btn"
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-content">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="testimonial-card"
              >
                <Quote size={32} className="testimonial-quote-icon" />
                <p className="testimonial-text">{currentTestimonial.text}</p>
                <div className="testimonial-stars">
                  {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <div className="testimonial-author">
                  {currentTestimonial.image ? (
                    <div className="testimonial-avatar-photo">
                      <img src={currentTestimonial.image} alt={currentTestimonial.name} />
                    </div>
                  ) : (
                    <div className="testimonial-avatar">
                      {currentTestimonial.name ? currentTestimonial.name.charAt(0) : '?'}
                    </div>
                  )}
                  <div>
                    <div className="testimonial-name">{currentTestimonial.name}</div>
                    <div className="testimonial-role">{currentTestimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <button
              className="testimonial-nav-btn"
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===== SOCIAL PROOF ===== */
function SocialProof() {
  const { content } = useSiteContent();

  return (
    <section className="section social-proof-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-pink">Ikuti Kami</span>
            <h2>Tetap Terhubung</h2>
            <div className="divider divider-center" />
            <p>Ikuti media sosial kami untuk informasi terbaru dan kegiatan sekolah.</p>
          </div>
        </ScrollReveal>

        <div className="social-grid">
          <ScrollReveal delay={0.1}>
            <a
              href={content.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card social-instagram"
            >
              <div className="social-icon">📸</div>
              <h3>Instagram</h3>
              <p>@smpumaisbogor</p>
              <span className="social-follow">Ikuti Kami →</span>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href={content.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card social-facebook"
            >
              <div className="social-icon">👍</div>
              <h3>Facebook</h3>
              <p>UMAIS Bogor</p>
              <span className="social-follow">Sukai Kami →</span>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <a
              href={`https://wa.me/${content.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card social-whatsapp"
            >
              <div className="social-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>{content.contact.phone}</p>
              <span className="social-follow">Chat Sekarang →</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ===== HOME PAGE ===== */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <VisionMission />
      <FacilityPreview />
      <PPDBBanner />
      <TestimonialSection />
      <SocialProof />
    </>
  );
}
