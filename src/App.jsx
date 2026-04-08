import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicPage from './pages/AcademicPage';
import GalleryPage from './pages/GalleryPage';
import PPDBPage from './pages/PPDBPage';
import ScrollToTop from './components/shared/ScrollToTop';

export default function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}
