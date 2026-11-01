import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import BottomNav from './BottomNav'

export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh">
      <Backdrop />
      <Sidebar />
      <div className="lg:pl-72">
        <TopBar />
        <main className="mx-auto max-w-7xl px-4 pb-36 pt-5 sm:px-6 lg:px-10 lg:pb-16 lg:pt-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense
              fallback={
                <div className="grid min-h-[50vh] place-items-center" aria-label="Loading">
                  <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </motion.div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
