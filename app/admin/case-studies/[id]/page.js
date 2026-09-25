"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SEOFields from "@/components/Admin/SEOFields";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { ArrowLeft, Save, Upload, Check, Plus, Trash2, ExternalLink } from "lucide-react";

export default function CaseStudyEditorPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState("image"); // 'image' | 'coverBanner'
  const [notification, setNotification] = useState("");

  const [caseStudy, setCaseStudy] = useState({
    title: "",
    slug: "",
    subtitle: "",
    category: "Web Applications",
    client: "",
    year: "2024",
    duration: "10 Weeks",
    role: "Full-Stack Architecture",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&auto=format&q=80&fit=crop",
    coverBanner: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1920&h=1080&auto=format&q=80&fit=crop",
    liveUrl: "",
    summary: "",
    challenge: "",
    challengePoints: [""],
    approach: "",
    architecturePoints: [""],
    techStack: [
      { name: "Next.js", category: "Framework" },
      { name: "TypeScript", category: "Language" },
    ],
    keyFeatures: [
      { title: "", description: "" },
    ],
    metrics: [
      { value: "60 FPS", label: "Smooth Rendering", desc: "Constant 60 FPS achieved across 94% of tested mobile devices" },
      { value: "3.8 MB", label: "Optimized Bundle", desc: "97% reduction in payload" },
    ],
    testimonial: {
      quote: "",
      author: "",
      role: "",
    },
    status: "published",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    if (!isNew) {
      fetchCaseStudy();
    }
  }, [id, isNew]);

  const fetchCaseStudy = async () => {
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`);
      const json = await res.json();
      if (json.data) setCaseStudy(json.data);
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
      const url = isNew ? "/api/admin/case-studies" : `/api/admin/case-studies/${id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseStudy),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Case study saved successfully!");
      if (isNew && data.data?.id) {
        router.push(`/admin/case-studies/${data.data.id}`);
      } else {
        setTimeout(() => setNotification(""), 4000);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading case study editor...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/case-studies" className="admin-btn admin-btn-secondary admin-btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
          <div>
            <h1 className="admin-page-title">{isNew ? "Create Case Study" : `Edit: ${caseStudy.title}`}</h1>
            <p className="admin-page-subtitle">Detailed architecture case study breakdown and metrics.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!isNew && (
            <a
              href={`/case-studies/${caseStudy.slug}`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-secondary"
            >
              <ExternalLink size={14} /> View Live
            </a>
          )}
          <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Case Study"}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Core Info */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Case Study Overview</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Case Study Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={caseStudy.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setCaseStudy((prev) => ({
                      ...prev,
                      title,
                      slug: isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug,
                    }));
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">URL Slug</label>
                <input
                  type="text"
                  className="admin-input"
                  value={caseStudy.slug}
                  onChange={(e) => setCaseStudy((p) => ({ ...p, slug: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Subtitle / Executive Summary</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={caseStudy.subtitle || ""}
                onChange={(e) => setCaseStudy((p) => ({ ...p, subtitle: e.target.value }))}
              />
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Client</label>
                <input
                  type="text"
                  className="admin-input"
                  value={caseStudy.client || ""}
                  onChange={(e) => setCaseStudy((p) => ({ ...p, client: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Category</label>
                <input
                  type="text"
                  className="admin-input"
                  value={caseStudy.category || ""}
                  onChange={(e) => setCaseStudy((p) => ({ ...p, category: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-select"
                  value={caseStudy.status}
                  onChange={(e) => setCaseStudy((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge & Approach */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Challenge & Architecture Solution</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">The Engineering Challenge</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={caseStudy.challenge || ""}
                onChange={(e) => setCaseStudy((p) => ({ ...p, challenge: e.target.value }))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">The Architectural Approach</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={caseStudy.approach || ""}
                onChange={(e) => setCaseStudy((p) => ({ ...p, approach: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Imagery & Banners</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Thumbnail Image</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={caseStudy.image || ""}
                    onChange={(e) => setCaseStudy((p) => ({ ...p, image: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => {
                      setMediaTarget("image");
                      setMediaModalOpen(true);
                    }}
                  >
                    <Upload size={14} /> Library
                  </button>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Cover Banner URL</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={caseStudy.coverBanner || ""}
                    onChange={(e) => setCaseStudy((p) => ({ ...p, coverBanner: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => {
                      setMediaTarget("coverBanner");
                      setMediaModalOpen(true);
                    }}
                  >
                    <Upload size={14} /> Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SEOFields
          values={caseStudy}
          onChange={(field, value) => setCaseStudy((p) => ({ ...p, [field]: value }))}
        />

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Case Study"}</span>
          </button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setCaseStudy((p) => ({
            ...p,
            [mediaTarget]: url,
          }));
        }}
      />
    </div>
  );
}
