import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'

const ToastContext = createContext(() => {})

const styles = {
  success: { icon: CircleCheck, cls: 'text-accent bg-accent/15' },
  error: { icon: CircleAlert, cls: 'text-danger bg-danger/15' },
  info: { icon: Info, cls: 'text-accent-2 bg-accent-2/15' },
}

let counter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((ts) => ts.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    ({ type = 'success', title, message, duration = 3600 }) => {
      const id = ++counter
      setToasts((ts) => [...ts.slice(-2), { id, type, title, message }])
      setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-3 z-[150] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:top-6 sm:items-end"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const s = styles[t.type] ?? styles.info
            const Icon = s.icon
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="glass-strong pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl p-3.5 pr-2"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${s.cls}`}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-display text-sm font-semibold">{t.title}</p>
                  {t.message && <p className="mt-0.5 text-sm text-muted">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1.5 text-muted transition-colors hover:text-fg"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
