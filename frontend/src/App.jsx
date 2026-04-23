import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard toggleTheme={toggleTheme} theme={theme} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App