import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

const SiteContentContext = createContext(null);

// Maximum file size: 1MB (1000KB)
export const MAX_FILE_SIZE = 1000 * 1024; // 1,000 KB = ~1MB
export const MAX_TESTIMONIALS = 15;

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

  gallery: [
    { image: '/images/hero-school.png', caption: 'Kampus SMP UMAIS Bogor', category: 'Sekolah' },
    { image: '/images/classroom.png', caption: 'Kegiatan Belajar Mengajar', category: 'Akademik' },
    { image: '/images/facilities.png', caption: 'Fasilitas Sekolah', category: 'Fasilitas' },
    { image: '/images/hero-school.png', caption: 'Upacara Bendera', category: 'Kegiatan' },
    { image: '/images/classroom.png', caption: 'Majelis Tahfidz', category: 'Keislaman' },
    { image: '/images/facilities.png', caption: 'Wisuda & Kelulusan', category: 'Acara' },
  ],

  calendar: [
    { month: 'Juli', event: 'Awal Tahun Ajaran', desc: 'Masa Orientasi & Pembukaan' },
    { month: 'September', event: 'UTS Semester 1', desc: 'Ujian Tengah Semester' },
    { month: 'Desember', event: 'UAS Semester 1', desc: 'Ujian & Libur Semester' },
    { month: 'Maret', event: 'UTS Semester 2', desc: 'Ujian Tengah Semester' },
    { month: 'Mei', event: 'Ujian Akhir', desc: 'UAS & Persiapan Wisuda' },
    { month: 'Juni', event: 'Wisuda', desc: 'Kelulusan & Pelepasan' },
  ],

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

  teachers: [
    { name: 'Ustadzah Nurul Hidayah, S.Pd.I', role: 'Kepala Sekolah', subject: 'Manajemen Pendidikan', initial: 'N', image: '', usePhoto: false },
    { name: 'Ustadzah Siti Rahmah, M.Pd', role: 'Wakil Kurikulum', subject: 'Matematika', initial: 'S', image: '', usePhoto: false },
    { name: 'Ustadzah Hafshah, S.Ag', role: 'Guru Tahfidz', subject: "Al-Qur'an & Hadits", initial: 'H', image: '', usePhoto: false },
    { name: 'Ustadzah Maryam, S.Pd', role: 'Guru Bahasa', subject: 'English & Arabic', initial: 'M', image: '', usePhoto: false },
    { name: 'Ustadzah Khadijah, M.Si', role: 'Guru IPA', subject: 'Sains & Matematika', initial: 'K', image: '', usePhoto: false },
    { name: 'Ustadzah Fatimah, S.Pd', role: 'Guru BK', subject: 'Bimbingan Konseling', initial: 'F', image: '', usePhoto: false },
  ],

  aboutFacilities: [
    { icon: 'Landmark', title: 'Musholla', desc: 'Tempat ibadah nyaman untuk sholat jamaah dan kajian rutin.' },
    { icon: 'Sprout', title: 'Gardening', desc: 'Area berkebun dan bercocok tanam untuk pembelajaran sains alam langsung.' },
    { icon: 'Monitor', title: 'Lab Komputer', desc: 'Komputer terbaru dengan koneksi internet cepat.' },
    { icon: 'Library', title: 'Perpustakaan', desc: 'Koleksi buku lengkap islami dan akademik.' },
    { icon: 'Building', title: 'Ruang Kelas AC', desc: 'Kelas ber-AC dengan multimedia interaktif.' },
    { icon: 'Award', title: 'Aula Serbaguna', desc: 'Untuk acara sekolah, seminar, dan pentas seni.' },
  ],

  aboutGallery: [
    { image: '/images/classroom.png', caption: 'Suasana Kelas' },
    { image: '/images/hero-school.png', caption: 'Kampus SMP UMAIS' },
    { image: '/images/facilities.png', caption: 'Fasilitas Sekolah' },
  ],

  testimonials: [
    {
      text: 'Alhamdulillah, anak saya sangat senang bersekolah di SMP UMAIS. Guru-gurunya sangat perhatian dan lingkungannya sangat Islami.',
      name: 'Ibu Fatimah',
      role: 'Wali Murid Kelas 8',
      rating: 5,
      image: '',
    },
    {
      text: 'Program Tahfidz-nya luar biasa. Anak saya sudah hafal 5 juz dalam 2 tahun. Metode pembelajarannya sangat efektif.',
      name: 'Ibu Sarah',
      role: 'Wali Murid Kelas 9',
      rating: 5,
      image: '',
    },
    {
      text: 'Kurikulum terpadu yang memadukan pendidikan Islam dan akademik umum membuat anak saya berkembang secara menyeluruh.',
      name: 'Ibu Aisyah',
      role: 'Wali Murid Kelas 7',
      rating: 5,
      image: '',
    },
    {
      text: 'Lingkungan sekolah sangat kondusif dan aman. Anak saya menjadi lebih mandiri dan percaya diri sejak bersekolah di UMAIS.',
      name: 'Ibu Khadijah',
      role: 'Wali Murid Kelas 8',
      rating: 5,
      image: '',
    },
    {
      text: 'Kegiatan ekstrakurikulernya sangat beragam. Anak saya sangat tertarik dengan program kaligrafi dan coding club.',
      name: 'Ibu Zainab',
      role: 'Wali Murid Kelas 7',
      rating: 5,
      image: '',
    },
    {
      text: 'Guru-guru SMP UMAIS sangat kompeten dan sabar. Mereka benar-benar memperhatikan perkembangan setiap murid secara individual.',
      name: 'Ibu Halimah',
      role: 'Wali Murid Kelas 9',
      rating: 5,
      image: '',
    },
  ],
};

// Helper: validate file size (max 1MB / 1000KB)
export function validateFileSize(file) {
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / 1024).toFixed(0);
    return {
      valid: false,
      error: `Ukuran file terlalu besar (${sizeMB}KB). Maksimal 1000KB (1MB).`,
    };
  }
  return { valid: true, error: null };
}

// Helper: convert file to base64 data URL
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Deep merge saved content with defaults to ensure new fields are always present
function mergeWithDefaults(saved) {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONTENT;
  return {
    ...DEFAULT_CONTENT,
    ...saved,
    hero: { ...DEFAULT_CONTENT.hero, ...(saved.hero || {}) },
    stats: { ...DEFAULT_CONTENT.stats, ...(saved.stats || {}) },
    contact: { ...DEFAULT_CONTENT.contact, ...(saved.contact || {}) },
    ppdb: { ...DEFAULT_CONTENT.ppdb, ...(saved.ppdb || {}) },
    popup: { ...DEFAULT_CONTENT.popup, ...(saved.popup || {}) },
    facilities: saved.facilities || DEFAULT_CONTENT.facilities,
    gallery: saved.gallery || DEFAULT_CONTENT.gallery,
    calendar: saved.calendar || DEFAULT_CONTENT.calendar,
    extracurriculars: saved.extracurriculars || DEFAULT_CONTENT.extracurriculars,
    teachers: saved.teachers || DEFAULT_CONTENT.teachers,
    aboutFacilities: saved.aboutFacilities || DEFAULT_CONTENT.aboutFacilities,
    aboutGallery: saved.aboutGallery || DEFAULT_CONTENT.aboutGallery,
    testimonials: saved.testimonials || DEFAULT_CONTENT.testimonials,
  };
}

// Fetch content from Supabase
async function fetchContentFromSupabase() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 'main')
      .single();
    if (error) throw error;
    return data?.content || null;
  } catch (err) {
    console.warn('Failed to fetch content from Supabase:', err.message);
    return null;
  }
}

// Save content to Supabase
async function saveContentToSupabase(content) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: 'main',
        content: content,
        updated_at: new Date().toISOString(),
      });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to save content to Supabase:', err.message);
    return false;
  }
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  // Load content: try Supabase first, then localStorage fallback
  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      // 1. Try Supabase (cloud — visible to all users)
      const cloudContent = await fetchContentFromSupabase();
      if (cancelled) return;

      if (cloudContent && Object.keys(cloudContent).length > 0) {
        setContent(mergeWithDefaults(cloudContent));
        setLoading(false);
        return;
      }

      // 2. Fallback to localStorage (for development without Supabase)
      try {
        const saved = localStorage.getItem('umais_site_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          setContent(mergeWithDefaults(parsed));

          // If localStorage has data but Supabase is empty, sync up to Supabase
          if (supabase && Object.keys(parsed).length > 0) {
            await saveContentToSupabase(mergeWithDefaults(parsed));
          }
        }
      } catch {
        // Use defaults
      }

      if (!cancelled) setLoading(false);
    }

    loadContent();
    return () => { cancelled = true; };
  }, []);

  // Save content to both Supabase and localStorage
  const saveContent = useCallback(async (newContent) => {
    // Always save to localStorage as cache
    localStorage.setItem('umais_site_content', JSON.stringify(newContent));

    // Save to Supabase for cross-network access
    if (supabase) {
      setSaveStatus('saving');
      const success = await saveContentToSupabase(newContent);
      setSaveStatus(success ? 'saved' : 'error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  }, []);

  const updateContent = useCallback((section, data) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: typeof data === 'function' ? data(prev[section]) : data,
      };
      // Auto-save to Supabase & localStorage
      saveContent(newContent);
      return newContent;
    });
  }, [saveContent]);

  const resetContent = useCallback(async () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem('umais_site_content');
    if (supabase) {
      await saveContentToSupabase(DEFAULT_CONTENT);
    }
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent, DEFAULT_CONTENT, loading, saveStatus }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) return { content: DEFAULT_CONTENT, updateContent: () => {}, resetContent: () => {}, loading: false, saveStatus: 'idle' };
  return ctx;
}
