import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../shared/FloatingWhatsApp';
import SitePopup from '../shared/SitePopup';
import { useSiteContent } from '../../lib/content';

export default function Layout() {
  const { loading } = useSiteContent();

  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', background: '#fdf2f8',
        gap: '16px', fontFamily: 'var(--font-body)'
      }}>
        <img src="/images/logo.png" alt="SMP UMAIS" style={{ width: 64, height: 64, objectFit: 'contain' }} />
        <div style={{
          width: 36, height: 36, border: '3px solid #f9a8d4',
          borderTopColor: '#be185d', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Memuat halaman...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, marginTop: 'var(--nav-height)' }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SitePopup />
    </div>
  );
}
