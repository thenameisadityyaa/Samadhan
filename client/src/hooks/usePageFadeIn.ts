import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function usePageFadeIn<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, { opacity: 0, y: 12, duration: 0.45, ease: 'power2.out' });
    }
  }, []);
  return ref;
}

export function useStaggerFadeIn<T extends HTMLElement>(selector: string) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current.querySelectorAll(selector), {
        opacity: 0,
        y: 10,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.06,
      });
    }
  }, [selector]);
  return ref;
}


