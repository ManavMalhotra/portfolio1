import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  riseIn,
  staggerChildren,
} from '../shared/animations'
import AvailabilityPill from '../ui/AvailabilityPill'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date()),
  )
  const [pointer, setPointer] = useState({ x: 50, y: 46 })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -56])

  useEffect(() => {
    const formatClock = () =>
      new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date())
    const timer = window.setInterval(() => setTime(formatClock()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    setPointer({ x, y })
  }

  const headline = "Hi, I'm Bhagyesh".split('')

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden px-3 pb-6 pt-24 min-[810px]:min-h-screen min-[810px]:px-4 min-[810px]:pb-10 min-[810px]:pt-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-55" />

      {/* Mouse-follow glow */}
      <motion.div
        style={{
          y: glowY,
          background: `radial-gradient(650px circle at ${pointer.x}% ${pointer.y}%, rgba(36,99,235,0.14), transparent 58%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Top-center vignette */}
      <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_40%)]" />

      {/* ── Main Card ──────────────────────────────────── */}
      <motion.div
        style={{ y: copyY }}
        className="relative z-10 mx-auto flex w-full flex-col items-center gap-6 rounded-[32px] bg-white px-4 py-6 shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] min-[810px]:gap-10 min-[810px]:rounded-[40px] min-[810px]:px-8 min-[810px]:py-10 min-[1200px]:px-10"
      >
        {/* Logo monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--color-ink)] text-base font-black text-white min-[810px]:left-6 min-[810px]:top-6 min-[810px]:h-14 min-[810px]:w-14 min-[810px]:text-lg"
        >
          {/* Stylized B monogram */}
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
            <path
              d="M4 2h12a8 8 0 010 16H4V2z"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M4 18h14a8 8 0 010 16H4V18z"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Clock (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.24, duration: 0.55 }}
          className="absolute right-5 top-5 hidden rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-[0_16px_36px_rgba(26,28,29,0.08)] min-[810px]:block"
        >
          {time}
        </motion.div>

        {/* Availability badge */}
        <AvailabilityPill />

        {/* ── Headline + CTA ──────────────────────────── */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="flex max-w-5xl flex-col items-center gap-5 pt-10 text-center min-[810px]:gap-6 min-[810px]:pt-0"
        >
          <motion.h1
            variants={riseIn}
            className="text-balance text-[clamp(3.35rem,16vw,7rem)] font-black leading-[0.9] tracking-[-0.09em] text-[var(--color-ink)] max-[809px]:max-w-[8ch]"
          >
            {headline.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        color: 'var(--color-primary)',
                        y: -4,
                        transition: { duration: 0.16 },
                      }
                }
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={riseIn}
            className="max-w-[21rem] text-balance text-[15px] leading-7 text-[var(--color-muted)] min-[810px]:max-w-2xl min-[810px]:text-[22px] min-[810px]:leading-[1.45]"
          >
            A self-taught Product Designer &amp; Framer Developer, currently
            busy making Alaan look good
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mt-1 flex flex-col items-center gap-3 min-[810px]:mt-2 min-[810px]:gap-5"
          >
            {/* Let's Connect button */}
            <motion.a
              href="#contact"
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.03, y: -2, transition: { duration: 0.18 } }
              }
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-[var(--color-ink)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_24px_60px_rgba(26,28,29,0.16)] min-[810px]:px-7"
            >
              <span className="relative z-10">Let&apos;s Connect</span>
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--color-ink)] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
              <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.a>

            {/* Explore my work */}
            <motion.a
              href="#work"
              whileHover={reduceMotion ? undefined : { y: 2 }}
              className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38 min-[810px]:gap-3 min-[810px]:text-[11px] min-[810px]:tracking-[0.28em]"
            >
              <span>Explore my work</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_14px_34px_rgba(36,99,235,0.3)] min-[810px]:h-11 min-[810px]:w-11">
                <motion.span
                  animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={{
                    duration: 1.7,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <ArrowRight size={18} className="rotate-90" />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Bottom Bar ──────────────────────────────── */}
        <div className="mt-1 flex w-full flex-col gap-2 min-[810px]:mt-4 min-[810px]:flex-row min-[810px]:justify-between max-[809px]:px-1">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24, duration: 0.55 }}
            className="flex items-center gap-2 rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-center text-[11px] font-semibold text-[var(--color-primary)] max-[809px]:mx-auto max-[809px]:w-fit"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 3l1.912 5.813L20 10l-4.587 3.187L17.175 19 12 15.5 6.825 19l1.762-5.813L4 10l6.088-1.187z" />
            </svg>
            <span>Designing through Pixels &amp; Passion</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24, duration: 0.55 }}
            className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[var(--color-ink)] shadow-[0_12px_30px_rgba(26,28,29,0.06)] max-[809px]:hidden"
          >
            <span className="text-[var(--color-primary)]">▲</span>
            <span>Made in Framer</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
