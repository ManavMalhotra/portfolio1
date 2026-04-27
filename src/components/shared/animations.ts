export const smoothEase = [0.22, 1, 0.36, 1] as const

export const riseIn = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

export const slideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
}

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const cardHover = {
  y: -8,
  transition: { duration: 0.3, ease: smoothEase },
}

export const scaleHover = {
  scale: 1.04,
  transition: { duration: 0.3, ease: smoothEase },
}

export const letterHover = {
  color: 'var(--color-primary)',
  y: -4,
  transition: { duration: 0.16 },
}
