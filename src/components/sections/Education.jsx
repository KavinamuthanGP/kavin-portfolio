import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo';
import { GraduationCap } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Education() {
    return (
        <motion.section
            id="education"
            className="section relative bg-[var(--bg-primary)] overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="section-inner">
                {/* Background ambient light */}
                <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-[var(--accent)]/10 blur-[150px] rounded-full pointer-events-none" />

                <motion.div variants={fadeUp} className="w-full relative z-10 p-2 sm:p-4">
                    {/* Massive Monolithic Composition */}
                    <div className="relative overflow-hidden bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-none flex flex-col md:flex-row group hover:border-[var(--accent)] transition-colors duration-500 shadow-2xl">

                        {/* Left Side: Huge Degree Name */}
                        <div className="flex-1 p-8 md:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] group-hover:bg-[var(--accent)]/5 transition-colors duration-500">
                            <GraduationCap className="absolute -right-16 -bottom-16 w-[300px] h-[300px] text-[var(--accent)] opacity-5 rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

                            <span className="text-[var(--accent)] font-mono text-[0.8rem] tracking-widest uppercase mb-4 block font-bold border-b-2 border-[var(--accent)]/30 pb-2 w-fit">
                                Academic Foundation
                            </span>
                            <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[var(--text-primary)] leading-[1.1] tracking-tight uppercase z-10 relative">
                                {personalInfo.degree}
                            </h3>
                        </div>

                        {/* Right Side: High-contrast Structural Data */}
                        <div className="w-full md:w-[50%] bg-[var(--bg-tertiary)] border-t md:border-t-0 md:border-l border-[var(--border)] p-8 md:p-10 flex flex-col justify-center gap-6 relative z-10 transition-colors duration-500 group-hover:bg-[var(--bg-primary)]">
                            <div>
                                <span className="font-mono text-[0.8rem] uppercase tracking-widest text-[var(--text-muted)] block mb-2">Institution</span>
                                <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] text-[var(--text-primary)] font-bold leading-snug">
                                    {personalInfo.university}
                                </p>
                            </div>

                            <div className="w-full h-px bg-[var(--border)]"></div>

                            <div className="flex flex-col sm:flex-row gap-8 justify-between">
                                <div>
                                    <span className="font-mono text-[0.85rem] uppercase tracking-widest text-[var(--text-muted)] block mb-3">Class Of</span>
                                    <span className="font-display text-4xl text-[var(--accent-secondary)] font-black tracking-tighter">
                                        {personalInfo.graduationYear}
                                    </span>
                                </div>
                                <div className="sm:text-right">
                                    <span className="font-mono text-[0.85rem] uppercase tracking-widest text-[var(--text-muted)] block mb-3">Region</span>
                                    <span className="font-mono text-lg text-[var(--text-secondary)]">
                                        {personalInfo.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
