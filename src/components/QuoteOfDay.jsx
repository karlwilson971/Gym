import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, RefreshCw } from 'lucide-react'
import Card from './ui/Card'
import { quotes } from '../data/mockData'
import { dayOfYear } from '../lib/utils'

export default function QuoteOfDay({ className = '' }) {
  const [i, setI] = useState(() => dayOfYear() % quotes.length)
  const q = quotes[i]

  return (
    <Card className={`overflow-hidden ${className}`}>
      <Quote className="pointer-events-none absolute -right-4 -top-4 text-accent/10" size={150} />
      <div className="relative flex items-center justify-between">
        <p className="eyebrow">Quote of the day</p>
        <button
          onClick={() => setI((x) => (x + 1) % quotes.length)}
          className="rounded-full p-2 text-muted transition hover:rotate-180 hover:text-fg"
          aria-label="Show another quote"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative mt-4"
        >
          <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">“{q.text}”</p>
          <footer className="mt-3 text-sm text-muted">— {q.author}</footer>
        </motion.blockquote>
      </AnimatePresence>
    </Card>
  )
}
