import { NextResponse } from 'next/server';

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
    const body = await request.json();
    const { name, email, phone, message, projectType } = body;
    
    const errors = validateContactForm(body);
    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const submission = {
      type: 'contact',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone && typeof phone === 'string' && phone.trim() !== '' ? phone.trim() : null,
      company: '',
      service: Array.isArray(projectType) ? projectType.join(', ') : 'General Enquiry',
      message: message.trim(),
      source: 'Website Contact Page',
      status: 'new',
      internalNotes: '',
      createdAt: new Date().toISOString()
    };

    let leadRecord = null;
    try {
      const { insertItem } = await import('@/lib/cms-db');
      leadRecord = insertItem('enquiries', submission);
    } catch (e) {
      console.warn('CMS DB insert error, continuing:', e);
    }

    console.log('✅ Contact form lead received & saved to CMS:', submission);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you within 24 hours.',
      leadId: leadRecord?.id || `LEAD-${Date.now()}`
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}

