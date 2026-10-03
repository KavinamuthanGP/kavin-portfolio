import { motion } from 'framer-motion';
import { certifications, achievements } from '../../data/certifications';
import { ExternalLink, Award, Trophy, Star, Shield } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, scale: 0.98, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

export default function Certifications() {
    const majorHighlights = achievements;

    const featuredCert = certifications.find(c => c.featured);
    const secondaryCerts = certifications.filter(c => !c.featured);

    return (
        <motion.section
            id="certifications"
            className="section bg-[var(--bg-primary)] border-t border-[var(--border)] overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
        >
            <div className="section-inner max-w-7xl">

                {/* ── Recognition Section ── */}
                <div className="flex flex-col gap-3 mb-8 md:mb-10">
                    <span className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase font-semibold flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-[var(--accent)]" />
                        Honors & Awards
                    </span>
                    <motion.h2 className="font-display text-3xl md:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter" variants={fadeUp}>
                        Recognition
                    </motion.h2>
                </div>

                {/* Achievement Cards — deliberate hierarchy */}
                {majorHighlights.length > 0 && (
                    <motion.div className="flex flex-col gap-6 mb-14 md:mb-16" variants={fadeUp}>
                        {majorHighlights.map((ach) => (
                            <div key={ach.id} className="relative overflow-hidden group bg-[var(--bg-secondary)] border border-[var(--border)] p-6 sm:p-8 flex flex-col gap-4 transition-colors duration-500 hover:border-[var(--accent)] shadow-md">
                                {/* Ambient glow */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-30" />

                                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                                    <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--accent)] rounded-lg w-fit transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)]">
                                        <Trophy size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-display text-xl sm:text-2xl font-black text-[var(--text-primary)] leading-tight uppercase tracking-tight">
                                            {ach.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="relative z-10 text-base text-[var(--text-secondary)] leading-relaxed font-medium max-w-3xl pl-0 sm:pl-[3.25rem]">
                                    {ach.description}
                                </p>

                                <div className="relative z-10 pl-0 sm:pl-[3.25rem]">
                                    <span className="inline-flex py-1.5 px-3 bg-[var(--bg-primary)] border border-[var(--border)] font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                                        {ach.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* ── Certifications Section ── */}
                <motion.div className="mb-10 flex items-center gap-4" variants={fadeUp}>
                    <Award size={24} className="text-[var(--accent-secondary)]" />
                    <h3 className="font-display text-3xl font-extrabold text-[var(--text-primary)] uppercase tracking-tighter">Licences & Certifications</h3>
                </motion.div>

                {/* Featured Certification — ML Specialization */}
                {featuredCert && (
                    <motion.div
                        className="group relative overflow-hidden bg-[var(--bg-secondary)] border-2 border-[var(--accent)]/30 p-8 sm:p-10 lg:p-12 mb-8 transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]"
                        variants={fadeUp}
                    >
                        {/* Ambient glow */}
                        <div className="absolute -right-20 -top-20 w-60 h-60 bg-[var(--accent)]/10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-80 opacity-30 transition-opacity" />

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                            <div className="p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] rounded-xl shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                                <Star size={32} strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-3 flex-1">
                                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold flex items-center gap-2">
                                    <Shield size={14} />
                                    Featured Credential
                                </span>
                                <h4 className="font-display font-black text-[clamp(1.5rem,2.5vw,2rem)] text-[var(--text-primary)] leading-tight uppercase tracking-tight">
                                    {featuredCert.name}
                                </h4>
                                <span className="text-lg text-[var(--text-secondary)] font-medium">
                                    {featuredCert.issuer}
                                </span>
                            </div>

                            {featuredCert.credentialUrl && (
                                <a
                                    href={featuredCert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="self-start p-3 text-[var(--text-muted)] hover:text-[var(--accent)] bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg transition-colors hover:border-[var(--accent)]"
                                    aria-label={`View credential for ${featuredCert.name}`}
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Secondary Certifications */}
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5" variants={staggerContainer}>
                    {secondaryCerts.map((cert) => (
                        <motion.div
                            key={cert.id}
                            className="group flex flex-col p-6 sm:p-7 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-none hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-secondary)] transition-all duration-300 h-full justify-between gap-5"
                            variants={fadeUp}
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-[var(--accent-secondary)] font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                    {cert.issuer}
                                </span>
                                <h4 className="font-display font-bold text-xl text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-secondary)] transition-colors">
                                    {cert.name}
                                </h4>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                                <span className="font-mono text-xs tracking-widest font-semibold text-[var(--text-muted)] uppercase">
                                    {cert.date ? `Issued ${cert.date}` : 'Credential'}
                                </span>
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded flex items-center justify-center hover:border-[var(--accent-secondary)]"
                                        aria-label={`View credential for ${cert.name}`}
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
