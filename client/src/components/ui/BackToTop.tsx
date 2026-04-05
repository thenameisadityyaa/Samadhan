// src/components/ui/BackToTop.tsx
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded bg-[--india-saffron] text-white shadow-lg flex items-center justify-center hover:bg-[--india-saffron-700] active:scale-95 transition-all"
      style={{ boxShadow: '0 4px 16px rgba(255,153,51,0.4)' }}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
