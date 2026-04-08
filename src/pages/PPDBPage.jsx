import { useState } from 'react';
import { Calendar, FileText, CreditCard, Clock, Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle, GraduationCap, Users, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/shared/ScrollReveal';
import { submitPPDBRegistration } from '../lib/supabase';
import './PPDBPage.css';

const requirements = [
  'Fotokopi Akta Kelahiran (2 lembar)',
  'Fotokopi Kartu Keluarga (2 lembar)',
  'Rapor Kelas 4, 5, dan 6 SD',
  'Pas Foto 3x4 (4 lembar, latar merah)',
  'Surat Keterangan Lulus (menyusul)',
  'Fotokopi KTP Orang Tua / Wali',
];

const steps = [
  { num: '01', title: 'Isi Formulir', desc: 'Lengkapi formulir pendaftaran di bawah atau datang langsung ke sekolah.' },
  { num: '02', title: 'Verifikasi', desc: 'Tim kami akan menghubungi Anda via WhatsApp untuk verifikasi data.' },
  { num: '03', title: 'Tes Masuk', desc: 'Calon santri mengikuti tes baca Qur\'an dan wawancara.' },
  { num: '04', title: 'Pengumuman', desc: 'Hasil seleksi diumumkan maksimal 7 hari kerja setelah tes.' },
];

export default function PPDBPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    whatsapp: '',
    school: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Save to Supabase database
    await submitPPDBRegistration(formData);

    // 2. Redirect to WhatsApp with form data
    const text = `Assalamu'alaikum, saya ingin mendaftarkan anak saya di SMP UMAIS Bogor.

*Data Pendaftaran:*
Nama Calon Siswa: ${formData.studentName}
Nama Orang Tua: ${formData.parentName}
No. WhatsApp: ${formData.whatsapp}
Asal Sekolah: ${formData.school}
${formData.message ? `Pesan: ${formData.message}` : ''}

Mohon informasi selanjutnya. Jazakumullahu khairan.`;

    window.open(`https://wa.me/6283808417406?text=${encodeURIComponent(text)}`, '_blank');
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Pendaftaran Peserta Didik Baru"
        breadcrumbs={[{ label: 'PPDB' }]}
      />

      {/* PPDB Info Banner */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="ppdb-info-banner">
              <div className="ppdb-info-grid">
                <div className="ppdb-info-item">
                  <div className="ppdb-info-icon">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4>Jadwal Pendaftaran</h4>
                    <p>01 April – 30 Mei 2026</p>
                  </div>
                </div>
                <div className="ppdb-info-item">
                  <div className="ppdb-info-icon">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4>Gelombang</h4>
                    <p>Gelombang Terakhir (Terbatas!)</p>
                  </div>
                </div>
                <div className="ppdb-info-item">
                  <div className="ppdb-info-icon">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4>Kuota</h4>
                    <p>Terbatas — Segera Daftar!</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Alur Pendaftaran</span>
              <h2>Langkah Pendaftaran</h2>
              <div className="divider divider-center" />
            </div>
          </ScrollReveal>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="step-card">
                  <div className="step-num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section">
        <div className="container">
          <div className="ppdb-requirements-layout">
            <ScrollReveal direction="left">
              <div>
                <span className="badge badge-pink">Persyaratan</span>
                <h2 style={{ marginTop: 'var(--space-3)' }}>Dokumen yang Diperlukan</h2>
                <div className="divider" />
                <ul className="requirements-list">
                  {requirements.map((req, i) => (
                    <li key={i}>
                      <CheckCircle size={16} className="req-icon" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="ppdb-alert-card">
                <div className="ppdb-alert-icon">
                  <AlertCircle size={24} />
                </div>
                <h3>Informasi Penting</h3>
                <ul>
                  <li>Pendaftaran dapat dilakukan secara online maupun langsung di sekolah.</li>
                  <li>Biaya pendaftaran tidak termasuk biaya sekolah.</li>
                  <li>Sekolah berhak menentukan hasil seleksi yang bersifat mutlak.</li>
                  <li>Khusus putri (muslimah).</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Formulir</span>
              <h2>Formulir Pendaftaran</h2>
              <div className="divider divider-center" />
              <p>Isi formulir di bawah ini, data akan dikirim via WhatsApp ke tim kami untuk diproses.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="ppdb-form-wrap">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    className="ppdb-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-group">
                      <label htmlFor="studentName">Nama Lengkap Calon Siswi *</label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Contoh: Aisyah Zahra"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="parentName">Nama Orang Tua / Wali *</label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Contoh: Bapak Ahmad"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="whatsapp">Nomor WhatsApp *</label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="school">Asal Sekolah (SD) *</label>
                        <input
                          type="text"
                          id="school"
                          name="school"
                          required
                          value={formData.school}
                          onChange={handleChange}
                          placeholder="Contoh: SDN 1 Bogor"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Pesan / Pertanyaan (Opsional)</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                        {isSubmitting ? 'Mengirim...' : 'Kirim via WhatsApp'}
                      </button>
                      <a
                        href="https://wa.me/6283808417406"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-wa btn-lg"
                      >
                        <MessageCircle size={18} />
                        Chat Langsung
                      </a>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="form-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={48} />
                    <h3>Terima Kasih!</h3>
                    <p>Data pendaftaran telah dikirim via WhatsApp. Tim kami akan segera menghubungi Anda.</p>
                    <button
                      className="btn btn-outline-pink"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ studentName: '', parentName: '', whatsapp: '', school: '', message: '' });
                      }}
                    >
                      Kirim Lagi
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact & Map */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-pink">Lokasi</span>
              <h2>Hubungi & Kunjungi Kami</h2>
              <div className="divider divider-center" />
            </div>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal direction="left">
              <div className="map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.7!2d106.8068!3d-6.5847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5ca0b0b0b0b%3A0x0!2sFQ97%2B8V9%20Kayu%20Manis%2C%20Tanah%20Sareal%2C%20Kota%20Bogor!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi SMP UMAIS Bogor - Kayu Manis, Tanah Sareal"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="contact-info-card">
                <h3>Informasi Kontak</h3>
                <div className="contact-items">
                  <div className="contact-item">
                    <div className="contact-item-icon"><MapPin size={18} /></div>
                    <div>
                      <h4>Alamat</h4>
                      <p>Jl. Kp. Salabenda, RT.02/RW.04, Kayu Manis, Tanah Sareal, Kota Bogor, Jawa Barat 16169</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><Phone size={18} /></div>
                    <div>
                      <h4>Telepon / WhatsApp</h4>
                      <p>0838-0841-7406</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><Mail size={18} /></div>
                    <div>
                      <h4>Email</h4>
                      <p>umaisbogor@gmail.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><Clock size={18} /></div>
                    <div>
                      <h4>Jam Layanan</h4>
                      <p>Senin – Jumat: 07:00 – 15:00 WIB</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/6283808417406?text=Assalamu'alaikum, saya ingin mengunjungi SMP UMAIS Bogor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa"
                  style={{ width: '100%', marginTop: 'var(--space-6)' }}
                >
                  <MessageCircle size={18} />
                  Jadwalkan Kunjungan
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
