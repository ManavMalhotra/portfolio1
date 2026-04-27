import { motion } from 'framer-motion'
import { smoothEase } from '../shared/animations'

export default function AvailabilityPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.55, ease: smoothEase }}
      className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 shadow-[0_20px_50px_rgba(26,28,29,0.08)]"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inset-0 animate-pulse-green rounded-full bg-[#31ee33]/70" />
        <span className="relative z-10 h-3 w-3 rounded-full bg-[#009603] shadow-[0_0_18px_rgba(0,138,2,0.5)]" />
      </span>
      <span className="text-sm font-semibold tracking-[0.02em] text-[var(--color-ink)]">
        Open to Opportunities
      </span>
    </motion.div>
  )
}
