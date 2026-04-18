import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorFollower } from './components/CursorFollower';
// Pages
import { Home }         from './pages/Home';
import { About }        from './pages/About';
import { Skills }       from './pages/Skills';
import { Experience }   from './pages/Experience';
import { Projects }     from './pages/Projects';
import { Certificates } from './pages/Certificates';
import { Contact }      from './pages/Contact';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.28 }}
    className="flex-grow flex flex-col"
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about"       element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/skills"      element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/experience"  element={<PageWrapper><Experience /></PageWrapper>} />
        <Route path="/projects"    element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/certificates" element={<PageWrapper><Certificates /></PageWrapper>} />
        <Route path="/contact"     element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <ScrollProgress />
        <CursorFollower />
        <Navbar />

        <main className="flex-grow flex flex-col relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />

        {/* Floating Hire Me */}
        <Link
          to="/contact"
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all group"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(91,76,245,0.35)',
          }}
        >
          <Briefcase size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline">Hire Me</span>
        </Link>
      </div>
    </BrowserRouter>
  );
}