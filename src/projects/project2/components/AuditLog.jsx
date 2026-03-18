import { rolePermissions } from "../data/users";

export default function AuditLog({ log }) {
  return (
    <div style={{ borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: "80px 120px 1fr 110px",
        background: "#f9fafb", padding: "10px 16px",
        borderBottom: "1px solid #e5e7eb",
      }}>
        {["Action", "User", "Reason", "Timestamp"].map(h => (
          <span key={h} style={{
            fontSize: "11px", fontWeight: 600, color: "#9ca3af",
            letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif",
          }}>{h}</span>
        ))}
      </div>

      {log.map((entry, idx) => {
        const isLast = idx === log.length - 1;
        const fromColor = entry.from !== "-" && rolePermissions[entry.from] ? rolePermissions[entry.from].color : "#6b7280";
        const toColor   = rolePermissions[entry.to]   ? rolePermissions[entry.to].color   : "#6b7280";

        return (
          <div key={entry.id} style={{
            display: "grid", gridTemplateColumns: "80px 120px 1fr 110px",
            padding: "11px 16px",
            borderBottom: isLast ? "none" : "1px solid #f3f4f6",
            alignItems: "center", background: "#fff",
          }}>
            <span style={{
              fontSize: "11px", fontWeight: 600,
              color: entry.action.includes("suspended") ? "#ef4444" : entry.action.includes("created") ? "#10b981" : "#6366f1",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {entry.action}
            </span>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>{entry.user}</div>
              <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>
                by {entry.changedBy}
              </div>
            </div>
            <div style={{ paddingRight: "12px" }}>
              <div style={{ fontSize: "12px", color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>{entry.reason}</div>
              {entry.from !== "-" && (
                <div style={{ fontSize: "11px", marginTop: "3px", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: fromColor, fontWeight: 600 }}>{entry.from}</span>
                  <span style={{ color: "#9ca3af" }}> → </span>
                  <span style={{ color: toColor, fontWeight: 600 }}>{entry.to}</span>
                </div>
              )}
            </div>
            <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>{entry.timestamp}</div>
          </div>
        );
      })}
    </div>
  );
}
