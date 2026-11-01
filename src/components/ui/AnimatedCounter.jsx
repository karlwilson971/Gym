import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 2, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
