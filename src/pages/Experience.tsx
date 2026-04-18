import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building2 } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SkeletonCard } from '../components/SkeletonCard';
import { fetchSheetData, fallbackExperience } from '../lib/fetchSheet';
import { Experience as ExperienceType } from '../types';

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSheetData<ExperienceType>('Experience');
        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(fallbackExperience);
        }
      } catch (error) {
        console.error('Failed to fetch experience data', error);
        setExperiences(fallbackExperience);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SectionWrapper>
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-4 py-1.5 rounded-full mb-4">
            Career
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            My <span className="text-gradient">Experience</span>
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="space-y-8 max-w-3xl mx-auto">
            {[1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-slate-200 to-transparent -translate-x-1/2" />
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-slate-200 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const role = exp.Title || exp.role || '';
                const company = exp.Company || exp.company || '';
                const period = exp.Period || (exp.start_date ? `${exp.start_date}${exp.end_date ? ` – ${exp.end_date}` : ' – Present'}` : '');
                const location = exp.Location || '';
                const contributions = exp['Key Contributions'] || exp.description || '';
                const isCurrent =
                  exp.is_current === true ||
                  period.toLowerCase().includes('present') ||
                  period.toLowerCase().includes('current') ||
                  !exp.end_date;

                return (
                  <motion.div
                    key={exp.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-accent flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]">
                      {isCurrent ? (
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                      ) : (
                        <Building2 size={15} className="text-slate-400" />
                      )}
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-16 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-lg hover:border-accent/25 transition-all ${
                        index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-xl font-heading font-bold text-slate-800 leading-tight">
                          {role}
                        </h3>
                        {isCurrent && (
                          <span className="px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full border border-accent/20 shrink-0">
                            Current
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-semibold text-secondary mb-3">
                        {company}
                      </h4>

                      <div className="flex flex-wrap gap-3 mb-4">
                        {period && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                            <Clock size={12} />
                            <span>{period}</span>
                          </div>
                        )}
                        {location && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                            <MapPin size={12} />
                            <span>{location}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-slate-600 text-sm space-y-1.5 leading-relaxed">
                        {contributions
                          .split(/\n|\|/)
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                          <p key={i} className="flex items-start gap-2">
                            {line.startsWith('•') ? (
                              <>
                                <span className="text-accent mt-0.5 shrink-0">▸</span>
                                <span>{line.substring(1).trim()}</span>
                              </>
                            ) : (
                              <>
                                <span className="text-accent mt-0.5 shrink-0">▸</span>
                                <span>{line}</span>
                              </>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}