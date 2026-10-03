import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import Button from './Button';

function GithubIcon({ size = 24, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.2-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6 1.6 4.8 2 4.8 2c-.8 1.8-.3 3.1-.2 3.4-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
        </svg>
    );
}

const PLACEHOLDER = '[PLACEHOLDER]';
const isPlaceholder = (v) => !v || v === PLACEHOLDER || String(v).startsWith('[PLACEHOLDER]');

/* ── Gradient fallbacks per project (no image yet) ───── */
const FALLBACK_PALETTES = {
    internlog: ['#0c0c1d', '#1a1a3e', '#2d2b69'],
    smartexpense: ['#0c1d18', '#0f3028', '#1a5244'],
    collexa: ['#1a0c2e', '#2e0f4a', '#4a1a6e'],
};

function FallbackVisual({ projectId, className = '' }) {
    const [c1, c2, c3] = FALLBACK_PALETTES[projectId] ?? ['#0c0c1d', '#1a1a3e', '#2d2b69'];
    return (
        <div
            className={`project-fallback ${className}`}
            style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)` }}
            aria-hidden="true"
        >
            {/* Subtle grid lines */}
            <svg className="project-fallback-grid" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id={`grid-${projectId}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
                    </pattern>
                </defs>
                <rect width="400" height="280" fill={`url(#grid-${projectId})`} />
                {/* Corner accent arc */}
                <path d="M 400 0 A 160 160 0 0 1 400 160" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
                <path d="M 400 0 A 110 110 0 0 1 400 110" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="0.8" />
            </svg>
        </div>
    );
}

/* ── Overlay variants ─────────────────────────────────── */
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 340, damping: 38 } },
    exit: { x: '100%', transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
};

/* ═══════════════════════════════════════════════════════
   ProjectDetailPanel
   ═══════════════════════════════════════════════════════ */
export default function ProjectDetailPanel({ project, onClose }) {
    const closeBtnRef = useRef(null);

    /* Lock body scroll while open */
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        closeBtnRef.current?.focus();
        return () => { document.body.style.overflow = ''; };
    }, []);

    /* Escape key handler */
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    if (!project) return null;

    const hasImage = project.images && project.images.length > 0;
    const hasGithub = !isPlaceholder(project.githubUrl);
    const hasLive = !isPlaceholder(project.liveUrl);

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="panel-backdrop"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
                className="project-panel"
                role="dialog"
                aria-modal="true"
                aria-label={`${project.name} project details`}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Close */}
                <button
                    ref={closeBtnRef}
                    className="project-panel-close"
                    onClick={onClose}
                    aria-label="Close project details"
                >
                    <X size={20} />
                </button>

                <div className="project-panel-scroll">
                    {/* Image / fallback */}
                    <div className="project-panel-image-wrap">
                        {hasImage
                            ? (
                                <div className="project-panel-gallery">
                                    {project.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`${project.name} screenshot ${idx + 1}`} className="project-panel-image" loading="lazy" />
                                    ))}
                                </div>
                            )
                            : <FallbackVisual projectId={project.id} className="project-panel-fallback" />
                        }
                    </div>

                    {/* Header */}
                    <div className="project-panel-header">
                        <span className="project-panel-index">
                            {String(project._index + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h2 className="project-panel-title">{project.name}</h2>
                            <p className="project-panel-tagline">{project.tagline}</p>
                        </div>
                    </div>

                    {/* Problem */}
                    <div className="project-panel-block">
                        <h3 className="project-panel-block-label">The Problem</h3>
                        <p className="project-panel-block-text">{project.problem}</p>
                    </div>

                    {/* Overview */}
                    <div className="project-panel-block">
                        <h3 className="project-panel-block-label">What I Built</h3>
                        <p className="project-panel-block-text">{project.description}</p>
                    </div>

                    {/* Features */}
                    {project.features?.length > 0 && (
                        <div className="project-panel-block">
                            <h3 className="project-panel-block-label">Key Features</h3>
                            <ul className="project-panel-features">
                                {project.features.map((f, i) => (
                                    <li key={i} className="project-panel-feature-item">
                                        <CheckCircle2 size={15} className="project-panel-feature-icon" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech stack */}
                    {project.techStack?.length > 0 && (
                        <div className="project-panel-block">
                            <h3 className="project-panel-block-label">Tech Stack</h3>
                            <div className="project-panel-tags">
                                {project.techStack.map((t) => (
                                    <span key={t} className="project-panel-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="project-panel-actions">
                        {hasGithub
                            ? <Button variant="secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <GithubIcon size={16} /> GitHub
                            </Button>
                            : <Button variant="secondary" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>
                                <GithubIcon size={16} /> GitHub
                            </Button>
                        }
                        {hasLive
                            ? <Button variant="primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={16} /> Live Demo
                            </Button>
                            : null
                        }
                    </div>
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}
