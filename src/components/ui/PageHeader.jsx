import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

export default function PageHeader({ eyebrow, title, highlight, subtitle, action }) {
  return (
    <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-3xl font-bold sm:text-4xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {subtitle && <p className="mt-2 max-w-xl text-muted">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  )
}
