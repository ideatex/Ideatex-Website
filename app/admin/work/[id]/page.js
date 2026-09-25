"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SEOFields from "@/components/Admin/SEOFields";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { ArrowLeft, Save, Upload, Check, Star } from "lucide-react";

export default function WorkEditorPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [work, setWork] = useState({
    title: "",
    slug: "",
    category: "WEB APPLICATION",
    client: "",
    year: "2024",
    duration: "8 Weeks",
    role: "Full-Stack Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&q=80&fit=crop",
    coverBanner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&auto=format&q=80&fit=crop",
    liveUrl: "",
    shortDescription: "",
    fullDescription: "",
    tags: ["React", "Next.js", "PostgreSQL"],
    featured: true,
    order: 1,
    status: "published",
    seoTitle: "",
    seoDescription: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchWork();
    }
  }, [id, isNew]);

  const fetchWork = async () => {
    try {
      const res = await fetch(`/api/admin/work/${id}`);
      const json = await res.json();
      if (json.data) {
        setWork(json.data);
        setTagInput((json.data.tags || []).join(", "));
      }
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
      const url = isNew ? "/api/admin/work" : `/api/admin/work/${id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...work,
        tags: tagInput.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Work item saved successfully!");
      if (isNew && data.data?.id) {
        router.push(`/admin/work/${data.data.id}`);
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
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading project editor...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/work" className="admin-btn admin-btn-secondary admin-btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
          <div>
            <h1 className="admin-page-title">{isNew ? "Add New Project" : `Edit: ${work.title}`}</h1>
            <p className="admin-page-subtitle">Configure client platform details, tags, and media.</p>
          </div>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? "Saving..." : "Save Project"}</span>
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Project Overview</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Project Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={work.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setWork((prev) => ({
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
                  value={work.slug}
                  onChange={(e) => setWork((p) => ({ ...p, slug: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Category</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. WEB APPLICATION, SAAS & PWA"
                  value={work.category}
                  onChange={(e) => setWork((p) => ({ ...p, category: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Client Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={work.client || ""}
                  onChange={(e) => setWork((p) => ({ ...p, client: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-select"
                  value={work.status}
                  onChange={(e) => setWork((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="React Js, Supabase, PostgreSQL, Next Js"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Live Preview URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://..."
                  value={work.liveUrl || ""}
                  onChange={(e) => setWork((p) => ({ ...p, liveUrl: e.target.value }))}
                />
              </div>

              <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "24px" }}>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={work.featured}
                  onChange={(e) => setWork((p) => ({ ...p, featured: e.target.checked }))}
                />
                <label htmlFor="featuredCheck" style={{ fontSize: "0.85rem", color: "var(--admin-text-main)", cursor: "pointer" }}>
                  Feature on Homepage
                </label>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Short Description</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={work.shortDescription || ""}
                onChange={(e) => setWork((p) => ({ ...p, shortDescription: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Project Imagery</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
              {work.image && (
                <img
                  src={work.image}
                  alt={work.title}
                  style={{
                    width: 220,
                    height: 130,
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid var(--admin-border)",
                  }}
                />
              )}

              <div style={{ flex: 1, minWidth: 260 }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Thumbnail Image URL</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={work.image || ""}
                      onChange={(e) => setWork((p) => ({ ...p, image: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setMediaModalOpen(true)}
                    >
                      <Upload size={14} /> Library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SEOFields
          values={work}
          onChange={(field, value) => setWork((p) => ({ ...p, [field]: value }))}
        />

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Project"}</span>
          </button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setWork((p) => ({ ...p, image: url }))}
      />
    </div>
  );
}
