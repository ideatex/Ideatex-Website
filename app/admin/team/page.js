"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import ConfirmModal from "@/components/Admin/ConfirmModal";
import MediaPickerModal from "@/components/Admin/MediaPickerModal";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Check, Upload, Users } from "lucide-react";

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const json = await res.json();
      if (json.data) setTeam(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember({ ...member });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingMember({
      name: "",
      designation: "",
      role: "",
      image: "/sankara.png",
      shortBio: "",
      fullBio: "",
      email: "",
      socialLinks: { linkedin: "", twitter: "", github: "" },
      order: team.length + 1,
      status: "published",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingMember.id ? `/api/admin/team/${editingMember.id}` : "/api/admin/team";
      const method = editingMember.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setNotification("Team member saved successfully.");
      setTimeout(() => setNotification(""), 4000);
      setShowModal(false);
      fetchTeam();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/team/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setNotification("Team member deleted.");
      setTimeout(() => setNotification(""), 4000);
      setDeleteId(null);
      fetchTeam();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const updated = [...team];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((m, idx) => ({ id: m.id, order: idx + 1 }));
    setTeam(updated);

    try {
      await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered),
      });
      fetchTeam();
    } catch (e) {
      console.error(e);
    }
  };

  const columns = [
    {
      header: "Member",
      accessor: "name",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={item.image || "/logo-ideatex.png"}
            alt={item.name}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid var(--admin-border)",
            }}
          />
          <div>
            <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
              {item.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)" }}>
              {item.email || "—"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Designation / Role",
      accessor: "designation",
      render: (item) => (
        <span style={{ fontSize: "0.85rem", color: "var(--admin-text-main)" }}>
          {item.designation || item.role}
        </span>
      ),
    },
    {
      header: "Order",
      render: (item, idx) => {
        const itemIdx = team.findIndex((t) => t.id === item.id);
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
              disabled={itemIdx === 0}
              onClick={() => handleMove(itemIdx, -1)}
            >
              <ArrowUp size={12} />
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
              disabled={itemIdx === team.length - 1}
              onClick={() => handleMove(itemIdx, 1)}
            >
              <ArrowDown size={12} />
            </button>
            <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", marginLeft: "4px" }}>
              #{item.order || itemIdx + 1}
            </span>
          </div>
        );
      },
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
          <h1 className="admin-page-title">Team Management</h1>
          <p className="admin-page-subtitle">
            Manage Ideate X leadership, engineering profiles, designations, and public social links.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleCreate}
        >
          <Plus size={16} /> Add Team Member
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
        data={team}
        searchPlaceholder="Search team members by name or designation..."
      />

      {/* Edit / Create Modal */}
      {showModal && editingMember && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="admin-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 600 }}
          >
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                {editingMember.id ? `Edit Member: ${editingMember.name}` : "Add Team Member"}
              </h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Full Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingMember.name}
                      onChange={(e) => setEditingMember((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Designation / Role</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Business Lead, Software Developer"
                      value={editingMember.designation || editingMember.role || ""}
                      onChange={(e) =>
                        setEditingMember((p) => ({
                          ...p,
                          designation: e.target.value,
                          role: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Profile Image URL</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingMember.image || ""}
                      onChange={(e) => setEditingMember((p) => ({ ...p, image: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setMediaModalOpen(true)}
                    >
                      <Upload size={14} /> Library
                    </button>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Short Bio (for cards / kinetic list)</label>
                  <textarea
                    className="admin-textarea"
                    rows={2}
                    value={editingMember.shortBio || ""}
                    onChange={(e) => setEditingMember((p) => ({ ...p, shortBio: e.target.value }))}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Public Email</label>
                    <input
                      type="email"
                      className="admin-input"
                      value={editingMember.email || ""}
                      onChange={(e) => setEditingMember((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      className="admin-select"
                      value={editingMember.status || "published"}
                      onChange={(e) => setEditingMember((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
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
                  {saving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setEditingMember((p) => ({ ...p, image: url }))}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Team Member"
        message="Are you sure you want to remove this team member?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
