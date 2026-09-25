"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Globe, Check, Layers } from "lucide-react";

export default function AdminServicesListPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (json.data) setServices(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Service deleted successfully.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchServices();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Service",
      accessor: "title",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {item.image?.src && (
            <img
              src={item.image.src}
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
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", fontFamily: "monospace" }}>
              /services/{item.slug}
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
      header: "Order",
      accessor: "order",
      cellStyle: { width: "80px", textAlign: "center" },
      headerStyle: { textAlign: "center" },
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
            href={`/services/${item.slug}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="View Live"
          >
            <Globe size={13} />
          </a>
          <Link
            href={`/admin/services/${item.id}`}
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
          <h1 className="admin-page-title">Services Management</h1>
          <p className="admin-page-subtitle">
            Create, edit, reorder, and configure dynamic capabilities and service detail pages.
          </p>
        </div>

        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add New Service
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
        data={services}
        searchPlaceholder="Search services by name, category, or slug..."
        filterKey="status"
        filterOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ]}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? Public links to this service will no longer resolve."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
