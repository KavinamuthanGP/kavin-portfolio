import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Arsenal' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = [
    'hero', 'about', 'education', 'skills',
    'experience', 'projects', 'certifications',
    'coding-profiles', 'resume', 'contact',
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const activeSection = useScrollSpy(SECTION_IDS);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = (id) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'py-4' : 'py-6 sm:py-8'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500`}>
                    <div className={`flex items-center justify-between mx-auto transition-all duration-500 ${scrolled
                        ? 'bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border)] rounded-full px-6 py-3 shadow-2xl'
                        : 'bg-transparent px-2'
                        }`}>

                        {/* Logo */}
                        <a
                            href="#hero"
                            className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg transition-transform duration-200 hover:scale-105"
                            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
                        >
                            <span className="font-display font-bold tracking-tighter text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                                Kav
                            </span>
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-2">
                            {NAV_LINKS.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        className={`relative px-4 py-2 font-mono text-sm tracking-wide rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${isActive ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:-translate-y-0.5'
                                            }`}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="desktop-nav-pill"
                                                className="absolute inset-0 bg-[var(--border)] rounded-full -z-10"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Right-side controls */}
                        <div className="flex items-center gap-3">
                            <button
                                className="p-2.5 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-[var(--border)] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:scale-110"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'dark' ? (
                                        <motion.div key="sun" initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Sun size={18} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon" initial={{ rotate: 90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: -90, scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Moon size={18} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            <button
                                className="md:hidden p-2.5 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-[var(--border)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu full screen */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] bg-[var(--bg-primary)]/95 backdrop-blur-2xl flex flex-col pt-24 px-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button
                            className="absolute top-8 right-6 sm:right-10 p-3 rounded-full text-white bg-[var(--border)] hover:bg-[var(--border-light)] transition-colors"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col gap-6 mt-12">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={`font-display text-4xl font-bold uppercase tracking-tighter transition-colors ${activeSection === link.id ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                                        }`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
