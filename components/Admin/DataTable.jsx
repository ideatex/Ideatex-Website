"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search records...",
  filterKey = null,
  filterOptions = [],
  pageSize = 10,
  emptyTitle = "No records found",
  emptyDescription = "Get started by creating a new entry above.",
  emptyAction = null
}) {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search matching across all columns or text fields
      let matchesSearch = true;
      if (search.trim()) {
        const query = search.toLowerCase();
        matchesSearch = columns.some((col) => {
          const val = col.accessor ? item[col.accessor] : col.render ? col.render(item) : "";
          if (typeof val === "string") return val.toLowerCase().includes(query);
          if (typeof val === "number") return val.toString().includes(query);
          return false;
        });
      }

      // Filter matching
      let matchesFilter = true;
      if (filterKey && filterValue) {
        matchesFilter = item[filterKey] === filterValue;
      }

      return matchesSearch && matchesFilter;
    });
  }, [data, columns, search, filterKey, filterValue]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="admin-card">
      {/* Controls header */}
      {(searchable || filterOptions.length > 0) && (
        <div className="admin-card-header">
          <div className="admin-table-controls">
            {searchable && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--admin-text-subtle)",
                  }}
                />
                <input
                  type="text"
                  className="admin-input admin-input-search"
                  style={{ paddingLeft: 30 }}
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}

            {filterOptions.length > 0 && filterKey && (
              <select
                className="admin-select"
                style={{ width: "auto" }}
                value={filterValue}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Statuses</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div style={{ fontSize: "0.8rem", color: "var(--admin-text-subtle)" }}>
            Showing {filteredData.length} total entries
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="admin-table-container">
        {paginatedData.length === 0 ? (
          <div className="admin-empty-state">
            <Inbox className="admin-empty-icon" />
            <div className="admin-empty-title">{emptyTitle}</div>
            <div className="admin-empty-text">{emptyDescription}</div>
            {emptyAction}
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} style={col.headerStyle}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, rowIdx) => (
                <tr key={item.id || rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} style={col.cellStyle}>
                      {col.render
                        ? col.render(item)
                        : item[col.accessor] !== undefined
                        ? String(item[col.accessor])
                        : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--admin-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.85rem",
          }}
        >
          <span style={{ color: "var(--admin-text-subtle)" }}>
            Page {currentPage} of {totalPages}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
