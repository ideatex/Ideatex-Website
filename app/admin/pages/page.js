"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import SEOFields from "@/components/Admin/SEOFields";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { Plus, Edit2, Trash2, Globe, Check, AlertCircle } from "lucide-react";

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const json = await res.json();
      if (json.data) setPages(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page) => {
    setEditingPage({ ...page });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingPage({
      title: "",
      slug: "",
      template: "standard",
      status: "draft",
      content: "",
      featuredImage: "",
      seoTitle: "",
      seoDescription: "",
      ogImage: "/logo-ideatex.png",
      canonicalUrl: "",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingPage.id ? `/api/admin/pages/${editingPage.id}` : "/api/admin/pages";
      const method = editingPage.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Page saved successfully.");
      setTimeout(() => setNotification(""), 4000);
      setShowModal(false);
      fetchPages();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/pages/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setDeleteId(null);
      fetchPages();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Page Title",
      accessor: "title",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
            {item.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", fontFamily: "monospace" }}>
            /{item.slug === "home" ? "" : item.slug}
          </div>
        </div>
      ),
    },
    {
      header: "Template",
      accessor: "template",
      render: (item) => (
        <span style={{ textTransform: "capitalize", fontSize: "0.8rem" }}>
          {item.template}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className={`admin-badge admin-badge-${item.status}`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Author",
      accessor: "author",
    },
    {
      header: "Actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href={`/${item.slug === "home" ? "" : item.slug}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="View Page"
          >
            <Globe size={13} />
          </a>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => handleEdit(item)}
            title="Edit"
          >
            <Edit2 size={13} /> Edit
          </button>
          {!["page-home", "page-about", "page-services", "page-contact"].includes(item.id) && (
            <button
              type="button"
              className="admin-btn admin-btn-danger admin-btn-sm"
              onClick={() => setDeleteId(item.id)}
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Website Pages</h1>
          <p className="admin-page-subtitle">
            Manage public pages, templates, publishing status, and SEO metadata.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleCreate}
        >
          <Plus size={16} /> Create Page
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <DataTable
        columns={columns}
        data={pages}
        searchPlaceholder="Search pages by title or slug..."
        filterKey="status"
        filterOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ]}
      />

      {/* Edit / Create Modal */}
      {showModal && editingPage && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="admin-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 680 }}
          >
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                {editingPage.id ? `Edit Page: ${editingPage.title}` : "Create New Page"}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Page Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingPage.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditingPage((prev) => ({
                          ...prev,
                          title,
                          slug: prev.id ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
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
                      value={editingPage.slug}
                      onChange={(e) => setEditingPage((p) => ({ ...p, slug: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      className="admin-select"
                      value={editingPage.status}
                      onChange={(e) => setEditingPage((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="published">Published (Visible on site)</option>
                      <option value="draft">Draft (Hidden)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Template</label>
                    <select
                      className="admin-select"
                      value={editingPage.template}
                      onChange={(e) => setEditingPage((p) => ({ ...p, template: e.target.value }))}
                    >
                      <option value="standard">Standard Content</option>
                      <option value="landing">Landing Page</option>
                      <option value="custom">Custom Template</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Page Content / Summary</label>
                  <textarea
                    className="admin-textarea"
                    rows={4}
                    value={editingPage.content || ""}
                    onChange={(e) => setEditingPage((p) => ({ ...p, content: e.target.value }))}
                  />
                </div>

                {/* SEO Fields Component */}
                <SEOFields
                  values={editingPage}
                  onChange={(field, value) =>
                    setEditingPage((p) => ({ ...p, [field]: value }))
                  }
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Page"
        message="Are you sure you want to delete this page? This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
