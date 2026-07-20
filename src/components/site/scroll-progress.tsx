'use client'

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
