import { Users, Award, BookOpen, Building, Microscope, Library, Monitor, Landmark } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './AboutPage.css';

const teachers = [
  { name: 'Ustadzah Nurul Hidayah, S.Pd.I', role: 'Kepala Sekolah', subject: 'Manajemen Pendidikan', initial: 'N' },
  { name: 'Ustadzah Siti Rahmah, M.Pd', role: 'Wakil Kurikulum', subject: 'Matematika', initial: 'S' },
  { name: 'Ustadzah Hafshah, S.Ag', role: 'Guru Tahfidz', subject: 'Al-Qur\'an & Hadits', initial: 'H' },
  { name: 'Ustadzah Maryam, S.Pd', role: 'Guru Bahasa', subject: 'English & Arabic', initial: 'M' },
  { name: 'Ustadzah Khadijah, M.Si', role: 'Guru IPA', subject: 'Sains & Matematika', initial: 'K' },
  { name: 'Ustadzah Fatimah, S.Pd', role: 'Guru BK', subject: 'Bimbingan Konseling', initial: 'F' },
];

const facilities = [
  { icon: <Landmark size={28} />, title: 'Musholla', desc: 'Tempat ibadah nyaman untuk sholat jamaah dan kajian rutin.' },
  { icon: <Microscope size={28} />, title: 'Laboratorium IPA', desc: 'Dilengkapi peralatan modern untuk praktikum sains.' },
  { icon: <Monitor size={28} />, title: 'Lab Komputer', desc: 'Komputer terbaru dengan koneksi internet cepat.' },
  { icon: <Library size={28} />, title: 'Perpustakaan', desc: 'Koleksi buku lengkap islami dan akademik.' },
  { icon: <Building size={28} />, title: 'Ruang Kelas AC', desc: 'Kelas ber-AC dengan multimedia interaktif.' },
  { icon: <Award size={28} />, title: 'Aula Serbaguna', desc: 'Untuk acara sekolah, seminar, dan pentas seni.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Tentang Kami"
        breadcrumbs={[{ label: 'Tentang Kami' }]}
      />

      {/* History */}
      <section className="section">
        <div className="container">
          <div className="about-history">
            <ScrollReveal direction="left">
              <div className="about-img-wrap">
                <img src="/images/hero-school.png" alt="SMP UMAIS Bogor" />
                <div className="about-img-badge glass">
                  <span className="about-img-badge-num">15+</span>
                  <span>Tahun Berdiri</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="about-text">
                <span className="badge badge-pink">Sejarah Kami</span>
                <h2>SMP Ummul Mukminin Aisyah Islamic School</h2>
                <div className="divider" />
                <p>
                  SMP Ummul Mukminin Aisyah (UMAIS) Bogor adalah sekolah Islam khusus 
                  muslimah yang berdiri dengan visi mencetak generasi muslimah yang 
                  cerdas, berakhlak mulia, dan berwawasan internasional.
                </p>
                <p>
                  Dengan tagline <strong>"School of Muslimah"</strong>, SMP UMAIS 
                  berkomitmen memberikan pendidikan terbaik yang memadukan kurikulum 
                  nasional dengan program keislaman yang komprehensif, termasuk 
                  Tahfidz Al-Qur'an, kajian kitab, dan pembinaan akhlak.
                </p>
                <p>
                  Berlokasi di Kota Bogor, Jawa Barat, SMP UMAIS menyediakan 
                  lingkungan belajar yang aman, nyaman, dan Islami untuk para 
                  santri-siswi kami berkembang secara optimal.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Tim Pengajar</span>
              <h2>Profil Tenaga Pendidik</h2>
              <div className="divider divider-center" />
              <p>
                Tenaga pendidik kami adalah profesional yang berpengalaman 
                dan berdedikasi tinggi dalam menjalankan amanah pendidikan.
              </p>
            </div>
          </ScrollReveal>

          <div className="teacher-grid">
            {teachers.map((teacher, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="card teacher-card">
                  <div className="teacher-avatar">
                    <span>{teacher.initial}</span>
                  </div>
                  <h3 className="teacher-name">{teacher.name}</h3>
                  <span className="teacher-role">{teacher.role}</span>
                  <span className="teacher-subject">{teacher.subject}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Fasilitas</span>
              <h2>Fasilitas Unggulan</h2>
              <div className="divider divider-center" />
              <p>Kami menyediakan berbagai fasilitas modern untuk menunjang kegiatan belajar mengajar.</p>
            </div>
          </ScrollReveal>

          <div className="facility-list-grid">
            {facilities.map((fac, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="card facility-list-card">
                  <div className="facility-list-icon">{fac.icon}</div>
                  <div>
                    <h3>{fac.title}</h3>
                    <p>{fac.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery images */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Galeri</span>
              <h2>Suasana Sekolah Kami</h2>
              <div className="divider divider-center" />
            </div>
          </ScrollReveal>
          <div className="about-gallery-grid">
            <ScrollReveal delay={0.1}>
              <div className="about-gallery-item">
                <img src="/images/classroom.png" alt="Suasana Kelas" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="about-gallery-item about-gallery-tall">
                <img src="/images/hero-school.png" alt="Kampus SMP UMAIS" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="about-gallery-item">
                <img src="/images/facilities.png" alt="Fasilitas Sekolah" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
