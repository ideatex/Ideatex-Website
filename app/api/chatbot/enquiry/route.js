import { NextResponse } from 'next/server';
import { insertItem } from '@/lib/cms-db';
import { notifyEnquiry } from '@/lib/mailer';
import { saveEnquiry, clean, isRateLimited, isValidPhone, EMAIL_RE } from '@/lib/enquiry';
import { extractPhone } from '@/lib/chatbot-engine';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (isRateLimited(request, 'chatbot-enquiry')) {
      return NextResponse.json({
        success: false,
        error: "Too many enquiries submitted. Please try again in a few minutes or use the contact page.",
      }, { status: 429 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      mobile,
      phoneNumber,
      contactNumber,
      service,
      project_description,
      target_users,
      platform,
      timeline,
      budget,
      conversation_history,
      conversation_id,
    } = body;

    if (!email || !EMAIL_RE.test(String(email).trim()) || String(email).length > 254) {
      return NextResponse.json({
        success: false,
        error: "A valid email address is required to submit your project enquiry.",
      }, { status: 400 });
    }

    // Determine phone from explicit fields, or fallback to scanning conversation history
    let resolvedPhone = phone || mobile || phoneNumber || contactNumber || "";
    resolvedPhone = String(resolvedPhone).trim();

    if (!resolvedPhone && Array.isArray(conversation_history)) {
      // Scan visitor messages for phone number
      for (const msg of conversation_history) {
        const text = typeof msg === 'string' ? msg : msg?.content || msg?.text || '';
        const found = extractPhone(text);
        if (found) {
          resolvedPhone = found;
          break;
        }
      }
    }

    if (resolvedPhone && !isValidPhone(resolvedPhone)) {
      return NextResponse.json({
        success: false,
        error: "Please enter a valid mobile number (7–15 digits) or leave it blank.",
      }, { status: 400 });
    }
    resolvedPhone = clean(resolvedPhone, 30);

    const leadId = `cbot-enq-${Date.now()}`;
    const visitorName = clean(name, 100) || "Website Visitor";
    const selectedService = clean(service, 120) || "General Enquiry";

    const requirements = [
      project_description ? `Project: ${clean(project_description, 2000)}` : null,
      target_users ? `Audience: ${clean(target_users, 300)}` : null,
      platform ? `Platform / Focus: ${clean(platform, 100)}` : null,
    ].filter(Boolean).join(" | ");

    const enquiryRecord = {
      id: leadId,
      conversationId: conversation_id || `conv-${Date.now()}`,
      visitorName,
      name: visitorName,
      email: clean(email, 254).toLowerCase(),
      phone: resolvedPhone,
      service: selectedService,
      project_description: clean(project_description, 2000) || "Chatbot Project Discovery Enquiry",
      requirements: requirements || "Enquiry captured via Ideate X Website Assistant",
      timeline: clean(timeline, 100) || "Flexible",
      budget: clean(budget, 100) || "To be discussed",
      conversationHistory: Array.isArray(conversation_history)
        ? conversation_history.slice(-15).map((m) => ({
            role: clean(m?.role, 20),
            content: clean(typeof m === 'string' ? m : m?.content || m?.text, 2000),
          }))
        : [],
      source: "Ideate X Website Chatbot",
      status: "new",
      internalNotes: "Lead captured via Ideate X interactive website assistant.",
      createdAt: new Date().toISOString(),
    };

    // 1. Insert into chatbot_enquiries
    insertItem('chatbot_enquiries', enquiryRecord);

    // 2. Also insert unified record into main enquiries collection (same shape as contact form)
    const unified = saveEnquiry({
      type: 'project',
      name: visitorName,
      email: enquiryRecord.email,
      phone: enquiryRecord.phone,
      service: selectedService,
      message: `[CHATBOT LEAD]
${requirements}
Timeline: ${enquiryRecord.timeline}
Budget: ${enquiryRecord.budget}`,
      timeline: enquiryRecord.timeline,
      budget: enquiryRecord.budget,
      source: 'Website Chatbot Assistant',
      internalNotes: `Auto-captured via Chatbot session (${enquiryRecord.conversationId}).`,
    });

    await notifyEnquiry(unified);

    console.log("✅ Chatbot project enquiry saved to CMS:", enquiryRecord);

    return NextResponse.json({
      success: true,
      enquiryId: leadId,
      message: "Your project enquiry has been sent to the Ideate X team. We will review the details and get back to you shortly.",
    });
  } catch (err) {
    console.error("Chatbot enquiry submission error:", err);
    return NextResponse.json({
      success: false,
      error: "Internal server error while saving enquiry. Please reach out to hello@ideatex.co.in directly.",
    }, { status: 500 });
  }
}
