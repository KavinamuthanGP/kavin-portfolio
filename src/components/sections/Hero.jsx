import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Code2, Sparkles, Lightbulb } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import Button from '../ui/Button';

/* ── Orbital label config ───────────────────────────── */
const ORBITAL_LABELS = [
    {
        id: 'fullstack',
        label: 'Full Stack',
        Icon: Code2,
        accent: 'var(--accent)',
        glowRgba: 'rgba(99,102,241,0.2)',
    },
    {
        id: 'aiml',
        label: 'AI / ML',
        Icon: Sparkles,
        accent: 'var(--accent-secondary)',
        glowRgba: 'rgba(6,182,212,0.2)',
    },
    {
        id: 'problemsolving',
        label: 'Problem Solving',
        Icon: Lightbulb,
        accent: 'var(--accent)',
        glowRgba: 'rgba(99,102,241,0.2)',
    },
];

/* Ring geometry: [size(px), duration, direction, style] */
const RING_CONFIG = [
    { size: 480, duration: 50, dir: 1, style: 'dashed' },
    { size: 370, duration: 65, dir: -1, style: 'solid' },
    { size: 260, duration: 80, dir: 1, style: 'dashed' },
];

/* Label position anchored to the circumference */
const LABEL_POSITIONS = [
    { top: '0%', left: '50%' },      // Ring 0: top-center
    { top: '50%', left: '0%' },      // Ring 1: left-center
    { top: '50%', left: '100%' },    // Ring 2: right-center
];

export default function Hero() {
    const scrollToAbout = useCallback(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const scrollToProjects = useCallback((e) => {
        e.preventDefault();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    /* Reduced motion detection */
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);
        const handler = (e) => setPrefersReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* Hover state for orbital labels */
    const [hoveredLabel, setHoveredLabel] = useState(null);

    // Stagger for initial load
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    // Spring up for text elements
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    return (
        <section id="hero" className="relative min-h-[100dvh] flex items-center pt-24 sm:pt-32 pb-20 overflow-hidden bg-[var(--bg-primary)]">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <div className="section-inner relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8">

                    {/* Left Typography Block (Cols 1-7) */}
                    <motion.div
                        className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 order-2 lg:order-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3">
                            <span className="w-12 h-1 bg-[var(--accent)] rounded-full"></span>
                            <span className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase font-semibold">
                                System Architect & Developer
                            </span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col">
                            <h1 className="font-display font-extrabold text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] tracking-tighter text-[var(--text-primary)] uppercase drop-shadow-sm flex flex-wrap items-baseline gap-x-[clamp(1rem,3vw,2.5rem)]">
                                <span className="text-[var(--text-secondary)] whitespace-nowrap">Kavinamuthan</span>
                                <span className="whitespace-nowrap">GP</span>
                            </h1>
                            <h2 className="font-display font-bold text-[clamp(1.5rem,3.5vw,3rem)] leading-tight text-[var(--accent-secondary)] uppercase mt-4 tracking-tight">
                                Full Stack <span className="text-[var(--text-muted)]">+</span> AI Engineer
                            </h2>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-[clamp(1.1rem,1.5vw,1.35rem)] text-[var(--text-secondary)] max-w-xl leading-relaxed"
                        >
                            I build scalable architectures and intelligent systems.
                            Currently studying at {personalInfo.university}, obsessed with shipping products that bridge complex engineering with intentional user experiences.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4 lg:mt-8">
                            <a
                                href="#projects"
                                onClick={scrollToProjects}
                                className="group relative overflow-hidden bg-[var(--accent)] text-white px-8 py-4 rounded-none font-bold text-lg uppercase tracking-wide transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(99,102,241,0.25)]"
                            >
                                <div className="absolute inset-0 bg-[var(--accent-hover)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                                <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-300">View My Work <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                            </a>

                            <a
                                href={personalInfo.resumeUrl}
                                download
                                className="group px-8 py-4 rounded-none border-2 border-[var(--border-light)] text-[var(--text-primary)] font-bold text-lg uppercase tracking-wide transition-all hover:border-[var(--accent)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:bg-[var(--bg-secondary)]"
                            >
                                <span className="flex items-center gap-2">Download Resume <Download size={20} className="group-hover:translate-y-1 transition-transform" /></span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Abstract Visual Identity (Cols 8-12) */}
                    <motion.div
                        className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 min-h-[400px] sm:min-h-[500px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative w-full max-w-[500px] aspect-square">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-[var(--accent)]/20 blur-[100px] rounded-full"></div>

                            {/* Three Orbital Rings — one per label */}
                            {ORBITAL_LABELS.map((labelCfg, i) => {
                                const ring = RING_CONFIG[i];
                                const isHovered = hoveredLabel === labelCfg.id;
                                const someHovered = hoveredLabel !== null;

                                /* Ring opacity: brighter when hovered, dimmer when another is hovered */
                                const ringOpacity = someHovered
                                    ? (isHovered ? 1 : 0.5)
                                    : 0.8;

                                const rotateAngle = ring.dir > 0 ? 360 : -360;

                                return (
                                    <motion.div
                                        key={labelCfg.id}
                                        className="absolute rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            marginTop: `-${ring.size / 2}px`,
                                            marginLeft: `-${ring.size / 2}px`,
                                            width: `${ring.size}px`,
                                            height: `${ring.size}px`,
                                            border: `1px ${ring.style} ${labelCfg.accent}`,
                                            opacity: ringOpacity,
                                            transformOrigin: 'center center',
                                            transition: 'opacity 0.4s ease',
                                        }}
                                        animate={prefersReducedMotion ? {} : { rotate: rotateAngle }}
                                        transition={prefersReducedMotion ? {} : { duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                                    >
                                        {/* Position wrapper — CSS only, no framer animation */}
                                        <div
                                            className="absolute"
                                            style={{
                                                top: LABEL_POSITIONS[i].top,
                                                left: LABEL_POSITIONS[i].left,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            {/* Counter-rotation wrapper — framer-motion keeps label upright */}
                                            <motion.div
                                                style={{ transformOrigin: 'center center' }}
                                                animate={prefersReducedMotion ? {} : { rotate: -rotateAngle }}
                                                transition={prefersReducedMotion ? {} : { duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <div
                                                    className="cursor-default"
                                                    onMouseEnter={() => setHoveredLabel(labelCfg.id)}
                                                    onMouseLeave={() => setHoveredLabel(null)}
                                                    style={{
                                                        background: 'var(--bg-secondary)',
                                                        opacity: 0.95,
                                                        backdropFilter: 'blur(12px)',
                                                        border: `1px solid ${isHovered ? labelCfg.accent : 'var(--border-light)'}`,
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '1rem',
                                                        boxShadow: isHovered
                                                            ? `0 8px 30px ${labelCfg.glowRgba}`
                                                            : '0 4px 20px rgba(0,0,0,0.15)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.625rem',
                                                        transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                                                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            padding: '0.375rem',
                                                            borderRadius: '0.5rem',
                                                            backgroundColor: isHovered ? labelCfg.accent : `color-mix(in srgb, ${labelCfg.accent} 12%, transparent)`,
                                                            color: isHovered ? '#fff' : labelCfg.accent,
                                                            transition: 'all 0.3s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <labelCfg.Icon size={18} />
                                                    </div>
                                                    <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                                                        {labelCfg.label}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Center Core — KAV */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="group/core w-32 h-32 bg-[var(--bg-primary)] border border-[var(--accent)]/50 rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.2)] flex items-center justify-center transform rotate-12 overflow-hidden cursor-default transition-all duration-500 hover:shadow-[0_0_70px_rgba(99,102,241,0.35)] hover:border-[var(--accent)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent"></div>
                                    <span className="font-display font-black text-4xl text-[var(--text-primary)] relative z-10 transition-transform duration-500 group-hover/core:scale-110">KAV</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indication */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent"
                    animate={{ scaleY: [1, 1.5, 1], transformOrigin: "top" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
