import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { SectionWrapper } from '../components/SectionWrapper';
import { SkeletonCard } from '../components/SkeletonCard';
import { fetchSheetData, fallbackCertificates } from '../lib/fetchSheet';
import { Certificate } from '../types';

export function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    async function loadData() {
      try {
        const data = await fetchSheetData<Certificate>('certificates');
        if (data && data.length > 0) {
          setCertificates(data);
        } else {
          setCertificates(fallbackCertificates);
        }
      } catch (error) {
        console.error('Failed to fetch certificates data', error);
        setCertificates(fallbackCertificates);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCertificateClick = (url: string) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  const categories = [
    'All',
    ...Array.from(
      new Set(
        certificates
          .map((c) => (c.Category || c.category || '').trim())
          .filter(Boolean)
      )
    ),
  ];

  const filteredCerts =
    filter === 'All'
      ? certificates
      : certificates.filter(
          (c) => (c.Category || c.category || '').trim() === filter
        );

  return (
    <div className="pt-24 pb-16 min-h-screen relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={250}
            colors={['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']}
          />
        </div>
      )}

      <SectionWrapper>
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-secondary bg-secondary/10 px-4 py-1.5 rounded-full mb-4">
            Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Licenses & <span className="text-gradient">Certifications</span>
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-8" />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-secondary text-white shadow-[0_4px_14px_rgba(139,92,246,0.35)]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, index) => {
              const title = cert.Title || cert.title || '';
              const issuer = cert.Issuer || cert.issuer || '';
              const date = cert.Date || cert.date || '';
              const credUrl = cert.Link || cert.credential_url || '';
              const image = cert.Image || cert.image_url || '';
              const category = cert.Category || cert.category || '';

              return (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleCertificateClick(credUrl)}
                  className="bg-white rounded-2xl p-6 cursor-pointer group hover:border-secondary/40 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] shadow-md border border-slate-100 transition-all relative overflow-hidden"
                >
                  {/* Decorative blob */}
                  <div className="absolute -right-8 -top-8 w-28 h-28 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />

                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-32 object-contain mb-4 rounded-lg bg-slate-50 p-2"
                    />
                  ) : null}

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Award size={22} />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-heading font-bold text-base mb-1 leading-snug text-slate-800 group-hover:text-secondary transition-colors">
                        {title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                        <Building2 size={13} className="shrink-0" />
                        <span className="font-medium truncate">{issuer}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                          <Calendar size={11} />
                          <span>{date}</span>
                        </div>

                        {category && (
                          <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                            {category}
                          </span>
                        )}
                      </div>

                      {credUrl && credUrl !== '#' && (
                        <div className="mt-3 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          View Credential <ExternalLink size={11} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredCerts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No certificates found for this category.</p>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}