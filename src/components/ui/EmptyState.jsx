import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function EmptyState({ icon: Icon = Search, title, message, action, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center text-center ${compact ? 'py-6' : 'py-16'}`}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-accent/25 blur-2xl" />
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-line bg-card text-accent">
          <Icon size={28} />
        </div>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}
