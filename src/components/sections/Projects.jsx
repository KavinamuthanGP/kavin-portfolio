import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetailPanel from '../ui/ProjectDetailPanel';
import { Box } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

export default function Projects() {
    const [selected, setSelected] = useState(null);

    // Explicitly make Collexa the flagship project
    const featuredProject = projects.find(p => p.id === 'collexa');
    const secondaryProjects = projects.filter(p => p.id !== 'collexa');

    return (
        <>
            <motion.section
                id="projects"
                className="section bg-[var(--bg-primary)] overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="section-inner max-w-7xl">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 md:mb-24">
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase font-semibold flex items-center gap-4">
                                <span className="w-8 h-[2px] bg-[var(--accent)]" />
                                Portfolio
                            </span>
                            <motion.h2 className="font-display text-5xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter" variants={fadeUp}>
                                Selected Work
                            </motion.h2>
                        </div>
                        <motion.p className="text-[clamp(1.125rem,1.25vw,1.25rem)] text-[var(--text-secondary)] max-w-sm leading-relaxed" variants={fadeUp}>
                            A curated selection of high-impact applications bridging engineering rigor with premium user experiences.
                        </motion.p>
                    </div>

                    {/* Flagship Project - Massive footprint */}
                    {featuredProject && (
                        <motion.div variants={fadeUp} className="mb-12 md:mb-16">
                            <ProjectCard
                                project={featuredProject}
                                index={0}
                                featured={true}
                                onOpen={setSelected}
                            />
                        </motion.div>
                    )}

                    {/* Secondary Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {secondaryProjects.map((project, idx) => (
                            <motion.div key={project.id} variants={fadeUp}>
                                <ProjectCard
                                    project={project}
                                    index={idx + 1}
                                    featured={false}
                                    onOpen={setSelected}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Detail panel */}
            <AnimatePresence>
                {selected && (
                    <ProjectDetailPanel
                        project={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
