"use client"

import { useState, useEffect } from "react"

interface SettingsPanelProps {
  theme: string
  setTheme: (theme: string) => void
}

export default function SettingsPanel({ theme, setTheme }: SettingsPanelProps) {
  const [isActive, setIsActive] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-preference")
    if (savedMode) {
      setIsDarkMode(savedMode === "minimal")
      document.documentElement.setAttribute("data-theme", savedMode)
    }
  }, [])

  const togglePanel = () => {
    setIsActive(!isActive)
  }

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    Object.entries(themes[newTheme]).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("preferred-theme", newTheme)
  }

  const handleModeToggle = () => {
    const newMode = isDarkMode ? "futuristic" : "minimal"
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute("data-theme", newMode)
    localStorage.setItem("theme-preference", newMode)
  }

  return (
    <div className={`settings-panel ${isActive ? "active" : ""}`}>
      <button className="settings-toggle" onClick={togglePanel}>
        <i className="fas fa-cog"></i>
      </button>

      <div className="settings-content">
        <h3>Theme Settings</h3>

        <div className="theme-options">
          <div className="color-scheme">
            <h4>Color Scheme</h4>
            <div className="color-buttons">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  className={`color-btn ${theme === themeKey ? "active" : ""}`}
                  style={{ "--color": themes[themeKey]["--neon-blue"] } as React.CSSProperties}
                  onClick={() => handleThemeChange(themeKey)}
                ></button>
              ))}
            </div>
          </div>

          <div className="mode-toggle">
            <h4>Mode</h4>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={handleModeToggle} />
              <span className="slider">
                <i className="fas fa-sun"></i>
                <i className="fas fa-moon"></i>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

const themes = {
  cyber: {
    "--neon-blue": "#00f3ff",
    "--dark-bg": "#0a0a0a",
    "--accent": "#ff2957",
  },
  purple: {
    "--neon-blue": "#b24fff",
    "--dark-bg": "#0a0a0a",
    "--accent": "#00f3ff",
  },
  green: {
    "--neon-blue": "#00ff9d",
    "--dark-bg": "#0a0a0a",
    "--accent": "#ff2957",
  },
  red: {
    "--neon-blue": "#ff2957",
    "--dark-bg": "#0a0a0a",
    "--accent": "#00f3ff",
  },
}

