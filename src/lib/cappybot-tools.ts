import { tool } from 'ai';
import { z } from 'zod';
import { sanitizeEmailContent, sanitizeName, isValidEmail } from './input-validation';
import { sendResendEmail, sendThankYouEmail, parseNameFromEmail } from './resend-mail';

export const sendContactEmailTool = tool({
  description: 'Send a contact email to Kathiravan when a visitor wants to reach out for work opportunities or collaboration. Only use this when the visitor explicitly provides their email and wants to contact Kathiravan.',
  inputSchema: z.object({
    visitorEmail: z.string().email().describe('The email address of the visitor'),
    visitorName: z.string().describe('The name of the visitor (if provided)'),
    message: z.string().describe('The message or inquiry from the visitor'),
  }),
  execute: async ({ visitorEmail, visitorName, message }) => {
    try {
      if (!isValidEmail(visitorEmail)) {
        return { success: false, message: 'Please provide a valid email address.' };
      }

      const sanitizedEmail = visitorEmail.trim().toLowerCase();
      const sanitizedMessage = sanitizeEmailContent(message);
      let sanitizedName = sanitizeName(visitorName);
      if (!sanitizedName || sanitizedName.length < 2) {
        sanitizedName = parseNameFromEmail(sanitizedEmail);
      }

      if (sanitizedMessage.length < 10) {
        return { success: false, message: 'Please provide a more detailed message (at least 10 characters).' };
      }

      const emailBody = `
New contact request from KathiravanBot:

From: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This message was sent via KathiravanBot on the portfolio.
      `.trim();

      const notificationSent = await sendResendEmail({
        to: process.env.RESEND_TO_EMAIL || 'kathiravanvittopa717@gmail.com',
        subject: `Portfolio Contact: ${sanitizedName} wants to connect`,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
      });

      if (!notificationSent) {
        return {
          success: false,
          message: 'There was an issue sending your message. Please contact Kathiravan directly at kathiravanvittopa717@gmail.com or via LinkedIn.',
        };
      }

      await sendThankYouEmail(sanitizedEmail, sanitizedName, sanitizedMessage);

      return {
        success: true,
        message: `Thank you, ${sanitizedName}! Your message has been forwarded to Kathiravan. He will get back to you at ${sanitizedEmail} as soon as possible.`,
      };
    } catch (error) {
      console.error('Error sending contact email:', error);
      return {
        success: false,
        message: 'There was an issue sending your message. Please contact Kathiravan directly at kathiravanvittopa717@gmail.com.',
      };
    }
  },
});

export const cappybotTools = {
  sendContactEmail: sendContactEmailTool,
};
