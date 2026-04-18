import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',         path: '/' },
  { name: 'About',        path: '/about' },
  { name: 'Skills',       path: '/skills' },
  { name: 'Experience',   path: '/experience' },
  { name: 'Projects',     path: '/projects' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact',      path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-xs)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="font-display font-bold text-xl tracking-tight"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}
        >
          <span style={{ color: 'var(--accent)' }}>S</span>aranya
          <span style={{ color: 'var(--secondary)' }}>.</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all relative pb-0.5 ${
                  isActive ? 'text-gradient font-semibold' : 'text-slate-400 hover:text-slate-700'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-2)' }}
          aria-label="Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full py-5 px-6 flex flex-col gap-4 border-b"
          style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderColor: 'var(--border)' }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-base font-semibold font-display transition-colors ${
                  isActive ? 'text-gradient' : 'text-slate-500 hover:text-accent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}