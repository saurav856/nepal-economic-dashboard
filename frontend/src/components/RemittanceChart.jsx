import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

function RemittanceChart({ data }) {
  const formatted = data.map(d => ({
    ...d,
    remittance_b: parseFloat((d.remittance_usd / 1e9).toFixed(2))
  }))

  return (
    <div style={{ background: "var(--color-surface)", padding: "32px", marginTop: "32px" }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 600, marginBottom: "24px" }}>
        Remittance Inflows (USD Billion)
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="year" tick={{ fontFamily: "IBM Plex Mono", fontSize: 11 }} />
          <YAxis tick={{ fontFamily: "IBM Plex Mono", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "var(--color-text)", border: "none", color: "var(--color-bg)", fontFamily: "IBM Plex Mono", fontSize: "12px" }}
            formatter={(v) => [`$${v}B`, "Remittance"]}
          />
          <Line type="monotone" dataKey="remittance_b" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RemittanceChart