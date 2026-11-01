import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import Logo from '../ui/Logo'
import { navItems } from './navigation'
import { useAppState } from '../../context/AppStateContext'

export default function Sidebar() {
  const { streak, completedToday } = useAppState()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-line bg-bg-2/50 p-6 backdrop-blur-xl lg:flex">
      <Logo />

      <nav className="mt-10 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, live }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-2xl border border-accent/25 bg-accent/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon size={19} className={`relative ${isActive ? 'text-accent' : ''}`} />
                <span className="relative">{label}</span>
                {live && (
                  <span className="relative ml-auto flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-5">
        <div className="glass relative overflow-hidden p-5">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-500/30 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/15 text-orange-400">
              <Flame size={22} className="fill-orange-500/40" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">{streak}-day streak</p>
              <p className="text-xs text-muted">{completedToday ? 'Secured for today. Nice work!' : 'Train today to keep it alive'}</p>
            </div>
          </div>
          {!completedToday && (
            <Link to="/workout" className="btn btn-primary btn-sm relative mt-4 w-full">
              Start workout
            </Link>
          )}
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} PulseFit · Train smarter.</p>
      </div>
    </aside>
  )
}
