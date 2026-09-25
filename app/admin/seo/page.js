"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Save, Check, AlertTriangle, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminSeoPage() {
  const [seoData, setSeoData] = useState({
    defaultTitle: "Ideate X — Software, Products & Digital Growth",
    defaultDescription: "We design, build and grow software products, digital platforms and business systems.",
    defaultOgImage: "/logo-ideatex.png",
    canonicalBase: "https://ideatex.co.in",
    robots: "index, follow",
    sitemapEnabled: true,
  });

  const [warnings, setWarnings] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      const json = await res.json();
      if (json.seo_metadata) setSeoData(json.seo_metadata);
      if (json.warnings) setWarnings(json.warnings);
      if (json.summary) setSummary(json.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Global SEO settings saved.");
      setTimeout(() => setNotification(""), 4000);
      fetchSeo();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Running SEO audit...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO Management & Audit</h1>
          <p className="admin-page-subtitle">
            Configure global search metadata and inspect automated warnings for missing titles, descriptions, and alt tags.
          </p>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Audit Summary KPIs */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Audited Content Pages</div>
            <div className="admin-kpi-value">{summary.totalAudited || 0}</div>
            <div className="admin-kpi-sub">Pages, services, case studies, insights</div>
          </div>
          <div className="admin-kpi-icon">
            <Search size={20} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">High Priority Issues</div>
            <div className="admin-kpi-value" style={{ color: summary.warningCount > 0 ? "var(--admin-danger)" : "var(--admin-success)" }}>
              {summary.warningCount || 0}
            </div>
            <div className="admin-kpi-sub">Missing meta descriptions or titles</div>
          </div>
          <div className="admin-kpi-icon">
            <AlertTriangle size={20} style={{ color: summary.warningCount > 0 ? "var(--admin-danger)" : "var(--admin-success)" }} />
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Notices & Recommendations</div>
            <div className="admin-kpi-value" style={{ color: "var(--admin-warning)" }}>
              {summary.noticeCount || 0}
            </div>
            <div className="admin-kpi-sub">Custom OG tags & alt recommendations</div>
          </div>
          <div className="admin-kpi-icon">
            <AlertCircle size={20} />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
        
        {/* Global SEO Settings Form */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Default Global SEO Meta</h2>
          </div>
          <form onSubmit={handleSave} style={{ padding: "20px" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Default Site Title</label>
              <input
                type="text"
                className="admin-input"
                value={seoData.defaultTitle || ""}
                onChange={(e) => setSeoData((p) => ({ ...p, defaultTitle: e.target.value }))}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Default Meta Description</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={seoData.defaultDescription || ""}
                onChange={(e) => setSeoData((p) => ({ ...p, defaultDescription: e.target.value }))}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Canonical URL Base</label>
              <input
                type="text"
                className="admin-input"
                placeholder="https://ideatex.co.in"
                value={seoData.canonicalBase || ""}
                onChange={(e) => setSeoData((p) => ({ ...p, canonicalBase: e.target.value }))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Robots Directive</label>
              <select
                className="admin-select"
                value={seoData.robots || "index, follow"}
                onChange={(e) => setSeoData((p) => ({ ...p, robots: e.target.value }))}
              >
                <option value="index, follow">index, follow (Standard Indexing)</option>
                <option value="noindex, nofollow">noindex, nofollow (Disallow Indexing)</option>
                <option value="noindex, follow">noindex, follow</option>
              </select>
            </div>

            <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
              <input
                type="checkbox"
                id="sitemapToggle"
                checked={seoData.sitemapEnabled}
                onChange={(e) => setSeoData((p) => ({ ...p, sitemapEnabled: e.target.checked }))}
              />
              <label htmlFor="sitemapToggle" style={{ fontSize: "0.85rem", color: "var(--admin-text-main)", cursor: "pointer" }}>
                Enable Dynamic XML Sitemap Generation
              </label>
            </div>

            <div style={{ marginTop: "16px" }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                <Save size={14} /> Save Global Defaults
              </button>
            </div>
          </form>
        </div>

        {/* Real-Time Automated SEO Health List */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">SEO Health & Audit Warnings</h2>
          </div>
          <div style={{ padding: "16px 20px" }}>
            {warnings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px", color: "var(--admin-success)" }}>
                <ShieldCheck size={36} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontWeight: "600" }}>All audited pages passed SEO checks!</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {warnings.map((warn, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 14px",
                      background: "var(--admin-sidebar-bg)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--admin-text-main)" }}>
                        {warn.entity}: {warn.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: warn.level === "warning" ? "var(--admin-danger)" : "var(--admin-warning)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "2px",
                        }}
                      >
                        <AlertCircle size={12} /> {warn.issue}
                      </div>
                    </div>

                    <Link
                      href={
                        warn.entity === "Page"
                          ? "/admin/pages"
                          : warn.entity === "Service"
                          ? `/admin/services/${warn.id}`
                          : warn.entity === "Insight"
                          ? `/admin/insights/${warn.id}`
                          : "/admin/pages"
                      }
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                    >
                      Fix
                    </Link>
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
