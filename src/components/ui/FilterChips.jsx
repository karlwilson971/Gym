import { motion } from 'framer-motion'

export default function FilterChips({ options, value, onChange, layoutId }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active ? 'border-transparent text-ink' : 'border-line bg-card text-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="bg-brand shadow-glow absolute inset-0 rounded-full"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}
