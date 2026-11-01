import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from './navigation'

const mobileItems = ['/dashboard', '/library', '/workout', '/classes', '/progress'].map((to) =>
  navItems.find((n) => n.to === to),
)

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] lg:hidden" aria-label="Primary">
      <div className="glass-strong mx-auto flex max-w-md items-end justify-around rounded-[1.75rem] px-2 py-2">
        {mobileItems.map(({ to, short, icon: Icon, live }) =>
          live ? (
            <NavLink key={to} to={to} aria-label="Live workout" className="relative -mt-7 flex flex-1 flex-col items-center gap-1">
              {({ isActive }) => (
                <>
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className={`bg-brand grid h-14 w-14 place-items-center rounded-2xl text-ink shadow-[0_10px_30px_-6px_rgba(198,255,61,0.75)] ring-4 ring-bg ${
                      isActive ? 'scale-105' : ''
                    }`}
                  >
                    <Icon size={24} strokeWidth={2.4} />
                  </motion.span>
                  <span className={`text-[11px] font-medium ${isActive ? 'text-fg' : 'text-muted'}`}>{short}</span>
                </>
              )}
            </NavLink>
          ) : (
            <NavLink key={to} to={to} className="relative flex flex-1 flex-col items-center gap-1 py-1.5 text-[11px] font-medium">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="bottom-pill"
                      className="absolute inset-x-1 inset-y-0 rounded-2xl bg-accent/12"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={20} className={`relative ${isActive ? 'text-accent' : 'text-muted'}`} />
                  <span className={`relative ${isActive ? 'text-fg' : 'text-muted'}`}>{short}</span>
                </>
              )}
            </NavLink>
          ),
        )}
      </div>
    </nav>
  )
}
