"use client";

import { socialSharing } from "@/config";

interface ShareSectionProps {
  title: string;
  url: string;
}

export function ShareSection({ title, url }: ShareSectionProps) {
  if (!socialSharing.display) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <span className="text-sm text-gray-500">Share this post:</span>
      <button type="button" onClick={handleCopy} className="btn-secondary text-sm">
        Copy link
      </button>
    </div>
  );
}
