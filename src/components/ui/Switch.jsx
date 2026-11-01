import { motion } from 'framer-motion'

export default function Switch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors ${
        checked ? 'bg-brand justify-end' : 'justify-start bg-line'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`h-5 w-5 rounded-full shadow ${checked ? 'bg-ink' : 'bg-fg/60'}`}
      />
    </button>
  )
}
