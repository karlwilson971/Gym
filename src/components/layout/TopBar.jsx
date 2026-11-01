import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import Logo from '../ui/Logo'
import ThemeToggle from '../ui/ThemeToggle'
import Avatar from '../ui/Avatar'
import { useToast } from '../../context/ToastContext'

export default function TopBar() {
  const toast = useToast()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/70 backdrop-blur-xl lg:border-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="lg:hidden">
          <Logo size="sm" />
        </div>
        <p className="hidden text-sm text-muted lg:block">{today}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast({ type: 'info', title: "You're all caught up", message: 'No new notifications. Go lift something heavy.' })}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-fg transition-colors hover:border-accent/50"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-bg" />
          </button>
          <ThemeToggle />
          <Link to="/profile" aria-label="Your profile" className="ml-1 rounded-full transition hover:scale-105">
            <Avatar size={40} />
          </Link>
        </div>
      </div>
    </header>
  )
}
