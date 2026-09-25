"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SEOFields from "@/components/Admin/SEOFields";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { ArrowLeft, Save, Upload, Check, ExternalLink, Bold, Italic, Code, List, Heading } from "lucide-react";

export default function InsightEditorPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isNew = id === "new";

  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [insight, setInsight] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    category: "ENGINEERING",
    content: "",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&q=80&fit=crop",
    author: {
      name: "Ideate X Team",
      role: "Systems Architect",
      initials: "IX",
      avatar: "/logo-ideatex.png",
    },
    tags: ["Engineering", "Architecture"],
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchInsight();
    }
  }, [id, isNew]);

  const fetchInsight = async () => {
    try {
      const res = await fetch(`/api/admin/insights/${id}`);
      const json = await res.json();
      if (json.data) {
        setInsight(json.data);
        setTagInput((json.data.tags || []).join(", "));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (statusOverride = null) => {
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/insights" : `/api/admin/insights/${id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...insight,
        status: statusOverride || insight.status,
        tags: tagInput.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Insight article saved successfully!");
      if (isNew && data.data?.id) {
        router.push(`/admin/insights/${data.data.id}`);
      } else {
        if (statusOverride) setInsight((p) => ({ ...p, status: statusOverride }));
        setTimeout(() => setNotification(""), 4000);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("content-editor");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setInsight((p) => ({ ...p, content: newText }));
  };

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading insight editor...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/insights" className="admin-btn admin-btn-secondary admin-btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
          <div>
            <h1 className="admin-page-title">{isNew ? "Write New Insight" : `Edit: ${insight.title}`}</h1>
            <p className="admin-page-subtitle">Draft or publish technical engineering insights.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!isNew && (
            <a
              href={`/blog/${insight.slug}`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-secondary"
            >
              <ExternalLink size={14} /> Preview Live
            </a>
          )}
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => handleSave("draft")}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => handleSave("published")}
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? "Saving..." : "Publish Insight"}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Grid: Editor on Left, Meta Sidebar on Right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
        
        {/* Left: Article Writing Area */}
        <div>
          <div className="admin-card">
            <div style={{ padding: "20px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Article Title</label>
                <input
                  type="text"
                  className="admin-input"
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                  placeholder="Enter a descriptive technical title..."
                  value={insight.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setInsight((prev) => ({
                      ...prev,
                      title,
                      slug: isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug,
                    }));
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Subtitle / Subheading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Supporting premise or key takeaway..."
                  value={insight.subtitle || ""}
                  onChange={(e) => setInsight((p) => ({ ...p, subtitle: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Article Excerpt (for preview cards)</label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  placeholder="Brief summary appearing in blog feeds..."
                  value={insight.excerpt || ""}
                  onChange={(e) => setInsight((p) => ({ ...p, excerpt: e.target.value }))}
                />
              </div>

              {/* Rich Text Toolbar */}
              <div className="admin-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label className="admin-form-label" style={{ margin: 0 }}>Article Content</label>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => insertFormatting("### ", "")}
                      title="Heading"
                    >
                      <Heading size={12} /> H3
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => insertFormatting("**", "**")}
                      title="Bold"
                    >
                      <Bold size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => insertFormatting("*", "*")}
                      title="Italic"
                    >
                      <Italic size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => insertFormatting("```\n", "\n```")}
                      title="Code Block"
                    >
                      <Code size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => insertFormatting("- ", "")}
                      title="Bullet List"
                    >
                      <List size={12} />
                    </button>
                  </div>
                </div>

                <textarea
                  id="content-editor"
                  className="admin-textarea"
                  rows={16}
                  style={{ fontFamily: "inherit", lineHeight: 1.6 }}
                  placeholder="Write your article body here in Markdown..."
                  value={insight.content || ""}
                  onChange={(e) => setInsight((p) => ({ ...p, content: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <SEOFields
            values={insight}
            onChange={(field, value) => setInsight((p) => ({ ...p, [field]: value }))}
          />
        </div>

        {/* Right Sidebar: Meta Configuration */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Publishing Card */}
          <div className="admin-card" style={{ margin: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Publishing Settings</h3>
            </div>
            <div style={{ padding: "16px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-select"
                  value={insight.status}
                  onChange={(e) => setInsight((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">URL Slug</label>
                <input
                  type="text"
                  className="admin-input"
                  value={insight.slug}
                  onChange={(e) => setInsight((p) => ({ ...p, slug: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Category</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="ENGINEERING, AI & AUTOMATION..."
                  value={insight.category}
                  onChange={(e) => setInsight((p) => ({ ...p, category: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Estimated Read Time</label>
                <input
                  type="text"
                  className="admin-input"
                  value={insight.readTime || "5 min read"}
                  onChange={(e) => setInsight((p) => ({ ...p, readTime: e.target.value }))}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
              </div>

              <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  id="featuredPostCheck"
                  checked={insight.featured}
                  onChange={(e) => setInsight((p) => ({ ...p, featured: e.target.checked }))}
                />
                <label htmlFor="featuredPostCheck" style={{ fontSize: "0.85rem", color: "var(--admin-text-main)", cursor: "pointer" }}>
                  Feature on Blog Hero
                </label>
              </div>
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="admin-card" style={{ margin: 0 }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">Featured Image</h3>
            </div>
            <div style={{ padding: "16px" }}>
              {insight.image && (
                <img
                  src={insight.image}
                  alt={insight.title}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    border: "1px solid var(--admin-border)",
                  }}
                />
              )}

              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  className="admin-input"
                  value={insight.image || ""}
                  onChange={(e) => setInsight((p) => ({ ...p, image: e.target.value }))}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setMediaModalOpen(true)}
                >
                  <Upload size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setInsight((p) => ({ ...p, image: url }))}
      />
    </div>
  );
}
