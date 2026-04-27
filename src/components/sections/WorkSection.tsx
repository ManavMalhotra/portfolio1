import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, TrendingUp, Shield, Zap, Heart } from 'lucide-react'
import { riseIn, staggerChildren } from '../shared/animations'
import { PROJECTS, type Project } from '../shared/data'
import SectionHeader from '../ui/SectionHeader'

const impactIcons = {
  chart: TrendingUp,
  shield: Shield,
  zap: Zap,
  heart: Heart,
}

function ProjectCard({ project }: { project: Project }) {
  const ImpactIcon = impactIcons[project.impactIcon]

  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="group relative flex min-h-[540px] flex-col overflow-hidden rounded-[40px] border border-black/6 bg-white shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] transition-all duration-500 min-[810px]:min-h-[620px]"
    >
      {/* ── Text Content ──────────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-5 p-7 min-[810px]:p-9">
        <h3 className="max-w-[14ch] text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]">
          {project.title}
        </h3>

        <p className="max-w-[28rem] text-[15px] leading-7 text-[var(--color-muted)] min-[810px]:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            <Briefcase size={12} />
            {project.type}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/8 px-4 py-2 text-[11px] font-semibold text-emerald-600">
            <ImpactIcon size={12} />
            {project.impact}
          </span>
        </div>
      </div>

      {/* ── Screenshot Mockups ────────────────────────── */}
      <div className="pointer-events-none relative mt-auto flex items-end justify-center px-4 pb-0 min-[810px]:absolute min-[810px]:bottom-0 min-[810px]:right-0 min-[810px]:top-auto min-[810px]:h-[60%] min-[810px]:w-[62%] min-[810px]:justify-end min-[810px]:px-0">
        {project.screenshots.map((src, i) => (
          <motion.div
            key={src}
            className="relative overflow-hidden rounded-t-[18px] border border-black/8 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:translate-y-[-4px]"
            style={{
              width: i === 0 ? '55%' : '50%',
              marginLeft: i > 0 ? '-12%' : 0,
              zIndex: project.screenshots.length - i,
              transform: `translateY(${i * 12}px)`,
            }}
          >
            <img
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.article>
  )
}

export default function WorkSection() {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gridRef, {
    once: true,
    margin: '-8% 0px -8% 0px',
  })

  return (
    <section
      id="work"
      className="w-full scroll-mt-28 px-4 py-20 min-[810px]:px-6 min-[1200px]:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14">
        <SectionHeader
          icon={<Briefcase size={28} strokeWidth={1.6} />}
          title="My Work"
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
