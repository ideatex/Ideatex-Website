"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function SEOFields({ values = {}, onChange }) {
  const seoTitle = values.seoTitle || "";
  const seoDescription = values.seoDescription || "";
  const ogImage = values.ogImage || "";
  const canonicalUrl = values.canonicalUrl || "";

  const titleLen = seoTitle.length;
  const descLen = seoDescription.length;

  const isTitleGood = titleLen >= 40 && titleLen <= 65;
  const isDescGood = descLen >= 120 && descLen <= 165;

  return (
    <div
      style={{
        background: "var(--admin-hover-bg)",
        border: "1px solid var(--admin-border)",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "24px",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--admin-text-main)" }}>
          Search Engine Optimization (SEO)
        </h4>
        <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "var(--admin-text-muted)" }}>
          Configure how this page appears on Google search results and social media cards.
        </p>
      </div>

      <div className="admin-form-group">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label className="admin-form-label">SEO Meta Title</label>
          <span
            style={{
              fontSize: "0.75rem",
              color: isTitleGood ? "var(--admin-success)" : titleLen > 65 ? "var(--admin-danger)" : "var(--admin-text-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {titleLen}/65 characters (Recommended: 50–60)
          </span>
        </div>
        <input
          type="text"
          className="admin-input"
          placeholder="e.g. AI Agentic Development Services — Ideate X"
          value={seoTitle}
          onChange={(e) => onChange("seoTitle", e.target.value)}
        />
      </div>

      <div className="admin-form-group">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label className="admin-form-label">Meta Description</label>
          <span
            style={{
              fontSize: "0.75rem",
              color: isDescGood ? "var(--admin-success)" : descLen > 165 ? "var(--admin-danger)" : "var(--admin-text-subtle)",
            }}
          >
            {descLen}/165 characters (Recommended: 120–160)
          </span>
        </div>
        <textarea
          className="admin-textarea"
          rows={3}
          placeholder="Brief, high-impact summary for search engine snippets..."
          value={seoDescription}
          onChange={(e) => onChange("seoDescription", e.target.value)}
        />
      </div>

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">OpenGraph Social Share Image URL</label>
          <input
            type="text"
            className="admin-input"
            placeholder="/logo-ideatex.png or https://..."
            value={ogImage}
            onChange={(e) => onChange("ogImage", e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Canonical URL (Optional)</label>
          <input
            type="text"
            className="admin-input"
            placeholder="https://ideatex.co.in/services/..."
            value={canonicalUrl}
            onChange={(e) => onChange("canonicalUrl", e.target.value)}
          />
        </div>
      </div>

      {/* Google Preview Snippet Box */}
      <div
        style={{
          marginTop: "12px",
          padding: "14px 18px",
          background: "#ffffff",
          border: "1px solid var(--admin-border)",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: "0.7rem", color: "var(--admin-text-subtle)", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Google Search Preview
        </div>
        <div style={{ fontSize: "0.8rem", color: "#202124", marginBottom: "3px" }}>
          https://ideatex.co.in &rsaquo; {values.slug || "page"}
        </div>
        <div style={{ fontSize: "1.05rem", color: "#1a0dab", fontWeight: "400", lineHeight: 1.3, textDecoration: "underline" }}>
          {seoTitle || "Page Title Preview — Ideate X"}
        </div>
        <div style={{ fontSize: "0.85rem", color: "#4d5156", marginTop: "4px", lineHeight: 1.45 }}>
          {seoDescription || "Provide a meta description to see how your snippet will appear in search results."}
        </div>
      </div>
    </div>
  );
}
