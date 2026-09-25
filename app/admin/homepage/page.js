"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Check, Save, Edit3, Eye, EyeOff, Layout } from "lucide-react";

export default function AdminHomepageCMS() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/homepage");
      const json = await res.json();
      if (json.data) setSections(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec))
    );
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Update orders
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setSections(reordered);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sections),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Homepage configuration saved successfully.");
      setTimeout(() => setNotification(""), 4000);
      setEditingId(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>
        Loading Homepage configuration...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Homepage Section Manager</h1>
          <p className="admin-page-subtitle">
            Toggle visibility, reorder sections, and customize headings and call-to-actions on the homepage.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleSaveAll}
          disabled={saving}
        >
          <Save size={16} />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {sections.map((section, idx) => {
          const isEditing = editingId === section.id;

          return (
            <div
              key={section.id}
              className="admin-card"
              style={{
                margin: 0,
                borderLeft: section.enabled ? "4px solid var(--admin-accent)" : "4px solid #334155",
                opacity: section.enabled ? 1 : 0.7,
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {/* Left title & badges */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "6px",
                      background: "var(--admin-hover-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      color: "var(--admin-text-subtle)",
                    }}
                  >
                    0{idx + 1}
                  </div>

                  <div>
                    <div style={{ fontWeight: "600", color: "var(--admin-text-main)", fontSize: "0.95rem" }}>
                      {section.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
                      Key: <span style={{ fontFamily: "monospace" }}>{section.sectionKey}</span>
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Enabled switch */}
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", cursor: "pointer" }}>
                    <span className="admin-switch">
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={() => handleToggle(section.id)}
                      />
                      <span className="admin-slider" />
                    </span>
                    <span style={{ color: section.enabled ? "var(--admin-success)" : "var(--admin-text-subtle)" }}>
                      {section.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </label>

                  {/* Reorder Buttons */}
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                      disabled={idx === sections.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  {/* Edit Toggle */}
                  <button
                    type="button"
                    className={`admin-btn ${isEditing ? "admin-btn-primary" : "admin-btn-secondary"} admin-btn-sm`}
                    onClick={() => setEditingId(isEditing ? null : section.id)}
                  >
                    <Edit3 size={14} /> {isEditing ? "Done" : "Configure"}
                  </button>
                </div>
              </div>

              {/* Inline Editor Drawer */}
              {isEditing && (
                <div
                  style={{
                    padding: "20px",
                    borderTop: "1px solid var(--admin-border)",
                    background: "rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Heading Text</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={section.heading || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSections((prev) =>
                            prev.map((s) => (s.id === section.id ? { ...s, heading: val } : s))
                          );
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Subheading / Description</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={section.description || section.subheading || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSections((prev) =>
                            prev.map((s) => (s.id === section.id ? { ...s, description: val, subheading: val } : s))
                          );
                        }}
                      />
                    </div>
                  </div>

                  {(section.ctaLabel || section.ctaPrimaryLabel || section.ctaUrl || section.ctaPrimaryUrl) && (
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary CTA Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={section.ctaPrimaryLabel || section.ctaLabel || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSections((prev) =>
                              prev.map((s) => (s.id === section.id ? { ...s, ctaLabel: val, ctaPrimaryLabel: val } : s))
                            );
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary CTA Link</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={section.ctaPrimaryUrl || section.ctaUrl || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSections((prev) =>
                              prev.map((s) => (s.id === section.id ? { ...s, ctaUrl: val, ctaPrimaryUrl: val } : s))
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
