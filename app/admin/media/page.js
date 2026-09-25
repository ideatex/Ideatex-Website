"use client";

import React, { useState, useEffect } from "react";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Upload, Search, Copy, Check, Trash2, Edit3, Image as ImageIcon, AlertTriangle } from "lucide-react";

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      if (json.data) setMediaList(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", file.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setNotification("Image uploaded successfully.");
      setTimeout(() => setNotification(""), 4000);
      fetchMedia();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveMeta = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/media/${editingMedia.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMedia),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setNotification("Media details updated.");
      setTimeout(() => setNotification(""), 4000);
      setEditingMedia(null);
      fetchMedia();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/media/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Media file deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchMedia();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filtered = mediaList.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Library</h1>
          <p className="admin-page-subtitle">
            Centralized repository for project screenshots, illustrations, emblems, and team photography.
          </p>
        </div>

        <label className="admin-btn admin-btn-primary" style={{ cursor: "pointer" }}>
          <Upload size={16} />
          <span>{uploading ? "Uploading..." : "Upload Images"}</span>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="admin-card" style={{ marginBottom: "24px" }}>
        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ position: "relative", minWidth: 260 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--admin-text-subtle)",
              }}
            />
            <input
              type="text"
              className="admin-input"
              style={{ paddingLeft: 30 }}
              placeholder="Search images by name or alt text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ fontSize: "0.85rem", color: "var(--admin-text-subtle)" }}>
            {filtered.length} total media assets
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--admin-text-subtle)" }}>
          Loading media library...
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty-state">
            <ImageIcon className="admin-empty-icon" />
            <div className="admin-empty-title">No media files found</div>
            <div className="admin-empty-text">
              Upload your first image to populate the media library.
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((item) => {
            const hasAlt = !!item.altText;

            return (
              <div
                key={item.id || item.url}
                className="admin-card"
                style={{
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Image Box */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    background: "var(--admin-hover-bg)",
                    borderBottom: "1px solid var(--admin-border)",
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.altText || item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {!hasAlt && (
                    <div
                      title="Missing Alt Text (SEO Warning)"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(245, 158, 11, 0.9)",
                        color: "#000",
                        padding: "3px 6px",
                        borderRadius: "4px",
                        fontSize: "0.65rem",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <AlertTriangle size={10} /> No Alt Text
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        color: "var(--admin-text-main)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </div>

                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", lineHeight: 1.4 }}>
                      {item.altText ? (
                        <span>Alt: {item.altText}</span>
                      ) : (
                        <span style={{ color: "var(--admin-warning)" }}>Alt text missing</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      paddingTop: "10px",
                      borderTop: "1px solid var(--admin-border)",
                    }}
                  >
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => handleCopy(item.url, item.id)}
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedId === item.id ? "Copied" : "Copy URL"}</span>
                    </button>

                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                        onClick={() => setEditingMedia(item)}
                        title="Edit Metadata"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                        onClick={() => setDeleteId(item.id)}
                        title="Delete Image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingMedia && (
        <div className="admin-modal-backdrop" onClick={() => setEditingMedia(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Edit Image Metadata</h3>
            </div>

            <form onSubmit={handleSaveMeta}>
              <div className="admin-modal-body">
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <img
                    src={editingMedia.url}
                    alt={editingMedia.name}
                    style={{
                      maxHeight: 160,
                      maxWidth: "100%",
                      borderRadius: "6px",
                      border: "1px solid var(--admin-border)",
                    }}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Alt Text (Accessibility & SEO)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Describe image clearly..."
                    value={editingMedia.altText || ""}
                    onChange={(e) => setEditingMedia((p) => ({ ...p, altText: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Caption / Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingMedia.caption || ""}
                    onChange={(e) => setEditingMedia((p) => ({ ...p, caption: e.target.value }))}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingMedia(null)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Image"
        message="Are you sure you want to delete this media asset?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
