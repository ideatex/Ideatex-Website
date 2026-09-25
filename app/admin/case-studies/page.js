"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Globe, Check, BookOpen } from "lucide-react";

export default function AdminCaseStudiesListPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/case-studies");
      const json = await res.json();
      if (json.data) setCaseStudies(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/case-studies/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Case study deleted successfully.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchCaseStudies();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Case Study",
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
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)", maxWidth: 350 }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", fontFamily: "monospace" }}>
              /case-studies/{item.slug} • Client: {item.client}
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
      header: "Year / Duration",
      render: (item) => (
        <span style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
          {item.year || "2024"} ({item.duration || "—"})
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
            href={`/case-studies/${item.slug}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="View Live"
          >
            <Globe size={13} />
          </a>
          <Link
            href={`/admin/case-studies/${item.id}`}
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
          <h1 className="admin-page-title">Case Studies CMS</h1>
          <p className="admin-page-subtitle">
            Manage deep technical architecture breakdowns, challenge/solution analysis, and verified metrics.
          </p>
        </div>

        <Link href="/admin/case-studies/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Create Case Study
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
        data={caseStudies}
        searchPlaceholder="Search case studies by title or client..."
        filterKey="status"
        filterOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ]}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Case Study"
        message="Are you sure you want to delete this case study?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
