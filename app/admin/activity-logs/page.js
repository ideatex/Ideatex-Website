"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/Admin/DataTable";
import { Activity, Clock, User } from "lucide-react";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/activity-logs");
      const json = await res.json();
      if (json.data) setLogs(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: "Action Details",
      accessor: "details",
      render: (item) => (
        <div>
          <div style={{ fontWeight: "600", color: "var(--admin-text-main)" }}>
            {item.details || `${item.action} on ${item.entity}`}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", marginTop: "2px" }}>
            Entity: <span style={{ color: "var(--admin-accent)" }}>{item.entity}</span> {item.entityId ? `(#${item.entityId})` : ""}
          </div>
        </div>
      ),
    },
    {
      header: "Action Type",
      accessor: "action",
      render: (item) => (
        <span
          className="admin-badge"
          style={{
            background: item.action.includes("DELETE")
              ? "var(--admin-danger-bg)"
              : item.action.includes("CREATE")
              ? "var(--admin-success-bg)"
              : "var(--admin-info-bg)",
            color: item.action.includes("DELETE")
              ? "var(--admin-danger)"
              : item.action.includes("CREATE")
              ? "var(--admin-success)"
              : "var(--admin-info)",
          }}
        >
          {item.action}
        </span>
      ),
    },
    {
      header: "User",
      accessor: "userName",
      render: (item) => (
        <span style={{ fontSize: "0.85rem", color: "var(--admin-text-muted)" }}>
          {item.userName || "System User"}
        </span>
      ),
    },
    {
      header: "Timestamp",
      accessor: "timestamp",
      render: (item) => (
        <span style={{ fontSize: "0.75rem", color: "var(--admin-text-subtle)", whiteSpace: "nowrap" }}>
          {new Date(item.timestamp).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">System Activity Logs</h1>
          <p className="admin-page-subtitle">
            Immutable chronological record of content modifications, publishing actions, and administrative operations.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search activity logs..."
        filterKey="action"
        filterOptions={[
          { label: "CREATE", value: "CREATE" },
          { label: "UPDATE", value: "UPDATE" },
          { label: "DELETE", value: "DELETE" },
        ]}
      />
    </div>
  );
}
