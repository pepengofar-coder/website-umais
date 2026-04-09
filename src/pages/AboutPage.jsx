import { Award, BookOpen } from 'lucide-react';
import { useSiteContent } from '../lib/content';
import { getIconComponent } from './AdminDashboard';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import './AboutPage.css';

export default function AboutPage() {
  const { content } = useSiteContent();
  const teachers = content.teachers || [];
  const aboutFacilities = content.aboutFacilities || [];
  const aboutGallery = content.aboutGallery || [];

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
                <img src={content.aboutImage || '/images/hero-school.png'} alt="SMP UMAIS Bogor" />
                <div className="about-img-badge glass">
                  <span className="about-img-badge-num">{content.stats?.years || '4+'}</span>
                  <span>Tahun Berdiri</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="about-text">
                <span className="badge badge-pink">Sejarah Kami</span>
                <h2>SMP Ummul Mukminin Aisyah Islamic School</h2>
                <div className="divider" />
                <p>{content.aboutDesc}</p>
                <p>
                  Dengan tagline <strong>"School of Muslimah"</strong>, SMP UMAIS 
                  berkomitmen memberikan pendidikan terbaik yang memadukan kurikulum 
                  nasional dengan program keislaman yang komprehensif, termasuk 
                  Tahfidz Al-Qur'an, kajian kitab, dan pembinaan akhlak.
                </p>
                <p>
                  Berlokasi di Kayu Manis, Tanah Sareal, Kota Bogor, SMP UMAIS menyediakan 
                  lingkungan belajar yang aman, nyaman, dan Islami untuk para 
                  santri-siswi kami berkembang secara optimal.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Teachers */}
      {teachers.length > 0 && (
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
                    {teacher.usePhoto && teacher.image ? (
                      <div className="teacher-photo">
                        <img src={teacher.image} alt={teacher.name} />
                      </div>
                    ) : (
                      <div className="teacher-avatar">
                        <span>{teacher.initial || '?'}</span>
                      </div>
                    )}
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <span className="teacher-role">{teacher.role}</span>
                    <span className="teacher-subject">{teacher.subject}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      {aboutFacilities.length > 0 && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="badge badge-pink">Fasilitas</span>
                <h2>Fasilitas Unggulan</h2>
                <div className="divider divider-center" />
                <p>Kami menyediakan berbagai fasilitas terbaik untuk menunjang kegiatan belajar mengajar.</p>
              </div>
            </ScrollReveal>

            <div className="facility-list-grid">
              {aboutFacilities.map((fac, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="card facility-list-card">
                    <div className="facility-list-icon">
                      {getIconComponent(fac.icon, 28)}
                    </div>
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
      )}

      {/* Gallery images */}
      {aboutGallery.length > 0 && (
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
              {aboutGallery.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="about-gallery-item">
                    <img src={item.image || '/images/hero-school.png'} alt={item.caption || `Galeri ${i + 1}`} />
                    {item.caption && (
                      <div className="about-gallery-caption">{item.caption}</div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
