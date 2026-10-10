import { NextResponse } from 'next/server';
import { notifyEnquiry } from '@/lib/mailer';
import { saveEnquiry, clean, isRateLimited } from '@/lib/enquiry';

function validateContactForm(data) {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Valid email address is required');
  } else if (data.email.length > 254) {
    errors.push('Email address is too long');
  }

  // Mobile number validation (if provided)
  if (data.phone && typeof data.phone === 'string' && data.phone.trim() !== '') {
    const cleanedPhone = data.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
      errors.push('Please enter a valid mobile number (7–15 digits)');
    }
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  } else if (data.message.trim().length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  if (data.projectType && !Array.isArray(data.projectType)) {
    errors.push('Project types must be an array of selected categories');
  }

  return errors;
}

export async function POST(request) {
  try {
    if (isRateLimited(request, 'contact')) {
      return NextResponse.json({ success: false, error: 'Too many submissions. Please try again in a few minutes.' }, { status: 429 });
    }

    const body = await request.json();

    // Honeypot: bots fill hidden fields. Pretend success without saving.
    if (body.website) {
      return NextResponse.json({ success: true, message: 'Thank you for your message.' });
    }

    const errors = validateContactForm(body);
    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const projectTypes = Array.isArray(body.projectType) ? body.projectType.map((t) => clean(t, 60)).filter(Boolean) : [];

    let lead;
    try {
      lead = saveEnquiry({
        type: 'contact',
        name: clean(body.name, 100),
        email: clean(body.email, 254).toLowerCase(),
        phone: body.phone ? clean(body.phone, 30) : '',
        service: projectTypes.length ? projectTypes.join(', ') : 'General Enquiry',
        message: clean(body.message, 5000),
        source: 'Website Contact Page',
        internalNotes: '',
      });
    } catch (e) {
      // Never report success if the lead was not stored
      console.error('Contact form: failed to save enquiry:', e);
      return NextResponse.json({ success: false, error: 'We could not save your message. Please try again or email us directly.' }, { status: 500 });
    }

    await notifyEnquiry(lead);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
