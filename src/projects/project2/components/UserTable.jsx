import { useState } from "react";
import { rolePermissions } from "../data/users";

const statusConfig = {
  active:    { color: "#10b981", bg: "#ecfdf5", label: "Active" },
  inactive:  { color: "#6b7280", bg: "#f3f4f6", label: "Inactive" },
  suspended: { color: "#ef4444", bg: "#fef2f2", label: "Suspended" },
};

export default function UserTable({ users, onSelectUser, selectedUser }) {
  const [roleFilter, setRoleFilter]     = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch]             = useState("");

  const filtered = users.filter(u => {
    const matchRole   = roleFilter   === "all" || u.role   === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.department.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  return (
    <div>
      {/* Search and filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search name, email, department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: "200px",
            padding: "8px 12px", fontSize: "13px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none", color: "#374151",
          }}
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          style={{
            padding: "8px 12px", fontSize: "13px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#374151", background: "#fff", cursor: "pointer",
          }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="analyst">Analyst</option>
          <option value="viewer">Viewer</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            padding: "8px 12px", fontSize: "13px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#374151", background: "#fff", cursor: "pointer",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Results count */}
      <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>
        Showing {filtered.length} of {users.length} users
      </div>

      {/* Table */}
      <div style={{ borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 110px 100px 90px",
          background: "#f9fafb", padding: "10px 16px",
          borderBottom: "1px solid #e5e7eb",
        }}>
          {["Name / Email", "Department", "Role", "Last Login", "Status"].map(h => (
            <span key={h} style={{
              fontSize: "11px", fontWeight: 600, color: "#9ca3af",
              letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif",
            }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
            No users match your filters
          </div>
        )}

        {filtered.map((user, idx) => {
          const sc  = statusConfig[user.status];
          const rc  = rolePermissions[user.role];
          const isSelected = selectedUser?.id === user.id;
          const isLast = idx === filtered.length - 1;

          return (
            <div
              key={user.id}
              onClick={() => onSelectUser(isSelected ? null : user)}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 110px 100px 90px",
                padding: "12px 16px",
                borderBottom: isLast ? "none" : "1px solid #f3f4f6",
                cursor: "pointer",
                background: isSelected ? "#fafafa" : "#fff",
                borderLeft: isSelected ? "3px solid #6366f1" : "3px solid transparent",
                transition: "all 0.15s",
                alignItems: "center",
              }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fff"; }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>{user.name}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "'DM Mono', monospace", marginTop: "2px" }}>{user.email}</div>
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>{user.department}</div>
              <span style={{
                display: "inline-block",
                background: rc.bg, color: rc.color,
                fontSize: "11px", fontWeight: 600,
                padding: "3px 9px", borderRadius: "4px",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.03em", width: "fit-content",
              }}>
                {rc.label}
              </span>
              <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>
                {user.lastLogin.split(" ")[0]}
              </div>
              <span style={{
                display: "inline-block",
                background: sc.bg, color: sc.color,
                fontSize: "11px", fontWeight: 600,
                padding: "3px 9px", borderRadius: "4px",
                fontFamily: "'DM Sans', sans-serif",
                width: "fit-content",
              }}>
                {sc.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
