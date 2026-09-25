import { NextResponse } from 'next/server';
import { insertItem, logActivity, readDb } from '@/lib/cms-db';
import { extractPhone } from '@/lib/chatbot-engine';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
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

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
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

    const leadId = `cbot-enq-${Date.now()}`;
    const visitorName = name && String(name).trim().length > 0 ? String(name).trim() : "Website Visitor";
    const selectedService = service || "Custom Software / Web / App Development";

    const requirements = [
      project_description ? `Project: ${project_description}` : null,
      target_users ? `Target Users: ${target_users}` : null,
      platform ? `Platform: ${platform}` : null,
    ].filter(Boolean).join(" | ");

    const enquiryRecord = {
      id: leadId,
      conversationId: conversation_id || `conv-${Date.now()}`,
      visitorName,
      name: visitorName,
      email: String(email).trim().toLowerCase(),
      phone: resolvedPhone,
      service: selectedService,
      project_description: project_description || "Chatbot Project Discovery Enquiry",
      requirements: requirements || "Enquiry captured via Ideate X Website Assistant",
      timeline: timeline || "Flexible",
      budget: budget || "Discuss with Engineering Team",
      conversationHistory: Array.isArray(conversation_history) ? conversation_history.slice(-15) : [],
      source: "Ideate X Website Chatbot",
      status: "new",
      internalNotes: "Lead captured via Ideate X interactive website assistant.",
      createdAt: new Date().toISOString(),
    };

    // 1. Insert into chatbot_enquiries
    insertItem('chatbot_enquiries', enquiryRecord);

    // 2. Also insert unified record into main enquiries collection
    insertItem('enquiries', {
      type: 'project',
      name: visitorName,
      email: enquiryRecord.email,
      phone: enquiryRecord.phone,
      company: '',
      service: selectedService,
      message: `[CHATBOT LEAD]\n${requirements}\nTimeline: ${enquiryRecord.timeline}\nBudget: ${enquiryRecord.budget}`,
      timeline: enquiryRecord.timeline,
      budget: enquiryRecord.budget,
      source: 'Website Chatbot Assistant',
      status: 'new',
      internalNotes: `Auto-captured via Chatbot session (${enquiryRecord.conversationId}).`,
      createdAt: new Date().toISOString(),
    });

    logActivity(
      'visitor',
      visitorName,
      'CHATBOT_LEAD_SUBMITTED',
      'ChatbotEnquiry',
      leadId,
      `New project lead submitted via chatbot: ${visitorName} (${enquiryRecord.email}) for ${selectedService}`
    );

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
