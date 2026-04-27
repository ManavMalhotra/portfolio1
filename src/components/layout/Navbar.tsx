import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { smoothEase } from '../shared/animations'
import { NAV_ITEMS, SOCIAL_LINKS } from '../shared/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <>
      {/* ── Center Navigation Pill ───────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4"
      >
        <div
          className={`pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[var(--color-ink)] px-2 py-2 text-white shadow-[0_20px_60px_rgba(26,28,29,0.24)] transition-all duration-300 ${
            scrolled ? 'backdrop-blur-xl bg-[rgba(26,28,29,0.92)]' : ''
          }`}
        >
          <nav className="hidden items-center gap-1 min-[810px]:flex">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/72 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={2.05} />
              </motion.a>
            ))}
          </nav>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((c) => !c)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 min-[810px]:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      {/* ── Social Links (Desktop) ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18, duration: 0.7, ease: smoothEase }}
        className="pointer-events-none fixed right-4 top-6 z-50 hidden gap-2 min-[810px]:flex min-[810px]:pointer-events-auto min-[1200px]:right-8"
      >
        {SOCIAL_LINKS.map(({ label, href, svgPath, viewBox }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-black/8 bg-white/84 text-[var(--color-ink)] shadow-[0_16px_40px_rgba(26,28,29,0.08)] backdrop-blur-xl transition-colors duration-300 hover:bg-white"
            aria-label={label}
          >
            <svg
              width={18}
              height={18}
              viewBox={viewBox || '0 0 24 24'}
              fill="currentColor"
            >
              <path d={svgPath} />
            </svg>
          </motion.a>
        ))}
      </motion.div>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-4 right-4 top-[88px] z-40 rounded-[32px] border border-black/8 bg-white/94 p-4 shadow-[0_24px_70px_rgba(26,28,29,0.16)] backdrop-blur-xl min-[810px]:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-300 hover:bg-black/5"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-black/8 pt-3">
                {SOCIAL_LINKS.map(({ label, href, svgPath, viewBox }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[var(--color-ink)]"
                    aria-label={label}
                  >
                    <svg
                      width={16}
                      height={16}
                      viewBox={viewBox || '0 0 24 24'}
                      fill="currentColor"
                    >
                      <path d={svgPath} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
