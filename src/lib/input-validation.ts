const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES_COUNT = 50;

export function sanitizeEmailContent(text: string): string {
  let sanitized = text
    .replace(/[\r\n]+/g, '\n')
    .replace(/\0/g, '')
    .replace(/[<>]/g, '')
    .trim();
  if (sanitized.length > 5000) sanitized = sanitized.substring(0, 5000);
  return sanitized;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function sanitizeName(name: string): string {
  let sanitized = name.replace(/[^a-zA-Z0-9\s\-'.]/g, '').trim();
  if (sanitized.length > 100) sanitized = sanitized.substring(0, 100);
  return sanitized || 'Visitor';
}

export const INPUT_LIMITS = {
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES_COUNT,
  MAX_EMAIL_LENGTH: 254,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_BODY_LENGTH: 5000,
};
