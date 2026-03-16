import { useState } from "react";

export default function AlertBanner({ incidents }) {
  const [dismissed, setDismissed] = useState([]);

  const active = incidents.filter(
    i => i.status !== "resolved" && !dismissed.includes(i.id)
  );

  if (active.length === 0) return null;

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const top = [...active].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])[0];

  const colors = {
    critical: { bg: "#fef2f2", border: "#fecaca", text: "#991b1b", badge: "#ef4444" },
    high:     { bg: "#fffbeb", border: "#fde68a", text: "#92400e", badge: "#f59e0b" },
    medium:   { bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af", badge: "#3b82f6" },
  };
  const c = colors[top.severity] || colors.medium;

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "10px",
      padding: "14px 18px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "20px",
    }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <span style={{
          background: c.badge, color: "#fff",
          fontSize: "10px", fontWeight: 700,
          padding: "2px 8px", borderRadius: "4px",
          letterSpacing: "0.06em",
          fontFamily: "'DM Sans', sans-serif",
          flexShrink: 0, marginTop: "1px",
        }}>
          {top.severity.toUpperCase()}
        </span>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, fontFamily: "'DM Sans', sans-serif" }}>
            [{top.id}] {top.service} — {top.summary}
          </div>
          <div style={{ fontSize: "12px", color: c.text, opacity: 0.75, marginTop: "2px", fontFamily: "'DM Sans', sans-serif" }}>
            Assigned: {top.assignee} · Updated {top.updated} · {active.length} active incident{active.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>
      <button
        onClick={() => setDismissed(d => [...d, top.id])}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: c.text, fontSize: "18px", lineHeight: 1,
          opacity: 0.5, padding: "0 2px", flexShrink: 0,
        }}
        title="Dismiss alert"
      >×</button>
    </div>
  );
}
