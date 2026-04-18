import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BarChart, Coffee, Download } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
export function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SectionWrapper>
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto md:mx-0 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Avatar & Fun Cards */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.5
              }}>
              
              <div className="w-48 h-48 rounded-2xl glass-card flex items-center justify-center border-2 border-accent/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-5xl font-heading font-bold text-slate-300 dark:text-slate-600">
                  SA
                </span>
              </div>
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-xl font-heading font-semibold mb-4">
                3 things about me:
              </h3>

              <motion.div
                className="glass-card p-4 rounded-xl flex items-center gap-4"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.1
                }}>
                
                <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                  <Terminal size={24} />
                </div>
                <p className="font-medium">Python is my superpower</p>
              </motion.div>

              <motion.div
                className="glass-card p-4 rounded-xl flex items-center gap-4"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.2
                }}>
                
                <div className="p-3 bg-accent/10 text-accent rounded-lg">
                  <BarChart size={24} />
                </div>
                <p className="font-medium">
                  I turn messy data into clean dashboards
                </p>
              </motion.div>

              <motion.div
                className="glass-card p-4 rounded-xl flex items-center gap-4"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.3
                }}>
                
                <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
                  <Coffee size={24} />
                </div>
                <p className="font-medium">Fuelled by curiosity (and chai)</p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Bio & Timeline */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.5
              }}>
              
              <h2 className="text-2xl font-heading font-semibold mb-4">
                My Story
              </h2>
              <div className="glass-card p-6 md:p-8 rounded-2xl text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  Detail-oriented Entry-Level Data Analyst with a strong
                  foundation in SQL, Excel, and Power BI. Passionate about
                  transforming raw data into actionable insights and creating
                  innovative visualizations to support data-driven decisions.
                </p>
                <p>
                  Experienced in analytical reporting and cross-functional
                  collaboration. I love diving deep into datasets to find the
                  hidden stories they tell, and presenting those stories in a
                  way that makes sense to stakeholders.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.2
              }}>
              
              <h2 className="text-2xl font-heading font-semibold mb-6">
                My Journey
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                {/* Timeline Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-darkBg bg-accent text-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-accent">
                        Data Analytics Intern
                      </h4>
                      <span className="text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded-full">
                        Current
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Edu Tantr • Jan 2026
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-darkBg bg-slate-300 dark:bg-slate-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl opacity-80">
                    <h4 className="font-bold">Web Dev Intern</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Aspirentech • Jun 2025
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-darkBg bg-slate-300 dark:bg-slate-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl opacity-80">
                    <h4 className="font-bold">B.Tech IT (CGPA 8.4)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Er. Perumal Manimekalai College • 2022
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-darkBg bg-slate-300 dark:bg-slate-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl opacity-80">
                    <h4 className="font-bold">Grade 12 (89%)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Selva Matric HSS • 2021
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}>
              
              <a
                href="https://docs.google.com/document/d/195QyiqbWvL6Ywo0AGdp2S9pB03zOu7xv/export?format=pdf"
                download="Saranya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">
                
                Download CV <Download size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </div>);

}