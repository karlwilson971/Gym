import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { user } from '../data/mockData'
import { todayKey } from '../lib/utils'

const KEY = 'pulsefit-state-v1'

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

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

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
