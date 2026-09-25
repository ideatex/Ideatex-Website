"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SEOFields from "@/components/Admin/SEOFields";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { ArrowLeft, Save, Upload, Plus, Trash2, Check, ExternalLink } from "lucide-react";

export default function ServiceEditorPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [service, setService] = useState({
    title: "",
    slug: "",
    category: "Engineering",
    tagline: "",
    heroDescription: "",
    shortDescription: "",
    status: "published",
    order: 1,
    image: {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&auto=format&q=85&fit=crop",
      alt: "",
    },
    overview: {
      headline: "",
      body: "",
      highlights: [""],
    },
    deliverables: [
      { title: "", description: "", points: [""] },
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "React"] },
    ],
    process: [
      { step: "01", title: "", desc: "" },
    ],
    faqs: [
      { id: 1, question: "", answer: "" },
    ],
    seoTitle: "",
    seoDescription: "",
    ogImage: "/logo-ideatex.png",
  });

  useEffect(() => {
    if (!isNew) {
      fetchService();
    }
  }, [id, isNew]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/admin/services/${id}`);
      const json = await res.json();
      if (json.data) setService(json.data);
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
      const url = isNew ? "/api/admin/services" : `/api/admin/services/${id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Service saved successfully!");
      if (isNew && data.data?.id) {
        router.push(`/admin/services/${data.data.id}`);
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
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading service editor...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/services" className="admin-btn admin-btn-secondary admin-btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
          <div>
            <h1 className="admin-page-title">{isNew ? "Create Service" : `Edit: ${service.title}`}</h1>
            <p className="admin-page-subtitle">Configure deliverables, process steps, tech stack, and media.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!isNew && (
            <a
              href={`/services/${service.slug}`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-secondary"
            >
              <ExternalLink size={14} /> View Live
            </a>
          )}
          <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Service"}</span>
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
        {/* Basic Information */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Basic Information</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Service Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={service.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setService((prev) => ({
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
                  value={service.slug}
                  onChange={(e) => setService((p) => ({ ...p, slug: e.target.value }))}
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
                  value={service.category}
                  onChange={(e) => setService((p) => ({ ...p, category: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Publishing Status</label>
                <select
                  className="admin-select"
                  value={service.status}
                  onChange={(e) => setService((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Display Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={service.order || 1}
                  onChange={(e) => setService((p) => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Tagline</label>
              <input
                type="text"
                className="admin-input"
                placeholder="High impact one-liner..."
                value={service.tagline}
                onChange={(e) => setService((p) => ({ ...p, tagline: e.target.value }))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Hero Description</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={service.heroDescription}
                onChange={(e) => setService((p) => ({ ...p, heroDescription: e.target.value }))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Short Description (for cards / home)</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={service.shortDescription}
                onChange={(e) => setService((p) => ({ ...p, shortDescription: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Featured Image & Media */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Featured Image</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
              {service.image?.src && (
                <img
                  src={service.image.src}
                  alt={service.image.alt || "Service image"}
                  style={{
                    width: 240,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid var(--admin-border)",
                  }}
                />
              )}

              <div style={{ flex: 1, minWidth: 260 }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Image URL</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={service.image?.src || ""}
                      onChange={(e) =>
                        setService((p) => ({
                          ...p,
                          image: { ...p.image, src: e.target.value },
                        }))
                      }
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

                <div className="admin-form-group">
                  <label className="admin-form-label">Image Alt Text (SEO)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Descriptive alt text for accessibility and search..."
                    value={service.image?.alt || ""}
                    onChange={(e) =>
                      setService((p) => ({
                        ...p,
                        image: { ...p.image, alt: e.target.value },
                      }))
                    }
                  />
                  {!service.image?.alt && (
                    <div className="admin-form-hint" style={{ color: "var(--admin-warning)" }}>
                      ⚠️ Missing alt text will trigger an SEO warning.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Detailed Overview</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Overview Headline</label>
              <input
                type="text"
                className="admin-input"
                value={service.overview?.headline || ""}
                onChange={(e) =>
                  setService((p) => ({
                    ...p,
                    overview: { ...p.overview, headline: e.target.value },
                  }))
                }
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Overview Body</label>
              <textarea
                className="admin-textarea"
                rows={4}
                value={service.overview?.body || ""}
                onChange={(e) =>
                  setService((p) => ({
                    ...p,
                    overview: { ...p.overview, body: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* SEO Configuration */}
        <SEOFields
          values={service}
          onChange={(field, value) => setService((p) => ({ ...p, [field]: value }))}
        />

        {/* Bottom Save Button */}
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Service"}</span>
          </button>
        </div>
      </form>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setService((p) => ({
            ...p,
            image: { ...p.image, src: url },
          }));
        }}
      />
    </div>
  );
}
