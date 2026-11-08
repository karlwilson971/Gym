import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { user } from '../data/mockData'
import { todayKey } from '../lib/utils'

const KEY = 'pulsefit-state-v1'
const CLIENT_KEY = 'pulsefit-client-id-v1'

const initial = {
  bookings: ['c-1-1'],
  totalWorkouts: user.totalWorkouts,
  weekWorkouts: user.weekWorkouts,
  streak: user.streak,
  completedOn: null,
  notifications: true,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

function getClientId() {
  try {
    let id = localStorage.getItem(CLIENT_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(CLIENT_KEY, id)
    }
    return id
  } catch {
    return null
  }
}

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [state, setState] = useState(load)
  const [clientId, setClientId] = useState(null)
  const [databaseReady, setDatabaseReady] = useState(false)
  const stateRef = useRef(state)
  const initialStateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    const id = getClientId()
    setClientId(id)
    let active = true

    if (!id) {
      setDatabaseReady(true)
      return () => { active = false }
    }

    fetch(`/api/state?clientId=${encodeURIComponent(id)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active && result?.state && JSON.stringify(stateRef.current) === JSON.stringify(initialStateRef.current)) {
          setState({ ...initial, ...result.state })
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setDatabaseReady(true)
      })

    return () => { active = false }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  useEffect(() => {
    if (!databaseReady || !clientId) return

    const timeout = setTimeout(() => {
      fetch('/api/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, state }),
      }).catch(() => {})
    }, 350)

    return () => clearTimeout(timeout)
  }, [state, clientId, databaseReady])

  const toggleBooking = useCallback(
    (id) =>
      setState((s) => ({
        ...s,
        bookings: s.bookings.includes(id) ? s.bookings.filter((b) => b !== id) : [...s.bookings, id],
      })),
    [],
  )

  const completeWorkout = useCallback(
    () =>
      setState((s) =>
        s.completedOn === todayKey()
          ? { ...s, totalWorkouts: s.totalWorkouts + 1 }
          : {
              ...s,
              totalWorkouts: s.totalWorkouts + 1,
              weekWorkouts: s.weekWorkouts + 1,
              streak: s.streak + 1,
              completedOn: todayKey(),
            },
      ),
    [],
  )

  const setNotifications = useCallback((v) => setState((s) => ({ ...s, notifications: v })), [])
  const reset = useCallback(() => setState(initial), [])

  const value = useMemo(
    () => ({
      ...state,
      completedToday: state.completedOn === todayKey(),
      toggleBooking,
      completeWorkout,
      setNotifications,
      reset,
    }),
    [state, toggleBooking, completeWorkout, setNotifications, reset],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => useContext(AppStateContext)
