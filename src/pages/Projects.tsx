import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Tag } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SkeletonCard } from '../components/SkeletonCard';
import { fetchSheetData, fallbackProjects } from '../lib/fetchSheet';
import { Project } from '../types';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSheetData<Project>('projects');
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects data', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Derive unique categories from sheet's Category column
  const categories = [
    'All',
    ...Array.from(
      new Set(
        projects
          .map((p) => (p.Category || p.category || '').trim())
          .filter(Boolean)
      )
    ),
  ];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => {
          const cat = (p.Category || p.category || '').trim();
          const tech = (p.Technologies || p.tools || '').trim();
          return cat === filter || tech.includes(filter);
        });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SectionWrapper>
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-4 py-1.5 rounded-full mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-8" />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-accent text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-accent hover:text-accent shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const title = project.Title || project.title || '';
              const description = project.Description || project.description || '';
              const image = project.Image || project.image_url || '';
              const technologies = project.Technologies || project.tools || '';
              const githubUrl = project.GithubUrl || project.github || '';
              const liveUrl = project.LiverUrl || project.link || '';
              const category = project.Category || project.category || '';
              const isFeatured =
                project.Featured === true ||
                project.featured === true ||
                String(project.Featured).toLowerCase() === 'true';

              return (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col h-full group border border-slate-100 shadow-md hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                >
                  {/* Image / Banner */}
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-heading font-extrabold text-accent/10 select-none">
                          {category || 'Project'}
                        </span>
                      </div>
                    )}

                    {isFeatured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={11} fill="currentColor" /> Featured
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-accent text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag size={12} className="text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                        {category}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold mb-2 text-slate-800 group-hover:text-accent transition-colors leading-snug">
                      {title}
                    </h3>

                    <p className="text-sm text-slate-500 mb-5 flex-grow leading-relaxed line-clamp-3">
                      {description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {technologies
                        .split(',')
                        .slice(0, 4)
                        .map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No projects found for this category.</p>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}