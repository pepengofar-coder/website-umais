import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useSiteContent } from '../lib/content';
import { supabase } from '../lib/supabase';

import {
  LayoutDashboard, FileText, Phone, GraduationCap, Eye, Image,
  LogOut, Save, RotateCcw, Check, Settings, BarChart3, Globe
} from 'lucide-react';

import './AdminDashboard.css';

const TABS = [
  { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard size={18} /> },
  { id: 'hero', label: 'Beranda / Hero', icon: <FileText size={18} /> },
  { id: 'visi-misi', label: 'Tentang Kami', icon: <Eye size={18} /> },
  { id: 'ppdb', label: 'PPDB', icon: <GraduationCap size={18} /> },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { content, updateContent } = useSiteContent();

  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}

        <button onClick={logout}>Logout</button>
      </aside>

      <main className="admin-main">
        <h1>{activeTab}</h1>

        {saved && <p style={{ color: 'green' }}>Tersimpan!</p>}

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'hero' && <HeroTab content={content} updateContent={updateContent} showSaved={showSaved} />}
        {activeTab === 'visi-misi' && <VisiMisiTab content={content} updateContent={updateContent} showSaved={showSaved} />}
        {activeTab === 'ppdb' && <PPDBTab content={content} updateContent={updateContent} showSaved={showSaved} />}
      </main>
    </div>
  );
}

/* ===== HELPER ===== */

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label>{label}</label>
      <div>{children}</div>
    </div>
  );
}

async function uploadImage(file) {
  if (!file || !supabase) return null;

  const fileName = Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    alert("Upload gagal!");
    return null;
  }

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/* ===== OVERVIEW ===== */

function OverviewTab() {
  return <p>Dashboard siap digunakan 🚀</p>;
}

/* ===== HERO ===== */

function HeroTab({ content, updateContent, showSaved }) {
  const { hero } = content;

  const update = (key, val) =>
    updateContent('hero', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <h2>Hero</h2>

      <Field label="Judul">
        <input value={hero.headline} onChange={e => update("headline", e.target.value)} />
      </Field>

      <Field label="Deskripsi">
        <textarea value={hero.subtitle} onChange={e => update("subtitle", e.target.value)} />
      </Field>

      <Field label="Upload Gambar">
        <input
          type="file"
          onChange={async (e) => {
            const url = await uploadImage(e.target.files[0]);
            if (url) {
              update("image", url);
              showSaved();
            }
          }}
        />
      </Field>

      {hero.image && <img src={hero.image} width="200" />}
    </div>
  );
}

/* ===== TENTANG ===== */

function VisiMisiTab({ content, updateContent, showSaved }) {

  return (
    <div>
      <h2>Tentang Kami</h2>

      <Field label="Deskripsi">
        <textarea
          value={content.aboutDesc || ''}
          onChange={e => {
            updateContent("aboutDesc", e.target.value);
            showSaved();
          }}
        />
      </Field>

      <Field label="Upload Gambar">
        <input
          type="file"
          onChange={async (e) => {
            const url = await uploadImage(e.target.files[0]);
            if (url) {
              updateContent("aboutImage", url);
              showSaved();
            }
          }}
        />
      </Field>

      {content.aboutImage && <img src={content.aboutImage} width="200" />}
    </div>
  );
}

/* ===== PPDB ===== */

function PPDBTab({ content, updateContent, showSaved }) {
  const { ppdb } = content;

  const update = (key, val) =>
    updateContent('ppdb', prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <h2>PPDB</h2>

      <Field label="Deskripsi">
        <textarea
          value={ppdb.description || ''}
          onChange={e => {
            update("description", e.target.value);
            showSaved();
          }}
        />
      </Field>

      <Field label="Upload Banner">
        <input
          type="file"
          onChange={async (e) => {
            const url = await uploadImage(e.target.files[0]);
            if (url) {
              update("image", url);
              showSaved();
            }
          }}
        />
      </Field>

      {ppdb.image && <img src={ppdb.image} width="200" />}
    </div>
  );
}