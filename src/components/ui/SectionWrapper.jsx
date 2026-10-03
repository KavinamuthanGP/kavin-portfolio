import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

/**
 * Wraps a section with scroll-triggered fade-up animation,
 * consistent padding, and semantic <section> markup.
 *
 * @param {Object} props
 * @param {string}  props.id       - Section DOM id for navigation
 * @param {string}  [props.title]  - Optional section heading
 * @param {string}  [props.subtitle] - Optional section subtitle
 * @param {string}  [props.className] - Additional CSS classes
 * @param {boolean} [props.fullViewport] - If true, section has min-height: 100vh
 * @param {React.ReactNode} props.children
 */
export default function SectionWrapper({
    id,
    title,
    subtitle,
    className = '',
    fullViewport = false,
    children,
}) {
    return (
        <motion.section
            id={id}
            className={`section ${fullViewport ? 'min-h-screen flex items-center' : ''} ${className}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <div className="section-inner">
                {title && (
                    <div style={{ marginBottom: subtitle ? '0.5rem' : '2rem' }}>
                        <h2 className="section-title">{title}</h2>
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </motion.section>
    );
}
