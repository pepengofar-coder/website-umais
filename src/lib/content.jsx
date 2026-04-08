import { createContext, useContext, useState, useEffect } from 'react';

const SiteContentContext = createContext(null);

const DEFAULT_CONTENT = {
  hero: {
    badge: 'School of Muslimah',
    headline: 'Membangun Generasi Muslimah Berakhlak Mulia & Berwawasan Nasional',
    subtitle: 'SMP Ummul Mukminin Aisyah Islamic School Kota Bogor — Memadukan pendidikan Islam berkualitas dengan standar akademik nasional.',
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
};

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('umais_site_content');
      return saved ? { ...DEFAULT_CONTENT, ...JSON.parse(saved) } : DEFAULT_CONTENT;
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
