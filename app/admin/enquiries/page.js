"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { MessageSquare, Phone, Mail, Clock, Check, Trash2, Edit3, X } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      const json = await res.json();
      if (json.data) setEnquiries(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, notes = null) => {
    setUpdating(true);
    try {
      const payload = { status };
      if (notes !== null) payload.internalNotes = notes;

      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setNotification(`Enquiry updated to "${status}".`);
      setTimeout(() => setNotification(""), 4000);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status, ...(notes !== null ? { internalNotes: notes } : {}) }));
      }
      fetchEnquiries();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Enquiry deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      if (selectedEnquiry?.id === deleteId) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Lead Name & Contact",
      accessor: "name",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
            {item.name} {item.company ? `(${item.company})` : ""}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "flex", gap: "10px", marginTop: "2px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Mail size={11} /> {item.email}
            </span>
            {item.phone && (
              <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <Phone size={11} /> {item.phone}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Service",
      accessor: "service",
      render: (item) => (
        <span style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
          {item.service || "General"}
        </span>
      ),
    },
    {
      header: "Source",
      accessor: "source",
      render: (item) => (
        <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
          {item.source || "Website"}
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
      header: "Date",
      accessor: "createdAt",
      render: (item) => (
        <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", whiteSpace: "nowrap" }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      cellStyle: { textAlign: "right" },
      headerStyle: { textAlign: "right" },
      render: (item) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => setSelectedEnquiry(item)}
          >
            Review Lead
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={() => setDeleteId(item.id)}
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
          <h1 className="admin-page-title">Project & Contact Enquiries</h1>
          <p className="admin-page-subtitle">
            Track incoming customer inquiries, service requests, requirements, and internal sales notes.
          </p>
        </div>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      <DataTable
        columns={columns}
        data={enquiries}
        searchPlaceholder="Search leads by name, email, company, or service..."
        filterKey="status"
        filterOptions={[
          { label: "New", value: "new" },
          { label: "Reviewing", value: "reviewing" },
          { label: "Contacted", value: "contacted" },
          { label: "Qualified", value: "qualified" },
          { label: "Closed", value: "closed" },
          { label: "Spam", value: "spam" },
        ]}
      />

      {/* Review Lead Drawer / Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div
            className="admin-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 640 }}
          >
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MessageSquare size={18} style={{ color: "var(--admin-accent)" }} />
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                  Enquiry from {selectedEnquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: "none", border: "none", color: "var(--admin-text-subtle)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Lead Contact Info */}
              <div
                style={{
                  padding: "14px 16px",
                  background: "var(--admin-sidebar-bg)",
                  border: "1px solid var(--admin-border)",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>EMAIL</div>
                  <a href={`mailto:${selectedEnquiry.email}`} style={{ color: "var(--admin-accent)", fontSize: "0.9rem" }}>
                    {selectedEnquiry.email}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>PHONE NUMBER</div>
                  <span style={{ fontSize: "0.9rem", color: "var(--admin-text-main)" }}>
                    {selectedEnquiry.phone || "Not provided"}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>INTERESTED SERVICE</div>
                  <span style={{ fontSize: "0.9rem", color: "var(--admin-text-main)", fontWeight: "500" }}>
                    {selectedEnquiry.service || "General"}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>SOURCE & DATE</div>
                  <span style={{ fontSize: "0.85rem", color: "var(--admin-text-muted)" }}>
                    {selectedEnquiry.source || "Website"} • {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="admin-form-group">
                <label className="admin-form-label">Project Message / Requirements</label>
                <div
                  style={{
                    padding: "14px 16px",
                    background: "var(--admin-sidebar-bg)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    color: "var(--admin-text-main)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedEnquiry.message || "No message provided."}
                </div>
              </div>

              {/* Lead Status Workflow */}
              <div className="admin-form-group">
                <label className="admin-form-label">Lead Status Workflow</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["new", "reviewing", "contacted", "qualified", "closed", "spam"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`admin-btn ${selectedEnquiry.status === st ? "admin-btn-primary" : "admin-btn-secondary"} admin-btn-sm`}
                      onClick={() => handleStatusUpdate(selectedEnquiry.id, st)}
                      disabled={updating}
                      style={{ textTransform: "capitalize" }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Sales Notes */}
              <div className="admin-form-group">
                <label className="admin-form-label">Internal Administrator Notes</label>
                <textarea
                  className="admin-textarea"
                  rows={3}
                  placeholder="Record follow-up history, client discovery details, or next steps..."
                  value={selectedEnquiry.internalNotes || ""}
                  onChange={(e) => setSelectedEnquiry((p) => ({ ...p, internalNotes: e.target.value }))}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  style={{ marginTop: "8px" }}
                  onClick={() => handleStatusUpdate(selectedEnquiry.id, selectedEnquiry.status, selectedEnquiry.internalNotes)}
                  disabled={updating}
                >
                  Save Internal Note
                </button>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
