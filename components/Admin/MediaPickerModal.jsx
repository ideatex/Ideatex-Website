"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Check, Search, Image as ImageIcon } from "lucide-react";

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "Select Image from Media Library"
}) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

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

  const handleFileUpload = async (e) => {
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
      const json = await res.json();
      if (json.data) {
        setMediaList((prev) => [json.data, ...prev]);
        setSelectedUrl(json.data.url);
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 750, height: "80vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <div className="admin-modal-header">
          <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--admin-text-main)" }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--admin-text-subtle)", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Upload Bar */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--admin-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
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
              placeholder="Search media files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <label className="admin-btn admin-btn-primary admin-btn-sm" style={{ cursor: "pointer" }}>
            <Upload size={14} />
            <span>{uploading ? "Uploading..." : "Upload New Image"}</span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Media Grid */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "14px",
            alignContent: "start",
          }}
        >
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--admin-text-subtle)" }}>
              Loading media library...
            </div>
          ) : filteredMedia.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--admin-text-subtle)" }}>
              No images found. Upload an image to get started.
            </div>
          ) : (
            filteredMedia.map((media) => {
              const isSelected = selectedUrl === media.url;
              return (
                <div
                  key={media.id || media.url}
                  onClick={() => setSelectedUrl(media.url)}
                  style={{
                    border: `2px solid ${isSelected ? "var(--admin-accent)" : "var(--admin-card-border)"}`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    background: "var(--admin-sidebar-bg)",
                    aspectRatio: "1/1",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={media.url}
                    alt={media.altText || media.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        background: "var(--admin-accent)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={14} />
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.7)",
                      padding: "4px 6px",
                      fontSize: "0.65rem",
                      color: "#fff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {media.name}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="admin-modal-footer">
          <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            disabled={!selectedUrl}
            onClick={() => {
              onSelect(selectedUrl);
              onClose();
            }}
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}
