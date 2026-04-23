import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"

function ForecastChart({ historical, forecast }) {
  const combined = [
    ...historical.map(d => ({
      year_ad: d.year_ad,
      actual: parseFloat((d.total_amount_usd / 1e9).toFixed(2)),
      predicted: null
    })),
    ...forecast.map(d => ({
      year_ad: d.year_ad,
      actual: null,
      predicted: parseFloat((d.predicted_amount_usd / 1e9).toFixed(2))
    }))
  ]

  return (
    <div style={{ background: "var(--color-surface)", padding: "32px", marginTop: "32px" }}>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "20px",
        fontWeight: 600,
        marginBottom: "8px",
        color: "var(--color-text)"
      }}>Remittance Forecast</h2>
      <p style={{
        fontSize: "13px",
        color: "var(--color-muted)",
        marginBottom: "24px",
        fontFamily: "IBM Plex Mono"
      }}>Based on linear trend model.</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={combined}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="year_ad" tick={{ fontFamily: "IBM Plex Mono", fontSize: 12 }} />
          <YAxis tick={{ fontFamily: "IBM Plex Mono", fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
          <Tooltip
            contentStyle={{
              background: "var(--color-text)",
              border: "none",
              color: "var(--color-bg)",
              fontFamily: "IBM Plex Mono",
              fontSize: "12px"
            }}
            formatter={(value, name) => [
              value ? `$${value}B` : "--",
              name === "actual" ? "Actual" : "Forecast"
            ]}
          />
          <Legend
            formatter={(value) => value === "actual" ? "Actual" : "Forecast"}
            wrapperStyle={{ fontFamily: "DM Sans", fontSize: "13px" }}
          />
          <Line type="monotone" dataKey="actual" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} connectNulls={false} />
          <Line type="monotone" dataKey="predicted" stroke="var(--color-chart-2)" strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ForecastChart