import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SectionWrapper } from '../components/SectionWrapper';

// ─── Data ────────────────────────────────────────────────────────────────────

const radarData = [
  { subject: 'SQL & DBs',    A: 85, fullMark: 100 },
  { subject: 'Python',       A: 80, fullMark: 100 },
  { subject: 'Power BI',     A: 88, fullMark: 100 },
  { subject: 'Excel',        A: 82, fullMark: 100 },
  { subject: 'EDA',          A: 85, fullMark: 100 },
  { subject: 'Storytelling', A: 78, fullMark: 100 },
];

const skillGroups = [
  {
    label: 'Data & Analytics',
    color: '#5B4CF5',
    lightBg: '#EEF0FF',
    skills: [
      { name: 'SQL / MySQL',            pct: 85 },
      { name: 'Data Cleaning & EDA',    pct: 85 },
      { name: 'Excel (Pivot, VLOOKUP)', pct: 82 },
      { name: 'Statistics & Reporting', pct: 78 },
    ],
  },
  {
    label: 'Visualisation',
    color: '#E84393',
    lightBg: '#FDE9F4',
    skills: [
      { name: 'Power BI (DAX)',          pct: 88 },
      { name: 'Matplotlib / Seaborn',    pct: 78 },
      { name: 'Tableau (Basics)',        pct: 70 },
      { name: 'Dashboard Storytelling', pct: 80 },
    ],
  },
  {
    label: 'Programming',
    color: '#10B981',
    lightBg: '#ECFDF5',
    skills: [
      { name: 'Python (Pandas, NumPy)', pct: 80 },
      { name: 'Git & GitHub',           pct: 75 },
      { name: 'HTML / CSS',             pct: 72 },
    ],
  },
];

const techBadges = [
  { name: 'Python',    emoji: '🐍', color: '#3B82F6', bg: '#EFF6FF' },
  { name: 'MySQL',     emoji: '🗄️', color: '#F97316', bg: '#FFF7ED' },
  { name: 'Power BI',  emoji: '📊', color: '#FBBF24', bg: '#FFFBEB' },
  { name: 'Excel',     emoji: '📗', color: '#16A34A', bg: '#F0FDF4' },
  { name: 'Tableau',   emoji: '📈', color: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Pandas',    emoji: '🐼', color: '#8B5CF6', bg: '#F5F3FF' },
  { name: 'NumPy',     emoji: '🔢', color: '#0EA5E9', bg: '#F0F9FF' },
  { name: 'Seaborn',   emoji: '🎨', color: '#EC4899', bg: '#FDF2F8' },
  { name: 'Git',       emoji: '🔀', color: '#EF4444', bg: '#FEF2F2' },
  { name: 'GitHub',    emoji: '🐙', color: '#1A1035', bg: '#F5F6FA' },
  { name: 'VS Code',   emoji: '💻', color: '#0EA5E9', bg: '#F0F9FF' },
  { name: 'EDA',       emoji: '🔍', color: '#5B4CF5', bg: '#EEF0FF' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({
  name,
  pct,
  color,
  delay,
}: {
  name: string;
  pct: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Main Skills Page ─────────────────────────────────────────────────────────

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const visible =
    activeGroup === null
      ? skillGroups
      : skillGroups.filter((g) => g.label === activeGroup);

  return (
    <div className="pt-24 pb-20 min-h-screen relative z-10">
      <SectionWrapper>

        {/* ── Section Header ─────────────────────────────────────── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Capabilities</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight mb-3">
            My{' '}
            <span className="text-gradient italic">Skills</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Tools I use daily to transform raw data into decisions.
          </p>
          <div
            className="w-16 h-1 mx-auto mt-6 rounded-full"
            style={{ background: 'var(--accent)' }}
          />
        </motion.div>

        {/* ── Top Grid: Radar + Skill Bars ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* Radar Chart */}
          <motion.div
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-card h-[420px] flex flex-col"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-semibold text-slate-800 mb-4 text-center">
              Skill Radar
            </h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="#E5E3F3" strokeOpacity={0.8} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#3D3B6B', fontSize: 11, fontFamily: 'Space Grotesk' }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#12103A',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontFamily: 'Space Grotesk',
                      fontSize: 12,
                    }}
                    itemStyle={{ color: '#C5BFFF' }}
                  />
                  <Radar
                    name="Proficiency"
                    dataKey="A"
                    stroke="#5B4CF5"
                    strokeWidth={2}
                    fill="#5B4CF5"
                    fillOpacity={0.25}
                    dot={{ r: 4, fill: '#5B4CF5', strokeWidth: 0 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill group filter + bars */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveGroup(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  activeGroup === null
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
                style={
                  activeGroup === null
                    ? { background: 'var(--accent)' }
                    : {}
                }
              >
                All
              </button>
              {skillGroups.map((g) => (
                <button
                  key={g.label}
                  onClick={() =>
                    setActiveGroup(activeGroup === g.label ? null : g.label)
                  }
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activeGroup === g.label
                      ? 'text-white border-transparent shadow-sm'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                  }`}
                  style={
                    activeGroup === g.label
                      ? { background: g.color }
                      : {}
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Skill bars — grouped */}
            <div className="space-y-7 max-h-[340px] overflow-y-auto pr-1">
              {visible.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: group.color }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: group.color }}
                    >
                      {group.label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {group.skills.map((s, i) => (
                      <SkillBar
                        key={s.name}
                        name={s.name}
                        pct={s.pct}
                        color={group.color}
                        delay={i * 0.08}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tools & Technologies Grid ───────────────────────────── */}
        <motion.div
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-semibold text-slate-800">
              Tools &{' '}
              <span className="text-gradient italic">Technologies</span>
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              The stack behind the analysis
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techBadges.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.06 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-100 shadow-card cursor-default select-none"
                style={{ background: tech.bg }}
              >
                <span className="text-lg leading-none">{tech.emoji}</span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Proficiency Key ─────────────────────────────────────── */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Beginner',     range: '< 60%',   dot: '#94A3B8' },
            { label: 'Intermediate', range: '60–79%',  dot: '#60A5FA' },
            { label: 'Proficient',   range: '80–89%',  dot: '#5B4CF5' },
            { label: 'Expert',       range: '90–100%', dot: '#E84393' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-slate-500">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: item.dot }}
              />
              <span className="font-medium">{item.label}</span>
              <span className="text-slate-300">|</span>
              <span>{item.range}</span>
            </div>
          ))}
        </motion.div>

      </SectionWrapper>
    </div>
  );
}