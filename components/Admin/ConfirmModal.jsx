"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  confirmVariant = "danger", // 'danger' | 'primary'
  onConfirm,
  onCancel,
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onCancel}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 450 }}>
        <div className="admin-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AlertTriangle size={20} style={{ color: confirmVariant === "danger" ? "var(--admin-danger)" : "var(--admin-warning)" }} />
            <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--admin-text-main)" }}>
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            style={{ background: "none", border: "none", color: "var(--admin-text-subtle)", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--admin-text-muted)", lineHeight: 1.5 }}>
            {message}
          </p>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`admin-btn ${confirmVariant === "danger" ? "admin-btn-danger" : "admin-btn-primary"}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
