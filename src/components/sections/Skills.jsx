import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import {
    Layers, Terminal, Layout, Database, BrainCircuit,
    Cpu, Wrench, Code2, Globe, Zap
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

// Category icon + color mapping
const categoryMeta = {
    all: { icon: Layers, color: 'var(--accent)' },
    languages: { icon: Terminal, color: 'var(--accent)' },
    frontend: { icon: Layout, color: 'var(--accent-secondary)' },
    backend: { icon: Database, color: '#10b981' },
    aiml: { icon: BrainCircuit, color: '#ec4899' },
    databases: { icon: Cpu, color: '#f59e0b' },
    'web-pwa': { icon: Globe, color: '#14b8a6' },
    tools: { icon: Wrench, color: '#8b5cf6' },
    core: { icon: Zap, color: '#f97316' },
};

// Skill-level icon mapping
const skillIconMap = {
    c: Code2, java: Code2, python: Code2, js: Code2, code: Code2,
    react: Layout, tailwind: Layout,
    nodejs: Database, express: Database, database: Database,
    mongodb: Database, mysql: Database,
    motion: BrainCircuit,
    git: Wrench, postman: Wrench,
};

// Build flat list with category info
function buildAllSkills() {
    const all = [];
    skillCategories.forEach(cat => {
        cat.skills.forEach(skill => {
            all.push({
                ...skill,
                categoryId: cat.id,
                categoryLabel: cat.label,
            });
        });
    });
    return all;
}

// Filter tabs
const FILTER_TABS = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'aiml', label: 'AI / ML' },
    { id: 'databases', label: 'Databases' },
    { id: 'web-pwa', label: 'Web / PWA' },
    { id: 'tools', label: 'Tools' },
    { id: 'core', label: 'Core' },
];

function SkillCard({ skill }) {
    const meta = categoryMeta[skill.categoryId] || categoryMeta.all;
    const IconComponent = skillIconMap[skill.icon] || Code2;

    return (
        <motion.div
            layout
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="group relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:border-[color:var(--skill-accent)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)] cursor-default"
            style={{ '--skill-accent': meta.color }}
        >
            {/* Hover glow */}
            <div
                className="absolute -right-10 -top-10 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                style={{ background: meta.color }}
            />

            {/* Icon */}
            <div
                className="relative z-10 p-3.5 border border-[var(--border)] rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] group-hover:border-[color:var(--skill-accent)]"
                style={{
                    background: 'var(--bg-primary)',
                }}
            >
                <IconComponent
                    size={24}
                    className="transition-colors duration-300"
                    style={{ color: meta.color }}
                />
            </div>

            {/* Text */}
            <div className="relative z-10 flex flex-col gap-1 min-w-0">
                <span className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight truncate group-hover:text-[color:var(--skill-accent)] transition-colors duration-300">
                    {skill.name}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] truncate">
                    {skill.categoryLabel}
                </span>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState('all');
    const allSkills = useMemo(() => buildAllSkills(), []);

    const filteredSkills = useMemo(() => {
        if (activeFilter === 'all') return allSkills;
        return allSkills.filter(s => s.categoryId === activeFilter);
    }, [activeFilter, allSkills]);

    return (
        <motion.section
            id="skills"
            className="section relative bg-[var(--bg-primary)] overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-full h-[50%] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

            <div className="section-inner relative z-10 max-w-[var(--width-container)] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col gap-4 mb-12 md:mb-16">
                    <span className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase font-semibold flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-[var(--accent)]" />
                        Technical Arsenal
                    </span>
                    <motion.h2 className="font-display text-5xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter" variants={fadeUp}>
                        Capabilities
                    </motion.h2>
                </div>

                {/* Two-Column Layout: Left Nav + Right Grid */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT: Vertical Category Navigation */}
                    <motion.div
                        className="lg:w-[220px] shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:sticky lg:top-32 lg:self-start"
                        variants={fadeUp}
                    >
                        {FILTER_TABS.map((tab) => {
                            const isActive = activeFilter === tab.id;
                            const meta = categoryMeta[tab.id] || categoryMeta.all;
                            const TabIcon = meta.icon;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`relative flex items-center gap-3 px-4 py-3 lg:px-5 lg:py-3.5 font-mono text-sm font-semibold tracking-wide uppercase transition-all duration-300 border rounded-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] whitespace-nowrap w-full text-left ${isActive
                                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_4px_20px_rgba(99,102,241,0.25)]'
                                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    <TabIcon size={16} className="shrink-0" />
                                    <span className="truncate">{tab.label}</span>
                                    {isActive && (
                                        <span className="ml-auto font-mono text-xs opacity-80 hidden lg:inline">
                                            {filteredSkills.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* RIGHT: Skills Card Grid */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFilter}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filteredSkills.map((skill) => (
                                    <SkillCard key={`${skill.categoryId}-${skill.name}`} skill={skill} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Skill Count */}
                        <motion.div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-3" variants={fadeUp}>
                            <span className="font-mono text-sm text-[var(--text-muted)] tracking-wide">
                                {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
                                {activeFilter !== 'all' && ` in ${FILTER_TABS.find(t => t.id === activeFilter)?.label}`}
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
