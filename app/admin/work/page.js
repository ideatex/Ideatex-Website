"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Globe, Star, Check } from "lucide-react";

export default function AdminWorkListPage() {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchWork();
  }, []);

  const fetchWork = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/work");
      const json = await res.json();
      if (json.data) setWork(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/work/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Work item deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchWork();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Project",
      accessor: "title",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 48,
                height: 48,
                borderRadius: "6px",
                objectFit: "cover",
                background: "var(--admin-hover-bg)",
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
              {item.title}
              {item.featured && (
                <Star size={12} style={{ color: "var(--admin-warning)", fill: "var(--admin-warning)" }} />
              )}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
              Client: {item.client || "Ideate X"}
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
      header: "Tags",
      accessor: "tags",
      render: (item) => (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {(item.tags || []).slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "0.7rem",
                padding: "2px 6px",
                background: "var(--admin-hover-bg)",
                borderRadius: "4px",
                color: "var(--admin-text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
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
          <Link
            href={`/admin/work/${item.id}`}
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
          <h1 className="admin-page-title">Work & Portfolio CMS</h1>
          <p className="admin-page-subtitle">
            Manage public project showcases, client platforms, technologies, and featured highlights.
          </p>
        </div>

        <Link href="/admin/work/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add New Project
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
        data={work}
        searchPlaceholder="Search work by title, category, or client..."
        filterKey="status"
        filterOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ]}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Work Item"
        message="Are you sure you want to delete this project item?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
