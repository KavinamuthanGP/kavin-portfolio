import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

const quickFacts = [
    {
        icon: MapPin,
        label: 'Location',
        value: personalInfo.location,
    },
    {
        icon: GraduationCap,
        label: 'University',
        value: personalInfo.university,
    },
    {
        icon: BookOpen,
        label: 'Degree',
        value: personalInfo.degree,
    },
    {
        icon: Calendar,
        label: 'Graduation',
        value: personalInfo.graduationYear,
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function About() {
    return (
        <motion.section
            id="about"
            className="section relative bg-[var(--bg-secondary)] overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--accent)]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="section-inner relative z-10">
                <div className="mb-16 md:mb-24 flex items-center gap-6">
                    <motion.div variants={fadeUp} className="w-16 md:w-24 h-2 bg-[var(--accent)]"></motion.div>
                    <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] uppercase tracking-tighter">
                        About Me
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">

                    {/* Left: Massive Introductory Statement */}
                    <motion.div className="lg:col-span-7 flex flex-col gap-8 justify-center" variants={fadeUp}>
                        <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold text-[var(--text-primary)] leading-[1.1] tracking-tight">
                            I engineer <span className="text-[var(--accent)]">high-performance</span> digital experiences and intelligent systems.
                        </h3>

                        <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] text-[var(--text-secondary)] leading-relaxed max-w-2xl font-medium">
                            {personalInfo.bio}
                        </p>

                        {/* Core Philosophy with hover interaction */}
                        <div className="pt-8 group/philosophy cursor-default">
                            <span className="font-mono text-[var(--accent-secondary)] uppercase tracking-widest text-[0.95rem] flex items-center gap-4">
                                <span className="w-12 h-px bg-[var(--accent-secondary)] transition-all duration-500 group-hover/philosophy:w-20 group-hover/philosophy:bg-[var(--accent)]"></span>
                                Core Philosophy
                            </span>
                            <p className="text-xl text-[var(--text-primary)] mt-4 font-semibold italic opacity-90 max-w-xl border-l-4 border-[var(--accent)] pl-6 transition-all duration-300 group-hover/philosophy:pl-8 group-hover/philosophy:border-[var(--accent-hover)]">
                                "The game gets easier once you see the patterns."
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Metadata Cards with hover interactions */}
                    <motion.div
                        className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
                        variants={containerVariants}
                    >
                        {quickFacts.map((fact) => {
                            const Icon = fact.icon;
                            return (
                                <motion.div
                                    key={fact.label}
                                    variants={fadeUp}
                                    className="group relative overflow-hidden p-6 md:p-8 bg-[var(--bg-primary)] border-2 border-[var(--border)] rounded-none transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]"
                                >
                                    {/* Hover Slide Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                                    <div className="relative z-10 flex items-start gap-6">
                                        <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                                            <Icon size={28} strokeWidth={2} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="font-mono text-[0.85rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                                                {fact.label}
                                            </span>
                                            <span className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight underline decoration-[var(--accent)] decoration-2 underline-offset-4 pointer-events-none group-hover:text-[var(--accent)] transition-colors duration-300">
                                                {fact.value}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
