import { BookOpenCheck, Globe, Heart, BookOpen } from 'lucide-react';
import { useSiteContent } from '../lib/content';
import { getIconComponent } from './AdminDashboard';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './AcademicPage.css';

const curriculum = [
  {
    icon: <BookOpenCheck size={32} />,
    title: "Tahfidz Al-Qur'an",
    desc: "Program hafalan Al-Qur'an dengan metode mutqin. Target minimal 5 juz selama 3 tahun. Dibimbing oleh ustadzah-ustadzah hafidzhah bersanad.",
    color: 'var(--pink-600)',
  },
  {
    icon: <Globe size={32} />,
    title: 'English Program',
    desc: 'Pembelajaran Bahasa Inggris intensif dengan pendekatan komunikatif. English Day setiap minggu dan English Camp tahunan.',
    color: 'var(--pink-700)',
  },
  {
    icon: <Heart size={32} />,
    title: 'Pendidikan Karakter Muslimah',
    desc: 'Program pembentukan karakter wanita shalihah yang mandiri. Meliputi adab, keterampilan rumah tangga, kepemimpinan, dan kemandirian.',
    color: 'var(--pink-800)',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Kurikulum Nasional',
    desc: 'Mengikuti Kurikulum Merdeka yang diperkaya dengan muatan keislaman. Persiapan optimal untuk jenjang pendidikan selanjutnya.',
    color: 'var(--pink-500)',
  },
];

export default function AcademicPage() {
  const { content } = useSiteContent();
  const calendar = content.calendar || [];
  const extracurriculars = content.extracurriculars || [];

  return (
    <>
      <PageHeader
        title="Program Akademik"
        breadcrumbs={[{ label: 'Akademik' }]}
      />

      {/* Curriculum */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Kurikulum</span>
              <h2>Kurikulum Terpadu: Islam & Akademik</h2>
              <div className="divider divider-center" />
              <p>
                Kami memadukan kurikulum nasional dengan program keislaman 
                yang komprehensif untuk membentuk muslimah seutuhnya.
              </p>
            </div>
          </ScrollReveal>

          <div className="curriculum-grid">
            {curriculum.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="curriculum-card">
                  <div className="curriculum-icon" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — from content context */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-gold">Kalender</span>
              <h2>Kalender Akademik</h2>
              <div className="divider divider-center" />
            </div>
          </ScrollReveal>

          <div className="timeline">
            {calendar.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content card">
                    <span className="timeline-month">{item.month}</span>
                    <h3>{item.event}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular — from content context with dynamic icons */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Pengembangan Diri</span>
              <h2>Ekstrakurikuler</h2>
              <div className="divider divider-center" />
              <p>Berbagai kegiatan ekstrakurikuler untuk mengembangkan minat dan bakat siswi.</p>
            </div>
          </ScrollReveal>

          <div className="ekskul-grid">
            {extracurriculars.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="card ekskul-card">
                  <div className="ekskul-icon">{getIconComponent(item.icon, 20)}</div>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
