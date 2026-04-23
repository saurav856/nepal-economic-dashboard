import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"

function ExchangeInflationChart({ data }) {
  return (
    <div style={{ background: "var(--color-surface)", padding: "32px", marginTop: "32px" }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Exchange Rate vs Inflation
      </h2>
      <p style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "24px", fontFamily: "IBM Plex Mono" }}>
        NPR/USD rate and CPI inflation % over time
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="year" tick={{ fontFamily: "IBM Plex Mono", fontSize: 11 }} />
          <YAxis yAxisId="left" tick={{ fontFamily: "IBM Plex Mono", fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontFamily: "IBM Plex Mono", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "var(--color-text)", border: "none", color: "var(--color-bg)", fontFamily: "IBM Plex Mono", fontSize: "12px" }}
            formatter={(v, name) => [
              name === "exchange_rate_npr_usd" ? `${v.toFixed(1)} NPR` : `${v.toFixed(1)}%`,
              name === "exchange_rate_npr_usd" ? "Exchange Rate" : "Inflation"
            ]}
          />
          <Legend wrapperStyle={{ fontFamily: "DM Sans", fontSize: "13px" }}
            formatter={(v) => v === "exchange_rate_npr_usd" ? "Exchange Rate (NPR/USD)" : "Inflation (%)"}
          />
          <Line yAxisId="left" type="monotone" dataKey="exchange_rate_npr_usd" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="inflation_pct" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExchangeInflationChart