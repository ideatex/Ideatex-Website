"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Layers,
  Briefcase,
  BookOpen,
  PenTool,
  MessageSquare,
  Bot,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Dashboard error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>
        Loading CMS metrics...
      </div>
    );
  }

  const kpi = data?.kpi || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const recentChatbot = data?.recentChatbotEnquiries || [];
  const recentActivity = data?.recentActivityLogs || [];

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Website Dashboard</h1>
          <p className="admin-page-subtitle">
            Single source of truth for Ideate X content, enquiries, and system telemetry.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/insights/new" className="admin-btn admin-btn-secondary admin-btn-sm">
            <Plus size={14} /> New Insight
          </Link>
          <Link href="/admin/services/new" className="admin-btn admin-btn-primary admin-btn-sm">
            <Plus size={14} /> New Service
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Published Pages</div>
            <div className="admin-kpi-value">{kpi.publishedPages || 0}</div>
            <div className="admin-kpi-sub">{kpi.totalPages || 0} total registered</div>
          </div>
          <div className="admin-kpi-icon">
            <FileText size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Active Services</div>
            <div className="admin-kpi-value">{kpi.publishedServices || 0}</div>
            <div className="admin-kpi-sub">{kpi.totalServices || 0} configured</div>
          </div>
          <div className="admin-kpi-icon">
            <Layers size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Portfolio Projects</div>
            <div className="admin-kpi-value">{kpi.totalWorkItems || 0}</div>
            <div className="admin-kpi-sub">{kpi.totalCaseStudies || 0} deep case studies</div>
          </div>
          <div className="admin-kpi-icon">
            <Briefcase size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Insights / Articles</div>
            <div className="admin-kpi-value">{kpi.totalInsights || 0}</div>
            <div className="admin-kpi-sub">Technical publications</div>
          </div>
          <div className="admin-kpi-icon">
            <PenTool size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Contact Enquiries</div>
            <div className="admin-kpi-value" style={{ color: kpi.unreadEnquiries > 0 ? "var(--admin-warning)" : "inherit" }}>
              {kpi.totalEnquiries || 0}
            </div>
            <div className="admin-kpi-sub">
              {kpi.unreadEnquiries || 0} pending review
            </div>
          </div>
          <div className="admin-kpi-icon">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Chatbot Leads</div>
            <div className="admin-kpi-value">{kpi.totalChatbotEnquiries || 0}</div>
            <div className="admin-kpi-sub">Captured through bot</div>
          </div>
          <div className="admin-kpi-icon">
            <Bot size={20} />
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
        
        {/* Recent Website Enquiries */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Project Enquiries</h2>
            <Link href="/admin/enquiries" className="admin-btn admin-btn-secondary admin-btn-sm">
              View All
            </Link>
          </div>
          <div className="admin-table-container">
            {recentEnquiries.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "var(--admin-text-subtle)", fontSize: "0.85rem" }}>
                No enquiries received yet.
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>
                        <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
                          {enq.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
                          {enq.email} {enq.phone ? `• ${enq.phone}` : ""}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem" }}>{enq.service || "General"}</span>
                      </td>
                      <td>
                        <span className={`admin-badge admin-badge-${enq.status}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">System Activity Logs</h2>
            <Link href="/admin/activity-logs" className="admin-btn admin-btn-secondary admin-btn-sm">
              Full Log
            </Link>
          </div>
          <div style={{ padding: "16px 20px" }}>
            {recentActivity.length === 0 ? (
              <div style={{ color: "var(--admin-text-subtle)", fontSize: "0.85rem" }}>
                No recent activity recorded.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {recentActivity.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid var(--admin-border)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.85rem", color: "var(--admin-text-main)", fontWeight: "500" }}>
                        {log.details || `${log.action} on ${log.entity}`}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", marginTop: "2px" }}>
                        by <span style={{ color: "var(--admin-text-muted)" }}>{log.userName}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--admin-text-subtle)", whiteSpace: "nowrap" }}>
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
