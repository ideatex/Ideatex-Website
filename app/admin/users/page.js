"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import { Plus, Edit2, Trash2, Check, ShieldAlert, UserCheck } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.data) setUsers(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (u) => {
    setEditingUser({ ...u, password: "" });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingUser({
      username: "",
      name: "",
      email: "",
      password: "",
      role: "EDITOR",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingUser.id ? `/api/admin/users/${editingUser.id}` : "/api/admin/users";
      const method = editingUser.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("User account saved successfully.");
      setTimeout(() => setNotification(""), 4000);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/users/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("User deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchUsers();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const columns = [
    {
      header: "User",
      accessor: "name",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={item.avatar || "/logo-ideatex.png"}
            alt={item.name}
            style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--admin-hover-bg)" }}
          />
          <div>
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
              {item.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
              @{item.username} • {item.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      render: (item) => (
        <span
          className="admin-badge"
          style={{
            background:
              item.role === "ADMIN"
                ? "var(--admin-accent-light)"
                : item.role === "EDITOR"
                ? "var(--admin-success-bg)"
                : "var(--admin-info-bg)",
            color:
              item.role === "ADMIN"
                ? "var(--admin-accent)"
                : item.role === "EDITOR"
                ? "var(--admin-success)"
                : "var(--admin-info)",
          }}
        >
          {item.role}
        </span>
      ),
    },
    {
      header: "Last Login",
      accessor: "lastLogin",
      render: (item) => (
        <span style={{ fontSize: "0.8rem", color: "var(--admin-text-subtle)" }}>
          {item.lastLogin ? new Date(item.lastLogin).toLocaleDateString() : "Never"}
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
          <h1 className="admin-page-title">CMS Users & Role Permissions</h1>
          <p className="admin-page-subtitle">
            Configure administrative accounts, content editors, and blog authors.
          </p>
        </div>

        <button type="button" className="admin-btn admin-btn-primary" onClick={handleCreate}>
          <Plus size={16} /> Create User Account
        </button>
      </div>

      {notification && (
        <div className="admin-alert admin-alert-success">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Role explanation cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="admin-card" style={{ margin: 0, padding: "16px" }}>
          <div style={{ fontWeight: "700", color: "var(--admin-accent)", fontSize: "0.85rem", marginBottom: "4px" }}>
            ADMIN ROLE
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--admin-text-muted)", lineHeight: 1.4 }}>
            Full administrative control. Manage users, site settings, SEO defaults, publish & delete any content.
          </p>
        </div>

        <div className="admin-card" style={{ margin: 0, padding: "16px" }}>
          <div style={{ fontWeight: "700", color: "var(--admin-success)", fontSize: "0.85rem", marginBottom: "4px" }}>
            EDITOR ROLE
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--admin-text-muted)", lineHeight: 1.4 }}>
            Create, edit, and publish pages, services, case studies, insights, and media. Cannot delete users or change system settings.
          </p>
        </div>

        <div className="admin-card" style={{ margin: 0, padding: "16px" }}>
          <div style={{ fontWeight: "700", color: "var(--admin-info)", fontSize: "0.85rem", marginBottom: "4px" }}>
            AUTHOR ROLE
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--admin-text-muted)", lineHeight: 1.4 }}>
            Create and save draft insight articles and upload media. Cannot publish or delete live content.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users..."
      />

      {/* Edit Modal */}
      {showModal && editingUser && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                {editingUser.id ? `Edit User: ${editingUser.name}` : "Create New User"}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Username</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser((p) => ({ ...p, username: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Email Address</label>
                    <input
                      type="email"
                      className="admin-input"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">User Role</label>
                    <select
                      className="admin-select"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser((p) => ({ ...p, role: e.target.value }))}
                    >
                      <option value="ADMIN">ADMIN (Full Access)</option>
                      <option value="EDITOR">EDITOR (Content & Publishing)</option>
                      <option value="AUTHOR">AUTHOR (Draft Articles Only)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      {editingUser.id ? "New Password (optional)" : "Password"}
                    </label>
                    <input
                      type="password"
                      className="admin-input"
                      placeholder={editingUser.id ? "Leave blank to keep current" : "••••••••"}
                      value={editingUser.password || ""}
                      onChange={(e) => setEditingUser((p) => ({ ...p, password: e.target.value }))}
                      required={!editingUser.id}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete User Account"
        message="Are you sure you want to delete this user account?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
