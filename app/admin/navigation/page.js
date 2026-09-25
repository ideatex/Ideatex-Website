"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Check, Navigation, Layout } from "lucide-react";

export default function AdminNavigationPage() {
  const [headerNav, setHeaderNav] = useState([]);
  const [footerGroups, setFooterGroups] = useState({ services: [], company: [], legal: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/navigation");
      const json = await res.json();
      if (json.navigation_items) setHeaderNav(json.navigation_items);
      if (json.footer_groups) setFooterGroups(json.footer_groups);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          navigation_items: headerNav,
          footer_groups: footerGroups,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Navigation and footer updated successfully.");
      setTimeout(() => setNotification(""), 4000);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addHeaderItem = () => {
    setHeaderNav((prev) => [
      ...prev,
      {
        id: `nav-${Date.now()}`,
        menuKey: "header",
        label: "New Link",
        url: "/",
        isExternal: false,
        openNewTab: false,
        order: prev.length + 1,
        isVisible: true,
      },
    ]);
  };

  const removeHeaderItem = (id) => {
    setHeaderNav((prev) => prev.filter((item) => item.id !== id));
  };

  const moveHeaderItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= headerNav.length) return;

    const updated = [...headerNav];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setHeaderNav(reordered);
  };

  const addFooterLink = (groupKey) => {
    setFooterGroups((prev) => ({
      ...prev,
      [groupKey]: [...(prev[groupKey] || []), { label: "New Link", url: "/" }],
    }));
  };

  const removeFooterLink = (groupKey, index) => {
    setFooterGroups((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey].filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading navigation...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Website Navigation & Footer</h1>
          <p className="admin-page-subtitle">
            Configure header menu items, dropdown links, and footer navigation columns.
          </p>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? "Saving..." : "Save Navigation"}</span>
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Navigation Section */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Main Header Menu</h2>
          <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addHeaderItem}>
            <Plus size={14} /> Add Header Link
          </button>
        </div>

        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {headerNav.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: "var(--admin-sidebar-bg)",
                border: "1px solid var(--admin-border)",
                borderRadius: "8px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                  disabled={idx === 0}
                  onClick={() => moveHeaderItem(idx, -1)}
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                  disabled={idx === headerNav.length - 1}
                  onClick={() => moveHeaderItem(idx, 1)}
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 160 }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Label (e.g. Services)"
                  value={item.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeaderNav((prev) =>
                      prev.map((it) => (it.id === item.id ? { ...it, label: val } : it))
                    );
                  }}
                />
              </div>

              <div style={{ flex: 1.5, minWidth: 200 }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="URL Path (/services)"
                  value={item.url}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeaderNav((prev) =>
                      prev.map((it) => (it.id === item.id ? { ...it, url: val } : it))
                    );
                  }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--admin-text-subtle)", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={item.openNewTab}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setHeaderNav((prev) =>
                      prev.map((it) => (it.id === item.id ? { ...it, openNewTab: checked } : it))
                    );
                  }}
                />
                New Tab
              </label>

              <button
                type="button"
                className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                onClick={() => removeHeaderItem(item.id)}
                title="Remove Link"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Footer Navigation Columns</h2>
        </div>

        <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          
          {/* Services Column */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "0.9rem", color: "var(--admin-text-main)" }}>SERVICES COLUMN</h4>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => addFooterLink("services")}
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(footerGroups.services || []).map((link, i) => (
                <div key={i} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={link.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.services];
                        s[i] = { ...s[i], label: val };
                        return { ...p, services: s };
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={link.url || link.to || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.services];
                        s[i] = { ...s[i], url: val, to: val };
                        return { ...p, services: s };
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                    onClick={() => removeFooterLink("services", i)}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "0.9rem", color: "var(--admin-text-main)" }}>COMPANY COLUMN</h4>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => addFooterLink("company")}
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(footerGroups.company || []).map((link, i) => (
                <div key={i} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={link.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.company];
                        s[i] = { ...s[i], label: val };
                        return { ...p, company: s };
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={link.url || link.to || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.company];
                        s[i] = { ...s[i], url: val, to: val };
                        return { ...p, company: s };
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                    onClick={() => removeFooterLink("company", i)}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "0.9rem", color: "var(--admin-text-main)" }}>LEGAL COLUMN</h4>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => addFooterLink("legal")}
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(footerGroups.legal || []).map((link, i) => (
                <div key={i} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={link.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.legal];
                        s[i] = { ...s[i], label: val };
                        return { ...p, legal: s };
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={link.url || link.to || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFooterGroups((p) => {
                        const s = [...p.legal];
                        s[i] = { ...s[i], url: val, to: val };
                        return { ...p, legal: s };
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                    onClick={() => removeFooterLink("legal", i)}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
