import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { readDb } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  const db = readDb();

  const pages = db.pages || [];
  const services = db.services || [];
  const workItems = db.work_items || [];
  const caseStudies = db.case_studies || [];
  const insights = db.insights || [];
  const teamMembers = db.team_members || [];
  const enquiries = db.enquiries || [];
  const chatbotEnquiries = db.chatbot_enquiries || [];
  const media = db.media || [];
  const logs = db.activity_logs || [];

  const unreadEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const unreadChatbotEnquiries = chatbotEnquiries.filter((c) => c.status === 'new').length;

  const draftServices = services.filter((s) => s.status === 'draft').length;
  const draftInsights = insights.filter((i) => i.status === 'draft').length;
  const draftWork = workItems.filter((w) => w.status === 'draft').length;
  const draftCaseStudies = caseStudies.filter((c) => c.status === 'draft').length;

  const totalPublishedPages = pages.filter((p) => p.status === 'published').length;

  return NextResponse.json({
    kpi: {
      totalPages: pages.length,
      publishedPages: totalPublishedPages,
      totalServices: services.length,
      publishedServices: services.filter((s) => s.status === 'published').length,
      totalWorkItems: workItems.length,
      totalCaseStudies: caseStudies.length,
      totalInsights: insights.length,
      totalTeam: teamMembers.length,
      totalMedia: media.length,
      totalEnquiries: enquiries.length,
      unreadEnquiries,
      totalChatbotEnquiries: chatbotEnquiries.length,
      unreadChatbotEnquiries,
      totalDrafts: draftServices + draftInsights + draftWork + draftCaseStudies,
    },
    recentEnquiries: enquiries.slice(0, 5),
    recentChatbotEnquiries: chatbotEnquiries.slice(0, 5),
    recentActivityLogs: logs.slice(0, 8),
    recentContent: [
      ...services.slice(0, 2).map((s) => ({ ...s, type: 'Service' })),
      ...caseStudies.slice(0, 2).map((c) => ({ ...c, type: 'Case Study' })),
      ...insights.slice(0, 2).map((i) => ({ ...i, type: 'Insight' }))
    ]
  });
}
