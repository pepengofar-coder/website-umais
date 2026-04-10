import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useSiteContent, fileToDataUrl, validateFileSize, MAX_FILE_SIZE, MAX_TESTIMONIALS } from '../lib/content';
import {
  LayoutDashboard, FileText, Phone, GraduationCap, Eye, Image as ImageIcon,
  LogOut, Save, RotateCcw, Check, Settings, BarChart3, Globe, Upload, Trash2,
  CalendarDays, Megaphone, Award, Plus, Users, MessageSquareQuote,
  // Icon options for extracurriculars
  Palette, PenTool, Monitor, Dumbbell, Music, Trophy, Sparkles, BookOpenCheck,
  Heart, BookOpen, Camera, Scissors, Leaf, Coffee, Star, Compass, Headphones,
  Mic, Gamepad2, Bike, FlaskConical, Drama,
  // Icons for about facilities
  Landmark, Sprout, Library, Building, AlertCircle
} from 'lucide-react';
import './AdminDashboard.css';

/* ===== Icon map for extracurriculars & facilities ===== */
const ICON_MAP = {
  Palette: <Palette size={20} />,
  PenTool: <PenTool size={20} />,
  Monitor: <Monitor size={20} />,
  Dumbbell: <Dumbbell size={20} />,
  Music: <Music size={20} />,
  Trophy: <Trophy size={20} />,
  Sparkles: <Sparkles size={20} />,
  BookOpenCheck: <BookOpenCheck size={20} />,
  Heart: <Heart size={20} />,
  BookOpen: <BookOpen size={20} />,
  Camera: <Camera size={20} />,
  Scissors: <Scissors size={20} />,
  Leaf: <Leaf size={20} />,
  Coffee: <Coffee size={20} />,
  Star: <Star size={20} />,
  Compass: <Compass size={20} />,
  Headphones: <Headphones size={20} />,
  Mic: <Mic size={20} />,
  Gamepad2: <Gamepad2 size={20} />,
  Bike: <Bike size={20} />,
  FlaskConical: <FlaskConical size={20} />,
  Drama: <Drama size={20} />,
  Award: <Award size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Landmark: <Landmark size={20} />,
  Sprout: <Sprout size={20} />,
  Library: <Library size={20} />,
  Building: <Building size={20} />,
  Users: <Users size={20} />,
};

export function getIconComponent(iconName, size = 20) {
  const icons = {
    Palette: <Palette size={size} />,
    PenTool: <PenTool size={size} />,
    Monitor: <Monitor size={size} />,
    Dumbbell: <Dumbbell size={size} />,
    Music: <Music size={size} />,
    Trophy: <Trophy size={size} />,
    Sparkles: <Sparkles size={size} />,
    BookOpenCheck: <BookOpenCheck size={size} />,
    Heart: <Heart size={size} />,
    BookOpen: <BookOpen size={size} />,
    Camera: <Camera size={size} />,
    Scissors: <Scissors size={size} />,
    Leaf: <Leaf size={size} />,
    Coffee: <Coffee size={size} />,
    Star: <Star size={size} />,
    Compass: <Compass size={size} />,
    Headphones: <Headphones size={size} />,
    Mic: <Mic size={size} />,
    Gamepad2: <Gamepad2 size={size} />,
    Bike: <Bike size={size} />,
    FlaskConical: <FlaskConical size={size} />,
    Drama: <Drama size={size} />,
    Award: <Award size={size} />,
    GraduationCap: <GraduationCap size={size} />,
    Landmark: <Landmark size={size} />,
    Sprout: <Sprout size={size} />,
    Library: <Library size={size} />,
    Building: <Building size={size} />,
    Users: <Users size={size} />,
  };
  return icons[iconName] || <Star size={size} />;
}

const TABS = [
  { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard size={18} /> },
  { id: 'hero', label: 'Beranda / Hero', icon: <FileText size={18} /> },
  { id: 'stats', label: 'Statistik', icon: <BarChart3 size={18} /> },
  { id: 'overview-section', label: 'Keunggulan', icon: <Globe size={18} /> },
  { id: 'visi-misi', label: 'Visi & Misi', icon: <Eye size={18} /> },
  { id: 'fasilitas', label: 'Fasilitas', icon: <ImageIcon size={18} /> },
  { id: 'gallery', label: 'Galeri Foto', icon: <Camera size={18} /> },
  { id: 'extracurricular', label: 'Ekstrakurikuler', icon: <Award size={18} /> },
  { id: 'calendar', label: 'Kalender Akademik', icon: <CalendarDays size={18} /> },
  { id: 'popup', label: 'Pop-up / Iklan', icon: <Megaphone size={18} /> },
  { id: 'about', label: 'Tentang Kami', icon: <FileText size={18} /> },
  { id: 'testimonials', label: 'Testimoni', icon: <MessageSquareQuote size={18} /> },
  { id: 'contact', label: 'Kontak', icon: <Phone size={18} /> },
  { id: 'ppdb', label: 'Info PPDB', icon: <GraduationCap size={18} /> },
  { id: 'instagram', label: 'Instagram Posts', icon: <Camera size={18} /> },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { content, updateContent, resetContent, saveToCloud, loading, saveStatus, hasUnsavedChanges } = useSiteContent();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Memuat konten dari server...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <img src="/images/logo.png" alt="Logo" className="admin-sidebar-logo" />
          <div>
            <h2>Admin Panel</h2>
            <p>SMP UMAIS Bogor</p>
          </div>
        </div>

        <nav className="admin-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-btn">
            <Globe size={18} />
            Lihat Website
          </a>
          <button className="admin-nav-btn admin-logout" onClick={logout}>
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Settings size={20} />
      </button>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>{TABS.find(t => t.id === activeTab)?.label || 'Dashboard'}</h1>
          <div className="admin-topbar-actions">
            {saveStatus === 'saving' && <span className="admin-saved-badge admin-saving">⏳ Menyimpan ke cloud...</span>}
            {saveStatus === 'saved' && <span className="admin-saved-badge"><Check size={14} /> Tersinkron ke cloud!</span>}
            {saveStatus === 'error' && <span className="admin-saved-badge admin-save-error">❌ Gagal menyimpan ke cloud</span>}
            {hasUnsavedChanges && saveStatus === 'idle' && <span className="admin-saved-badge admin-unsaved">● Menunggu sinkron...</span>}
            <button className="btn btn-outline-pink btn-sm" onClick={resetContent}>
              <RotateCcw size={14} /> Reset Default
            </button>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && <OverviewTab content={content} />}
          {activeTab === 'hero' && <HeroTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'stats' && <StatsTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'overview-section' && <OverviewSectionTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'visi-misi' && <VisiMisiTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'fasilitas' && <FasilitasTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'gallery' && <GalleryTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'extracurricular' && <ExtracurricularTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'calendar' && <CalendarTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'popup' && <PopupTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'about' && <AboutTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'testimonials' && <TestimonialsTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'contact' && <ContactTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'ppdb' && <PPDBTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
          {activeTab === 'instagram' && <InstagramTab content={content} updateContent={updateContent} saveToCloud={saveToCloud} saveStatus={saveStatus} />}
        </div>
      </main>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

/* ===== SHARED COMPONENTS ===== */

function FieldGroup({ label, children }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {children}
    </div>
  );
}

function ImageUpload({ label, value, onChange, onClear }) {
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 1MB / 1000KB)
    const validation = validateFileSize(file);
    if (!validation.valid) {
      setError(validation.error);
      e.target.value = ''; // Reset input
      return;
    }

    setError(null);
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div className="admin-upload-area">
        <label className="admin-upload-btn">
          <Upload size={16} />
          Pilih Gambar
          <input type="file" accept="image/*" onChange={handleFile} hidden />
        </label>
        <span className="admin-upload-hint">25KB — 1MB</span>
        {value && (
          <button className="admin-upload-clear" onClick={() => { onClear(); setError(null); }} title="Hapus gambar">
            <Trash2 size={14} /> Hapus
          </button>
        )}
      </div>
      {error && (
        <div className="admin-upload-error">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      {value && (
        <div className="admin-preview">
          <img src={value} alt="Preview" />
        </div>
      )}
    </div>
  );
}

/* Save Button — shown at the bottom of every tab */
function SaveButton({ saveToCloud, saveStatus }) {
  return (
    <div className="admin-save-section">
      <button
        className="btn btn-primary admin-save-btn"
        onClick={saveToCloud}
        disabled={saveStatus === 'saving'}
      >
        {saveStatus === 'saving' ? (
          <><span className="admin-loading-spinner-small" /> Menyimpan...</>
        ) : saveStatus === 'saved' ? (
          <><Check size={16} /> Tersimpan!</>
        ) : (
          <><Save size={16} /> Simpan Perubahan</>
        )}
      </button>
      {saveStatus === 'error' && (
        <p className="admin-save-error-text">Gagal menyimpan ke server. Coba lagi.</p>
      )}
    </div>
  );
}

/* ===== TAB: OVERVIEW ===== */

function OverviewTab({ content }) {
  const cards = [
    { label: 'Alumni Berprestasi', value: content.stats.alumni, color: '#e91e63' },
    { label: 'Tenaga Pendidik', value: content.teachers?.length || 0, color: '#9c27b0' },
    { label: 'Foto Galeri', value: content.gallery?.length || 0, color: '#2196f3' },
    { label: 'Ekstrakurikuler', value: content.extracurriculars?.length || 0, color: '#ff5722' },
    { label: 'Testimoni', value: content.testimonials?.length || 0, color: '#4caf50' },
    { label: 'Pop-up Aktif', value: content.popup?.enabled ? 'Ya' : 'Tidak', color: '#ff9800' },
  ];

  return (
    <div>
      <div className="admin-stat-grid">
        {cards.map((c, i) => (
          <div key={i} className="admin-stat-card" style={{ borderLeftColor: c.color }}>
            <div className="admin-stat-value">{c.value}</div>
            <div className="admin-stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-section-card">
        <h3>📋 Informasi</h3>
        <ul className="admin-info-list">
          <li><strong>Website:</strong> Aktif & terkoneksi</li>
          <li><strong>Email:</strong> {content.contact.email}</li>
          <li><strong>WhatsApp:</strong> {content.contact.phone}</li>
          <li><strong>PPDB:</strong> {content.ppdb.startDate} — {content.ppdb.endDate}</li>
        </ul>
      </div>

      <div className="admin-section-card">
        <h3>💡 Panduan</h3>
        <p>Gunakan menu di samping untuk mengedit konten website secara langsung.</p>
        <ul className="admin-info-list">
          <li>📝 <strong>Beranda/Hero:</strong> Edit teks dan gambar banner utama</li>
          <li>🖼️ <strong>Galeri Foto:</strong> Upload & kelola foto untuk halaman Galeri</li>
          <li>🎯 <strong>Ekstrakurikuler:</strong> Kelola daftar ekskul dengan icon</li>
          <li>📅 <strong>Kalender Akademik:</strong> Edit jadwal & acara akademik</li>
          <li>📢 <strong>Pop-up / Iklan:</strong> Buat pop-up promosi yang tampil di website</li>
          <li>ℹ️ <strong>Tentang Kami:</strong> Edit profil guru, fasilitas, & galeri sekolah</li>
          <li>💬 <strong>Testimoni:</strong> Kelola testimoni wali murid (maks. {MAX_TESTIMONIALS})</li>
          <li>📸 <strong>Instagram Posts:</strong> Kelola link postingan Instagram dengan preview</li>
          <li>⚠️ <strong>Upload:</strong> Ukuran gambar <strong>minimal 25KB, maksimal 1MB (1000KB)</strong></li>
          <li>Klik <strong>"Lihat Website"</strong> untuk melihat hasil perubahan</li>
        </ul>
      </div>
    </div>
  );
}

/* ===== TAB: HERO ===== */

function HeroTab({ content, updateContent, saveToCloud, saveStatus }) {
  const { hero } = content;
  const update = (key, val) => updateContent('hero', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="admin-section-card">
        <h3>🏠 Konten Hero Section (Beranda)</h3>
        <ImageUpload
          label="Gambar Background Hero"
          value={hero.image}
          onChange={(url) => update('image', url)}
          onClear={() => update('image', '')}
        />
        <FieldGroup label="Badge / Label Kecil">
          <input className="admin-input" value={hero.badge} onChange={e => update('badge', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Headline Utama">
          <input className="admin-input" value={hero.headline} onChange={e => update('headline', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Subtitle / Deskripsi">
          <textarea className="admin-textarea" rows={3} value={hero.subtitle} onChange={e => update('subtitle', e.target.value)} />
        </FieldGroup>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: STATS ===== */

function StatsTab({ content, updateContent, saveToCloud, saveStatus }) {
  const { stats } = content;
  const update = (key, val) => updateContent('stats', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="admin-section-card">
        <h3>📊 Statistik Sekolah</h3>
        <div className="admin-field-row">
          <FieldGroup label="Alumni Berprestasi">
            <input className="admin-input" value={stats.alumni} onChange={e => update('alumni', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Tenaga Pendidik">
            <input className="admin-input" value={stats.teachers} onChange={e => update('teachers', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Tahun Berdiri">
            <input className="admin-input" value={stats.years} onChange={e => update('years', e.target.value)} />
          </FieldGroup>
        </div>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: OVERVIEW SECTION ===== */

function OverviewSectionTab({ content, updateContent, saveToCloud, saveStatus }) {
  return (
    <div>
      <div className="admin-section-card">
        <h3>⭐ Section Keunggulan Kami</h3>
        <FieldGroup label="Judul Section">
          <input className="admin-input" value={content.overviewTitle} onChange={e => updateContent('overviewTitle', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Deskripsi Section">
          <textarea className="admin-textarea" rows={3} value={content.overviewDesc} onChange={e => updateContent('overviewDesc', e.target.value)} />
        </FieldGroup>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: VISI MISI ===== */

function VisiMisiTab({ content, updateContent, saveToCloud, saveStatus }) {
  const handleMisiChange = (index, value) => {
    updateContent('misi', prev => {
      const newMisi = [...prev];
      newMisi[index] = value;
      return newMisi;
    });
  };
  const addMisi = () => updateContent('misi', prev => [...prev, '']);
  const removeMisi = (index) => updateContent('misi', prev => prev.filter((_, i) => i !== index));

  return (
    <div>
      <div className="admin-section-card">
        <h3>🌟 Visi</h3>
        <FieldGroup label="Teks Visi">
          <textarea className="admin-textarea" rows={3} value={content.visi} onChange={e => updateContent('visi', e.target.value)} />
        </FieldGroup>
      </div>
      <div className="admin-section-card">
        <h3>🎯 Misi</h3>
        {content.misi.map((item, i) => (
          <div key={i} className="admin-misi-row">
            <span className="admin-misi-num">{i + 1}.</span>
            <input className="admin-input" value={item} onChange={e => handleMisiChange(i, e.target.value)} />
            <button className="admin-remove-btn" onClick={() => removeMisi(i)}>×</button>
          </div>
        ))}
        <button className="btn btn-outline-pink btn-sm" onClick={addMisi} style={{ marginTop: '8px' }}>
          + Tambah Misi
        </button>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: FASILITAS ===== */

function FasilitasTab({ content, updateContent, saveToCloud, saveStatus }) {
  const facilities = content.facilities || [];
  const defaultImages = ['/images/facilities.png', '/images/classroom.png', '/images/hero-school.png'];

  const updateFacility = (index, key, value) => {
    updateContent('facilities', prev => {
      const newFac = [...prev];
      newFac[index] = { ...newFac[index], [key]: value };
      return newFac;
    });
  };

  return (
    <div>
      <p className="admin-hint" style={{ marginBottom: '16px' }}>
        Edit gambar dan keterangan 3 kartu fasilitas yang tampil di halaman Beranda.
      </p>
      {facilities.map((fac, i) => (
        <div key={i} className="admin-section-card">
          <h3>🏫 Fasilitas {i + 1}</h3>
          <ImageUpload
            label={`Gambar Fasilitas ${i + 1}`}
            value={fac.image}
            onChange={(url) => updateFacility(i, 'image', url)}
            onClear={() => updateFacility(i, 'image', '')}
          />
          {!fac.image && <p className="admin-hint">Default: {defaultImages[i]}</p>}
          <FieldGroup label="Judul">
            <input className="admin-input" value={fac.title} onChange={e => updateFacility(i, 'title', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Deskripsi">
            <input className="admin-input" value={fac.desc} onChange={e => updateFacility(i, 'desc', e.target.value)} />
          </FieldGroup>
        </div>
      ))}
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: GALLERY ===== */

function GalleryTab({ content, updateContent, saveToCloud, saveStatus }) {
  const gallery = content.gallery || [];

  const updatePhoto = (index, key, value) => {
    updateContent('gallery', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addPhoto = () => {
    updateContent('gallery', prev => [...prev, { image: '', caption: '', category: 'Sekolah' }]);
  };

  const removePhoto = (index) => {
    updateContent('gallery', prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="admin-hint" style={{ marginBottom: '16px' }}>
        📸 Kelola foto yang tampil di halaman <strong>Galeri</strong> website. Upload gambar, beri judul dan kategori.
      </p>

      {gallery.map((photo, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3>📷 Foto {i + 1}</h3>
            <button className="admin-remove-btn" onClick={() => removePhoto(i)} title="Hapus foto">×</button>
          </div>

          <ImageUpload
            label="Gambar"
            value={photo.image}
            onChange={(url) => updatePhoto(i, 'image', url)}
            onClear={() => updatePhoto(i, 'image', '')}
          />

          <div className="admin-field-row">
            <FieldGroup label="Caption / Judul">
              <input className="admin-input" value={photo.caption} onChange={e => updatePhoto(i, 'caption', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Kategori">
              <select className="admin-input" value={photo.category} onChange={e => updatePhoto(i, 'category', e.target.value)}>
                <option value="Sekolah">Sekolah</option>
                <option value="Akademik">Akademik</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Keislaman">Keislaman</option>
                <option value="Acara">Acara</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </FieldGroup>
          </div>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addPhoto} style={{ marginTop: '8px' }}>
        <Plus size={14} /> Tambah Foto
      </button>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: EXTRACURRICULAR ===== */

function ExtracurricularTab({ content, updateContent, saveToCloud, saveStatus }) {
  const items = content.extracurriculars || [];
  const iconOptions = Object.keys(ICON_MAP);

  const updateItem = (index, key, value) => {
    updateContent('extracurriculars', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addItem = () => {
    updateContent('extracurriculars', prev => [...prev, { icon: 'Star', name: '', desc: '' }]);
  };

  const removeItem = (index) => {
    updateContent('extracurriculars', prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="admin-hint" style={{ marginBottom: '16px' }}>
        🎯 Kelola daftar ekstrakurikuler yang tampil di halaman <strong>Akademik</strong>. Pilih icon yang sesuai untuk setiap kegiatan.
      </p>

      {items.map((item, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="admin-icon-preview">{ICON_MAP[item.icon] || <Star size={20} />}</span>
              {item.name || `Ekskul ${i + 1}`}
            </h3>
            <button className="admin-remove-btn" onClick={() => removeItem(i)} title="Hapus">×</button>
          </div>

          <FieldGroup label="Icon">
            <div className="admin-icon-grid">
              {iconOptions.map(iconName => (
                <button
                  key={iconName}
                  className={`admin-icon-option ${item.icon === iconName ? 'selected' : ''}`}
                  onClick={() => updateItem(i, 'icon', iconName)}
                  title={iconName}
                  type="button"
                >
                  {ICON_MAP[iconName]}
                </button>
              ))}
            </div>
          </FieldGroup>

          <div className="admin-field-row">
            <FieldGroup label="Nama Kegiatan">
              <input className="admin-input" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Deskripsi Singkat">
              <input className="admin-input" value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} />
            </FieldGroup>
          </div>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addItem} style={{ marginTop: '8px' }}>
        <Plus size={14} /> Tambah Ekstrakurikuler
      </button>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: CALENDAR ===== */

function CalendarTab({ content, updateContent, saveToCloud, saveStatus }) {
  const calendar = content.calendar || [];

  const updateEvent = (index, key, value) => {
    updateContent('calendar', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addEvent = () => {
    updateContent('calendar', prev => [...prev, { month: '', event: '', desc: '' }]);
  };

  const removeEvent = (index) => {
    updateContent('calendar', prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="admin-hint" style={{ marginBottom: '16px' }}>
        📅 Kelola jadwal kalender akademik yang tampil di halaman <strong>Akademik</strong>. Urutkan dari awal hingga akhir tahun ajaran.
      </p>

      {calendar.map((item, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3>📅 {item.month || `Event ${i + 1}`} — {item.event}</h3>
            <button className="admin-remove-btn" onClick={() => removeEvent(i)} title="Hapus">×</button>
          </div>

          <div className="admin-field-row" style={{ gridTemplateColumns: '120px 1fr 1fr' }}>
            <FieldGroup label="Bulan">
              <input className="admin-input" value={item.month} onChange={e => updateEvent(i, 'month', e.target.value)} placeholder="Juli" />
            </FieldGroup>
            <FieldGroup label="Nama Acara">
              <input className="admin-input" value={item.event} onChange={e => updateEvent(i, 'event', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Deskripsi">
              <input className="admin-input" value={item.desc} onChange={e => updateEvent(i, 'desc', e.target.value)} />
            </FieldGroup>
          </div>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addEvent} style={{ marginTop: '8px' }}>
        <Plus size={14} /> Tambah Jadwal
      </button>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: POPUP / IKLAN ===== */

function PopupTab({ content, updateContent, saveToCloud, saveStatus }) {
  const popup = content.popup || {};
  const update = (key, val) => updateContent('popup', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="admin-section-card">
        <h3>📢 Pop-up / Iklan Website</h3>
        <p className="admin-hint">
          Pop-up ini akan muncul saat pengunjung membuka website. Cocok untuk promosi PPDB, pengumuman, atau info penting.
        </p>

        {/* Toggle On/Off */}
        <div className="admin-field">
          <label className="admin-label">Status Pop-up</label>
          <div className="admin-toggle-row">
            <button
              className={`admin-toggle-btn ${popup.enabled ? 'active' : ''}`}
              onClick={() => update('enabled', !popup.enabled)}
              type="button"
            >
              <div className="admin-toggle-knob" />
            </button>
            <span className={`admin-toggle-label ${popup.enabled ? 'active' : ''}`}>
              {popup.enabled ? '✅ Aktif — Pop-up akan ditampilkan' : '⏸️ Nonaktif — Pop-up tersembunyi'}
            </span>
          </div>
        </div>

        <ImageUpload
          label="Gambar Pop-up (opsional)"
          value={popup.image}
          onChange={(url) => update('image', url)}
          onClear={() => update('image', '')}
        />

        <FieldGroup label="Judul">
          <input className="admin-input" value={popup.title || ''} onChange={e => update('title', e.target.value)} placeholder="📢 PPDB 2026/2027 Dibuka!" />
        </FieldGroup>

        <FieldGroup label="Subtitle">
          <input className="admin-input" value={popup.subtitle || ''} onChange={e => update('subtitle', e.target.value)} placeholder="Segera daftarkan puteri Anda" />
        </FieldGroup>

        <FieldGroup label="Deskripsi / Detail">
          <textarea className="admin-textarea" rows={3} value={popup.description || ''} onChange={e => update('description', e.target.value)} placeholder="Gelombang terakhir..." />
        </FieldGroup>

        <div className="admin-field-row">
          <FieldGroup label="Teks Tombol">
            <input className="admin-input" value={popup.buttonText || ''} onChange={e => update('buttonText', e.target.value)} placeholder="Daftar Sekarang" />
          </FieldGroup>
          <FieldGroup label="Link Tombol">
            <input className="admin-input" value={popup.buttonLink || ''} onChange={e => update('buttonLink', e.target.value)} placeholder="/ppdb" />
          </FieldGroup>
        </div>

        <FieldGroup label="Warna Background">
          <div className="admin-color-row">
            <input type="color" value={popup.bgColor || '#be185d'} onChange={e => update('bgColor', e.target.value)} className="admin-color-input" />
            <input className="admin-input" value={popup.bgColor || '#be185d'} onChange={e => update('bgColor', e.target.value)} style={{ maxWidth: 120 }} />
            {/* Color presets */}
            <div className="admin-color-presets">
              {['#be185d', '#7c3aed', '#059669', '#d97706', '#dc2626', '#2563eb', '#0891b2'].map(c => (
                <button key={c} className="admin-color-dot" style={{ background: c }} onClick={() => update('bgColor', c)} type="button" title={c} />
              ))}
            </div>
          </div>
        </FieldGroup>
      </div>

      {/* Live Preview */}
      {popup.enabled && (
        <div className="admin-section-card">
          <h3>👁️ Preview Pop-up</h3>
          <div className="admin-popup-preview" style={{ background: popup.bgColor || '#be185d' }}>
            {popup.image && <img src={popup.image} alt="Popup" className="admin-popup-preview-img" />}
            <div className="admin-popup-preview-content">
              <h4>{popup.title || 'Judul Pop-up'}</h4>
              <p className="preview-subtitle">{popup.subtitle || 'Subtitle'}</p>
              <p className="preview-desc">{popup.description || 'Deskripsi...'}</p>
              <span className="preview-btn">{popup.buttonText || 'Tombol'}</span>
            </div>
          </div>
        </div>
      )}
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: ABOUT (Expanded with Teachers, Facilities, Gallery) ===== */

function AboutTab({ content, updateContent, saveToCloud, saveStatus }) {
  const teachers = content.teachers || [];
  const aboutFacilities = content.aboutFacilities || [];
  const aboutGallery = content.aboutGallery || [];
  const iconOptions = Object.keys(ICON_MAP);

  /* --- Teacher helpers --- */
  const updateTeacher = (index, key, value) => {
    updateContent('teachers', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };
  const addTeacher = () => {
    updateContent('teachers', prev => [...prev, { name: '', role: '', subject: '', initial: '', image: '', usePhoto: false }]);
  };
  const removeTeacher = (index) => {
    updateContent('teachers', prev => prev.filter((_, i) => i !== index));
  };

  /* --- About Facility helpers --- */
  const updateAboutFacility = (index, key, value) => {
    updateContent('aboutFacilities', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };
  const addAboutFacility = () => {
    updateContent('aboutFacilities', prev => [...prev, { icon: 'Star', title: '', desc: '' }]);
  };
  const removeAboutFacility = (index) => {
    updateContent('aboutFacilities', prev => prev.filter((_, i) => i !== index));
  };

  /* --- About Gallery helpers --- */
  const updateAboutGalleryItem = (index, key, value) => {
    updateContent('aboutGallery', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };
  const addAboutGalleryItem = () => {
    updateContent('aboutGallery', prev => [...prev, { image: '', caption: '' }]);
  };
  const removeAboutGalleryItem = (index) => {
    updateContent('aboutGallery', prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Section 1: About Description */}
      <div className="admin-section-card">
        <h3>🖼️ Halaman Tentang Kami</h3>
        <ImageUpload
          label="Gambar Utama Halaman Tentang"
          value={content.aboutImage}
          onChange={(url) => updateContent('aboutImage', url)}
          onClear={() => updateContent('aboutImage', '')}
        />
        <FieldGroup label="Deskripsi Tentang Sekolah">
          <textarea className="admin-textarea" rows={5} value={content.aboutDesc} onChange={e => updateContent('aboutDesc', e.target.value)} />
        </FieldGroup>
      </div>

      {/* Section 2: Profil Tenaga Pendidik */}
      <div className="admin-section-card">
        <h3>👩‍🏫 Profil Tenaga Pendidik</h3>
        <p className="admin-hint">
          Kelola data guru dan tenaga pendidik yang tampil di halaman <strong>Tentang Kami</strong>. Pilih antara avatar (initial) atau foto asli.
        </p>
      </div>

      {teachers.map((teacher, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {teacher.usePhoto && teacher.image ? (
                <img src={teacher.image} alt={teacher.name} className="admin-teacher-mini-avatar" />
              ) : (
                <span className="admin-teacher-mini-initial">{teacher.initial || '?'}</span>
              )}
              {teacher.name || `Guru ${i + 1}`}
            </h3>
            <button className="admin-remove-btn" onClick={() => removeTeacher(i)} title="Hapus">×</button>
          </div>

          {/* Avatar/Photo Toggle */}
          <FieldGroup label="Tampilan Profil">
            <div className="admin-photo-toggle">
              <button
                type="button"
                className={`admin-photo-toggle-btn ${!teacher.usePhoto ? 'active' : ''}`}
                onClick={() => updateTeacher(i, 'usePhoto', false)}
              >
                <Users size={16} /> Avatar (Initial)
              </button>
              <button
                type="button"
                className={`admin-photo-toggle-btn ${teacher.usePhoto ? 'active' : ''}`}
                onClick={() => updateTeacher(i, 'usePhoto', true)}
              >
                <Camera size={16} /> Foto Asli
              </button>
            </div>
          </FieldGroup>

          {teacher.usePhoto ? (
            <ImageUpload
              label="Foto Guru"
              value={teacher.image}
              onChange={(url) => updateTeacher(i, 'image', url)}
              onClear={() => updateTeacher(i, 'image', '')}
            />
          ) : (
            <FieldGroup label="Initial (1 huruf)">
              <input
                className="admin-input"
                value={teacher.initial}
                onChange={e => updateTeacher(i, 'initial', e.target.value.slice(0, 1).toUpperCase())}
                maxLength={1}
                style={{ maxWidth: 80 }}
              />
            </FieldGroup>
          )}

          <div className="admin-field-row">
            <FieldGroup label="Nama Lengkap">
              <input className="admin-input" value={teacher.name} onChange={e => updateTeacher(i, 'name', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Jabatan">
              <input className="admin-input" value={teacher.role} onChange={e => updateTeacher(i, 'role', e.target.value)} />
            </FieldGroup>
          </div>
          <FieldGroup label="Mata Pelajaran">
            <input className="admin-input" value={teacher.subject} onChange={e => updateTeacher(i, 'subject', e.target.value)} />
          </FieldGroup>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addTeacher} style={{ marginTop: '8px', marginBottom: '24px' }}>
        <Plus size={14} /> Tambah Guru
      </button>

      {/* Section 3: Fasilitas Unggulan */}
      <div className="admin-section-card">
        <h3>🏫 Fasilitas Unggulan</h3>
        <p className="admin-hint">
          Kelola daftar fasilitas yang tampil di halaman <strong>Tentang Kami</strong>. Pilih icon yang sesuai.
        </p>
      </div>

      {aboutFacilities.map((fac, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="admin-icon-preview">{ICON_MAP[fac.icon] || <Star size={20} />}</span>
              {fac.title || `Fasilitas ${i + 1}`}
            </h3>
            <button className="admin-remove-btn" onClick={() => removeAboutFacility(i)} title="Hapus">×</button>
          </div>

          <FieldGroup label="Icon">
            <div className="admin-icon-grid">
              {iconOptions.map(iconName => (
                <button
                  key={iconName}
                  className={`admin-icon-option ${fac.icon === iconName ? 'selected' : ''}`}
                  onClick={() => updateAboutFacility(i, 'icon', iconName)}
                  title={iconName}
                  type="button"
                >
                  {ICON_MAP[iconName]}
                </button>
              ))}
            </div>
          </FieldGroup>

          <div className="admin-field-row">
            <FieldGroup label="Nama Fasilitas">
              <input className="admin-input" value={fac.title} onChange={e => updateAboutFacility(i, 'title', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Deskripsi">
              <input className="admin-input" value={fac.desc} onChange={e => updateAboutFacility(i, 'desc', e.target.value)} />
            </FieldGroup>
          </div>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addAboutFacility} style={{ marginTop: '8px', marginBottom: '24px' }}>
        <Plus size={14} /> Tambah Fasilitas
      </button>

      {/* Section 4: Galeri Sekolah Kami */}
      <div className="admin-section-card">
        <h3>📷 Galeri Sekolah Kami</h3>
        <p className="admin-hint">
          Kelola foto galeri yang tampil di section <strong>"Suasana Sekolah Kami"</strong> di halaman Tentang Kami.
        </p>
      </div>

      {aboutGallery.map((item, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3>🖼️ Foto {i + 1}: {item.caption || 'Tanpa judul'}</h3>
            <button className="admin-remove-btn" onClick={() => removeAboutGalleryItem(i)} title="Hapus">×</button>
          </div>

          <ImageUpload
            label="Gambar"
            value={item.image}
            onChange={(url) => updateAboutGalleryItem(i, 'image', url)}
            onClear={() => updateAboutGalleryItem(i, 'image', '')}
          />

          <FieldGroup label="Caption / Judul">
            <input className="admin-input" value={item.caption} onChange={e => updateAboutGalleryItem(i, 'caption', e.target.value)} />
          </FieldGroup>
        </div>
      ))}

      <button className="btn btn-primary btn-sm" onClick={addAboutGalleryItem} style={{ marginTop: '8px' }}>
        <Plus size={14} /> Tambah Foto Galeri
      </button>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: TESTIMONIALS (NEW) ===== */

function TestimonialsTab({ content, updateContent, saveToCloud, saveStatus }) {
  const testimonials = content.testimonials || [];

  const updateTestimonial = (index, key, value) => {
    updateContent('testimonials', prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addTestimonial = () => {
    if (testimonials.length >= MAX_TESTIMONIALS) return;
    updateContent('testimonials', prev => [...prev, { text: '', name: '', role: '', rating: 5, image: '' }]);
  };

  const removeTestimonial = (index) => {
    updateContent('testimonials', prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="admin-hint" style={{ marginBottom: '16px' }}>
        💬 Kelola testimoni wali murid yang tampil di halaman <strong>Beranda</strong>. Upload foto dan isi teks testimoni. Maksimal <strong>{MAX_TESTIMONIALS}</strong> testimoni.
      </p>

      <div className="admin-section-card">
        <h3>📊 Status Testimoni</h3>
        <div className="admin-testimonial-counter">
          <span className="admin-testimonial-count">{testimonials.length}</span>
          <span className="admin-testimonial-separator">/</span>
          <span className="admin-testimonial-max">{MAX_TESTIMONIALS}</span>
          <span className="admin-testimonial-label">testimoni</span>
          <div className="admin-testimonial-bar">
            <div
              className="admin-testimonial-bar-fill"
              style={{ width: `${(testimonials.length / MAX_TESTIMONIALS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {testimonials.map((item, i) => (
        <div key={i} className="admin-section-card">
          <div className="admin-card-header-row">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.image ? (
                <img src={item.image} alt={item.name} className="admin-teacher-mini-avatar" />
              ) : (
                <span className="admin-teacher-mini-initial">{item.name ? item.name.charAt(0) : '?'}</span>
              )}
              {item.name || `Testimoni ${i + 1}`}
            </h3>
            <button className="admin-remove-btn" onClick={() => removeTestimonial(i)} title="Hapus">×</button>
          </div>

          <ImageUpload
            label="Foto Wali Murid"
            value={item.image}
            onChange={(url) => updateTestimonial(i, 'image', url)}
            onClear={() => updateTestimonial(i, 'image', '')}
          />

          <div className="admin-field-row">
            <FieldGroup label="Nama">
              <input className="admin-input" value={item.name} onChange={e => updateTestimonial(i, 'name', e.target.value)} placeholder="Ibu Fatimah" />
            </FieldGroup>
            <FieldGroup label="Keterangan">
              <input className="admin-input" value={item.role} onChange={e => updateTestimonial(i, 'role', e.target.value)} placeholder="Wali Murid Kelas 8" />
            </FieldGroup>
          </div>

          <FieldGroup label="Teks Testimoni">
            <textarea
              className="admin-textarea"
              rows={3}
              value={item.text}
              onChange={e => updateTestimonial(i, 'text', e.target.value)}
              placeholder="Tulis testimoni wali murid..."
            />
          </FieldGroup>

          <FieldGroup label="Rating">
            <div className="admin-rating-picker">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`admin-rating-star ${star <= (item.rating || 0) ? 'active' : ''}`}
                  onClick={() => updateTestimonial(i, 'rating', star)}
                >
                  <Star size={22} fill={star <= (item.rating || 0) ? '#d4af37' : 'none'} />
                </button>
              ))}
              <span className="admin-rating-text">{item.rating || 0}/5</span>
            </div>
          </FieldGroup>
        </div>
      ))}

      {testimonials.length < MAX_TESTIMONIALS ? (
        <button className="btn btn-primary btn-sm" onClick={addTestimonial} style={{ marginTop: '8px' }}>
          <Plus size={14} /> Tambah Testimoni
        </button>
      ) : (
        <p className="admin-hint" style={{ marginTop: '8px', color: '#d97706' }}>
          ⚠️ Jumlah testimoni sudah mencapai batas maksimal ({MAX_TESTIMONIALS}).
        </p>
      )}
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: CONTACT ===== */

function ContactTab({ content, updateContent, saveToCloud, saveStatus }) {
  const { contact } = content;
  const update = (key, val) => updateContent('contact', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="admin-section-card">
        <h3>📞 Informasi Kontak</h3>
        <div className="admin-field-row">
          <FieldGroup label="No. Telepon / WhatsApp">
            <input className="admin-input" value={contact.phone} onChange={e => update('phone', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Email">
            <input className="admin-input" type="email" value={contact.email} onChange={e => update('email', e.target.value)} />
          </FieldGroup>
        </div>
        <FieldGroup label="Alamat Lengkap">
          <textarea className="admin-textarea" rows={2} value={contact.address} onChange={e => update('address', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Nomor WhatsApp (kode negara, tanpa +)">
          <input className="admin-input" value={contact.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="6283808417406" />
        </FieldGroup>
        <div className="admin-field-row">
          <FieldGroup label="URL Instagram">
            <input className="admin-input" value={contact.instagram} onChange={e => update('instagram', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="URL Facebook">
            <input className="admin-input" value={contact.facebook} onChange={e => update('facebook', e.target.value)} />
          </FieldGroup>
        </div>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: PPDB ===== */

function PPDBTab({ content, updateContent, saveToCloud, saveStatus }) {
  const { ppdb } = content;
  const update = (key, val) => updateContent('ppdb', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="admin-section-card">
        <h3>📝 Informasi PPDB</h3>
        <div className="admin-field-row">
          <FieldGroup label="Tanggal Mulai">
            <input className="admin-input" value={ppdb.startDate} onChange={e => update('startDate', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Tanggal Selesai">
            <input className="admin-input" value={ppdb.endDate} onChange={e => update('endDate', e.target.value)} />
          </FieldGroup>
        </div>
        <FieldGroup label="Gelombang">
          <input className="admin-input" value={ppdb.wave} onChange={e => update('wave', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Kuota">
          <input className="admin-input" value={ppdb.quota} onChange={e => update('quota', e.target.value)} />
        </FieldGroup>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}

/* ===== TAB: INSTAGRAM (with embed preview) ===== */

function extractInstagramPostId(url) {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function InstagramTab({ content, updateContent, saveToCloud, saveStatus }) {
  const handleChange = (index, value) => {
    updateContent('instagramPosts', prev => {
      const newPosts = [...prev];
      newPosts[index] = value;
      return newPosts;
    });
  };
  const addPost = () => updateContent('instagramPosts', prev => [...prev, '']);
  const removePost = (index) => updateContent('instagramPosts', prev => prev.filter((_, i) => i !== index));

  return (
    <div>
      <div className="admin-section-card">
        <h3>📸 Postingan Instagram</h3>
        <p className="admin-hint">
          Masukkan URL postingan Instagram. Preview otomatis akan muncul di bawah setiap link.<br />
          Format: <code>https://www.instagram.com/p/XXXXX/</code>
        </p>

        {content.instagramPosts.map((url, i) => {
          const postId = extractInstagramPostId(url);
          return (
            <div key={i} className="admin-instagram-item">
              <div className="admin-misi-row">
                <span className="admin-misi-num">{i + 1}.</span>
                <input
                  className="admin-input"
                  value={url}
                  onChange={e => handleChange(i, e.target.value)}
                  placeholder="https://www.instagram.com/p/..."
                />
                <button className="admin-remove-btn" onClick={() => removePost(i)}>×</button>
              </div>

              {/* Instagram Embed Preview */}
              {postId && (
                <div className="admin-ig-preview-wrap">
                  <iframe
                    src={`https://www.instagram.com/p/${postId}/embed/`}
                    className="admin-ig-preview-iframe"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    title={`Instagram Post ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          );
        })}

        <button className="btn btn-outline-pink btn-sm" onClick={addPost} style={{ marginTop: '8px' }}>
          + Tambah Postingan
        </button>
      </div>
      <SaveButton saveToCloud={saveToCloud} saveStatus={saveStatus} />
    </div>
  );
}