export const ease = [0.22, 1, 0.36, 1]

export const stagger = (step = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
})

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}
