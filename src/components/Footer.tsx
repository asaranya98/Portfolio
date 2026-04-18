import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 mt-auto bg-white/70 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-400 flex items-center gap-1.5">
          Built with <Heart size={13} className="text-pink-500 fill-pink-500" /> + Power BI &nbsp;·&nbsp; Saranya A © 2026
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/asaranya98"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://linkedin.com/in/asaranyaarun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}