"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminClientShell({ user, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If on login page, render children directly without admin chrome
  if (pathname === "/admin/login") {
    return <div className="admin-login-wrapper">{children}</div>;
  }

  // If not logged in and not on login page
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "var(--admin-bg)",
        }}
      >
        <div
          className="admin-card"
          style={{ maxWidth: 420, width: "100%", padding: "32px", textAlign: "center" }}
        >
          <h2 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>Authentication Required</h2>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginBottom: "24px" }}>
            Please sign in with your administrator, editor, or author credentials.
          </p>
          <a
            href="/admin/login"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", textDecoration: "none" }}
          >
            Go to CMS Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout-root">
      <AdminSidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main-content">
        <AdminHeader
          user={user}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="admin-page-container">{children}</main>
      </div>
    </div>
  );
}
