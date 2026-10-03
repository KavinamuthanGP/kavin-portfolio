import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Profiles from './components/sections/Profiles';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import CursorSpotlight from './components/ui/CursorSpotlight';
import './index.css';

/** Section IDs — used for navigation & scroll spy */
export const SECTION_IDS = [
  'hero',
  'about',
  'education',
  'skills',
  'experience',
  'projects',
  'certifications',
  'coding-profiles',
  'resume',
  'contact',
];

function App() {
  return (
    <ThemeProvider>
      {/* Skip-to-content for accessibility */}
      <a href="#hero" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />
      <ScrollProgress />

      <main>
        {/* ── Hero ─────────────────────────────────── */}
        <Hero />

        {/* ── Phase 3: Content Sections ────────────── */}
        <About />
        <Education />
        <Skills />
        <Experience />

        {/* ── Phase 4: Projects ────────────────────── */}
        <Projects />

        {/* ── Phase 5: Final Sections ──────────────── */}
        <Certifications />
        <Profiles />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
