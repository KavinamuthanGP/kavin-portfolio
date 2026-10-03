import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

export default function ProjectCard({ project, index, featured = false, onOpen }) {
    const [hovered, setHovered] = useState(false);
    const hasImage = project.images && project.images.length > 0;
    const indexLabel = String(index + 1).padStart(2, '0');

    // Remove 3D tilt for featured project to maintain structural integrity, keep it subtle for secondary
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [0, featured ? 0 : -2]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [0, featured ? 0 : 2]);

    const handleMouseMove = (e) => {
        if (featured || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;
        x.set((posX / rect.width) - 0.5);
        y.set((posY / rect.height) - 0.5);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        if (!featured) {
            x.set(0);
            y.set(0);
        }
    };

    if (featured) {
        return (
            <motion.article
                className="group relative flex flex-col xl:flex-row overflow-hidden bg-[var(--bg-secondary)] border-2 border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-500 cursor-pointer shadow-2xl min-h-[500px] sm:min-h-[600px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                onHoverStart={() => setHovered(true)}
                onHoverEnd={handleMouseLeave}
                onMouseLeave={handleMouseLeave}
                onClick={() => onOpen(project)}
                tabIndex={0}
                role="button"
                aria-label={`View ${project.name} details`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
            >
                {/* Visual Media Container: Takes up 60% of width on extra large screens */}
                <div className="relative overflow-hidden bg-black xl:w-[65%] shrink-0 h-80 sm:h-[400px] xl:h-[600px] border-b-2 xl:border-b-0 xl:border-r-2 border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-500">
                    {hasImage ? (
                        <div className="w-full h-full relative p-4 sm:p-8 xl:p-12 pb-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/50 to-transparent z-10 pointer-events-none" />
                            <motion.img
                                src={project.images[0]}
                                alt={`${project.name} preview`}
                                className="w-full h-full object-cover object-top rounded-t-xl sm:rounded-t-2xl shadow-2xl origin-bottom"
                                loading="lazy"
                                animate={{ scale: hovered ? 1.03 : 1, y: hovered ? -10 : 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                            <span className="font-display font-bold text-5xl text-white/5 uppercase">{project.id}</span>
                        </div>
                    )}

                    <motion.div
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-none font-bold text-lg uppercase tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Case Study <ArrowUpRight size={20} />
                        </span>
                    </motion.div>
                </div>

                {/* Content Container: Takes up 40% */}
                <div className="flex flex-col xl:w-[35%] p-8 sm:p-12 justify-center bg-[var(--bg-tertiary)] xl:group-hover:bg-[var(--bg-primary)] transition-colors duration-500">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="w-12 h-1 bg-[var(--accent)]" />
                        <span className="font-mono text-sm uppercase tracking-widest text-[var(--accent)] font-bold">
                            Flagship Project
                        </span>
                    </div>

                    <h3 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-black text-[var(--text-primary)] leading-none uppercase tracking-tighter mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {project.name}
                    </h3>

                    <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed mb-12">
                        {project.tagline}
                    </p>

                    <div className="mt-auto">
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 block">Core Tech Stack</span>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 6).map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] text-sm font-mono whitespace-nowrap group-hover:border-[var(--accent)]/50 transition-colors duration-300">
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 6 && (
                                <span className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] text-sm font-mono group-hover:border-[var(--accent)]/50 transition-colors duration-300">
                                    +{project.techStack.length - 6}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    return (
        <motion.article
            ref={cardRef}
            className="group relative flex flex-col h-full overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onMouseMove={handleMouseMove}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onClick={() => onOpen(project)}
            tabIndex={0}
            role="button"
            aria-label={`View ${project.name} project details`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
        >
            <div className="relative overflow-hidden bg-black h-64 sm:h-80 w-full shrink-0 border-b border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-500">
                {hasImage ? (
                    <motion.img
                        src={project.images[0]}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                        loading="lazy"
                        animate={{ scale: hovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <FolderGit2 size={64} className="text-white/10" />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs tracking-widest text-white bg-[var(--accent)] px-3 py-1 font-bold uppercase">
                        Nº {indexLabel}
                    </span>
                </div>
            </div>

            <div className="flex flex-col p-8 sm:p-10 grow z-10 relative bg-[var(--bg-tertiary)] group-hover:bg-[var(--bg-secondary)] transition-colors duration-500">
                <div className="mb-8">
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3 uppercase tracking-tighter group-hover:text-[var(--accent)] transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                        {project.tagline}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1 border border-[var(--border)] text-[var(--text-muted)] text-xs font-mono lowercase">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="px-3 py-1 border border-[var(--border)] text-[var(--text-muted)] text-xs font-mono lowercase">
                            +{project.techStack.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
