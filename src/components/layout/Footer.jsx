import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo';
import { ArrowUpRight } from 'lucide-react';

function GithubIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.2-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6 1.6 4.8 2 4.8 2c-.8 1.8-.3 3.1-.2 3.4-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
        </svg>
    );
}

function LinkedInIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border)] pt-24 sm:pt-32 pb-8 overflow-hidden z-20">
            {/* Ambient Footer Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[var(--accent)]/10 blur-[150px] rounded-[100%] pointer-events-none" />

            <div className="section-inner max-w-[var(--width-container)] relative z-10 flex flex-col items-center text-center">
                <span className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase mb-8 font-bold border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-2">
                    Initiate Contact
                </span>

                <h2 className="font-display text-[clamp(3.5rem,8vw,10rem)] leading-[0.85] font-black text-[var(--text-primary)] tracking-tighter uppercase mb-16 max-w-7xl w-full mx-auto drop-shadow-2xl">
                    <span className="block hover:text-[var(--accent)] transition-colors duration-500 cursor-default">Let&apos;s Build</span>
                    <span className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-500 cursor-default">Something</span>
                    <span className="block hover:text-[var(--accent)] transition-colors duration-500 cursor-default">Great.</span>
                </h2>

                <motion.a
                    href={personalInfo.email.includes('PLACEHOLDER') ? 'mailto:contact@example.com' : `mailto:${personalInfo.email}`}
                    className="group inline-flex items-center gap-4 bg-[var(--accent)] text-white px-12 py-6 rounded-none font-bold text-2xl uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_var(--text-primary)] border border-[var(--accent)] hover:border-[var(--text-primary)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Get in touch <ArrowUpRight size={28} className="group-hover:rotate-45 transition-transform duration-300" />
                </motion.a>

                <div className="w-full h-[2px] bg-[var(--border-light)] my-20 sm:my-32" />

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 text-[var(--text-muted)] font-mono text-sm uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--text-primary)] text-lg">[ K / ]</span>
                        <span>&copy; {new Date().getFullYear()} {personalInfo.name}.</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <a
                            href={personalInfo.githubUrl.includes('PLACEHOLDER') ? '#' : personalInfo.githubUrl}
                            aria-label="GitHub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <GithubIcon size={24} />
                        </a>
                        <a
                            href={personalInfo.linkedinUrl.includes('PLACEHOLDER') ? '#' : personalInfo.linkedinUrl}
                            aria-label="LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                            <LinkedInIcon size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
