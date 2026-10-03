import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

function isPlaceholder(val) {
    return !val || val === '[PLACEHOLDER]' || val.startsWith('[PLACEHOLDER]');
}

function ExperienceEntry({ item, index }) {
    const hasPlaceholders = isPlaceholder(item.role);
    const num = String(index + 1).padStart(2, '0');

    const techLine = item.techStack
        ?.filter((t) => !isPlaceholder(t))
        .join(' · ');

    return (
        <motion.div
            className="relative group w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-16 md:py-20 px-4 md:px-8 -mx-4 md:-mx-8 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/40 transition-colors duration-500 rounded-sm"
            variants={fadeUp}
        >
            {/* Timeline abstract indicator */}
            <div className="absolute top-0 left-4 md:left-8 right-4 md:right-8 h-px bg-gradient-to-r from-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

            {/* Left Meta Block: Role, Company, Timeframe */}
            <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-start gap-4">
                    <span className="font-mono text-xl text-[var(--accent)] font-bold mt-1 shrink-0">{num}</span>
                    <h3 className="font-display text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold text-[var(--text-primary)] leading-tight uppercase tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                        {hasPlaceholders ? 'Role Details Coming Soon' : item.role}
                    </h3>
                </div>

                {!hasPlaceholders && (
                    <div className="flex flex-col gap-2 pl-10">
                        <span className="text-[1.05rem] text-[var(--text-secondary)] font-medium block">
                            {item.company}
                        </span>

                        {!isPlaceholder(item.startDate) && (
                            <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1.5 w-fit">
                                {item.startDate} – {item.endDate || 'Present'}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Right Content Block: Impact & Stack */}
            <div className="lg:col-span-7 flex flex-col lg:pt-0.5">
                {!hasPlaceholders && item.contributions?.length > 0 && (
                    <div className="flex flex-col gap-6">
                        {item.contributions
                            .filter((c) => !isPlaceholder(c))
                            .map((contribution, idx) => (
                                <p key={idx} className="text-[0.95rem] lg:text-[1rem] text-[var(--text-secondary)] leading-[1.7] flex items-start gap-3">
                                    <span className="hidden sm:inline-block w-5 h-[2px] bg-[var(--accent)] mt-[0.45rem] shrink-0 opacity-70" />
                                    <span className="opacity-90">{contribution}</span>
                                </p>
                            ))}
                    </div>
                )}

                {techLine && (
                    <div className="mt-10 pt-6 border-t border-[var(--border-light)]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 block">Technology Stack</span>
                        <div className="text-[var(--text-primary)] font-mono text-sm leading-relaxed max-w-2xl bg-[var(--bg-tertiary)] px-4 py-3 border border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors">
                            {techLine}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <motion.section
            id="experience"
            className="section bg-[var(--bg-secondary)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="section-inner">
                {/* Header */}
                <div className="mb-16 md:mb-24 flex items-center gap-6">
                    <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] uppercase tracking-tighter">
                        Experience
                    </motion.h2>
                    <motion.div variants={fadeUp} className="flex-1 h-2 bg-[var(--border)]"></motion.div>
                </div>

                <div className="flex flex-col w-full">
                    {experience.map((item, index) => (
                        <ExperienceEntry
                            key={item.id}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
