import { useSiteContent } from '../lib/content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Globe, Award, Heart, GraduationCap,
  Users, Star, ArrowRight, MessageCircle, Calendar,
  BookOpenCheck, Microscope, Palette, Dumbbell, Quote,
  ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../components/shared/ScrollReveal';
import './HomePage.css';

/* ===== HERO ===== */
function HeroSection() {
  const { content } = useSiteContent();
  const hero = content.hero;

  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={hero.image || "/images/hero-school.png"} alt="Hero" />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            {hero.badge}
          </div>

          <h1>{hero.headline}</h1>

          <p className="hero-subtitle">
            {hero.subtitle}
          </p>

          <div className="hero-actions">
            <Link to="/ppdb" className="btn btn-primary btn-lg">
              Pendaftaran PPDB
            </Link>
          </div>
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
  return (
    <section className="section overview-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-pink">Keunggulan Kami</span>
            <h2>Sekolah Islam Kreatif untuk Muslimah Masa Depan</h2>
            <div className="divider divider-center" />
            <p>
              SMP UMAIS Bogor hadir sebagai wadah pendidikan yang membentuk generasi
              muslimah cerdas, berakhlak, dan siap menghadapi tantangan global.
            </p>
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

        <h2>Visi & Misi</h2>

        <div className="visi-grid">
          <div className="visi-card">
            <h3>Visi</h3>
            <p>{content.visi}</p>
          </div>

          <div className="visi-card">
            <h3>Misi</h3>
            <ul>
              {content.misi?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ===== FACILITIES PREVIEW ===== */
function FacilityPreview() {
  const { content } = useSiteContent();

  const facilities = [
    {
      img: content.facility1 || "/images/facilities.png",
      title: "Lingkungan Sekolah",
      desc: "Kampus asri dan nyaman"
    },
    {
      img: content.facility2 || "/images/classroom.png",
      title: "Kelas Kreatif",
      desc: "Ruang belajar multimedia"
    },
    {
      img: content.facility3 || "/images/hero-school.png",
      title: "Area Terbuka",
      desc: "Taman & area bermain"
    },
  ];

  return (
    <section className="section facilities-section">
      <div className="container">

        <h2>Fasilitas</h2>

        <div className="facilities-grid">
          {facilities.map((fac, i) => (
            <div key={i} className="facility-card">
              <img src={fac.img} />
              <h3>{fac.title}</h3>
              <p>{fac.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ===== PPDB BANNER ===== */
function PPDBBanner() {
  return (
    <section className="section ppdb-banner-section">
      <div className="container">
        <ScrollReveal>
          <div className="ppdb-banner">
            <div className="ppdb-banner-bg" />
            <div className="ppdb-banner-content">
              <span className="badge badge-gold" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                📢 PPDB Gelombang Terakhir!
              </span>
              <h2>Pendaftaran Peserta Didik Baru<br />Tahun Ajaran 2026/2027</h2>
              <p>01 April – 30 Mei 2026 • Jangan sampai kehabisan kursi, daftar segera!</p>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <Link to="/ppdb" className="btn btn-primary btn-lg" style={{ background: 'white', color: 'var(--pink-700)', boxShadow: 'var(--shadow-lg)' }}>
                  <GraduationCap size={18} />
                  Daftar Sekarang
                </Link>
                <a
                  href="https://wa.me/6283808417406?text=Assalamu'alaikum, saya ingin mendaftar PPDB SMP UMAIS Bogor."
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

/* ===== TESTIMONIALS ===== */
const testimonials = [
  {
    text: 'Alhamdulillah, anak saya sangat senang bersekolah di SMP UMAIS. Guru-gurunya sangat perhatian dan lingkungannya sangat Islami.',
    name: 'Ibu Fatimah',
    role: 'Wali Murid Kelas 8',
    rating: 5,
  },
  {
    text: 'Program Tahfidz-nya luar biasa. Anak saya sudah hafal 5 juz dalam 2 tahun. Metode pembelajarannya sangat efektif.',
    name: 'Ibu Sarah',
    role: 'Wali Murid Kelas 9',
    rating: 5,
  },
  {
    text: 'Kurikulum terpadu yang memadukan pendidikan Islam dan akademik umum membuat anak saya berkembang secara menyeluruh.',
    name: 'Ibu Aisyah',
    role: 'Wali Murid Kelas 7',
    rating: 5,
  },
];

function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <div className="testimonial-carousel">
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
                <p className="testimonial-text">{testimonials[current].text}</p>
                <div className="testimonial-stars">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonials[current].name.charAt(4)}
                  </div>
                  <div>
                    <div className="testimonial-name">{testimonials[current].name}</div>
                    <div className="testimonial-role">{testimonials[current].role}</div>
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
              href="https://www.instagram.com/smpumaisbogor/"
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
              href="https://www.facebook.com/umaisbogor"
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
              href="https://wa.me/6283808417406"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card social-whatsapp"
            >
              <div className="social-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>0838-0841-7406</p>
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
