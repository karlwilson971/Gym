import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dumbbell, Plus, Search, SearchX, Check } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import FilterChips from '../components/ui/FilterChips'
import EmptyState from '../components/ui/EmptyState'
import { exercises, muscleGroups } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import { fadeUp, stagger } from '../lib/motion'
import usePageTitle from '../lib/usePageTitle'

const groups = ['All', ...muscleGroups]

const muscleStyles = {
  Chest: 'text-accent bg-accent/12 border-accent/20',
  Back: 'text-accent-2 bg-accent-2/12 border-accent-2/20',
  Legs: 'text-accent-3 bg-accent-3/12 border-accent-3/20',
  Arms: 'text-gold bg-gold/12 border-gold/20',
  Core: 'text-danger bg-danger/12 border-danger/20',
  Cardio: 'text-orange-400 bg-orange-400/12 border-orange-400/20',
}

function Difficulty({ level }) {
  const n = { Beginner: 1, Intermediate: 2, Advanced: 3 }[level]
  return (
    <span className="flex items-center gap-2 text-xs text-muted" title={`Difficulty: ${level}`}>
      <span className="flex items-end gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`w-1.5 rounded-full ${i <= n ? 'bg-accent' : 'bg-line'}`} style={{ height: 4 + i * 4 }} />
        ))}
      </span>
      {level}
    </span>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-bg/30 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="font-display text-lg font-semibold">{value}</p>
    </div>
  )
}

export default function Library() {
  usePageTitle('Workout Library')
  const toast = useToast()
  const [group, setGroup] = useState('All')
  const [query, setQuery] = useState('')
  const [added, setAdded] = useState([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exercises.filter(
      (e) => (group === 'All' || e.muscle === group) && (e.name.toLowerCase().includes(q) || e.equipment.toLowerCase().includes(q)),
    )
  }, [group, query])

  const add = (ex) => {
    if (added.includes(ex.id)) {
      toast({ type: 'info', title: 'Already in your plan', message: `${ex.name} is queued up for your next session.` })
      return
    }
    setAdded((a) => [...a, ex.id])
    toast({ title: 'Added to your plan', message: `${ex.name} · ${ex.sets} × ${ex.reps}` })
  }

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show">
      <PageHeader
        eyebrow="Workout library"
        title="Find your next"
        highlight="favorite move."
        subtitle={`${exercises.length} exercises across ${muscleGroups.length} muscle groups, each with sets, reps and difficulty.`}
        action={
          added.length > 0 && (
            <span className="chip border-accent/40 text-accent">
              <Check size={14} /> {added.length} added to plan
            </span>
          )
        }
      />

      <motion.div variants={fadeUp} className="mb-6 space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises or equipment…"
            className="w-full rounded-2xl border border-line bg-card py-3.5 pl-11 pr-4 text-fg outline-none backdrop-blur-xl transition placeholder:text-muted focus:border-accent/60 focus:ring-4 focus:ring-accent/10"
          />
        </div>
        <FilterChips options={groups} value={group} onChange={setGroup} layoutId="muscle-pill" />
      </motion.div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No exercises found"
          message={`Nothing matches “${query}”${group !== 'All' ? ` in ${group}` : ''}. Try another muscle group or a shorter search.`}
          action={
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setQuery('')
                setGroup('All')
              }}
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {filtered.map((ex) => (
              <motion.article
                key={ex.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="glass hover-glow flex flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span className={`chip ${muscleStyles[ex.muscle]}`}>{ex.muscle}</span>
                  <Difficulty level={ex.difficulty} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{ex.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{ex.description}</p>
                <div className="mb-5 mt-5 grid grid-cols-3 gap-2">
                  <Stat label="Sets" value={ex.sets} />
                  <Stat label="Reps" value={ex.reps} />
                  <Stat label="Rest" value={ex.rest ? `${ex.rest}s` : '—'} />
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Dumbbell size={15} /> {ex.equipment}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => add(ex)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-medium transition-colors ${
                      added.includes(ex.id) ? 'bg-accent/15 text-accent' : 'text-accent hover:bg-accent/10'
                    }`}
                  >
                    {added.includes(ex.id) ? <Check size={16} /> : <Plus size={16} />}
                    {added.includes(ex.id) ? 'Added' : 'Add'}
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}
