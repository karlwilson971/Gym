import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Dumbbell, Flag, Flame, Pause, Play, RotateCcw, SkipForward, Sparkles, Timer, Trophy } from 'lucide-react'
import Card from '../components/ui/Card'
import { todayWorkout } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useAppState } from '../context/AppStateContext'
import { celebrate } from '../lib/confetti'
import { ease, fadeUp, stagger } from '../lib/motion'
import { formatTime } from '../lib/utils'
import usePageTitle from '../lib/usePageTitle'

const plan = todayWorkout
const totalSets = plan.exercises.reduce((a, e) => a + e.sets, 0)
const freshSets = () => plan.exercises.map((e) => Array(e.sets).fill(false))
const idleRest = { total: 0, left: 0, running: false }

function RestTimer({ rest, setRest, startRest }) {
  const { palette } = useTheme()
  const size = 240
  const stroke = 14
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const resting = rest.left > 0
  const status = !rest.total ? 'Ready' : resting ? (rest.running ? 'Resting' : 'Paused') : 'Go!'
  const frac = !rest.total ? 1 : rest.left / rest.total

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <p className="eyebrow">Rest timer</p>
        <span className={`chip ${rest.running ? 'border-accent/40 text-accent' : ''}`}>{status}</span>
      </div>

      <div className="relative mt-5" style={{ width: size, height: size }}>
        <div className={`bg-brand absolute inset-8 rounded-full blur-3xl transition-opacity duration-500 ${rest.running ? 'opacity-30' : 'opacity-10'}`} />
        <svg width={size} height={size} className="relative -rotate-90" aria-hidden>
          <defs>
            <linearGradient id="restGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={palette.accent} />
              <stop offset="100%" stopColor={palette.accent2} />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={palette.track} strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#restGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={false}
            animate={{ strokeDashoffset: c * (1 - frac), opacity: rest.total ? 1 : 0.35 }}
            transition={{ duration: rest.running ? 1 : 0.5, ease: 'linear' }}
            style={{ filter: `drop-shadow(0 0 10px ${palette.accent}88)` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center" aria-live="polite">
          <div>
            <p className="font-display text-6xl font-bold tabular-nums">
              {resting ? formatTime(rest.left) : status === 'Go!' ? 'Go!' : '0:00'}
            </p>
            <p className="mt-1 text-sm text-muted">
              {resting ? `of ${formatTime(rest.total)} rest` : status === 'Go!' ? 'Next set, let’s go' : 'Tick a set to start'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          disabled={!resting}
          onClick={() => setRest((s) => ({ ...s, left: Math.max(0, s.left - 15) }))}
          className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card font-display text-sm font-semibold transition hover:border-accent/50 disabled:opacity-40"
          aria-label="Remove 15 seconds"
        >
          −15
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => (resting ? setRest((s) => ({ ...s, running: !s.running })) : startRest(60))}
          className="bg-brand shadow-glow grid h-16 w-16 place-items-center rounded-full text-ink"
          aria-label={rest.running ? 'Pause rest timer' : 'Start rest timer'}
        >
          {rest.running ? <Pause size={26} className="fill-current" /> : <Play size={26} className="translate-x-0.5 fill-current" />}
        </motion.button>
        <button
          disabled={!resting}
          onClick={() => setRest((s) => ({ ...s, left: s.left + 15, total: Math.max(s.total, s.left + 15) }))}
          className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card font-display text-sm font-semibold transition hover:border-accent/50 disabled:opacity-40"
          aria-label="Add 15 seconds"
        >
          +15
        </button>
        <button
          disabled={!resting}
          onClick={() => setRest((s) => ({ ...s, left: 0, running: false }))}
          className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card transition hover:border-accent/50 disabled:opacity-40"
          aria-label="Skip rest"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {[30, 60, 90, 120].map((s) => (
          <button
            key={s}
            onClick={() => startRest(s)}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/50 hover:text-fg"
          >
            {s}s
          </button>
        ))}
      </div>
    </div>
  )
}

function ExerciseRow({ ex, index, sets, isActive, onSelect, onToggle }) {
  const count = sets.filter(Boolean).length
  const complete = count === sets.length

  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`glass overflow-hidden transition-colors ${isActive ? 'border-accent/40 shadow-glow' : ''}`}
    >
      <button onClick={onSelect} className="flex w-full items-center gap-4 p-4 text-left sm:p-5" aria-expanded={isActive}>
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display font-bold transition-colors ${
            complete ? 'bg-brand text-ink' : isActive ? 'bg-accent/15 text-accent' : 'bg-line text-muted'
          }`}
        >
          {complete ? <Check size={20} strokeWidth={3} /> : index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`truncate font-display text-lg font-semibold ${complete ? 'text-muted line-through decoration-accent/60' : ''}`}>
            {ex.name}
          </p>
          <p className="text-sm text-muted">
            {ex.sets} × {ex.reps} · {ex.weight} · {ex.rest}s rest
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-semibold tabular-nums">
            {count}/{sets.length}
          </p>
          <p className="text-xs text-muted">sets</p>
        </div>
        <ChevronDown size={18} className={`shrink-0 text-muted transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="grid gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
              {sets.map((done, si) => (
                <motion.button
                  key={si}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onToggle(si)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                    done ? 'border-accent/40 bg-accent/10' : 'border-line bg-bg/30 hover:border-accent/30'
                  }`}
                  aria-pressed={done}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-sm text-muted">Set {si + 1}</span>
                    <span className="font-display font-semibold">{ex.reps} reps</span>
                    <span className="text-sm text-muted">@ {ex.weight}</span>
                  </div>
                  <motion.span
                    animate={{ scale: done ? [1, 1.25, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 transition-colors ${
                      done ? 'bg-brand border-transparent text-ink' : 'border-line text-transparent'
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CompleteModal({ elapsed, doneSets, onRestart }) {
  const kcal = Math.round((plan.calories * doneSets) / totalSets)
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="complete-title"
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="glass-strong relative w-full max-w-md overflow-hidden rounded-[2rem] p-8 text-center"
      >
        <div className="bg-brand absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-40 blur-3xl" />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200, damping: 12 }}
          className="bg-brand relative mx-auto grid h-24 w-24 place-items-center rounded-3xl text-ink shadow-[0_20px_50px_-10px_rgba(198,255,61,0.7)]"
        >
          <Trophy size={48} />
        </motion.div>
        <h2 id="complete-title" className="relative mt-6 text-3xl font-bold">
          Workout complete!
        </h2>
        <p className="relative mt-2 text-muted">You showed up and put in the work. That&apos;s how strong is built.</p>
        <div className="relative mt-6 grid grid-cols-3 gap-2">
          {[
            { icon: Timer, value: formatTime(elapsed), label: 'Time' },
            { icon: Dumbbell, value: `${doneSets}/${totalSets}`, label: 'Sets' },
            { icon: Flame, value: kcal, label: 'kcal' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-line bg-card p-3">
              <Icon size={18} className="mx-auto text-accent" />
              <p className="mt-1.5 font-display text-lg font-bold tabular-nums">{value}</p>
              <p className="text-[11px] text-muted">{label}</p>
            </div>
          ))}
        </div>
        <p className="chip relative mx-auto mt-5 w-fit border-accent/40 text-accent">
          <Sparkles size={14} /> +120 XP · streak extended
        </p>
        <div className="relative mt-6 flex flex-col gap-2 sm:flex-row">
          <Link to="/dashboard" className="btn btn-primary flex-1">
            Back to dashboard
          </Link>
          <button onClick={onRestart} className="btn btn-ghost flex-1">
            <RotateCcw size={16} /> Train again
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default function LiveWorkout() {
  usePageTitle('Live Workout')
  const toast = useToast()
  const { completeWorkout } = useAppState()
  const [done, setDone] = useState(freshSets)
  const [active, setActive] = useState(0)
  const [rest, setRest] = useState(idleRest)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)

  const doneSets = done.flat().filter(Boolean).length
  const pct = doneSets / totalSets

  // Workout clock
  useEffect(() => {
    if (finished) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [finished])

  // Rest countdown
  useEffect(() => {
    if (!rest.running) return
    if (rest.left <= 0) {
      setRest((s) => ({ ...s, running: false }))
      toast({ type: 'info', title: 'Rest complete', message: 'Back to the bar. This next set is yours.' })
      try {
        navigator.vibrate?.([120, 60, 120])
      } catch {
        /* vibration unsupported */
      }
      return
    }
    const id = setTimeout(() => setRest((s) => ({ ...s, left: s.left - 1 })), 1000)
    return () => clearTimeout(id)
  }, [rest, toast])

  const startRest = (secs) => setRest({ total: secs, left: secs, running: true })

  const finish = () => {
    setFinished(true)
    setRest(idleRest)
    completeWorkout()
    celebrate()
  }

  const handleFinish = () => {
    if (doneSets === 0) {
      toast({ type: 'error', title: 'Not so fast!', message: 'Log at least one set before finishing. Even one rep counts.' })
      return
    }
    finish()
  }

  const restart = () => {
    setDone(freshSets())
    setActive(0)
    setRest(idleRest)
    setElapsed(0)
    setFinished(false)
  }

  const toggleSet = (ei, si) => {
    if (finished) return
    const next = done.map((a) => [...a])
    next[ei][si] = !next[ei][si]
    setDone(next)
    if (!next[ei][si]) return

    if (next.every((a) => a.every(Boolean))) {
      finish()
      return
    }
    const ex = plan.exercises[ei]
    if (next[ei].every(Boolean)) {
      const upNext = next.findIndex((a) => !a.every(Boolean))
      setActive(upNext)
      toast({ title: `${ex.name} done`, message: `Up next: ${plan.exercises[upNext].name}` })
    }
    startRest(ex.rest)
  }

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
            </span>
            Live workout
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{plan.title}</h1>
          <p className="mt-1 text-muted">{plan.focus}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-2xl px-4 py-2 text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted">Elapsed</p>
            <p className="font-display text-xl font-semibold tabular-nums">{formatTime(elapsed)}</p>
          </div>
          <button onClick={handleFinish} className="btn btn-primary">
            <Flag size={18} /> Finish
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted">
            {doneSets} of {totalSets} sets
          </span>
          <span className="font-display font-semibold">{Math.round(pct * 100)}%</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
          <motion.div
            className="bg-brand h-full rounded-full shadow-glow"
            animate={{ width: `${pct * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </motion.div>

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <Card className="lg:sticky lg:top-24 lg:col-span-2">
          <RestTimer rest={rest} setRest={setRest} startRest={startRest} />
        </Card>
        <motion.div variants={stagger(0.06)} className="space-y-3 lg:col-span-3">
          {plan.exercises.map((ex, ei) => (
            <ExerciseRow
              key={ex.id}
              ex={ex}
              index={ei}
              sets={done[ei]}
              isActive={active === ei}
              onSelect={() => setActive(active === ei ? -1 : ei)}
              onToggle={(si) => toggleSet(ei, si)}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile: floating rest pill so the timer is visible while ticking sets */}
      {createPortal(
        <AnimatePresence>
          {rest.left > 0 && !finished && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="glass-strong fixed inset-x-4 bottom-28 z-30 mx-auto flex max-w-sm items-center gap-3 rounded-2xl p-3 lg:hidden"
            >
              <span className="bg-brand grid h-10 w-10 place-items-center rounded-xl text-ink">
                <Timer size={20} />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted">{rest.running ? 'Resting' : 'Paused'}</p>
                <p className="font-display text-xl font-bold tabular-nums">{formatTime(rest.left)}</p>
              </div>
              <button
                onClick={() => setRest((s) => ({ ...s, running: !s.running }))}
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                aria-label={rest.running ? 'Pause rest' : 'Resume rest'}
              >
                {rest.running ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={() => setRest((s) => ({ ...s, left: 0, running: false }))}
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                aria-label="Skip rest"
              >
                <SkipForward size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      <AnimatePresence>{finished && <CompleteModal elapsed={elapsed} doneSets={doneSets} onRestart={restart} />}</AnimatePresence>
    </motion.div>
  )
}
