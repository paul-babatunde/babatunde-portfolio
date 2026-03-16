import { useState, useEffect } from "react";
import StatusCard from "./components/StatusCard";
import AlertBanner from "./components/AlertBanner";
import LogTable from "./components/LogTable";
import { systemServices, incidentLog } from "./data/incidents";

const font = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;600&display=swap');
`;

export default function IncidentDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [tick, setTick] = useState(0);

  // Simulate a live "last refreshed" ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    setTick(0);
  };

  const operational = systemServices.filter(s => s.status === "operational").length;
  const degraded    = systemServices.filter(s => s.status === "degraded").length;
  const incident    = systemServices.filter(s => s.status === "incident").length;
  const activeInc   = incidentLog.filter(i => i.status !== "resolved").length;

  const overallStatus = incident > 0 ? "Major Incident" : degraded > 0 ? "Partial Outage" : "All Systems Operational";
  const overallColor  = incident > 0 ? "#ef4444" : degraded > 0 ? "#f59e0b" : "#10b981";

  return (
    <>
      <style>{font}</style>
      <div style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif",
        padding: "32px 24px",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: overallColor,
                  boxShadow: `0 0 0 4px ${overallColor}22`,
                }} />
                <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>
                  System Status Dashboard
                </h1>
              </div>
              <p style={{ margin: "4px 0 0 20px", fontSize: "13px", color: "#6b7280" }}>
                {overallStatus} · Refreshed {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              style={{
                background: "#111827", color: "#fff",
                border: "none", borderRadius: "8px",
                padding: "9px 18px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: "6px",
              }}
            >
              ↻ Refresh
            </button>
          </div>

          {/* Summary stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}>
            {[
              { label: "Operational",  value: operational, color: "#10b981", bg: "#ecfdf5" },
              { label: "Degraded",     value: degraded,    color: "#f59e0b", bg: "#fffbeb" },
              { label: "Incident",     value: incident,    color: "#ef4444", bg: "#fef2f2" },
              { label: "Active Incidents", value: activeInc, color: "#6366f1", bg: "#eef2ff" },
            ].map(stat => (
              <div key={stat.label} style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "16px 18px",
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Alert banner */}
          <AlertBanner incidents={incidentLog} />

          {/* Services grid */}
          <div style={{
            background: "#fff", borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "20px",
            marginBottom: "24px",
          }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 600, color: "#374151", letterSpacing: "0.03em" }}>
              SERVICE HEALTH
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {systemServices.map(service => (
                <StatusCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Incident log */}
          <div style={{
            background: "#fff", borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#374151", letterSpacing: "0.03em" }}>
                INCIDENT LOG
              </h2>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                Click a row to view root cause analysis
              </span>
            </div>
            <LogTable incidents={incidentLog} />
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#d1d5db", marginTop: "28px" }}>
            Portfolio Project 1 — Babatunde Paul · Systems Analyst · CAC Application
          </p>
        </div>
      </div>
    </>
  );
}
