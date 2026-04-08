import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicPage from './pages/AcademicPage';
import GalleryPage from './pages/GalleryPage';
import PPDBPage from './pages/PPDBPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/shared/ScrollToTop';
import { AuthProvider, useAuth } from './lib/auth';
import { SiteContentProvider } from './lib/content';

function AdminRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/akademik" element={<AcademicPage />} />
              <Route path="/galeri" element={<GalleryPage />} />
              <Route path="/ppdb" element={<PPDBPage />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  );
}
