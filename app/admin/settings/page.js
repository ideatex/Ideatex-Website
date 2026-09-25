"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Settings, Building, Mail, Phone, MapPin, Share2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    name: "Ideate X",
    legalName: "Ideate X",
    tagline: "Software, Products & Digital Growth",
    email: "hello@ideatex.co.in",
    phone: "+91 8760007900 / +91 7305905661",
    address: {
      line1: "Innov8 Millenia, 2nd Floor, Campus-1a",
      line2: "MGR Main Rd, Perungudi",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600096",
      country: "India",
      full: "Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096",
    },
    socialLinks: {
      linkedin: "https://linkedin.com/company/ideatex",
      twitter: "https://twitter.com/ideatex",
      github: "https://github.com/ideatex",
      instagram: "https://instagram.com/ideatex",
    },
    branding: {
      logoUrl: "/logo-ideatex.png",
      faviconUrl: "/favicon.ico",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.data) setSettings(json.data);
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
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Site settings saved successfully.");
      setTimeout(() => setNotification(""), 4000);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--admin-text-subtle)", textAlign: "center" }}>Loading site settings...</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Settings & Company Profile</h1>
          <p className="admin-page-subtitle">
            Configure global website name, official contact details, addresses, and social links.
          </p>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Brand Information */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Brand & Entity Details</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Brand Display Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.name || ""}
                  onChange={(e) => setSettings((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Legal Company Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.legalName || ""}
                  onChange={(e) => setSettings((p) => ({ ...p, legalName: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Tagline / Mission</label>
              <input
                type="text"
                className="admin-input"
                value={settings.tagline || ""}
                onChange={(e) => setSettings((p) => ({ ...p, tagline: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Contact Information</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Primary Public Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.email || ""}
                  onChange={(e) => setSettings((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Public Phone Number(s)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.phone || ""}
                  onChange={(e) => setSettings((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Full Office Address</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={settings.address?.full || ""}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    address: { ...p.address, full: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Social Channels</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">LinkedIn URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      socialLinks: { ...p.socialLinks, linkedin: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Twitter / X URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      socialLinks: { ...p.socialLinks, twitter: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">GitHub URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.socialLinks?.github || ""}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      socialLinks: { ...p.socialLinks, github: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Instagram URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      socialLinks: { ...p.socialLinks, instagram: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
