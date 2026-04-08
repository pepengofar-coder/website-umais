import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('Username atau password salah');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/images/logo.png" alt="Logo UMAIS" className="admin-login-logo" />
          <h1>Admin Panel</h1>
          <p>SMP UMAIS Bogor — Dashboard Pengelolaan Website</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}

          <div className="admin-input-group">
            <User size={18} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-input-group">
            <Lock size={18} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="admin-toggle-pass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-lg admin-login-btn" disabled={loading}>
            {loading ? 'Memproses...' : (<><LogIn size={18} /> Masuk</>)}
          </button>
        </form>

        <p className="admin-login-hint">
          Hanya untuk administrator sekolah.
        </p>
      </div>
    </div>
  );
}
