"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Home,
  Layers,
  Briefcase,
  BookOpen,
  PenTool,
  Users,
  Image,
  Navigation,
  HelpCircle,
  Search,
  MessageSquare,
  Bot,
  Settings,
  ShieldAlert,
  Activity,
  LogOut,
  X
} from "lucide-react";

export default function AdminSidebar({ user, isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const isRoleAdmin = user?.role === "ADMIN";
  const isRoleEditor = user?.role === "EDITOR" || isRoleAdmin;

  return (
    <>
      {isOpen && (
        <div
          className="admin-modal-backdrop"
          style={{ zIndex: 45 }}
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-brand">
          <Link href="/admin/dashboard" className="admin-brand-link">
            <span style={{ color: "#3b82f6" }}>IDEATE</span> X
            <span className="admin-cms-badge">CMS</span>
          </Link>
          <button
            type="button"
            className="admin-menu-toggle"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="admin-sidebar-nav">
          {/* Main Dashboard */}
          <div className="admin-nav-group">
            <Link
              href="/admin/dashboard"
              className={`admin-nav-item ${
                pathname === "/admin" || pathname === "/admin/dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </Link>
          </div>

          {/* Website Content */}
          <div className="admin-nav-group">
            <span className="admin-nav-group-title">Content</span>
            <Link
              href="/admin/pages"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/pages") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <FileText size={18} />
                <span>Pages</span>
              </div>
            </Link>

            <Link
              href="/admin/homepage"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/homepage") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Home size={18} />
                <span>Homepage</span>
              </div>
            </Link>

            <Link
              href="/admin/services"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/services") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Layers size={18} />
                <span>Services</span>
              </div>
            </Link>

            <Link
              href="/admin/work"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/work") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Briefcase size={18} />
                <span>Work / Portfolio</span>
              </div>
            </Link>

            <Link
              href="/admin/case-studies"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/case-studies") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <BookOpen size={18} />
                <span>Case Studies</span>
              </div>
            </Link>

            <Link
              href="/admin/insights"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/insights") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <PenTool size={18} />
                <span>Insights / Blog</span>
              </div>
            </Link>

            <Link
              href="/admin/team"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/team") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Users size={18} />
                <span>Team</span>
              </div>
            </Link>

            <Link
              href="/admin/faqs"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/faqs") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <HelpCircle size={18} />
                <span>FAQs</span>
              </div>
            </Link>
          </div>

          {/* Media */}
          <div className="admin-nav-group">
            <span className="admin-nav-group-title">Media</span>
            <Link
              href="/admin/media"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/media") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Image size={18} />
                <span>Media Library</span>
              </div>
            </Link>
          </div>

          {/* Website Navigation & SEO */}
          <div className="admin-nav-group">
            <span className="admin-nav-group-title">Website</span>
            <Link
              href="/admin/navigation"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/navigation") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Navigation size={18} />
                <span>Navigation & Footer</span>
              </div>
            </Link>

            <Link
              href="/admin/seo"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/seo") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Search size={18} />
                <span>SEO Management</span>
              </div>
            </Link>
          </div>

          {/* Leads & Enquiries */}
          <div className="admin-nav-group">
            <span className="admin-nav-group-title">Leads</span>
            <Link
              href="/admin/enquiries"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/enquiries") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <MessageSquare size={18} />
                <span>Enquiries</span>
              </div>
            </Link>

            <Link
              href="/admin/chatbot"
              className={`admin-nav-item ${
                pathname.startsWith("/admin/chatbot") ? "active" : ""
              }`}
              onClick={onClose}
            >
              <div className="admin-nav-item-left">
                <Bot size={18} />
                <span>Chatbot Knowledge</span>
              </div>
            </Link>
          </div>

          {/* System (Admin only) */}
          {isRoleAdmin && (
            <div className="admin-nav-group">
              <span className="admin-nav-group-title">System</span>
              <Link
                href="/admin/users"
                className={`admin-nav-item ${
                  pathname.startsWith("/admin/users") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <div className="admin-nav-item-left">
                  <ShieldAlert size={18} />
                  <span>Users & Roles</span>
                </div>
              </Link>

              <Link
                href="/admin/activity-logs"
                className={`admin-nav-item ${
                  pathname.startsWith("/admin/activity-logs") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <div className="admin-nav-item-left">
                  <Activity size={18} />
                  <span>Activity Logs</span>
                </div>
              </Link>

              <Link
                href="/admin/settings"
                className={`admin-nav-item ${
                  pathname.startsWith("/admin/settings") ? "active" : ""
                }`}
                onClick={onClose}
              >
                <div className="admin-nav-item-left">
                  <Settings size={18} />
                  <span>Site Settings</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* User Pill & Logout */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-pill">
            <img
              src={user?.avatar || "/logo-ideatex.png"}
              alt="User"
              className="admin-user-avatar"
            />
            <div>
              <div className="admin-user-name">{user?.name || "Admin"}</div>
              <div className="admin-user-role">{user?.role || "ADMIN"}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-btn-icon"
            style={{
              background: "none",
              border: "none",
              color: "var(--admin-text-subtle)",
              cursor: "pointer",
            }}
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
