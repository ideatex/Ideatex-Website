"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Globe, Check, PenTool } from "lucide-react";

export default function AdminInsightsListPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/insights");
      const json = await res.json();
      if (json.data) setInsights(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/insights/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Insight deleted successfully.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchInsights();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Article Title",
      accessor: "title",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 44,
                height: 44,
                borderRadius: "6px",
                objectFit: "cover",
                background: "var(--admin-hover-bg)",
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)", maxWidth: 360 }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", fontFamily: "monospace" }}>
              /blog/{item.slug} • {item.date || "2026"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Author",
      accessor: "author",
      render: (item) => (
        <span style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
          {item.author?.name || "Ideate X Team"}
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
      header: "Actions",
      cellStyle: { textAlign: "right" },
      headerStyle: { textAlign: "right" },
      render: (item) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <a
            href={`/blog/${item.slug}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="View Article"
          >
            <Globe size={13} />
          </a>
          <Link
            href={`/admin/insights/${item.id}`}
            className="admin-btn admin-btn-secondary admin-btn-sm"
          >
            <Edit2 size={13} /> Edit
          </Link>
          <button
            type="button"
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={() => setDeleteId(item.id)}
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Insights & Blog CMS</h1>
          <p className="admin-page-subtitle">
            Draft, publish, and manage engineering articles, technical insights, and architectural deep-dives.
          </p>
        </div>

        <Link href="/admin/insights/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Write New Insight
        </Link>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <DataTable
        columns={columns}
        data={insights}
        searchPlaceholder="Search insights by title, category, or excerpt..."
        filterKey="status"
        filterOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ]}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Insight Article"
        message="Are you sure you want to delete this insight article?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
