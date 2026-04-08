import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './FloatingWhatsApp.css';

const WA_NUMBER = '6283808417406';
const WA_MESSAGE = 'Assalamu\'alaikum, saya ingin bertanya mengenai SMP Ummul Mukminin Aisyah Bogor.';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <div className="floating-wa">
      {isOpen && (
        <div className="wa-popup glass">
          <div className="wa-popup-header">
            <div className="wa-popup-avatar">
              <MessageCircle size={20} />
            </div>
            <div>
              <div className="wa-popup-name">SMP UMAIS Bogor</div>
              <div className="wa-popup-status">● Online — Biasanya membalas dalam 1 jam</div>
            </div>
            <button className="wa-close" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              Assalamu'alaikum! 👋 
              <br />Ada yang bisa kami bantu? Silakan tanyakan tentang PPDB, kurikulum, atau informasi lainnya.
            </div>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-send-btn">
            <MessageCircle size={18} />
            Mulai Chat
          </a>
        </div>
      )}
      <button
        className="wa-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat WhatsApp"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
