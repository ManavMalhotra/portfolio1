import { motion, useReducedMotion } from 'framer-motion'
import { smoothEase } from '../shared/animations'
import { SOCIAL_LINKS } from '../shared/data'

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      id="contact"
      className="relative h-full w-full overflow-hidden bg-[var(--color-primary)] px-4 pb-10 pt-16 text-white min-[810px]:px-6 min-[810px]:pt-20"
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-between gap-12">
        {/* ── Heading Row ──────────────────────────────── */}
        <div className="grid gap-10 min-[1200px]:grid-cols-[1fr_auto] min-[1200px]:items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="max-w-3xl text-[clamp(4rem,9vw,6.8rem)] font-black leading-[0.92] tracking-[-0.07em]"
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.a
              href="mailto:bhagyeshdb@gmail.com"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{
                delay: 0.08,
                duration: 0.8,
                ease: smoothEase,
              }}
              className="mt-5 inline-block text-xl font-bold text-white/88 transition-colors duration-300 hover:text-white min-[810px]:text-[32px]"
            >
              bhagyeshdb@gmail.com
            </motion.a>
          </div>

          <motion.img
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: smoothEase }}
            src="https://framerusercontent.com/images/JRQ5QqxIQJHdGpwCkBRKBFklqzE.png?width=340&height=416"
            alt="Portrait card"
            className="hidden w-[220px] rounded-[36px] object-cover shadow-[0_26px_60px_rgba(0,0,0,0.2)] min-[1200px]:block"
          />
        </div>

        {/* ── Social Links + Footer ────────────────────── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, svgPath, viewBox }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={
                  reduceMotion ? undefined : { scale: 1.08, y: -4 }
                }
                whileTap={{ scale: 0.96 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--color-ink)] shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
                aria-label={label}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox={viewBox || '0 0 24 24'}
                  fill="currentColor"
                >
                  <path d={svgPath} />
                </svg>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/16 pt-6 text-sm text-white/68 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
            <span>© 2026 Bhagyesh. All rights reserved.</span>
            <span>Built in React, inspired by the Framer original.</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-[-26px] right-2 text-[170px] font-black leading-none text-white/10 min-[810px]:right-12 min-[810px]:text-[240px]">
        B.
      </div>
    </footer>
  )
}
