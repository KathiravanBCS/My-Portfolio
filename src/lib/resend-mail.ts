import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');
  return new Resend(process.env.RESEND_API_KEY);
}

export function parseNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  const nameParts = localPart
    .replace(/[._-]/g, ' ')
    .replace(/\d+/g, '')
    .trim()
    .split(' ')
    .filter(part => part.length > 0);
  const capitalizedParts = nameParts.map(
    part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );
  return capitalizedParts.join(' ') || 'there';
}

export async function sendResendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.RESEND_FROM_EMAIL) throw new Error('RESEND_FROM_EMAIL is not set');
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'KathiravanBot'} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [options.to],
      subject: options.subject,
      html: options.html || options.text || '',
      text: options.text,
    });
    if (error) { console.error('Resend error:', error); return false; }
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendThankYouEmail(
  visitorEmail: string,
  visitorName: string,
  message: string
): Promise<boolean> {
  try {
    if (!process.env.RESEND_FROM_EMAIL) throw new Error('RESEND_FROM_EMAIL is not set');
    const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${visitorName},</p>
  <p>Thank you for reaching out! I've received your message:</p>
  <blockquote style="border-left: 3px solid #ff4081; padding-left: 15px; margin: 20px 0; color: #555;">
    ${message}
  </blockquote>
  <p>I'll review your inquiry and respond from <strong>${process.env.RESEND_TO_EMAIL || 'kathiravanvittopa717@gmail.com'}</strong> soon.</p>
  <p>Best regards,<br>Kathiravan V<br>Full-Stack Developer</p>
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  <p style="font-size: 12px; color: #888;">This is an automated confirmation. You will receive a personal response shortly.</p>
</body>
</html>`.trim();

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `Kathiravan V <${process.env.RESEND_FROM_EMAIL}>`,
      to: [visitorEmail],
      subject: 'Message received - Kathiravan V',
      html: htmlContent,
    });
    if (error) { console.error('Thank you email error:', error); return false; }
    return true;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
}
