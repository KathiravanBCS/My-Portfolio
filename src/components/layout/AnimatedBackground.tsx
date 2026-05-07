'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === 'light';
  const accentColor = 'from-pink-600 to-pink-400';

  return (
    <>
      {/* Background gradient blur - main */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b ${accentColor} blur-[120px] -z-10 pointer-events-none ${isLight ? 'opacity-5' : 'opacity-10'}`} />

      {/* Grid background */}
      <div className={`fixed inset-0 bg-[size:40px_40px] -z-10 ${
        isLight
          ? 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]'
      }`} />
    </>
  );
}
