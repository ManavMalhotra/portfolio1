import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, User, Mail, ExternalLink, Link2, MessageSquare, ArrowUpRight, ChevronDown, Eye, Code, Palette, MousePointer, GitBranch } from 'lucide-react';
/* ─── data ─── */
const NAV_ITEMS = [
  { icon: Home, href: '#home', label: 'Home' },
  { icon: Briefcase, href: '#work', label: 'Work' },
  { icon: User, href: '#about-me', label: 'About' },
  { icon: Mail, href: '#contact', label: 'Contact' },
];

const SERVICES = [
  { icon: Palette, title: 'Visual Design', desc: 'Crafting stunning visual identities and design systems that leave lasting impressions.' },
  { icon: MousePointer, title: 'User Experience', desc: 'Building intuitive experiences that delight users and drive engagement.' },
  { icon: Code, title: 'Framer Development', desc: 'Developing high-performance websites and prototypes with Framer.' },
  { icon: Eye, title: 'Product Design', desc: 'End-to-end product design from research to pixel-perfect deliverables.' },
];

const PROJECTS = [
  { id: 1, title: '4k Offers', category: 'B2C', tag: 'Increase in AOV & Retention', year: '2024', desc: 'Designed a scalable MOV based offer system that aims to increase AOV through personalized rewards & offers.', color: '#f97316', gradient: 'from-orange-400 to-amber-300' },
  { id: 2, title: 'Return From Store (RFS)', category: 'B2B', tag: 'Reduction in Loss', year: '2024', desc: 'Designed an RFS product to streamline returning damaged or expired items, with an intuitive carton packing flow for easier and more accurate processing.', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-400' },
  { id: 3, title: 'FinFlow Dashboard', category: 'Fintech', tag: 'User Growth', year: '2024', desc: 'A modern fintech dashboard redesign focused on clarity and data visualization, helping users track their spending easily.', color: '#2463eb', gradient: 'from-blue-500 to-cyan-400' },
  { id: 4, title: 'MindSpace', category: 'Health', tag: 'Engagement', year: '2023', desc: 'A meditation and wellness app with calming interactions and progress tracking for daily mindfulness habits.', color: '#10b981', gradient: 'from-emerald-500 to-teal-400' }
];

const TOOLS = [
  { name: 'Figma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Framer', img: 'https://www.vectorlogo.zone/logos/fraborcom/fraborcom-icon.svg' },
  { name: 'Photoshop', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Illustrator', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'After Effects', img: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg' },
];

const SOCIAL_LINKS = [
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: MessageSquare, href: '#', label: 'Twitter' },
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

/* ─── animation variants ─── */
const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

/* ─── reusable components ─── */
function SectionHeading({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className={`flex flex-col items-center gap-3 ${className}`}>
      {children}
    </motion.div>
  );
}

function AvailabilityBadge() {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 bg-white shadow-sm">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_12px_rgba(0,150,3,0.5)]" />
      </span>
      <span className="text-sm font-semibold tracking-wide font-[Onest]">Open to Opportunities</span>
    </div>
  );
}

/* ─── Navbar ─── */
const RIGHT_SOCIALS = [
  { label: 'LinkedIn', href: '#', letter: 'in' },
  { label: 'X', href: '#', letter: 'X' },
  { label: 'Framer', href: '#', letter: '▲' },
  { label: 'Email', href: '#', letter: '✉' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <>
      {/* Center nav pill */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#1a1c1d]/95 backdrop-blur-xl shadow-2xl' : 'bg-[#1a1c1d]'}`}>
        {NAV_ITEMS.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} aria-label={label}
            className="group relative w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
            <Icon size={18} strokeWidth={2} />
          </a>
        ))}
      </motion.nav>
      {/* Right social links */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
        className="fixed top-8 right-8 z-50 flex items-center gap-2">
        {RIGHT_SOCIALS.map(({ label, href, letter }) => (
          <motion.a key={label} href={href} aria-label={label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-black/10 bg-white/80 backdrop-blur-sm text-[#1a1c1d] text-xs font-semibold hover:bg-white hover:shadow-md transition-all">
            {letter}
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
  };

  const titleText = "Hi, I'm Himanshi".split('');

  return (
    <section ref={ref} id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}>

      {/* Subtle grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Mouse-tracking radial glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(700px circle at ${50 + mousePos.x * 15}% ${50 + mousePos.y * 15}%, rgba(36,99,235,0.05), transparent 65%)` }} />

      {/* Border Elements Container (Fast load) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        
        {/* Logo — top left */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute top-8 left-8 w-14 h-14 rounded-full bg-[#1a1c1d] flex items-center justify-center select-none pointer-events-auto">
          <span className="text-white font-[Onest] font-bold text-lg">H.</span>
        </motion.div>

        {/* Bottom-left badge */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 pointer-events-auto shadow-sm">
          <span className="text-[#2463eb] text-base">✦</span>
          <span className="text-xs font-semibold text-[#2463eb] font-[Onest]">Designing through Pixels &amp; Passion</span>
        </motion.div>

        {/* Bottom-center scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
          <span className="text-[11px] text-black/35 font-[Onest] tracking-widest uppercase">Explore my work</span>
          <motion.a href="#work"
            animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-9 h-9 rounded-full bg-[#2463eb] flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <ChevronDown size={18} className="text-white" />
          </motion.a>
        </motion.div>

        {/* Bottom-right elements */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute bottom-8 right-8 flex items-center gap-4 pointer-events-auto">
          <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm">
            <span className="text-xs font-semibold text-black/60 font-[Onest]">
              {time}
            </span>
          </div>
          <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm flex items-center gap-2">
            <span className="text-xs font-bold text-[#1a1c1d]">▲</span>
            <span className="text-xs font-semibold text-[#1a1c1d] font-[Onest]">Made in Framer</span>
          </div>
        </motion.div>
      </div>

      {/* Center Group (Delayed load & interactive scale) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03 }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-7 px-8 cursor-default"
      >
        {/* Availability badge */}
        <AvailabilityBadge />

        {/* Headline */}
        <h1 className="text-[clamp(52px,8vw,90px)] font-[900] leading-[1.05] tracking-[-3px] text-[#1a1c1d] font-[Onest] text-center flex flex-wrap justify-center">
          {titleText.map((char, index) => (
            <motion.span
              key={index}
              whileHover={{ color: '#2463eb', transition: { duration: 0.1 } }}
              className="inline-block transition-colors duration-300"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <p className="text-sm md:text-base text-black/55 max-w-[520px] font-[Onest] leading-relaxed text-center">
          A self-taught Product Designer &amp; Framer Developer,<br className="hidden sm:block" />
          currently busy making Alaan look good
        </p>

        {/* Single CTA */}
        <a href="#work"
          className="group flex items-center gap-3 px-7 py-3.5 bg-[#1a1c1d] text-white rounded-full font-semibold text-sm
            hover:bg-black transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]">
          Let's Connect
          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight size={14} className="text-[#1a1c1d]" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="w-full bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
        <SectionHeading>
          <span className="text-sm font-semibold text-[#2463eb] tracking-wider uppercase font-[Onest]">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c1d] tracking-tight font-[Onest]">My Services</h2>
        </SectionHeading>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={scaleIn}
              className="group relative flex flex-col items-center gap-5 p-8 rounded-[32px] bg-white border border-black/8 hover:border-[#2463eb]/20 hover:shadow-[0_0_40px_5px_rgba(36,99,235,0.06)] transition-all duration-500 cursor-default">
              <div className="w-16 h-16 rounded-full bg-[#2463eb]/8 flex items-center justify-center group-hover:bg-[#2463eb]/12 group-hover:scale-110 transition-all duration-500">
                <Icon size={28} className="text-[#2463eb]" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1c1d] font-[Onest]">{title}</h3>
              <p className="text-sm text-black/55 text-center leading-relaxed font-[Onest]">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col gap-6 p-8 lg:p-10 rounded-[40px] border border-black/5 overflow-hidden transition-all duration-500 cursor-pointer h-[550px] shadow-[0_0_40px_5px_rgba(0,0,0,0.02)]
        ${isHovered ? 'bg-[#2463eb] text-white shadow-2xl scale-[1.02] z-10' : 'bg-white text-[#1a1c1d] hover:shadow-xl'}`}
    >
      <div className="flex flex-col gap-4 relative z-10 w-[90%]">
        <h3 className="text-2xl md:text-3xl font-bold font-[Onest] tracking-tight">{project.title}</h3>
        <p className={`text-sm md:text-base leading-relaxed font-[Onest] transition-colors duration-500 ${isHovered ? 'text-white/80' : 'text-black/50'}`}>
          {project.desc}
        </p>
        
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {/* Category Pill */}
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full font-[Onest] tracking-wide transition-colors duration-500
            ${isHovered ? 'bg-white/15 text-white' : 'bg-[#2463eb]/8 text-[#2463eb]'}`}>
            <Briefcase size={14} />
            {project.category}
          </span>
          {/* Second Tag Pill */}
          {project.tag && (
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full font-[Onest] tracking-wide transition-colors duration-500
              ${isHovered ? 'bg-white/15 text-white' : 'bg-green-500/10 text-green-600'}`}>
              <ArrowUpRight size={14} />
              {project.tag}
            </span>
          )}
        </div>
      </div>

      {/* Mock Image Area (Bottom Right) */}
      <div className={`absolute -bottom-8 -right-8 w-[80%] h-[55%] rounded-tl-3xl shadow-2xl transition-transform duration-700 ease-out
        ${isHovered ? 'translate-y-2 -translate-x-2' : 'bg-black/5'}`}>
          {/* Inner mock phone shape */}
          <div className={`absolute top-6 left-6 right-0 bottom-0 rounded-tl-3xl shadow-inner border border-black/10 flex flex-col overflow-hidden transition-colors duration-500
            ${isHovered ? 'bg-[#1a3680]' : 'bg-white'}`}>
             <div className={`h-8 w-full flex items-center justify-between px-5 border-b transition-colors duration-500
                ${isHovered ? 'bg-[#1a3680]/50 border-white/10 text-white/70' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
               <span className="text-[9px] font-semibold">9:41</span>
               <div className="flex gap-1.5"><div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-white/50' : 'bg-gray-300'}`}/><div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-white/50' : 'bg-gray-300'}`}/></div>
             </div>
             <div className={`flex-1 p-6 bg-gradient-to-br ${project.gradient} opacity-90`}>
                {/* Mock UI content skeleton */}
                <div className="w-3/4 h-5 bg-white/90 rounded shadow-sm mb-4 backdrop-blur-sm"></div>
                <div className="w-1/2 h-5 bg-white/90 rounded shadow-sm mb-8 backdrop-blur-sm"></div>
                <div className="w-full h-32 bg-white/90 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm"></div>
             </div>
          </div>
      </div>
    </motion.div>
  );
}

/* ─── Work Section ─── */
function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section id="work" className="w-full bg-white py-24 px-6 scroll-mt-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-16">
        
        {/* Header matching the image exactly */}
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#2463eb]/10 flex items-center justify-center">
            <Briefcase size={32} className="text-[#2463eb]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-[900] text-[#1a1c1d] tracking-tight font-[Onest]">My Work</h2>
        </motion.div>

        {/* Grid Layout for Cards */}
        <motion.div 
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} id="about-me" className="w-full bg-white py-20 px-5 scroll-mt-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
        <SectionHeading>
          <span className="text-sm font-semibold text-[#2463eb] tracking-wider uppercase font-[Onest]">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c1d] tracking-tight font-[Onest]">Get to Know Me</h2>
        </SectionHeading>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="w-full flex flex-col lg:flex-row gap-6 rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.06)] p-8 lg:p-10">
          {/* Left column – photo + info */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:w-[38%]">
            <div className="w-full aspect-square max-w-[200px] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2463eb]/20 to-[#2463eb]/5 flex items-center justify-center">
              <span className="text-6xl">👩‍🎨</span>
            </div>
            <div className="rounded-[32px] border border-black/8 p-6 flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#1a1c1d] font-[Onest]">Himanshi</h3>
              <p className="text-sm text-black/50 font-[Onest]">Product Designer based in India</p>
            </div>
            {/* Tools */}
            <div className="rounded-[32px] bg-black/4 border border-black/8 p-4 flex items-center justify-center gap-3 flex-wrap">
              {TOOLS.map(t => (
                <motion.div key={t.name} whileHover={{ scale: 1.15, y: -4 }} className="w-16 h-16 rounded-2xl bg-white border border-black/8 flex items-center justify-center shadow-sm cursor-pointer">
                  <img src={t.img} alt={t.name} className="w-8 h-8" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column – details */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-6">
            <div className="rounded-[32px] border border-black/8 overflow-hidden">
              <div className="bg-gradient-to-br from-[#2463eb]/8 to-transparent p-6 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#1a1c1d] font-[Onest]">My Journey</h3>
                <p className="text-sm text-black/60 leading-relaxed font-[Onest]">
                  I'm a self-taught designer passionate about creating meaningful digital experiences. Over the years I've honed my skills across product design, visual design and UX, working with startups and established brands alike. I thrive on challenges and believe great design solves real problems.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ n: '3+', l: 'Years Experience' }, { n: '20+', l: 'Projects Completed' }, { n: '15+', l: 'Happy Clients' }, { n: '5+', l: 'Design Awards' }].map(s => (
                <motion.div key={s.l} whileHover={{ y: -4 }} className="rounded-[24px] border border-black/8 p-5 flex flex-col items-center justify-center gap-1 bg-white hover:shadow-lg transition-shadow">
                  <span className="text-3xl font-bold text-[#2463eb] font-[Onest]">{s.n}</span>
                  <span className="text-xs text-black/50 font-[Onest] text-center">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer / Contact ─── */
function FooterSection() {
  return (
    <footer id="contact" className="w-full bg-[#2463eb] text-white">
      <motion.div className="relative max-w-[1200px] mx-auto px-10 py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl md:text-6xl font-bold font-[Onest] tracking-tight">Let's Work<br />Together</h2>
          <p className="text-base text-white/70 max-w-[600px] font-[Onest] leading-relaxed">
            Have a project in mind? Let's create something amazing together. I'm always excited to collaborate on innovative ideas.
          </p>
        </div>
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} aria-label={label} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Icon size={22} className="text-[#1a1c1d]" />
            </motion.a>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-white/50 pt-8 border-t border-white/15 font-[Onest]">
          <span>© 2024 Himanshi. All rights reserved.</span>
          <span>Designed with ❤️</span>
        </div>
      </motion.div>
      {/* Decorative logo watermark */}
      <div className="absolute top-8 right-20 opacity-15 text-[200px] font-bold font-[Onest] leading-none pointer-events-none select-none">H.</div>
    </footer>
  );
}

/* ─── Main Component ─── */
export default function PortfolioMigration() {
  return (
    <div className="relative w-full bg-[#2463eb] font-[Onest]">
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;900&family=Inter:wght@400;500;600&family=Noto+Sans+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Scrollable content container that covers the footer */}
      <div className="relative z-10 w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-b-[40px] mb-[500px]">
        <Navbar />
        <main className="w-full flex flex-col items-center overflow-x-hidden pb-10">
          <HeroSection />
          <ServicesSection />
          <WorkSection />
          <AboutSection />
        </main>
      </div>

      {/* Fixed footer underneath */}
      <div className="fixed bottom-0 left-0 right-0 z-0 h-[500px] flex items-end">
        <FooterSection />
      </div>
    </div>
  );
}
