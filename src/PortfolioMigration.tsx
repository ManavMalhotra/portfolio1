import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Home,
  Link2,
  Mail,
  Menu,
  MousePointer2,
  Palette,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

type NavItem = {
  href: string
  label: string
  icon: typeof Home
}

type Service = {
  title: string
  description: string
  icon: typeof Palette
}

type Project = {
  title: string
  year: string
  type: string
  impact: string
  description: string
  accent: string
  gradient: string
}

type ToolItem = {
  name: string
  image: string
}

type TravelShot = {
  place: string
  image: string
  tilt: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#work', label: 'Work', icon: Briefcase },
  { href: '#about', label: 'About', icon: User },
  { href: '#contact', label: 'Contact', icon: Mail },
]

const SERVICES: Service[] = [
  {
    title: 'Product Design',
    description:
      'Mapping flows, shaping systems, and turning rough product problems into interfaces people can move through easily.',
    icon: Sparkles,
  },
  {
    title: 'Visual Design',
    description:
      'Building polished layouts, sharp typography, and brand-consistent surfaces that still feel alive on the web.',
    icon: Palette,
  },
  {
    title: 'User Experience',
    description:
      'Designing interactions with clarity first, so motion and detail support usability instead of distracting from it.',
    icon: MousePointer2,
  },
  {
    title: 'Framer Development',
    description:
      'Translating high-fidelity design thinking into production-ready interfaces with strong responsiveness and motion.',
    icon: Code2,
  },
]

const PROJECTS: Project[] = [
  {
    title: '4k Offers',
    year: '2024',
    type: 'B2C',
    impact: 'Increase in AOV & retention',
    description:
      'A personalized offer framework designed to improve order value while keeping the reward logic lightweight and understandable.',
    accent: '#f97316',
    gradient: 'from-orange-400 via-amber-300 to-yellow-200',
  },
  {
    title: 'Return From Store',
    year: '2024',
    type: 'B2B',
    impact: 'Reduction in operational loss',
    description:
      'A carton-first return workflow that made damaged and expired item processing easier for store teams and more reliable for ops.',
    accent: '#7c3aed',
    gradient: 'from-violet-500 via-purple-400 to-fuchsia-300',
  },
  {
    title: 'Finflow Dashboard',
    year: '2024',
    type: 'Fintech',
    impact: 'Sharper clarity for decision making',
    description:
      'A cleaner financial dashboard focused on hierarchy, dense but readable data, and calmer visual feedback across the system.',
    accent: '#2463eb',
    gradient: 'from-blue-500 via-sky-400 to-cyan-300',
  },
  {
    title: 'Mindspace',
    year: '2023',
    type: 'Wellness',
    impact: 'Better daily engagement',
    description:
      'A guided wellness experience with soft pacing, progress rituals, and just enough motion to make the product feel gentle.',
    accent: '#10b981',
    gradient: 'from-emerald-500 via-teal-400 to-cyan-200',
  },
]

const TOOLS: ToolItem[] = [
  {
    name: 'Figma',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Framer',
    image: 'https://www.vectorlogo.zone/logos/fraborcom/fraborcom-icon.svg',
  },
  {
    name: 'Photoshop',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
  },
  {
    name: 'Illustrator',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  },
  {
    name: 'After Effects',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
  },
]

const TRAVEL_SHOTS: TravelShot[] = [
  {
    place: 'Gurgaon',
    image: 'https://framerusercontent.com/images/JRQ5QqxIQJHdGpwCkBRKBFklqzE.png?width=340&height=416',
    tilt: 'rotate(5deg)',
  },
  {
    place: 'Jaipur',
    image: 'https://framerusercontent.com/images/kMUBnkNNgBq4mdXHr0OcQu2F0io.png?width=280&height=280',
    tilt: 'rotate(-5deg)',
  },
  {
    place: 'Mussoorie',
    image: 'https://framerusercontent.com/images/NlzijXOOF15JVt0jobjA73bzOw.png?width=280&height=280',
    tilt: 'rotate(5deg)',
  },
  {
    place: 'Delhi',
    image: 'https://framerusercontent.com/images/wF76zD6mlA4qs3aA2rmb7ZYcmnc.png?width=280&height=280',
    tilt: 'rotate(-5deg)',
  },
  {
    place: 'Goa',
    image: 'https://framerusercontent.com/images/QxWH76I6m1GdCS2NXHikHJN05E.png?width=280&height=280',
    tilt: 'rotate(5deg)',
  },
  {
    place: 'Pondicherry',
    image: 'https://framerusercontent.com/images/nDxXZMKGr77fCkpE7D4tuHndzg.png?width=280&height=280',
    tilt: 'rotate(-5deg)',
  },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/Himanshi-badwe/',
    icon: Link2,
  },
  {
    label: 'X',
    href: 'https://x.com/Himanshi221b',
    icon: X,
  },
  {
    label: 'Email',
    href: 'mailto:Himanshidb@gmail.com',
    icon: Mail,
  },
]

const smoothEase = [0.22, 1, 0.36, 1] as const

const riseIn = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
}

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

function Reveal({
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

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
      <span className="rounded-full border border-black/8 bg-[var(--color-primary-soft)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-primary)]">
        {eyebrow}
      </span>
      <h2 className="text-balance text-[clamp(2.8rem,10vw,5rem)] font-black leading-[0.92] tracking-[-0.07em] text-[var(--color-ink)] max-[809px]:max-w-[11ch]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)] md:text-lg max-[809px]:max-w-[22rem]">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

function AvailabilityPill() {
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

function Navbar() {
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
      <motion.header
        initial={{ opacity: 0, y: -36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4"
      >
        <div
          className={`pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[var(--color-ink)] px-2 py-2 text-white shadow-[0_20px_60px_rgba(26,28,29,0.24)] transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[color:rgba(26,28,29,0.92)]' : ''
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
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 min-[810px]:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18, duration: 0.7, ease: smoothEase }}
        className="pointer-events-none fixed right-4 top-6 z-50 hidden gap-2 min-[810px]:flex min-[810px]:pointer-events-auto min-[1200px]:right-8"
      >
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
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
            <Icon size={18} />
          </motion.a>
        ))}
      </motion.div>

      {menuOpen ? (
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
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

function HeroSection() {
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
    if (reduceMotion) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    setPointer({ x, y })
  }

  const headline = "Hi, I'm Himanshi".split('')

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden px-4 pb-6 pt-24 min-[810px]:min-h-screen min-[810px]:px-6 min-[810px]:pb-10 min-[810px]:pt-32 min-[1200px]:px-8"
    >
      <div className="absolute inset-0 grid-bg opacity-55" />
      <motion.div
        style={{
          y: glowY,
          background: `radial-gradient(650px circle at ${pointer.x}% ${pointer.y}%, rgba(36,99,235,0.14), transparent 58%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_40%)]" />

      <motion.div
        style={{ y: copyY }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 rounded-[32px] bg-white px-4 py-6 shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] min-[810px]:gap-10 min-[810px]:rounded-[40px] min-[810px]:px-8 min-[810px]:py-10 min-[1200px]:px-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--color-ink)] text-base font-black text-white min-[810px]:left-6 min-[810px]:top-6 min-[810px]:h-14 min-[810px]:w-14 min-[810px]:text-lg"
        >
          H.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.24, duration: 0.55 }}
          className="absolute right-5 top-5 hidden rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-[0_16px_36px_rgba(26,28,29,0.08)] min-[810px]:block"
        >
          {time}
        </motion.div>

        <AvailabilityPill />

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
            A self-taught Product Designer &amp; Framer Developer, currently busy
            making Alaan look good.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mt-1 flex flex-col items-center gap-3 min-[810px]:mt-2 min-[810px]:gap-5"
          >
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

            <motion.a
              href="#work"
              whileHover={reduceMotion ? undefined : { y: 2 }}
              className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38 min-[810px]:gap-3 min-[810px]:text-[11px] min-[810px]:tracking-[0.28em]"
            >
              <span>Explore my work</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_14px_34px_rgba(36,99,235,0.3)] min-[810px]:h-11 min-[810px]:w-11">
                <motion.span
                  animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={{ duration: 1.7, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight size={18} className="rotate-90" />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="mt-1 flex w-full flex-col gap-2 min-[810px]:mt-4 min-[810px]:flex-row min-[810px]:justify-between max-[809px]:px-1">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24, duration: 0.55 }}
            className="rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-center text-[11px] font-semibold text-[var(--color-primary)] max-[809px]:mx-auto max-[809px]:w-fit"
          >
            Designing through pixels &amp; passion
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

function ServicesSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <section className="w-full px-4 py-24 min-[810px]:px-6 min-[1200px]:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14">
        <SectionTitle
          eyebrow="What I Do"
          title="Designed to feel light, deliberate, and alive"
          description="The Framer reference uses minimal surfaces and sharp hierarchy, so the service section here keeps the cards airy while pushing micro-interactions into edges, shadows, and icon motion."
        />

        <motion.div
          ref={containerRef}
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-5 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-4"
        >
          {SERVICES.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={riseIn}
              whileHover={{ y: -8 }}
              className="group rounded-[34px] border border-black/8 bg-white p-8 shadow-[0_18px_48px_rgba(26,28,29,0.05)] transition-colors duration-300 hover:border-[color:rgba(36,99,235,0.18)] hover:shadow-[0_28px_70px_rgba(36,99,235,0.09)]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="group relative flex min-h-[620px] flex-col overflow-hidden rounded-[40px] border border-black/6 bg-white p-6 shadow-[0_18px_50px_rgba(26,28,29,0.05)] transition-colors duration-500 hover:bg-[var(--color-primary)] min-[810px]:min-h-[560px] min-[810px]:p-9"
    >
      <div className="relative z-10 flex max-w-full flex-col gap-4 min-[810px]:max-w-[48%] min-[1200px]:max-w-[44%]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] transition-colors duration-500 group-hover:bg-white/12 group-hover:text-white">
            {project.type}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 transition-colors duration-500 group-hover:bg-white/12 group-hover:text-white max-[809px]:max-w-full">
            {project.impact}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-black/35 transition-colors duration-500 group-hover:text-white/56">
            {project.year}
          </p>
          <h3 className="mt-3 max-w-[8ch] text-[clamp(2rem,4vw,3rem)] font-black leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)] transition-colors duration-500 group-hover:text-white">
            {project.title}
          </h3>
        </div>
        <p className="max-w-[20rem] text-[15px] leading-7 text-[var(--color-muted)] transition-colors duration-500 group-hover:text-white/78 min-[810px]:max-w-[23rem] min-[810px]:text-base">
          {project.description}
        </p>
      </div>

      <div className="pointer-events-none relative mt-auto flex h-[340px] w-full items-end justify-center min-[810px]:absolute min-[810px]:inset-x-0 min-[810px]:bottom-0 min-[810px]:right-0 min-[810px]:top-auto min-[810px]:h-[58%] min-[810px]:justify-end">
        <div className="relative h-[300px] w-[calc(100%+2rem)] translate-y-8 rounded-t-[30px] border border-black/6 bg-black/5 p-4 transition-transform duration-500 group-hover:-translate-y-0 min-[810px]:mr-[-8%] min-[810px]:h-full min-[810px]:w-[76%] min-[810px]:translate-y-0 min-[810px]:rounded-tl-[34px] min-[810px]:rounded-tr-none min-[810px]:p-5 min-[810px]:group-hover:-translate-x-3 min-[810px]:group-hover:translate-y-3">
          <div className="flex h-full flex-col overflow-hidden rounded-tl-[30px] rounded-tr-[24px] border border-black/8 bg-white">
            <div className="flex h-10 items-center justify-between border-b border-black/6 bg-black/[0.03] px-5 text-[10px] font-semibold text-black/40 transition-colors duration-500 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white/58">
              <span>09:41</span>
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-black/15 transition-colors duration-500 group-hover:bg-white/35" />
                <span className="h-2 w-2 rounded-full bg-black/15 transition-colors duration-500 group-hover:bg-white/35" />
              </span>
            </div>
            <div className={`flex-1 bg-gradient-to-br ${project.gradient} p-5`}>
              <div className="h-5 w-2/3 rounded-full bg-white/90" />
              <div className="mt-3 h-4 w-1/2 rounded-full bg-white/80" />
              <div className="mt-6 rounded-[22px] border border-white/40 bg-white/88 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md min-[810px]:mt-8">
                <div className="h-14 rounded-[18px] bg-black/6 min-[810px]:h-16" />
                <div className="mt-4 grid grid-cols-3 gap-2.5 min-[810px]:gap-3">
                  <div className="h-9 rounded-2xl bg-white/75 min-[810px]:h-10" />
                  <div className="h-9 rounded-2xl bg-white/75 min-[810px]:h-10" />
                  <div className="h-9 rounded-2xl bg-white/75 min-[810px]:h-10" />
                </div>
              </div>
            </div>
          </div>
          <span
            className="absolute right-6 top-6 h-3 w-3 rounded-full"
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </div>
    </motion.article>
  )
}

function WorkSection() {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-8% 0px -8% 0px' })

  return (
    <section id="work" className="w-full scroll-mt-28 px-4 py-24 min-[810px]:px-6 min-[1200px]:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14">
        <SectionTitle
          eyebrow="Selected Work"
          title="Big rounded surfaces, dense cards, and deliberate hover states"
          description="The Framer site leans on bold containers with soft shadows and deep radii. This section mirrors that by keeping each card architectural first, then layering the micro-interactions over it."
        />

        <motion.div
          ref={gridRef}
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-7 min-[810px]:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.title} variants={riseIn}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="w-full scroll-mt-28 px-4 py-24 min-[810px]:px-6 min-[1200px]:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14">
        <SectionTitle
          eyebrow="About Me"
          title="A softer section with personal texture and asymmetric rhythm"
          description="The reference shifts from strict product geometry into something more human here. I kept that move by pairing stats and tools with a travel-inspired collage strip pulled from the Framer page assets."
        />

        <div className="grid gap-6 min-[1200px]:grid-cols-[0.95fr_1.25fr]">
          <Reveal className="rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_18px_48px_rgba(26,28,29,0.05)] min-[810px]:rounded-[40px] min-[810px]:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    Himanshi
                  </p>
                  <h3 className="mt-3 max-w-[12ch] text-[clamp(2rem,8vw,3rem)] font-black tracking-[-0.05em] text-[var(--color-ink)]">
                    Product designer based in India
                  </h3>
                </div>
                <div className="w-fit rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-primary)]">
                  3+ years
                </div>
              </div>

              <div className="overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(36,99,235,0.16),rgba(36,99,235,0.02))] p-3 min-[810px]:rounded-[32px] min-[810px]:p-4">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  src="https://framerusercontent.com/images/JRQ5QqxIQJHdGpwCkBRKBFklqzE.png?width=680&height=832"
                  alt="Portrait collage"
                  className="aspect-[1.08] w-full rounded-[22px] object-cover object-center min-[810px]:aspect-[0.9] min-[810px]:rounded-[28px] min-[1200px]:aspect-[0.83]"
                />
              </div>

              <p className="text-[15px] leading-7 text-[var(--color-muted)] min-[810px]:text-base min-[810px]:leading-8">
                I&apos;m a self-taught designer who likes interfaces that feel
                precise without becoming cold. My sweet spot is turning
                strategy-heavy product work into screens that carry clear rhythm,
                quiet confidence, and just enough motion to make them memorable.
              </p>

              <div className="grid grid-cols-2 gap-3 min-[810px]:gap-4">
                {[
                  ['20+', 'Projects completed'],
                  ['15+', 'Happy clients'],
                  ['05+', 'Design awards'],
                  ['100%', 'Detail obsessed'],
                ].map(([value, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4 }}
                    className="rounded-[20px] border border-black/8 bg-[var(--color-surface-muted)] p-4 transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(26,28,29,0.06)] min-[810px]:rounded-[24px] min-[810px]:p-5"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em] text-[var(--color-primary)] min-[810px]:text-3xl">
                      {value}
                    </p>
                    <p className="mt-2 text-[13px] leading-5 text-[var(--color-muted)] min-[810px]:text-sm min-[810px]:leading-6">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_18px_48px_rgba(26,28,29,0.05)] min-[810px]:rounded-[40px] min-[810px]:p-8">
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[var(--color-ink)]">
                Tools I reach for
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4 min-[810px]:grid-cols-3">
                {TOOLS.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ y: -6, rotate: 1.5 }}
                    className="group flex flex-col items-center gap-3 rounded-[26px] border border-black/8 bg-[var(--color-surface-muted)] px-4 py-5"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white shadow-[0_12px_24px_rgba(26,28,29,0.06)]">
                      <img src={tool.image} alt={tool.name} className="h-9 w-9" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--color-ink)]">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_18px_48px_rgba(26,28,29,0.05)] min-[810px]:rounded-[40px] min-[810px]:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    Beyond the screen
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--color-ink)]">
                    Places that shape my visual taste
                  </h3>
                </div>
              </div>
              <div className="marquee-track mt-8">
                <div className="marquee-strip">
                  {[...TRAVEL_SHOTS, ...TRAVEL_SHOTS].map((shot, index) => (
                    <motion.div
                      key={`${shot.place}-${index}`}
                      whileHover={{ y: -8 }}
                      className="travel-card"
                      style={{ transform: shot.tilt }}
                    >
                      <img
                        src={shot.image}
                        alt={shot.place}
                        className="travel-card__image"
                      />
                      <div className="travel-card__label">{shot.place}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      id="contact"
      className="relative h-full w-full overflow-hidden bg-[var(--color-primary)] px-4 pb-10 pt-16 text-white min-[810px]:px-6 min-[810px]:pt-20"
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-between gap-12">
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
              href="mailto:Himanshidb@gmail.com"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ delay: 0.08, duration: 0.8, ease: smoothEase }}
              className="mt-5 inline-block text-xl font-bold text-white/88 transition-colors duration-300 hover:text-white min-[810px]:text-[32px]"
            >
              Himanshidb@gmail.com
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

        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--color-ink)] shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/16 pt-6 text-sm text-white/68 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
            <span>© 2026 Himanshi. All rights reserved.</span>
            <span>Built in React, inspired by the Framer original.</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-26px] right-2 text-[170px] font-black leading-none text-white/10 min-[810px]:right-12 min-[810px]:text-[240px]">
        H.
      </div>
    </footer>
  )
}

export default function PortfolioMigration() {
  return (
    <div className="relative min-h-screen bg-[var(--color-primary)] text-[var(--color-ink)]">
      <Navbar />
      <div className="relative z-10 mb-[470px] min-[810px]:mb-[440px] min-[1200px]:mb-[430px]">
        <main className="overflow-x-hidden rounded-b-[40px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <HeroSection />
          <ServicesSection />
          <WorkSection />
          <AboutSection />
        </main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-0 h-[470px] min-[810px]:h-[440px] min-[1200px]:h-[430px]">
        <FooterSection />
      </div>
    </div>
  )
}
