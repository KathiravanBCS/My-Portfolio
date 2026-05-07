'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkModal = () => {
      setModalOpen(document.body.hasAttribute('data-modal-open'));
    };
    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-modal-open'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        const isClick =
          style.cursor === 'pointer' ||
          el.tagName === 'A' ||
          el.tagName === 'BUTTON' ||
          !!el.closest('a') ||
          !!el.closest('button');
        setIsPointer(isClick);
      }
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const size = isPointer ? 10 : 7;
  const glow = isPointer
    ? '0 0 14px rgba(255,64,129,0.95), 0 0 28px rgba(255,64,129,0.55)'
    : '0 0 8px rgba(255,64,129,0.85), 0 0 16px rgba(255,64,129,0.4)';

  if (modalOpen) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        marginTop: `-${size / 2}px`,
        marginLeft: `-${size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        background: isDark
          ? 'radial-gradient(circle, #ffffff 0%, #ff4081 65%)'
          : '#ff4081',
        boxShadow: isDark ? glow : 'none',
        transition:
          'width 0.12s ease, height 0.12s ease, opacity 0.2s ease, box-shadow 0.15s ease, margin 0.12s ease',
        willChange: 'transform',
      }}
    />
  );
}
