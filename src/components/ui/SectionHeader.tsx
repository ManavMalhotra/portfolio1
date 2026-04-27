import { type ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHeader({
  icon,
  title,
}: {
  icon: ReactNode
  title: string
}) {
  return (
    <Reveal className="mx-auto flex flex-col items-center gap-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(36,99,235,0.06)]">
        <div className="flex h-10 w-10 items-center justify-center text-[var(--color-primary)]">
          {icon}
        </div>
      </div>
      <h2 className="text-balance font-satoshi text-[clamp(2.4rem,8vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[var(--color-ink)]">
        {title}
      </h2>
    </Reveal>
  )
}
