"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, Globe } from "lucide-react";

export default function AdminHeader({ onOpenSidebar, user }) {
  const pathname = usePathname();

  // Generate breadcrumbs from path
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const isCurrent = index === pathSegments.length - 1;

    return { url, label, isCurrent };
  });

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-menu-toggle"
          onClick={onOpenSidebar}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        <div className="admin-breadcrumbs">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.url}>
              {idx > 0 && <span>/</span>}
              {crumb.isCurrent ? (
                <span className="current">{crumb.label}</span>
              ) : (
                <Link href={crumb.url}>{crumb.label}</Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="admin-header-right">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="admin-btn admin-btn-secondary admin-btn-sm"
          title="Open Public Website"
        >
          <Globe size={14} />
          <span>View Live Site</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </header>
  );
}
