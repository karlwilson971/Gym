import confetti from 'canvas-confetti'

const colors = ['#c6ff3d', '#22d3ee', '#a78bfa', '#fbbf24', '#ffffff']

export function celebrate() {
  const base = { colors, disableForReducedMotion: true, zIndex: 200 }
  confetti({ ...base, particleCount: 160, spread: 100, startVelocity: 45, origin: { y: 0.6 } })

  const end = Date.now() + 1600
  ;(function frame() {
    confetti({ ...base, particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.75 } })
    confetti({ ...base, particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.75 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}
