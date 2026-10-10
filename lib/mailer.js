import nodemailer from 'nodemailer';

export const ENQUIRY_RECIPIENT = process.env.ENQUIRY_TO_EMAIL || 'hello@ideatex.co.in';

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Emails a new lead to the Ideate X inbox. Never throws: a mail failure must not lose or fail the lead.
export async function notifyEnquiry(lead) {
  const mail = getTransporter();
  if (!mail) {
    console.warn('Enquiry email skipped: SMTP_HOST / SMTP_USER / SMTP_PASS are not configured.');
    return false;
  }

  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || 'Not provided'],
    ['Service', lead.service],
    ['Timeline', lead.timeline],
    ['Budget', lead.budget],
    ['Source', lead.source],
    ['Reference', lead.id],
  ].filter(([, v]) => v);

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${lead.message}`;
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join('')}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap"><b>Message:</b><br>${esc(lead.message)}</p>`;

  try {
    await mail.sendMail({
      from: process.env.SMTP_FROM || `"Ideate X Website" <${process.env.SMTP_USER}>`,
      to: ENQUIRY_RECIPIENT,
      replyTo: lead.email,
      subject: `New ${lead.type === 'contact' ? 'contact' : 'project'} enquiry from ${lead.name} (${lead.source})`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('Enquiry email failed:', err);
    return false;
  }
}
