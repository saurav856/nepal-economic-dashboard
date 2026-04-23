function StatCard({ label, value, sub, accent }) {
    return (
      <div style={{
        background: "var(--color-surface)",
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          color: "var(--color-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        }}>{label}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 600,
          color: "var(--color-text)",
          lineHeight: 1
        }}>{value}</span>
        {sub && <span style={{
          fontSize: "13px",
          color: "var(--color-muted)"
        }}>{sub}</span>}
      </div>
    )
  }
  
  export default StatCard