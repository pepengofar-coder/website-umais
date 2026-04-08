import { BookOpenCheck, Globe, Heart, Palette, Music, Monitor, Dumbbell, PenTool, BookOpen, Trophy, Sparkles } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './AcademicPage.css';

const curriculum = [
  {
    icon: <BookOpenCheck size={32} />,
    title: 'Tahfidz Al-Qur\'an',
    desc: 'Program hafalan Al-Qur\'an dengan metode mutqin. Target minimal 5 juz selama 3 tahun. Dibimbing oleh ustadzah-ustadzah hafidzhah bersanad.',
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

const extras = [
  { icon: <Palette size={20} />, name: 'Seni Kaligrafi', desc: 'Menulis indah huruf Arab' },
  { icon: <PenTool size={20} />, name: 'Jurnalistik', desc: 'Menulis & reportase' },
  { icon: <Monitor size={20} />, name: 'Coding Club', desc: 'Pemrograman dasar' },
  { icon: <Dumbbell size={20} />, name: 'Olahraga', desc: 'Badminton, Futsal, Panahan' },
  { icon: <Music size={20} />, name: 'Nasyid', desc: 'Seni vokal Islami' },
  { icon: <Trophy size={20} />, name: 'Olimpiade Sains', desc: 'Persiapan kompetisi' },
  { icon: <Sparkles size={20} />, name: 'Life Skills', desc: 'Keterampilan hidup' },
  { icon: <BookOpenCheck size={20} />, name: 'Tahsin', desc: 'Perbaikan bacaan Qur\'an' },
];

const timeline = [
  { month: 'Juli', event: 'Awal Tahun Ajaran', desc: 'Masa Orientasi & Pembukaan' },
  { month: 'September', event: 'UTS Semester 1', desc: 'Ujian Tengah Semester' },
  { month: 'Desember', event: 'UAS Semester 1', desc: 'Ujian & Libur Semester' },
  { month: 'Maret', event: 'UTS Semester 2', desc: 'Ujian Tengah Semester' },
  { month: 'Mei', event: 'Ujian Akhir', desc: 'UAS & Persiapan Wisuda' },
  { month: 'Juni', event: 'Wisuda', desc: 'Kelulusan & Pelepasan' },
];

export default function AcademicPage() {
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

      {/* Timeline */}
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
            {timeline.map((item, i) => (
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

      {/* Extracurricular */}
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
            {extras.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="card ekskul-card">
                  <div className="ekskul-icon">{item.icon}</div>
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
