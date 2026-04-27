import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { riseIn } from '../shared/animations'

export default function Reveal({
  children,
  className = '',
  once = true,
}: {
  children: ReactNode
  className?: string
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, margin: '-15% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={riseIn}
    >
      {children}
    </motion.div>
  )
}
