import { CalendarDays, Dumbbell, LayoutDashboard, Timer, TrendingUp, User } from 'lucide-react'

export const navItems = [
  { to: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard },
  { to: '/library', label: 'Workout Library', short: 'Workouts', icon: Dumbbell },
  { to: '/workout', label: 'Live Workout', short: 'Live', icon: Timer, live: true },
  { to: '/progress', label: 'Progress', short: 'Progress', icon: TrendingUp },
  { to: '/classes', label: 'Classes', short: 'Classes', icon: CalendarDays },
  { to: '/profile', label: 'Profile', short: 'Profile', icon: User },
]
