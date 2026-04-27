import { Camera } from 'lucide-react'
import { motion } from 'framer-motion'
import { TRAVEL_SHOTS } from '../shared/data'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

export default function LensSection() {
  // Double the shots for infinite scroll
  const allShots = [...TRAVEL_SHOTS, ...TRAVEL_SHOTS]

  return (
    <section className="w-full overflow-hidden py-20 min-[1200px]:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-4 min-[810px]:px-6">
        <SectionHeader
          icon={<Camera size={28} strokeWidth={1.6} />}
          title="Through My Lens"
        />
      </div>

      <div className="mt-14">
        <Reveal>
          <div className="marquee-track">
            <div className="marquee-strip">
              {allShots.map((shot, index) => (
                <motion.div
                  key={`${shot.place}-${index}`}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="travel-card"
                  style={{
                    transform: `rotate(${shot.tilt}deg)`,
                  }}
                >
                  <img
                    src={shot.image}
                    alt={shot.place}
                    className="travel-card__image"
                    loading="lazy"
                  />
                  <div className="travel-card__label">{shot.place}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
