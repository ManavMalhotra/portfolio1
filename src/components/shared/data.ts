import {
  Home,
  Briefcase,
  User,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'

/* ── Navigation ─────────────────────────────────── */

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#work', label: 'Work', icon: Briefcase },
  { href: '#about', label: 'About', icon: User },
  { href: '#contact', label: 'Contact', icon: CalendarDays },
]

/* ── Social Links ───────────────────────────────── */

export type SocialLink = {
  label: string
  href: string
  // SVG path for the icon
  svgPath: string
  viewBox?: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bhagyesh/',
    svgPath:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'X',
    href: 'https://x.com/bhagyesh',
    svgPath:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Framer',
    href: 'https://framer.com',
    svgPath: 'M0 0h24v8H12zM0 8h12l12 8H12v8L0 16z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'Email',
    href: 'mailto:bhagyeshdb@gmail.com',
    svgPath:
      'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
  },
]

/* ── Projects ───────────────────────────────────── */

export type Project = {
  title: string
  description: string
  type: string
  impact: string
  impactIcon: 'chart' | 'shield' | 'zap' | 'heart'
  screenshots: string[]
}

export const PROJECTS: Project[] = [
  {
    title: '4k Offers',
    description:
      'Designed a scalable MOV based offer system that aims to increase AOV through personalized rewards & offers.',
    type: 'B2C',
    impact: 'Increase in AOV & Retention',
    impactIcon: 'chart',
    screenshots: [
      'https://framerusercontent.com/images/JIGuhqFzORLz7J9FJPMcSCMRcGY.png',
      'https://framerusercontent.com/images/Z9i36oIAJcSmuhbPOWJWQXHLQ.png',
    ],
  },
  {
    title: 'Return From Store (RFS)',
    description:
      'Designed an RFS product to streamline returning damaged or expired items, with an intuitive carton packing flow for easier and more accurate processing.',
    type: 'B2B',
    impact: 'Reduction in Loss',
    impactIcon: 'shield',
    screenshots: [
      'https://framerusercontent.com/images/UbSGdLTx0KDHEWm3bCjFLjkYRY.png',
      'https://framerusercontent.com/images/8jBT6d1K5IPY0L0tLMdVh9OlA.png',
    ],
  },
  {
    title: 'Recurring Meetings',
    description:
      'Designed a scheduling product that let teams set up repeating meetings with dynamic agendas and role-based access.',
    type: 'SaaS',
    impact: 'Boosted Onboarding by 15%',
    impactIcon: 'zap',
    screenshots: [
      'https://framerusercontent.com/images/3Wqe0XuNlDT4R1jQs1XUoZLxQ.png',
    ],
  },
  {
    title: 'Care Connect',
    description:
      'Designed a hospital patient experience app that improved feedback collection and real-time service coordination.',
    type: 'Healthcare',
    impact: 'Better Patient Experience',
    impactIcon: 'heart',
    screenshots: [
      'https://framerusercontent.com/images/nqpXc3xUmGFgxDXU4qxJuMZ0.png',
    ],
  },
]

/* ── Tools ───────────────────────────────────────── */

export type ToolItem = {
  name: string
  image: string
}

export const TOOLS: ToolItem[] = [
  {
    name: 'Figma',
    image:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Framer',
    image:
      'https://www.vectorlogo.zone/logos/fraborcom/fraborcom-icon.svg',
  },
  {
    name: 'Sketch',
    image:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
  },
  {
    name: 'Blender',
    image:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
  },
]

/* ── Travel / Lens Shots ────────────────────────── */

export type TravelShot = {
  place: string
  image: string
  tilt: number
}

export const TRAVEL_SHOTS: TravelShot[] = [
  {
    place: 'Goa',
    image:
      'https://framerusercontent.com/images/QxWH76I6m1GdCS2NXHikHJN05E.png',
    tilt: -3,
  },
  {
    place: 'Pondicherry',
    image:
      'https://framerusercontent.com/images/nDxXZMKGr77fCkpE7D4tuHndzg.png',
    tilt: 4,
  },
  {
    place: 'Vrindavan',
    image:
      'https://framerusercontent.com/images/NlzijXOOF15JVt0jobjA73bzOw.png',
    tilt: -2,
  },
  {
    place: 'Mahabaleshwar',
    image:
      'https://framerusercontent.com/images/wF76zD6mlA4qs3aA2rmb7ZYcmnc.png',
    tilt: 3,
  },
  {
    place: 'Gurgaon',
    image:
      'https://framerusercontent.com/images/JRQ5QqxIQJHdGpwCkBRKBFklqzE.png?width=280&height=280',
    tilt: -4,
  },
  {
    place: 'Jaipur',
    image:
      'https://framerusercontent.com/images/kMUBnkNNgBq4mdXHr0OcQu2F0io.png',
    tilt: 2,
  },
  {
    place: 'Mussoorie',
    image:
      'https://framerusercontent.com/images/NlzijXOOF15JVt0jobjA73bzOw.png',
    tilt: -3,
  },
  {
    place: 'Delhi',
    image:
      'https://framerusercontent.com/images/wF76zD6mlA4qs3aA2rmb7ZYcmnc.png',
    tilt: 5,
  },
]

/* ── About Section – Interests ──────────────────── */

export const ABOUT_PHOTOS = [
  'https://framerusercontent.com/images/JRQ5QqxIQJHdGpwCkBRKBFklqzE.png?width=680&height=832',
  'https://framerusercontent.com/images/nDxXZMKGr77fCkpE7D4tuHndzg.png',
  'https://framerusercontent.com/images/QxWH76I6m1GdCS2NXHikHJN05E.png',
]

export const MOVIE_POSTERS = [
  {
    title: 'Inception',
    image:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    title: 'Game of Thrones',
    image:
      'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    title: 'Dark',
    image:
      'https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNzY0ZGFmXkEyXkFqcGc@._V1_SX300.jpg',
  },
]

export const F1_IMAGE =
  'https://images.unsplash.com/photo-1594950195927-62dafbf29aed?w=600&q=80'

export const SPOTIFY_TRACK = {
  title: 'Save Your Tears (Remix) (with Ariana Grande)',
  subtitle: 'Preview',
  artist: 'The Weeknd, Ariana Grande',
  albumArt:
    'https://i.scdn.co/image/ab67616d0000b273c6af5ea0f1f30be2ac4f5e27',
}
