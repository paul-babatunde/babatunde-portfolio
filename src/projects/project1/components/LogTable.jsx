import { useState } from "react";

const severityColor = {
  critical: { text: "#991b1b", bg: "#fef2f2", border: "#fecaca" },
  high:     { text: "#92400e", bg: "#fffbeb", border: "#fde68a" },
  medium:   { text: "#1e40af", bg: "#eff6ff", border: "#bfdbfe" },
  low:      { text: "#065f46", bg: "#ecfdf5", border: "#a7f3d0" },
};

const statusColor = {
  investigating: "#ef4444",
  monitoring:    "#f59e0b",
  resolved:      "#10b981",
};

export default function LogTable({ incidents }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filters = ["all", "investigating", "monitoring", "resolved"];

  const filtered = filter === "all"
    ? incidents
    : incidents.filter(i => i.status === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? "#111827" : "#f3f4f6",
              color: filter === f ? "#fff" : "#6b7280",
              border: "none", borderRadius: "6px",
              padding: "6px 14px", fontSize: "12px",
              fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              transition: "all 0.15s",
            }}
          >
            {f === "all" ? `All (${incidents.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr 110px 130px 80px",
          background: "#f9fafb",
          padding: "10px 16px",
          borderBottom: "1px solid #e5e7eb",
        }}>
          {["INC ID", "Summary", "Severity", "Service", "Status"].map(h => (
            <span key={h} style={{
              fontSize: "11px", fontWeight: 600, color: "#9ca3af",
              letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif",
            }}>{h}</span>
          ))}
        </div>

        {filtered.map((inc, idx) => {
          const sc = severityColor[inc.severity];
          const isExpanded = expanded === inc.id;
          const isLast = idx === filtered.length - 1;

          return (
            <div key={inc.id}>
              <div
                onClick={() => setExpanded(isExpanded ? null : inc.id)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 110px 130px 80px",
                  padding: "12px 16px",
                  borderBottom: isLast && !isExpanded ? "none" : "1px solid #f3f4f6",
                  cursor: "pointer",
                  background: isExpanded ? "#f9fafb" : "#fff",
                  transition: "background 0.1s",
                  alignItems: "center",
                }}
                onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = "#fafafa"; }}
                onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = "#fff"; }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                  {inc.id}
                </span>
                <span style={{ fontSize: "13px", color: "#374151", fontFamily: "'DM Sans', sans-serif", paddingRight: "12px" }}>
                  {inc.summary}
                </span>
                <span style={{
                  display: "inline-block",
                  background: sc.bg, color: sc.text,
                  border: `1px solid ${sc.border}`,
                  fontSize: "11px", fontWeight: 600,
                  padding: "2px 9px", borderRadius: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.03em",
                  width: "fit-content",
                }}>
                  {inc.severity}
                </span>
                <span style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
                  {inc.service}
                </span>
                <span style={{
                  fontSize: "12px", fontWeight: 600,
                  color: statusColor[inc.status],
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}
                </span>
              </div>

              {/* Expanded root cause row */}
              {isExpanded && (
                <div style={{
                  background: "#f9fafb",
                  padding: "12px 16px 14px",
                  borderBottom: isLast ? "none" : "1px solid #e5e7eb",
                  borderTop: "1px solid #e5e7eb",
                }}>
                  <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>ROOT CAUSE</div>
                      <div style={{ fontSize: "13px", color: "#374151", fontFamily: "'DM Sans', sans-serif", marginTop: "3px" }}>{inc.rootCause}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>ASSIGNEE</div>
                      <div style={{ fontSize: "13px", color: "#374151", fontFamily: "'DM Sans', sans-serif", marginTop: "3px" }}>{inc.assignee}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>OPENED</div>
                      <div style={{ fontSize: "13px", color: "#374151", fontFamily: "'DM Mono', monospace", marginTop: "3px" }}>{inc.opened}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>LAST UPDATED</div>
                      <div style={{ fontSize: "13px", color: "#374151", fontFamily: "'DM Mono', monospace", marginTop: "3px" }}>{inc.updated}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
