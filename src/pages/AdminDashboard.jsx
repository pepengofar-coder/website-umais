import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useSiteContent, fileToDataUrl } from '../lib/content';
import {
  LayoutDashboard, FileText, Phone, GraduationCap, Eye, Image as ImageIcon,
  LogOut, Save, RotateCcw, Check, Settings, BarChart3, Globe, Upload, Trash2,
  CalendarDays, Megaphone, Award, Plus,
  // Icon options for extracurriculars
  Palette, PenTool, Monitor, Dumbbell, Music, Trophy, Sparkles, BookOpenCheck,
  Heart, BookOpen, Camera, Scissors, Leaf, Coffee, Star, Compass, Headphones,
  Mic, Gamepad2, Bike, FlaskConical, Drama
} from 'lucide-react';
import './AdminDashboard.css';

/* ===== Icon map for extracurriculars ===== */
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
  { id: 'contact', label: 'Kontak', icon: <Phone size={18} /> },
  { id: 'ppdb', label: 'Info PPDB', icon: <GraduationCap size={18} /> },
  { id: 'instagram', label: 'Instagram Posts', icon: <ImageIcon size={18} /> },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { content, updateContent, resetContent } = useSiteContent();
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            {saved && <span className="admin-saved-badge"><Check size={14} /> Tersimpan!</span>}
            <button className="btn btn-outline-pink btn-sm" onClick={resetContent}>
              <RotateCcw size={14} /> Reset Default
            </button>
            <button className="btn btn-primary btn-sm" onClick={showSaved}>
              <Save size={14} /> Simpan
            </button>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && <OverviewTab content={content} />}
          {activeTab === 'hero' && <HeroTab content={content} updateContent={updateContent} />}
          {activeTab === 'stats' && <StatsTab content={content} updateContent={updateContent} />}
          {activeTab === 'overview-section' && <OverviewSectionTab content={content} updateContent={updateContent} />}
          {activeTab === 'visi-misi' && <VisiMisiTab content={content} updateContent={updateContent} />}
          {activeTab === 'fasilitas' && <FasilitasTab content={content} updateContent={updateContent} />}
          {activeTab === 'gallery' && <GalleryTab content={content} updateContent={updateContent} />}
          {activeTab === 'extracurricular' && <ExtracurricularTab content={content} updateContent={updateContent} />}
          {activeTab === 'calendar' && <CalendarTab content={content} updateContent={updateContent} />}
          {activeTab === 'popup' && <PopupTab content={content} updateContent={updateContent} />}
          {activeTab === 'about' && <AboutTab content={content} updateContent={updateContent} />}
          {activeTab === 'contact' && <ContactTab content={content} updateContent={updateContent} />}
          {activeTab === 'ppdb' && <PPDBTab content={content} updateContent={updateContent} />}
          {activeTab === 'instagram' && <InstagramTab content={content} updateContent={updateContent} />}
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
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
        {value && (
          <button className="admin-upload-clear" onClick={onClear} title="Hapus gambar">
            <Trash2 size={14} /> Hapus
          </button>
        )}
      </div>
      {value && (
        <div className="admin-preview">
          <img src={value} alt="Preview" />
        </div>
      )}
    </div>
  );
}

/* ===== TAB: OVERVIEW ===== */

function OverviewTab({ content }) {
  const cards = [
    { label: 'Alumni Berprestasi', value: content.stats.alumni, color: '#e91e63' },
    { label: 'Tenaga Pendidik', value: content.stats.teachers, color: '#9c27b0' },
    { label: 'Foto Galeri', value: content.gallery?.length || 0, color: '#2196f3' },
    { label: 'Ekstrakurikuler', value: content.extracurriculars?.length || 0, color: '#ff5722' },
    { label: 'Kalender Akademik', value: content.calendar?.length || 0, color: '#4caf50' },
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
          <li>Klik <strong>"Lihat Website"</strong> untuk melihat hasil perubahan</li>
        </ul>
      </div>
    </div>
  );
}

/* ===== TAB: HERO ===== */

function HeroTab({ content, updateContent }) {
  const { hero } = content;
  const update = (key, val) => updateContent('hero', prev => ({ ...prev, [key]: val }));

  return (
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
  );
}

/* ===== TAB: STATS ===== */

function StatsTab({ content, updateContent }) {
  const { stats } = content;
  const update = (key, val) => updateContent('stats', prev => ({ ...prev, [key]: val }));

  return (
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
  );
}

/* ===== TAB: OVERVIEW SECTION ===== */

function OverviewSectionTab({ content, updateContent }) {
  return (
    <div className="admin-section-card">
      <h3>⭐ Section Keunggulan Kami</h3>
      <FieldGroup label="Judul Section">
        <input className="admin-input" value={content.overviewTitle} onChange={e => updateContent('overviewTitle', e.target.value)} />
      </FieldGroup>
      <FieldGroup label="Deskripsi Section">
        <textarea className="admin-textarea" rows={3} value={content.overviewDesc} onChange={e => updateContent('overviewDesc', e.target.value)} />
      </FieldGroup>
    </div>
  );
}

/* ===== TAB: VISI MISI ===== */

function VisiMisiTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: FASILITAS ===== */

function FasilitasTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: GALLERY (NEW) ===== */

function GalleryTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: EXTRACURRICULAR (NEW) ===== */

function ExtracurricularTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: CALENDAR (NEW) ===== */

function CalendarTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: POPUP / IKLAN (NEW) ===== */

function PopupTab({ content, updateContent }) {
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
    </div>
  );
}

/* ===== TAB: ABOUT ===== */

function AboutTab({ content, updateContent }) {
  return (
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
  );
}

/* ===== TAB: CONTACT ===== */

function ContactTab({ content, updateContent }) {
  const { contact } = content;
  const update = (key, val) => updateContent('contact', prev => ({ ...prev, [key]: val }));

  return (
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
  );
}

/* ===== TAB: PPDB ===== */

function PPDBTab({ content, updateContent }) {
  const { ppdb } = content;
  const update = (key, val) => updateContent('ppdb', prev => ({ ...prev, [key]: val }));

  return (
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
  );
}

/* ===== TAB: INSTAGRAM ===== */

function InstagramTab({ content, updateContent }) {
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
    <div className="admin-section-card">
      <h3>📸 Postingan Instagram</h3>
      <p className="admin-hint">URL postingan Instagram. Format: https://www.instagram.com/p/XXXXX/</p>
      {content.instagramPosts.map((url, i) => (
        <div key={i} className="admin-misi-row">
          <span className="admin-misi-num">{i + 1}.</span>
          <input className="admin-input" value={url} onChange={e => handleChange(i, e.target.value)} placeholder="https://www.instagram.com/p/..." />
          <button className="admin-remove-btn" onClick={() => removePost(i)}>×</button>
        </div>
      ))}
      <button className="btn btn-outline-pink btn-sm" onClick={addPost} style={{ marginTop: '8px' }}>
        + Tambah Postingan
      </button>
    </div>
  );
}