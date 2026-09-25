import { NextResponse } from 'next/server';
import { processChatMessage } from '@/lib/chatbot-engine';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, action, history, qualificationState } = body;

    const response = await processChatMessage({
      message: message ? String(message).slice(0, 2000) : '',
      action: action || null,
      history: Array.isArray(history) ? history.slice(-20) : [],
      qualificationState: qualificationState || null,
    });

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (err) {
    console.error('Chatbot API error:', err);
    return NextResponse.json({
      success: false,
      text: "Something went wrong while processing that message. You can try again or reach out directly to the Ideate X team.",
      quickReplies: [
        { label: "Try Again", action: "start" },
        { label: "Contact Ideate X", text: "Contact Ideate X" },
      ],
      links: [{ label: "Contact Page", route: "/contact" }],
    }, { status: 500 });
  }
}
