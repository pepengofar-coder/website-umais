import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useSiteContent, fileToDataUrl } from '../lib/content';
import {
  LayoutDashboard, FileText, Phone, GraduationCap, Eye, Image as ImageIcon,
  LogOut, Save, RotateCcw, Check, Settings, BarChart3, Globe, Upload, Trash2
} from 'lucide-react';
import './AdminDashboard.css';

const TABS = [
  { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard size={18} /> },
  { id: 'hero', label: 'Beranda / Hero', icon: <FileText size={18} /> },
  { id: 'stats', label: 'Statistik', icon: <BarChart3 size={18} /> },
  { id: 'overview-section', label: 'Keunggulan', icon: <Globe size={18} /> },
  { id: 'visi-misi', label: 'Visi & Misi', icon: <Eye size={18} /> },
  { id: 'fasilitas', label: 'Fasilitas', icon: <ImageIcon size={18} /> },
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
    // Resize image to max 800px and convert to base64
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
    { label: 'Tahun Berdiri', value: content.stats.years, color: '#2196f3' },
    { label: 'Instagram Posts', value: content.instagramPosts.length, color: '#ff5722' },
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
          <li><strong>Alamat:</strong> {content.contact.address}</li>
          <li><strong>PPDB:</strong> {content.ppdb.startDate} — {content.ppdb.endDate}</li>
        </ul>
      </div>

      <div className="admin-section-card">
        <h3>💡 Panduan</h3>
        <p>Gunakan menu di samping untuk mengedit konten website. Setiap perubahan akan otomatis tersimpan dan langsung terlihat di website.</p>
        <ul className="admin-info-list">
          <li>📝 <strong>Beranda/Hero:</strong> Edit teks dan gambar banner utama</li>
          <li>📊 <strong>Statistik:</strong> Ubah jumlah alumni, pendidik, tahun</li>
          <li>🏫 <strong>Fasilitas:</strong> Upload gambar & edit keterangan fasilitas</li>
          <li>🖼️ <strong>Tentang Kami:</strong> Edit deskripsi dan gambar halaman Tentang</li>
          <li>📸 <strong>Instagram:</strong> Kelola postingan yang ditampilkan di Berita & Acara</li>
          <li>Klik <strong>"Lihat Website"</strong> untuk melihat hasil perubahan Anda</li>
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
      <h3>📊 Statistik Sekolah (ditampilkan di Hero)</h3>
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

/* ===== TAB: OVERVIEW SECTION (Keunggulan) ===== */

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

/* ===== TAB: FASILITAS (3 cards with image + title + desc) ===== */

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
        Edit gambar dan keterangan 3 kartu fasilitas yang tampil di halaman Beranda. Jika gambar kosong, gambar default akan digunakan.
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

          {!fac.image && (
            <p className="admin-hint">Default: {defaultImages[i]}</p>
          )}

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
        <textarea
          className="admin-textarea"
          rows={5}
          value={content.aboutDesc}
          onChange={e => updateContent('aboutDesc', e.target.value)}
        />
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
      <h3>📸 Postingan Instagram (ditampilkan di Berita & Acara)</h3>
      <p className="admin-hint">Masukkan URL postingan Instagram yang ingin ditampilkan. Format: https://www.instagram.com/p/XXXXX/</p>

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