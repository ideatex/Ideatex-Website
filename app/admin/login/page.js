"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillQuick = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--admin-bg, #f8fafc)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          background: "var(--admin-card-bg, #ffffff)",
          border: "1px solid var(--admin-card-border, #e2e8f0)",
          borderRadius: "14px",
          padding: "36px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: "12px",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#2563eb",
              marginBottom: "14px",
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "1.45rem",
              fontFamily: "var(--admin-font-heading)",
              color: "var(--admin-text-main, #0f172a)",
              letterSpacing: "-0.02em",
            }}
          >
            Ideate X <span style={{ color: "#2563eb" }}>CMS</span>
          </h1>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--admin-text-muted, #475569)" }}>
            Authorized Content & Engineering Management
          </p>
        </div>

        {error && (
          <div className="admin-alert admin-alert-danger">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-form-label">Username or Email</label>
            <div style={{ position: "relative" }}>
              <User
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-subtle, #64748b)",
                }}
              />
              <input
                type="text"
                className="admin-input"
                style={{ paddingLeft: 36 }}
                placeholder="admin, editor, or author"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-subtle, #64748b)",
                }}
              />
              <input
                type="password"
                className="admin-input"
                style={{ paddingLeft: 36 }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", padding: "12px", marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to CMS"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Quick Accounts */}
        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid var(--admin-border, #e2e8f0)",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "var(--admin-text-subtle, #64748b)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "10px",
            }}
          >
            Quick Select Roles
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => fillQuick("admin", "admin123")}
            >
              ADMIN
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => fillQuick("editor", "admin123")}
            >
              EDITOR
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => fillQuick("author", "admin123")}
            >
              AUTHOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
