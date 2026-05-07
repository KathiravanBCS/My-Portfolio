"use client";

import { newsletter } from "@/config";

export const Mailchimp: React.FC<{ className?: string }> = () => {
  if (!newsletter.display) return null;
  return null;
};
