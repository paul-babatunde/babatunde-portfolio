import { useState, useEffect } from "react";
import { rolePermissions } from "../data/users";

const statusOptions = ["active", "inactive", "suspended"];

export default function AccessForm({ user, onSave, onCancel }) {
  const [role,   setRole]   = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [reason, setReason] = useState("");
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    setRole(user.role);
    setStatus(user.status);
    setReason("");
    setSaved(false);
  }, [user]);

  const hasChanges = role !== user.role || status !== user.status;

  const handleSave = () => {
    if (!reason.trim()) {
      alert("Please provide a reason for the change — this is required for the audit log.");
      return;
    }
    onSave({ ...user, role, status }, reason);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const rc = rolePermissions[role];

  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: "12px", padding: "22px",
    }}>
      {/* User header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#f3f4f6", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "16px", fontWeight: 700, color: "#6366f1",
          fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
        }}>
          {user.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>{user.name}</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>{user.email}</div>
        </div>
      </div>

      {/* Info rows */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Department", value: user.department },
          { label: "Member since", value: user.joinDate },
          { label: "Last login", value: user.lastLogin },
          { label: "User ID", value: `USR-${String(user.id).padStart(4, "0")}` },
        ].map(item => (
          <div key={item.label} style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 12px" }}>
            <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>{item.label.toUpperCase()}</div>
            <div style={{ fontSize: "13px", color: "#374151", marginTop: "3px", fontFamily: "'DM Sans', sans-serif" }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Role selector */}
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "6px" }}>
          ROLE
        </label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{
            width: "100%", padding: "9px 12px", fontSize: "13px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif", color: "#374151",
            background: "#fff", cursor: "pointer",
          }}
        >
          {Object.entries(rolePermissions).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        {/* Permissions preview */}
        <div style={{ marginTop: "8px", background: rc.bg, borderRadius: "8px", padding: "10px 12px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: rc.color, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>
            PERMISSIONS FOR {rc.label.toUpperCase()}
          </div>
          {rc.permissions.map(p => (
            <div key={p} style={{ fontSize: "12px", color: rc.color, fontFamily: "'DM Sans', sans-serif", marginBottom: "3px" }}>
              ✓ {p}
            </div>
          ))}
        </div>
      </div>

      {/* Status selector */}
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "6px" }}>
          ACCOUNT STATUS
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                flex: 1, padding: "8px", fontSize: "12px", fontWeight: 600,
                border: `2px solid ${status === s ? "#6366f1" : "#e5e7eb"}`,
                borderRadius: "8px", cursor: "pointer",
                background: status === s ? "#eef2ff" : "#fff",
                color: status === s ? "#6366f1" : "#9ca3af",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reason field — only shows if changes made */}
      {hasChanges && (
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "6px" }}>
            REASON FOR CHANGE <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Required for audit log — e.g. Promotion, Access review, Policy violation..."
            rows={3}
            style={{
              width: "100%", padding: "9px 12px", fontSize: "13px",
              border: "1px solid #e5e7eb", borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif", color: "#374151",
              resize: "vertical", boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          style={{
            flex: 1, padding: "10px", fontSize: "13px", fontWeight: 600,
            background: hasChanges ? "#111827" : "#f3f4f6",
            color: hasChanges ? "#fff" : "#9ca3af",
            border: "none", borderRadius: "8px", cursor: hasChanges ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
          }}
        >
          {saved ? "✓ Saved to audit log" : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 16px", fontSize: "13px", fontWeight: 500,
            background: "#fff", color: "#6b7280",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
