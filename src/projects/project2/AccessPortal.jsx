import { useState } from "react";
import UserTable from "./components/UserTable";
import AccessForm from "./components/AccessForm";
import AuditLog from "./components/AuditLog";
import { users as initialUsers, auditLog as initialAuditLog, rolePermissions } from "./data/users";

const font = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;600&display=swap');
`;

export default function AccessPortal() {
  const [users, setUsers]           = useState(initialUsers);
  const [auditLog, setAuditLog]     = useState(initialAuditLog);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab]   = useState("users");

  const handleSave = (updatedUser, reason) => {
    // Update the users list
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    // Add entry to audit log
    const original = users.find(u => u.id === updatedUser.id);
    const newEntry = {
      id: auditLog.length + 1,
      action: updatedUser.role !== original.role ? "Role changed" : "Status changed",
      user: updatedUser.name,
      changedBy: "B. Paul",
      from: updatedUser.role !== original.role ? original.role : original.status,
      to:   updatedUser.role !== original.role ? updatedUser.role : updatedUser.status,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      reason,
    };
    setAuditLog(prev => [newEntry, ...prev]);

    // Update the selected user to reflect changes
    setSelectedUser(updatedUser);
  };

  // Summary stats
  const roleCounts = Object.keys(rolePermissions).map(role => ({
    role,
    count: users.filter(u => u.role === role).length,
    ...rolePermissions[role],
  }));
  const activeCount    = users.filter(u => u.status === "active").length;
  const inactiveCount  = users.filter(u => u.status === "inactive").length;
  const suspendedCount = users.filter(u => u.status === "suspended").length;

  return (
    <>
      <style>{font}</style>
      <div style={{
        minHeight: "100vh", background: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif", padding: "32px 24px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>
              User Access Management
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>
              Coaching Association of Canada — The Locker Platform · {users.length} total users
            </p>
          </div>

          {/* Summary stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px", marginBottom: "24px",
          }}>
            {roleCounts.map(r => (
              <div key={r.role} style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "10px", padding: "14px 16px",
                borderTop: `3px solid ${r.color}`,
              }}>
                <div style={{ fontSize: "26px", fontWeight: 700, color: r.color }}>{r.count}</div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", fontWeight: 500 }}>{r.label}s</div>
              </div>
            ))}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 16px", borderTop: "3px solid #10b981" }}>
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#10b981" }}>{activeCount}</div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", fontWeight: 500 }}>Active</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 16px", borderTop: "3px solid #ef4444" }}>
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#ef4444" }}>{suspendedCount}</div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", fontWeight: 500 }}>Suspended</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #e5e7eb", paddingBottom: "0" }}>
            {[
              { key: "users",  label: `Users (${users.length})` },
              { key: "audit",  label: `Audit Log (${auditLog.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 18px", fontSize: "13px", fontWeight: 500,
                  border: "none", background: "none", cursor: "pointer",
                  color: activeTab === tab.key ? "#111827" : "#9ca3af",
                  borderBottom: activeTab === tab.key ? "2px solid #111827" : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "-1px",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Users tab */}
          {activeTab === "users" && (
            <div style={{ display: "grid", gridTemplateColumns: selectedUser ? "1fr 340px" : "1fr", gap: "20px", alignItems: "start" }}>
              {/* Left — user table */}
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#374151", letterSpacing: "0.03em" }}>
                    USER DIRECTORY
                  </h2>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>Click a row to manage access</span>
                </div>
                <UserTable
                  users={users}
                  onSelectUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              {/* Right — access form (only shows when user selected) */}
              {selectedUser && (
                <div>
                  <h2 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 600, color: "#374151", letterSpacing: "0.03em" }}>
                    MANAGE ACCESS
                  </h2>
                  <AccessForm
                    user={selectedUser}
                    onSave={handleSave}
                    onCancel={() => setSelectedUser(null)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Audit log tab */}
          {activeTab === "audit" && (
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#374151", letterSpacing: "0.03em" }}>
                  ACCESS CHANGE AUDIT LOG
                </h2>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>All role and status changes are recorded here</span>
              </div>
              <AuditLog log={auditLog} />
            </div>
          )}

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#d1d5db", marginTop: "28px" }}>
            Portfolio Project 2 — Babatunde Paul · Systems Analyst · CAC Application
          </p>
        </div>
      </div>
    </>
  );
}
