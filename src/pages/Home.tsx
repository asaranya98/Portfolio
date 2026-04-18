import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Download,
  User, Zap, Briefcase, FolderOpen, Award, Mail,
  BarChart3, Database, TrendingUp, Layers,
} from 'lucide-react';

// ─── Count-up hook ────────────────────────────────────────────
function useCountUp(end: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let startTime: number | null = null;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor((p * (2 - p)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return count;
}

// ─── Tilt Card ────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 30 });
  const sry = useSpring(ry, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(srx, v => `${v}deg`);
  const rotateY = useTransform(sry, v => `${v}deg`);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    rx.set(-y * 10);
    ry.set(x * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────
function Stat({ n, suffix = '', label }: { n: number; suffix?: string; label: string }) {
  const count = useCountUp(n);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-3xl md:text-4xl font-display font-bold text-gradient leading-none">
        {count}{suffix}
      </span>
      <span className="text-xs font-mono-accent text-slate-400 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}

// ─── Nav card data ────────────────────────────────────────────
const navCards = [
  {
    to: '/about',
    icon: User,
    label: 'About',
    sub: 'Who I am & my story',
    color: '#5B4CF5',
    bg: 'linear-gradient(135deg, #EEF0FF 0%, #F8F7FF 100%)',
    tag: '01',
  },
  {
    to: '/skills',
    icon: Zap,
    label: 'Skills',
    sub: 'Tools, stack & proficiency',
    color: '#E84393',
    bg: 'linear-gradient(135deg, #FDE9F4 0%, #FFF8FC 100%)',
    tag: '02',
  },
  {
    to: '/experience',
    icon: Briefcase,
    label: 'Experience',
    sub: 'Professional timeline',
    color: '#00C9B1',
    bg: 'linear-gradient(135deg, #E6FBF8 0%, #F4FEFC 100%)',
    tag: '03',
  },
  {
    to: '/projects',
    icon: FolderOpen,
    label: 'Projects',
    sub: 'Dashboards & analyses',
    color: '#F59E0B',
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FFFDF5 100%)',
    tag: '04',
  },
  {
    to: '/certificates',
    icon: Award,
    label: 'Certificates',
    sub: 'Licenses & credentials',
    color: '#6366F1',
    bg: 'linear-gradient(135deg, #F0F0FF 0%, #F8F8FF 100%)',
    tag: '05',
  },
  {
    to: '/contact',
    icon: Mail,
    label: 'Contact',
    sub: 'Let\'s work together',
    color: '#E84393',
    bg: 'linear-gradient(135deg, #FDE9F4 0%, #FFF8FC 100%)',
    tag: '06',
  },
];

// ─── Orbiting data dots background ───────────────────────────
function OrbitRing({ r, speed, dots }: { r: number; speed: string; dots: number }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full border border-dashed"
      style={{
        width: r * 2, height: r * 2,
        marginLeft: -r, marginTop: -r,
        borderColor: 'rgba(91,76,245,0.12)',
        animation: `spin-slow ${speed} linear infinite`,
      }}
    >
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i / dots) * 360;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'var(--accent)' : 'var(--secondary)',
              opacity: 0.45,
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(${r}px) translateY(-50%)`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Floating ticker ─────────────────────────────────────────
const tickerItems = [
  'Power BI', '·', 'Python', '·', 'SQL', '·', 'EDA', '·',
  'Pandas', '·', 'Excel', '·', 'Tableau', '·', 'NumPy', '·',
  'Data Viz', '·', 'DAX', '·', 'Machine Learning', '·',
];

// ─── Main Component ───────────────────────────────────────────
export function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Ambient gradient mesh ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 mesh-bg" />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center pt-28 pb-12 px-4">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
              style={{ borderColor: 'rgba(0,201,177,0.3)', background: '#E6FBF8' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse-slow" />
              <span className="font-mono-accent text-xs" style={{ color: 'var(--tertiary)' }}>
                OPEN · Data Analyst Roles
              </span>
            </motion.div>

            {/* Name & animated title */}
            <h1 className="font-display font-bold leading-[1.05] mb-5">
              <span className="block text-5xl sm:text-6xl lg:text-7xl tracking-tight" style={{ color: 'var(--text-1)' }}>
                Saranya A
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl tracking-tight h-[1.15em] overflow-hidden">
                <span className="text-gradient">
                  <TypeAnimation
                    sequence={[
                      'Data Analyst', 2200,
                      'BI Developer', 2200,
                      'SQL Engineer', 2200,
                      'Insight Hunter', 2200,
                    ]}
                    wrapper="span"
                    speed={48}
                    repeat={Infinity}
                  />
                </span>
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
              Turning messy datasets into crystal-clear dashboards.
              Passionate about evidence-based decisions and data storytelling.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/projects" className="btn-accent">
                View Projects <ArrowRight size={17} />
              </Link>
              <a 
                href="https://docs.google.com/document/d/195QyiqbWvL6Ywo0AGdp2S9pB03zOu7xv/export?format=pdf" 
                download="Saranya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Download CV <Download size={17} />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 flex-wrap">
              <Stat n={8}  suffix="+" label="Projects" />
              <div className="w-px h-8 bg-slate-200" />
              <Stat n={6}  suffix=""  label="Certificates" />
              <div className="w-px h-8 bg-slate-200" />
              <Stat n={2}  suffix=""  label="Internships" />
            </div>
          </motion.div>

          {/* Right — avatar sphere with orbit rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 80 }}
            className="flex justify-center items-center"
          >
            <TiltCard className="relative w-72 h-72 md:w-88 md:h-88">
              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <OrbitRing r={150} speed="28s" dots={3} />
                <OrbitRing r={110} speed="20s" dots={4} />
              </div>

              {/* Glow blob */}
              <div
                className="absolute inset-6 rounded-full blur-2xl opacity-40 animate-pulse-slow"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))' }}
              />

              {/* Inner circle */}
              <div
                className="absolute inset-8 rounded-full flex flex-col items-center justify-center border-2 shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  borderColor: 'var(--border-accent)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Monogram  */}
                <span
                  className="font-display font-bold text-6xl leading-none"
                  style={{ color: 'transparent', background: 'linear-gradient(135deg, var(--accent), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  SA
                </span>
                <span className="font-mono-accent text-[10px] tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>
                  DATA ANALYST
                </span>
              </div>

              {/* Floating data cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-6 bg-white rounded-xl px-3 py-2 shadow-hover border"
                style={{ borderColor: 'var(--border)', zIndex: 10 }}
              >
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={14} style={{ color: 'var(--accent)' }} />
                  <span className="font-mono-accent text-[11px] font-medium" style={{ color: 'var(--text-1)' }}>+24% growth</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-xl px-3 py-2 shadow-hover border"
                style={{ borderColor: 'var(--border)', zIndex: 10 }}
              >
                <div className="flex items-center gap-1.5">
                  <BarChart3 size={14} style={{ color: 'var(--secondary)' }} />
                  <span className="font-mono-accent text-[11px] font-medium" style={{ color: 'var(--text-1)' }}>Power BI · DAX</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-10 -left-10 bg-white rounded-xl px-3 py-2 shadow-hover border"
                style={{ borderColor: 'var(--border)', zIndex: 10 }}
              >
                <div className="flex items-center gap-1.5">
                  <Database size={14} style={{ color: 'var(--tertiary)' }} />
                  <span className="font-mono-accent text-[11px] font-medium" style={{ color: 'var(--text-1)' }}>SQL · Python</span>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ────────────────────────────────────────── */}
      <div
        className="relative z-10 py-3 overflow-hidden border-y"
        style={{ borderColor: 'var(--border)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex animate-marquee whitespace-nowrap gap-8 w-max">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span
              key={i}
              className="font-mono-accent text-xs tracking-widest"
              style={{ color: t === '·' ? 'var(--border)' : 'var(--text-3)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Navigation Cards ──────────────────────────────── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Explore</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
              Discover my{' '}
              <span className="text-gradient">universe</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Six sections — one complete picture of who I am as a data professional.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {navCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.to}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link to={card.to} className="nav-card group block h-full">
                    {/* Top colour strip */}
                    <div
                      className="h-1.5 w-full rounded-t-3xl"
                      style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}88)` }}
                    />

                    <div className="p-7 flex flex-col gap-5 h-full" style={{ background: card.bg }}>
                      {/* Number + icon row */}
                      <div className="flex items-start justify-between">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                          style={{ background: `${card.color}18`, border: `1.5px solid ${card.color}30` }}
                        >
                          <Icon size={22} style={{ color: card.color }} />
                        </div>
                        <span
                          className="font-mono-accent text-xs font-medium opacity-40"
                          style={{ color: card.color }}
                        >
                          {card.tag}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="flex-grow">
                        <h3 className="font-display text-xl font-bold mb-1.5" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                          {card.label}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                          {card.sub}
                        </p>
                      </div>

                      {/* CTA arrow */}
                      <div
                        className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                        style={{ color: card.color }}
                      >
                        <span>Explore</span>
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured skills marquee strip ─────────────────── */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #7C6CF8 50%, var(--secondary) 100%)',
              padding: '2px',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
              style={{ background: 'var(--surface)' }}
            >
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10"
                style={{ background: 'var(--accent)', filter: 'blur(40px)' }} />
              <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full opacity-10"
                style={{ background: 'var(--secondary)', filter: 'blur(40px)' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <span className="section-label mb-4 inline-block">Ready to hire?</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Let's build something{' '}
                    <span className="text-gradient">meaningful</span> together
                  </h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Open to full-time data analyst roles, freelance projects, and internships.
                    Based in Krishnagiri, Tamil Nadu — available remotely worldwide.
                  </p>
                  <Link to="/contact" className="btn-accent">
                    Get in touch <ArrowRight size={17} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: BarChart3, label: 'Power BI', desc: 'Interactive dashboards & DAX' },
                    { icon: Database,  label: 'SQL',      desc: 'Query & data modelling' },
                    { icon: Layers,    label: 'Python',   desc: 'Pandas, NumPy, Seaborn' },
                    { icon: TrendingUp,label: 'EDA',      desc: 'Insights from raw data' },
                  ].map(({ icon: Ic, label, desc }) => (
                    <div
                      key={label}
                      className="p-4 rounded-2xl border"
                      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
                    >
                      <Ic size={20} style={{ color: 'var(--accent)' }} className="mb-2" />
                      <p className="font-display font-bold text-sm" style={{ color: 'var(--text-1)' }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}