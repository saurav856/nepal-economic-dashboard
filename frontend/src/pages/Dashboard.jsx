import { useEffect, useState } from "react"
import { getEconomics, getPredict } from "../api/client"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import RemittanceChart from "../components/RemittanceChart"
import ExchangeInflationChart from "../components/ExchangeInflationChart"
import ForecastChart from "../components/ForecastChart"

function Dashboard({ toggleTheme, theme }) {
  const [data, setData] = useState([])
  const [forecast, setForecast] = useState({ historical: [], forecast: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getEconomics(), getPredict(3)])
      .then(([econRes, forecastRes]) => {
        setData(econRes.data)
        setForecast(forecastRes.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const latest = data[data.length - 1]
  const prev = data[data.length - 2]
  const yoy = latest && prev
    ? (((latest.remittance_usd - prev.remittance_usd) / prev.remittance_usd) * 100).toFixed(1)
    : null

  return (
    <div>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div style={{ padding: "clamp(24px, 5vw, 64px)", maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 600,
          marginBottom: "8px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em"
        }}>
          Nepal Economic Dashboard
        </h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "clamp(24px, 4vw, 40px)", fontSize: "clamp(14px, 2vw, 16px)" }}>
          Remittance · Exchange Rate · Inflation · 2000–2024
        </p>

        {loading ? (
          <p style={{ fontFamily: "IBM Plex Mono", color: "var(--color-muted)" }}>Loading...</p>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <StatCard
                label={"Total Remittance " + latest?.year}
                value={"$" + (latest?.remittance_usd / 1e9).toFixed(2) + "B"}
                sub="USD billions"
              />
              <StatCard
                label="YoY Remittance Growth"
                value={yoy ? yoy + "%" : "--"}
                sub={prev?.year + " to " + latest?.year}
                accent="var(--color-accent)"
              />
              <StatCard
                label={"Exchange Rate " + latest?.year}
                value={latest?.exchange_rate_npr_usd?.toFixed(1)}
                sub="NPR per 1 USD"
                accent="var(--color-chart-3)"
              />
            </div>
            <RemittanceChart data={data} />
            <ExchangeInflationChart data={data} />
            <ForecastChart historical={forecast.historical} forecast={forecast.forecast} />
          </div>
        )}
      </div>

      <footer style={{
        borderTop: "1px solid var(--color-border)",
        padding: "24px clamp(24px, 5vw, 48px)",
        color: "var(--color-muted)",
        fontSize: "13px",
        fontFamily: "IBM Plex Mono",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>Data: World Bank</span>
        <span>
          Built by <a href="https://github.com/saurav856" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Saurav</a>
        </span>
      </footer>
    </div>
  )
}

export default Dashboard