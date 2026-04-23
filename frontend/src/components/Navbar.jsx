import { Link } from "react-router-dom"

function Navbar({ toggleTheme, theme }) {
  return (
    <nav style={{
      borderBottom: "1px solid var(--color-border)",
      padding: "16px clamp(24px, 5vw, 48px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px"
    }}>
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "12px",
        fontWeight: 600,
        color: "var(--color-primary)",
        textTransform: "uppercase",
        letterSpacing: "0.08em"
      }}>
        Nepal Economic Dashboard
      </span>
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link to="/" style={{ color: "var(--color-muted)", textDecoration: "none", fontSize: "14px" }}>Dashboard</Link>
        <Link to="/about" style={{ color: "var(--color-muted)", textDecoration: "none", fontSize: "14px" }}>About</Link>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            color: "var(--color-muted)",
            fontFamily: "IBM Plex Mono",
            fontSize: "11px",
            padding: "6px 12px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar