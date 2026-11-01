import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

export default function Card({ hover = false, pad = true, className = '', children, ...rest }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`glass relative ${pad ? 'p-5 sm:p-6' : ''} ${hover ? 'hover-glow cursor-pointer' : ''} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
