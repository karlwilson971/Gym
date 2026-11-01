import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

// Hex values for SVG/Recharts, which can't read CSS variables reliably.
const palettes = {
  dark: {
    accent: '#c6ff3d',
    accent2: '#22d3ee',
    accent3: '#a78bfa',
    grid: 'rgba(255,255,255,0.07)',
    track: 'rgba(255,255,255,0.08)',
    muted: '#8b95a5',
    fg: '#eef2f6',
  },
  light: {
    accent: '#4d8f00',
    accent2: '#0e8fae',
    accent3: '#7c3aed',
    grid: 'rgba(11,15,20,0.08)',
    track: 'rgba(11,15,20,0.08)',
    muted: '#5b6573',
    fg: '#0b0f14',
  },
}

function readTheme() {
  try {
    const saved = localStorage.getItem('pulsefit-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage unavailable */
  }
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#05070a' : '#f3f5f0')
    try {
      localStorage.setItem('pulsefit-theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      palette: palettes[theme],
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
