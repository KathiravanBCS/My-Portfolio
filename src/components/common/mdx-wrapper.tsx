'use client';

import { useEffect, useRef } from 'react';
import { slugify as transliterate } from 'transliteration';

function slugify(str: string): string {
  return transliterate(str.replace(/&/g, ' and '), {
    lowercase: true,
    separator: '-',
  }).replace(/\-\-+/g, '-');
}

export function MDXWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ref.current) return;

      // Find all h2 and h3 elements and add IDs if they don't have one
      const headings = ref.current.querySelectorAll('h2, h3');
      console.log(`Found ${headings.length} headings`);

      for (const heading of headings) {
        if (!heading.id && heading.textContent) {
          const id = slugify(heading.textContent);
          heading.id = id;
          console.log(`Added ID "${id}" to heading: ${heading.textContent.substring(0, 30)}`);

          // Add link styling
          (heading as HTMLElement).style.scrollMarginTop = '80px';
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <div ref={ref}>{children}</div>;
}
