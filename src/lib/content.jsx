import { createContext, useContext, useState, useEffect } from 'react';

const SiteContentContext = createContext(null);

const DEFAULT_CONTENT = {
  hero: {
    badge: 'School of Muslimah',
    headline: 'Membangun Generasi Muslimah Berakhlak Mulia & Berwawasan Nasional',
    subtitle: 'SMP Ummul Mukminin Aisyah Islamic School Kota Bogor — Memadukan pendidikan Islam berkualitas dengan standar akademik nasional.',
    image: '',
  },
  stats: {
    alumni: '30+',
    teachers: '10+',
    years: '4+',
  },
  contact: {
    phone: '0838-0841-7406',
    email: 'umaisbogor@gmail.com',
    address: 'Jl. Kp. Salabenda, RT.02/RW.04, Kayu Manis, Tanah Sareal, Kota Bogor, Jawa Barat 16169',
    whatsapp: '6283808417406',
    instagram: 'https://www.instagram.com/smpumaisbogor/',
    facebook: 'https://www.facebook.com/umaisbogor',
  },
  ppdb: {
    startDate: '01 April 2026',
    endDate: '30 Mei 2026',
    wave: 'Gelombang Terakhir (Terbatas!)',
    quota: 'Terbatas — Segera Daftar!',
  },
  visi: 'Menjadi lembaga pendidikan Islam unggulan yang melahirkan generasi muslimah berilmu, berakhlak mulia, mandiri, dan berdaya saing nasional.',
  misi: [
    'Menyelenggarakan pendidikan Islam yang berkualitas dan terintegrasi',
    "Membentuk karakter muslimah yang berakhlak mulia sesuai Al-Qur'an dan Sunnah",
    'Mengembangkan potensi akademik dan non-akademik secara optimal',
    'Mempersiapkan lulusan yang mampu bersaing di tingkat nasional',
    'Menciptakan lingkungan belajar yang kondusif, inovatif, dan menyenangkan',
  ],
  instagramPosts: [
    'https://www.instagram.com/p/DICEfmchf3a/',
    'https://www.instagram.com/p/DIBAxK2hbJJ/',
    'https://www.instagram.com/p/DH-VV5ohWlN/',
    'https://www.instagram.com/p/DH8dZmwhxEP/',
    'https://www.instagram.com/p/DH50FQphFiJ/',
    'https://www.instagram.com/p/DH3UAgahYtL/',
  ],
  facilities: [
    { image: '', title: 'Lingkungan Sekolah', desc: 'Kampus asri dan nyaman' },
    { image: '', title: 'Kelas Kreatif', desc: 'Ruang belajar multimedia' },
    { image: '', title: 'Area Terbuka', desc: 'Taman & area bermain' },
  ],
  aboutImage: '',
  aboutDesc: 'SMP Ummul Mukminin Aisyah (UMAIS) Bogor adalah sekolah Islam khusus muslimah yang berdiri dengan visi mencetak generasi muslimah yang cerdas, berakhlak mulia, dan berwawasan nasional.',
  overviewTitle: 'Sekolah Islam Kreatif untuk Muslimah Masa Depan',
  overviewDesc: 'SMP UMAIS Bogor hadir sebagai wadah pendidikan yang membentuk generasi muslimah cerdas, berakhlak, dan siap menghadapi tantangan global.',

  // === NEW: Gallery photos ===
  gallery: [
    { image: '/images/hero-school.png', caption: 'Kampus SMP UMAIS Bogor', category: 'Sekolah' },
    { image: '/images/classroom.png', caption: 'Kegiatan Belajar Mengajar', category: 'Akademik' },
    { image: '/images/facilities.png', caption: 'Fasilitas Sekolah', category: 'Fasilitas' },
    { image: '/images/hero-school.png', caption: 'Upacara Bendera', category: 'Kegiatan' },
    { image: '/images/classroom.png', caption: 'Majelis Tahfidz', category: 'Keislaman' },
    { image: '/images/facilities.png', caption: 'Wisuda & Kelulusan', category: 'Acara' },
  ],

  // === NEW: Academic calendar ===
  calendar: [
    { month: 'Juli', event: 'Awal Tahun Ajaran', desc: 'Masa Orientasi & Pembukaan' },
    { month: 'September', event: 'UTS Semester 1', desc: 'Ujian Tengah Semester' },
    { month: 'Desember', event: 'UAS Semester 1', desc: 'Ujian & Libur Semester' },
    { month: 'Maret', event: 'UTS Semester 2', desc: 'Ujian Tengah Semester' },
    { month: 'Mei', event: 'Ujian Akhir', desc: 'UAS & Persiapan Wisuda' },
    { month: 'Juni', event: 'Wisuda', desc: 'Kelulusan & Pelepasan' },
  ],

  // === NEW: Popup/Banner ===
  popup: {
    enabled: false,
    title: '📢 PPDB 2026/2027 Dibuka!',
    subtitle: 'Segera daftarkan puteri Anda di SMP UMAIS Bogor',
    description: 'Gelombang terakhir pendaftaran peserta didik baru. Kuota terbatas!',
    buttonText: 'Daftar Sekarang',
    buttonLink: '/ppdb',
    image: '',
    bgColor: '#be185d',
  },

  // === NEW: Extracurricular ===
  extracurriculars: [
    { icon: 'Palette', name: 'Seni Kaligrafi', desc: 'Menulis indah huruf Arab' },
    { icon: 'PenTool', name: 'Jurnalistik', desc: 'Menulis & reportase' },
    { icon: 'Monitor', name: 'Coding Club', desc: 'Pemrograman dasar' },
    { icon: 'Dumbbell', name: 'Olahraga', desc: 'Badminton, Futsal, Panahan' },
    { icon: 'Music', name: 'Nasyid', desc: 'Seni vokal Islami' },
    { icon: 'Trophy', name: 'Olimpiade Sains', desc: 'Persiapan kompetisi' },
    { icon: 'Sparkles', name: 'Life Skills', desc: 'Keterampilan hidup' },
    { icon: 'BookOpenCheck', name: 'Tahsin', desc: "Perbaikan bacaan Qur'an" },
  ],
};

// Helper: convert file to base64 data URL
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('umais_site_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
          stats: { ...DEFAULT_CONTENT.stats, ...(parsed.stats || {}) },
          contact: { ...DEFAULT_CONTENT.contact, ...(parsed.contact || {}) },
          ppdb: { ...DEFAULT_CONTENT.ppdb, ...(parsed.ppdb || {}) },
          popup: { ...DEFAULT_CONTENT.popup, ...(parsed.popup || {}) },
          facilities: parsed.facilities || DEFAULT_CONTENT.facilities,
          gallery: parsed.gallery || DEFAULT_CONTENT.gallery,
          calendar: parsed.calendar || DEFAULT_CONTENT.calendar,
          extracurriculars: parsed.extracurriculars || DEFAULT_CONTENT.extracurriculars,
        };
      }
      return DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });

  useEffect(() => {
    localStorage.setItem('umais_site_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data,
    }));
  };

  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem('umais_site_content');
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent, DEFAULT_CONTENT }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) return { content: DEFAULT_CONTENT, updateContent: () => {}, resetContent: () => {} };
  return ctx;
}
