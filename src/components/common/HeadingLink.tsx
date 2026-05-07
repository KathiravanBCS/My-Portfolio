"use client";

import type React from "react";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children }) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  };

  return (
    <Tag id={id} className={`${sizes[level]} mt-6 mb-3 scroll-mt-20`}>
      {children}
    </Tag>
  );
};
