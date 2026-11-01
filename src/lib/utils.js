export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

export function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d - start) / 864e5)
}

/** Monday = 0 … Sunday = 6 */
export function todayIndex() {
  return (new Date().getDay() + 6) % 7
}

function describe(d) {
  return {
    label: d.toLocaleDateString('en-US', { weekday: 'short' }),
    date: d.getDate(),
    full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  }
}

/** The current Mon–Sun week. */
export function currentWeek() {
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - todayIndex())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return describe(d)
  })
}

/** Today plus the next six days. */
export function upcomingDays() {
  const now = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    return describe(d)
  })
}

export function todayKey() {
  return new Date().toDateString()
}
