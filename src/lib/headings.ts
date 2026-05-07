import { slugify as transliterate } from "transliteration";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(str: string): string {
  return transliterate(str.replace(/&/g, " and "), {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null = headingRegex.exec(content);
  while (match !== null) {
    const level = match[1].length;
    const rawText = String(match[2] || "");
    const text = rawText.replace(/[*_`]/g, "").trim();
    if (!text) {
      match = headingRegex.exec(content);
      continue;
    }
    const id = slugify(text);
    if (id) {
      headings.push({ id, text, level });
    }
    match = headingRegex.exec(content);
  }
  return headings;
}
