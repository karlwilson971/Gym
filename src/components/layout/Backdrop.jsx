export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[130px] dark:bg-accent/10" />
      <div className="absolute -right-48 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-2/20 blur-[130px] dark:bg-accent-2/10" />
      <div className="absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-3/10 blur-[130px]" />
      <div className="grid-bg absolute inset-0 opacity-60" />
    </div>
  )
}
