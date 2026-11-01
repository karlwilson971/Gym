import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bike, CalendarDays, Check, Clock, Flower2, MapPin, Swords, Zap } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import FilterChips from '../components/ui/FilterChips'
import EmptyState from '../components/ui/EmptyState'
import { classTypes, classes } from '../data/mockData'
import { useAppState } from '../context/AppStateContext'
import { useToast } from '../context/ToastContext'
import { fadeUp, stagger } from '../lib/motion'
import { upcomingDays } from '../lib/utils'
import usePageTitle from '../lib/usePageTitle'

const typeMeta = {
  Yoga: { icon: Flower2, cls: 'text-accent-3 bg-accent-3/15' },
  HIIT: { icon: Zap, cls: 'text-danger bg-danger/15' },
  Spin: { icon: Bike, cls: 'text-accent-2 bg-accent-2/15' },
  Boxing: { icon: Swords, cls: 'text-gold bg-gold/15' },
}

export default function Classes() {
  usePageTitle('Classes')
  const days = upcomingDays()
  const [day, setDay] = useState(0)
  const [type, setType] = useState('All')
  const { bookings, toggleBooking } = useAppState()
  const toast = useToast()

  const dayName = (d) => (d === 0 ? 'today' : d === 1 ? 'tomorrow' : days[d].label)
  const list = classes.filter((c) => c.day === day && (type === 'All' || c.type === type))

  const book = (c) => {
    if (bookings.includes(c.id)) {
      toggleBooking(c.id)
      toast({ type: 'info', title: 'Booking cancelled', message: `Your spot in ${c.name} is free for someone else.` })
      return
    }
    if (c.spots === 0) {
      const alt = classes.find((x) => x.type === c.type && x.spots > 0 && x.day >= c.day && x.id !== c.id)
      toast({
        type: 'error',
        title: `${c.name} is fully booked`,
        message: alt
          ? `Try ${alt.name} ${dayName(alt.day)} at ${alt.time}. Spots are still open.`
          : 'Spots often open up last-minute, so check back soon.',
        duration: 5000,
      })
      return
    }
    toggleBooking(c.id)
    toast({ title: "You're in!", message: `${c.name} · ${dayName(c.day)} at ${c.time} with ${c.coach}.` })
  }

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show">
      <PageHeader
        eyebrow="Class booking"
        title="Sweat with"
        highlight="the squad."
        subtitle="Yoga, HIIT, Spin and Boxing all week long. Grab a spot before they're gone."
        action={
          <span className="chip">
            <CalendarDays size={14} className="text-accent" /> {bookings.length} booked
          </span>
        }
      />

      <motion.div variants={fadeUp} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {days.map((d, i) => {
          const active = day === i
          const hasBooking = classes.some((c) => c.day === i && bookings.includes(c.id))
          return (
            <button
              key={i}
              onClick={() => setDay(i)}
              className={`relative flex min-w-[68px] flex-1 flex-col items-center rounded-2xl border px-3 py-3 transition-colors ${
                active ? 'border-transparent text-ink' : 'border-line bg-card hover:border-accent/40'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="day-pill"
                  className="bg-brand shadow-glow absolute inset-0 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative text-xs font-medium ${active ? '' : 'text-muted'}`}>{i === 0 ? 'Today' : d.label}</span>
              <span className="relative font-display text-2xl font-bold">{d.date}</span>
              <span className={`relative mt-0.5 h-1.5 w-1.5 rounded-full ${hasBooking ? (active ? 'bg-ink' : 'bg-accent') : 'bg-transparent'}`} />
            </button>
          )
        })}
      </motion.div>

      <motion.div variants={fadeUp} className="mb-6 mt-4">
        <FilterChips options={['All', ...classTypes]} value={type} onChange={setType} layoutId="type-pill" />
      </motion.div>

      {list.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={`No ${type} classes ${dayName(day)}`}
          message="Try another day or switch to all class types. There's always something on."
          action={
            <button className="btn btn-ghost btn-sm" onClick={() => setType('All')}>
              Show all classes
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((c, i) => {
              const meta = typeMeta[c.type]
              const Icon = meta.icon
              const booked = bookings.includes(c.id)
              const left = Math.max(0, c.spots - (booked ? 1 : 0))
              const full = c.spots === 0
              return (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className={`glass hover-glow flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5 ${booked ? 'border-accent/40' : ''}`}
                >
                  <div className="flex items-center gap-4 sm:contents">
                    <div className="w-20 shrink-0 sm:w-24">
                      <p className="font-display text-2xl font-bold tabular-nums">{c.time}</p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <Clock size={12} /> {c.duration} min
                      </p>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${meta.cls}`}>
                        <Icon size={22} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-semibold">{c.name}</p>
                        <p className="flex items-center gap-1 truncate text-sm text-muted">
                          {c.coach} <span className="opacity-50">·</span> <MapPin size={12} /> {c.room}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:w-64">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs">
                        <span className={full ? 'font-semibold text-danger' : left <= 3 ? 'font-semibold text-gold' : 'text-muted'}>
                          {full ? 'Full' : `${left} spot${left === 1 ? '' : 's'} left`}
                        </span>
                        <span className="text-muted">{c.capacity}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                        <motion.div
                          className={`h-full rounded-full ${full ? 'bg-danger' : 'bg-brand'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(1 - left / c.capacity) * 100}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => book(c)}
                      className={`btn btn-sm min-w-[104px] ${booked ? 'btn-ghost border-accent/40 text-accent' : full ? 'btn-ghost text-muted' : 'btn-primary'}`}
                    >
                      {booked ? (
                        <>
                          <Check size={16} /> Booked
                        </>
                      ) : full ? (
                        'Full'
                      ) : (
                        'Book'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
