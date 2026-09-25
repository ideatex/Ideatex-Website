"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Check, HelpCircle } from "lucide-react";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const json = await res.json();
      if (json.data) setFaqs(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq({ ...faq });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingFaq({
      question: "",
      answer: "",
      category: "General",
      relatedService: "all",
      order: faqs.length + 1,
      status: "published",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingFaq.id ? `/api/admin/faqs/${editingFaq.id}` : "/api/admin/faqs";
      const method = editingFaq.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFaq),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("FAQ saved successfully.");
      setTimeout(() => setNotification(""), 4000);
      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/faqs/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("FAQ deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchFaqs();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "Question",
      accessor: "question",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)", maxWidth: 360 }}>
            {item.question}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", marginTop: "2px" }}>
            {item.answer ? item.answer.slice(0, 90) + "..." : "—"}
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
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => handleEdit(item)}
          >
            <Edit2 size={13} /> Edit
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
          <h1 className="admin-page-title">Frequently Asked Questions (FAQs)</h1>
          <p className="admin-page-subtitle">
            Manage questions and answers displayed across the homepage and individual service pages.
          </p>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleCreate}>
          <Plus size={16} /> Add FAQ
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
        data={faqs}
        searchPlaceholder="Search FAQs..."
        filterKey="category"
        filterOptions={[
          { label: "General", value: "General" },
          { label: "Process", value: "Process" },
          { label: "Support", value: "Support" },
          { label: "Legal & IP", value: "Legal & IP" },
        ]}
      />

      {/* Edit / Create Modal */}
      {showModal && editingFaq && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                {editingFaq.id ? "Edit FAQ" : "Create New FAQ"}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Question</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq((p) => ({ ...p, question: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Answer</label>
                  <textarea
                    className="admin-textarea"
                    rows={4}
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq((p) => ({ ...p, answer: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="General, Process, Support..."
                      value={editingFaq.category}
                      onChange={(e) => setEditingFaq((p) => ({ ...p, category: e.target.value }))}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      className="admin-select"
                      value={editingFaq.status}
                      onChange={(e) => setEditingFaq((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
