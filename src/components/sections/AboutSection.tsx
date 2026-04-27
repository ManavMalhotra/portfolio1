import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, User } from 'lucide-react'
import {
  ABOUT_PHOTOS,
  TOOLS,
  MOVIE_POSTERS,
  F1_IMAGE,
  SPOTIFY_TRACK,
} from '../shared/data'
import { smoothEase, staggerChildren, riseIn } from '../shared/animations'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

/* ── Photo Carousel ─────────────────────────────── */

function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const advance = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent((prev) => (prev + dir + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length)
    },
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => advance(1), 4000)
    return () => clearInterval(timer)
  }, [advance])

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-50 to-slate-100 min-[810px]:rounded-[40px]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={current}
          src={ABOUT_PHOTOS[current]}
          alt="About photo"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: smoothEase }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Carousel arrows */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-3 min-[810px]:px-4">
        <button
          onClick={() => advance(-1)}
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--color-ink)] shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
          aria-label="Previous photo"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => advance(1)}
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--color-ink)] shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
          aria-label="Next photo"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {ABOUT_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Intro Card ─────────────────────────────────── */

function IntroCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.06)] min-[810px]:rounded-[40px] min-[810px]:p-7">
      <div>
        <h3 className="text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)] min-[810px]:text-[28px]">
          Hi, I&apos;m Bhagyesh
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-[var(--color-muted)]">
          Shoot me a message, and let&apos;s grab a coffee –because good
          chats and great vibes go best with caffeine :)
        </p>
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-[var(--color-surface-muted)] px-4 py-2">
        <input
          type="text"
          placeholder="Send a message"
          className="flex-1 bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-black/30"
        />
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-transform hover:scale-105">
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

/* ── Tool Icons Card ────────────────────────────── */

function ToolIconsCard() {
  return (
    <div className="flex items-center justify-center gap-3 rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_0_20px_rgba(0,0,0,0.06)] min-[810px]:rounded-[40px] min-[810px]:gap-4 min-[810px]:p-6">
      {TOOLS.map((tool) => (
        <motion.div
          key={tool.name}
          whileHover={{ scale: 1.12, y: -4 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-black/6 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] min-[810px]:h-16 min-[810px]:w-16"
        >
          <img
            src={tool.image}
            alt={tool.name}
            className="h-7 w-7 min-[810px]:h-8 min-[810px]:w-8"
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ── F1 Hobby Card ──────────────────────────────── */

function HobbyCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-[32px] border border-black/8 shadow-[0_0_20px_rgba(0,0,0,0.06)] min-[810px]:rounded-[40px]"
    >
      <img
        src={F1_IMAGE}
        alt="Ferrari F1 car"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  )
}

/* ── Spotify Card ───────────────────────────────── */

function SpotifyCard() {
  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-[32px] border border-black/8 bg-gradient-to-br from-[#8B1A1A] to-[#4A0E0E] p-4 shadow-[0_0_20px_rgba(0,0,0,0.15)] min-[810px]:rounded-[40px] min-[810px]:p-5">
      <img
        src={SPOTIFY_TRACK.albumArt}
        alt={SPOTIFY_TRACK.title}
        className="h-[72px] w-[72px] rounded-[18px] object-cover shadow-lg min-[810px]:h-[80px] min-[810px]:w-[80px]"
      />
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-white">
            {SPOTIFY_TRACK.title}
          </span>
          {/* Spotify logo */}
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            className="flex-shrink-0 text-[#1DB954]"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        <p className="text-xs text-white/60">{SPOTIFY_TRACK.subtitle}</p>
        <p className="truncate text-xs text-white/80">
          {SPOTIFY_TRACK.artist}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-1 text-[10px] font-semibold text-white/70 transition-colors hover:text-white"
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Save on Spotify
          </a>
          <span className="text-white/30">•••</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Movie Posters Card ─────────────────────────── */

function MoviePostersCard() {
  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-[32px] border border-white/20 bg-[#0a0a0a] p-3 shadow-[0_0_20px_rgba(0,0,0,0.15)] min-[810px]:rounded-[40px] min-[810px]:gap-3 min-[810px]:p-4">
      {MOVIE_POSTERS.map((movie) => (
        <motion.div
          key={movie.title}
          whileHover={{ y: -4, scale: 1.05 }}
          className="relative aspect-[2/3] flex-1 overflow-hidden rounded-[16px] border border-white/10 min-[810px]:rounded-[20px]"
        >
          <img
            src={movie.image}
            alt={movie.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ── Main About Section ─────────────────────────── */

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full scroll-mt-28 px-4 py-20 min-[810px]:px-6 min-[1200px]:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14">
        <SectionHeader
          icon={<User size={28} strokeWidth={1.6} />}
          title="About Me"
        />

        {/* ── Bento Grid ─────────────────────────────── */}
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-black/8 p-4 shadow-[0_0_40px_rgba(0,0,0,0.06)] min-[810px]:rounded-[40px] min-[810px]:p-6">
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className="grid gap-4 min-[810px]:grid-cols-[38%_1fr] min-[810px]:gap-6"
            >
              {/* ── Left Column ───────────────────────── */}
              <motion.div
                variants={riseIn}
                className="flex flex-col gap-4 min-[810px]:gap-6"
              >
                {/* Photo carousel */}
                <div className="aspect-[3/4] w-full overflow-hidden rounded-[28px] min-[810px]:aspect-auto min-[810px]:flex-1 min-[810px]:rounded-[36px]">
                  <PhotoCarousel />
                </div>

                {/* Spotify card */}
                <motion.div variants={riseIn}>
                  <SpotifyCard />
                </motion.div>
              </motion.div>

              {/* ── Right Column ──────────────────────── */}
              <div className="flex flex-col gap-4 min-[810px]:gap-6">
                {/* Intro card */}
                <motion.div variants={riseIn}>
                  <IntroCard />
                </motion.div>

                {/* Middle row: Tools + Hobby */}
                <div className="grid gap-4 min-[810px]:grid-cols-[1fr_1fr] min-[810px]:gap-6">
                  <motion.div variants={riseIn}>
                    <ToolIconsCard />
                  </motion.div>
                  <motion.div
                    variants={riseIn}
                    className="aspect-square min-[810px]:aspect-auto"
                  >
                    <HobbyCard />
                  </motion.div>
                </div>

                {/* Bottom row: Movie posters */}
                <motion.div variants={riseIn}>
                  <MoviePostersCard />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
