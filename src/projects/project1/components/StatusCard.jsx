const statusConfig = {
  operational: { label: "Operational", color: "#10b981", bg: "#ecfdf5", dot: "#10b981" },
  degraded:    { label: "Degraded",    color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  incident:    { label: "Incident",    color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
};

export default function StatusCard({ service }) {
  const cfg = statusConfig[service.status];
  const isIncident = service.status === "incident";

  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${isIncident ? "#fecaca" : "#e5e7eb"}`,
      borderLeft: `4px solid ${cfg.color}`,
      borderRadius: "10px",
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      transition: "box-shadow 0.2s",
      boxShadow: isIncident ? "0 0 0 3px #fee2e2" : "none",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = isIncident ? "0 0 0 3px #fee2e2" : "none"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
        <span style={{
          width: 10, height: 10, borderRadius: "50%",
          background: cfg.dot, flexShrink: 0,
          boxShadow: `0 0 0 3px ${cfg.bg}`,
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px", fontWeight: 500,
          color: "#111827", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {service.name}
        </span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>UPTIME</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", fontFamily: "'DM Mono', monospace" }}>{service.uptime}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>RESPONSE</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: service.responseTime === "timeout" ? "#ef4444" : "#374151", fontFamily: "'DM Mono', monospace" }}>{service.responseTime}</div>
        </div>
        <span style={{
          background: cfg.bg, color: cfg.color,
          fontSize: "11px", fontWeight: 600,
          padding: "3px 10px", borderRadius: "20px",
          border: `1px solid ${cfg.color}22`,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
          alignSelf: "center",
        }}>
          {cfg.label}
        </span>
      </div>
    </div>
  );
}
