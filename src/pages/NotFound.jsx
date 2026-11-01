import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import Backdrop from '../components/layout/Backdrop'
import Logo from '../components/ui/Logo'
import usePageTitle from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="grid min-h-dvh place-items-center p-6 text-center">
      <Backdrop />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass max-w-md p-8 sm:p-10">
        <Logo size="sm" />
        <motion.div
          animate={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-3xl bg-accent/15 text-accent"
        >
          <Dumbbell size={40} />
        </motion.div>
        <p className="mt-6 font-display text-6xl font-bold text-gradient">404</p>
        <h1 className="mt-2 text-2xl font-bold">This page skipped leg day.</h1>
        <p className="mt-2 text-muted">We couldn&apos;t find what you were looking for. Let&apos;s get you back to training.</p>
        <Link to="/dashboard" className="btn btn-primary mt-6">
          Back to dashboard
        </Link>
      </motion.div>
    </div>
  )
}
