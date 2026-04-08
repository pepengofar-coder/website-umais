import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './PageHeader.css';

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <motion.section
      className="page-header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header-bg" />
      <div className="container page-header-content">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.nav
          className="breadcrumbs"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Link to="/">Beranda</Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="breadcrumb-item">
              <ChevronRight size={14} />
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span className="breadcrumb-current">{item.label}</span>
              )}
            </span>
          ))}
        </motion.nav>
        <div className="ornament-line" style={{ marginTop: '16px' }}>
          <span>✦</span>
        </div>
      </div>
    </motion.section>
  );
}
