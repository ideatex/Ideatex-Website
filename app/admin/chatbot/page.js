"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Bot, Plus, Edit2, Trash2, Check, MessageSquare, BookOpen, Phone, Mail } from "lucide-react";

export default function AdminChatbotPage() {
  const [activeTab, setActiveTab] = useState("knowledge"); // 'knowledge' | 'enquiries'
  const [knowledge, setKnowledge] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/chatbot");
      const json = await res.json();
      if (json.knowledge) setKnowledge(json.knowledge);
      if (json.enquiries) setEnquiries(json.enquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      keywordsInput: (item.keywords || []).join(", "),
      approvedInput: (item.approvedAnswers || []).join("\n"),
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingItem({
      title: "",
      category: "General",
      keywordsInput: "",
      content: "",
      approvedInput: "",
      pageReferences: [],
      isEnabled: true,
      order: knowledge.length + 1,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingItem.id ? `/api/admin/chatbot/${editingItem.id}` : "/api/admin/chatbot";
      const method = editingItem.id ? "PUT" : "POST";

      const payload = {
        ...editingItem,
        keywords: (editingItem.keywordsInput || "").split(",").map((k) => k.trim()).filter(Boolean),
        approvedAnswers: (editingItem.approvedInput || "").split("\n").map((a) => a.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Chatbot knowledge updated.");
      setTimeout(() => setNotification(""), 4000);
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEnquiry = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/chatbot/${selectedEnquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedEnquiry),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setNotification("Chatbot lead status updated.");
      setTimeout(() => setNotification(""), 4000);
      setSelectedEnquiry(null);
      fetchData();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/chatbot/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Knowledge item deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const knowledgeColumns = [
    {
      header: "Topic / Title",
      accessor: "title",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
            {item.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", marginTop: "2px" }}>
            {item.content ? item.content.slice(0, 90) + "..." : "—"}
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Keywords",
      accessor: "keywords",
      render: (item) => (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {(item.keywords || []).slice(0, 3).map((kw, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.7rem",
                padding: "2px 6px",
                background: "var(--admin-hover-bg)",
                borderRadius: "4px",
                color: "var(--admin-text-muted)",
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Active",
      accessor: "isEnabled",
      render: (item) => (
        <span className={`admin-badge ${item.isEnabled ? "admin-badge-published" : "admin-badge-archived"}`}>
          {item.isEnabled ? "Active" : "Disabled"}
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

  const enquiriesColumns = [
    {
      header: "Visitor & Lead",
      accessor: "visitorName",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
            {item.visitorName || item.name || "Website Visitor"}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "flex", gap: "10px", alignItems: "center", marginTop: "3px", flexWrap: "wrap" }}>
            <a href={`mailto:${item.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--admin-text-subtle)", textDecoration: "none" }}>
              <Mail size={12} /> {item.email}
            </a>
            {item.phone && (
              <a href={`tel:${String(item.phone).replace(/[^0-9+]/g, '')}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--admin-primary)", fontWeight: "600", textDecoration: "none" }}>
                <Phone size={12} /> {item.phone}
              </a>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Service Needed",
      accessor: "service",
    },
    {
      header: "Budget & Timeline",
      render: (item) => (
        <span style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
          {item.budget || "—"} ({item.timeline || "—"})
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
        <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
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
            onClick={() => setSelectedEnquiry({ ...item })}
          >
            <Edit2 size={13} /> View Lead
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
          <h1 className="admin-page-title">Chatbot Knowledge Base & Leads</h1>
          <p className="admin-page-subtitle">
            Configure approved knowledge base facts, approved answers, and view conversational chatbot leads.
          </p>
        </div>

        {activeTab === "knowledge" && (
          <button type="button" className="admin-btn admin-btn-primary" onClick={handleCreate}>
            <Plus size={16} /> Add Knowledge Topic
          </button>
        )}
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          type="button"
          className={`admin-btn ${activeTab === "knowledge" ? "admin-btn-primary" : "admin-btn-secondary"}`}
          onClick={() => setActiveTab("knowledge")}
        >
          <BookOpen size={14} /> Knowledge Base ({knowledge.length})
        </button>
        <button
          type="button"
          className={`admin-btn ${activeTab === "enquiries" ? "admin-btn-primary" : "admin-btn-secondary"}`}
          onClick={() => setActiveTab("enquiries")}
        >
          <MessageSquare size={14} /> Chatbot Leads ({enquiries.length})
        </button>
      </div>

      {activeTab === "knowledge" ? (
        <DataTable
          columns={knowledgeColumns}
          data={knowledge}
          searchPlaceholder="Search knowledge base topics..."
        />
      ) : (
        <DataTable
          columns={enquiriesColumns}
          data={enquiries}
          searchPlaceholder="Search chatbot leads..."
        />
      )}

      {/* Edit Knowledge Modal */}
      {showModal && editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                {editingItem.id ? `Edit: ${editingItem.title}` : "Add Knowledge Item"}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Topic / Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem((p) => ({ ...p, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem((p) => ({ ...p, category: e.target.value }))}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Trigger Keywords (comma separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="pricing, location, contact, saas"
                      value={editingItem.keywordsInput}
                      onChange={(e) => setEditingItem((p) => ({ ...p, keywordsInput: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Approved Ground-Truth Knowledge Content</label>
                  <textarea
                    className="admin-textarea"
                    rows={4}
                    placeholder="Accurate, verified facts the chatbot is authorized to provide..."
                    value={editingItem.content}
                    onChange={(e) => setEditingItem((p) => ({ ...p, content: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Approved Exact Answers (1 per line)</label>
                  <textarea
                    className="admin-textarea"
                    rows={3}
                    placeholder="Specific responses that can be quoted directly..."
                    value={editingItem.approvedInput}
                    onChange={(e) => setEditingItem((p) => ({ ...p, approvedInput: e.target.value }))}
                  />
                </div>

                <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="checkbox"
                    id="kbActiveCheck"
                    checked={editingItem.isEnabled}
                    onChange={(e) => setEditingItem((p) => ({ ...p, isEnabled: e.target.checked }))}
                  />
                  <label htmlFor="kbActiveCheck" style={{ fontSize: "0.85rem", color: "var(--admin-text-main)", cursor: "pointer" }}>
                    Enable in Chatbot Knowledge Base
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Knowledge"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Details & Status Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                Chatbot Lead: {selectedEnquiry.visitorName || selectedEnquiry.name || "Website Lead"}
              </h3>
            </div>

            <form onSubmit={handleSaveEnquiry}>
              <div className="admin-modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "block" }}>Email Address</span>
                    <a href={`mailto:${selectedEnquiry.email}`} style={{ color: "var(--admin-primary)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "block" }}>Phone / Mobile</span>
                    {selectedEnquiry.phone ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px", flexWrap: "wrap" }}>
                        <a href={`tel:${String(selectedEnquiry.phone).replace(/[^0-9+]/g, '')}`} style={{ color: "var(--admin-primary)", fontWeight: 600, fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                          <Phone size={13} /> {selectedEnquiry.phone}
                        </a>
                        <a
                          href={`https://wa.me/${String(selectedEnquiry.phone).replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: "0.72rem", padding: "2px 7px", background: "rgba(37, 211, 102, 0.15)", color: "#16a34a", borderRadius: "4px", fontWeight: "600", textDecoration: "none" }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    ) : (
                      <span style={{ color: "var(--admin-text-subtle)", fontSize: "0.85rem", fontStyle: "italic" }}>Not provided</span>
                    )}
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "block" }}>Service Requested</span>
                    <span style={{ color: "var(--admin-text-main)", fontWeight: 600, fontSize: "0.9rem" }}>
                      {selectedEnquiry.service || "Custom Software"}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", display: "block" }}>Timeline & Budget</span>
                    <span style={{ color: "var(--admin-text-main)", fontSize: "0.9rem" }}>
                      {selectedEnquiry.timeline || "—"} ({selectedEnquiry.budget || "—"})
                    </span>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Requirements Summary</label>
                  <div style={{ padding: "10px 12px", background: "var(--admin-hover-bg)", borderRadius: "8px", fontSize: "0.875rem", color: "var(--admin-text-main)", lineHeight: 1.5 }}>
                    {selectedEnquiry.requirements || selectedEnquiry.project_description || "No specific requirements outlined."}
                  </div>
                </div>

                {/* Conversation Transcript */}
                {selectedEnquiry.conversationHistory && selectedEnquiry.conversationHistory.length > 0 && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Conversation Transcript</label>
                    <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px", background: "var(--admin-hover-bg)", border: "1px solid var(--admin-border)", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedEnquiry.conversationHistory.map((item, idx) => (
                        <div key={idx} style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                          <strong style={{ color: item.role === "user" || item.sender === "user" ? "var(--admin-primary)" : "#16a34a" }}>
                            {item.role === "user" || item.sender === "user" ? "Visitor: " : "Ideate X Bot: "}
                          </strong>
                          <span style={{ color: "var(--admin-text-main)" }}>{item.content || item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="admin-form-grid" style={{ marginTop: "16px" }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Mobile / Phone Number</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. +91 98765 43210"
                      value={selectedEnquiry.phone || ""}
                      onChange={(e) => setSelectedEnquiry((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Enquiry Status</label>
                    <select
                      className="admin-select"
                      value={selectedEnquiry.status || "new"}
                      onChange={(e) => setSelectedEnquiry((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Internal Team Notes</label>
                  <textarea
                    className="admin-textarea"
                    rows={3}
                    placeholder="Add follow-up notes, call schedule, or scope details..."
                    value={selectedEnquiry.internalNotes || ""}
                    onChange={(e) => setSelectedEnquiry((p) => ({ ...p, internalNotes: e.target.value }))}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setSelectedEnquiry(null)}>
                  Close
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Update Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
