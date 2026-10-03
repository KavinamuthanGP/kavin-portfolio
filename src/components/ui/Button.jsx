import { motion } from 'framer-motion';

/**
 * Reusable button component with primary and secondary variants.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'} [props.variant='primary']
 * @param {string}  [props.href]      - If provided, renders as <a>
 * @param {boolean} [props.download]  - Makes the link a download
 * @param {string}  [props.className] - Additional classes
 * @param {React.ReactNode} props.children
 * @param {Object}  rest              - Passed to the underlying element
 */
export default function Button({
    variant = 'primary',
    href,
    download,
    className = '',
    children,
    ...rest
}) {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.75rem',
        fontSize: '0.9375rem',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all var(--transition-base)',
        textDecoration: 'none',
        lineHeight: 1.4,
    };

    const variants = {
        primary: {
            ...baseStyles,
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            border: '1px solid transparent',
        },
        secondary: {
            ...baseStyles,
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
        },
    };

    const hoverVariants = {
        primary: {
            backgroundColor: 'var(--accent-hover)',
            transform: 'translateY(-2px)',
            scale: 1.02,
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.35)',
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
        secondary: {
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            transform: 'translateY(-2px)',
            scale: 1.01,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            download={download}
            style={variants[variant]}
            whileHover={hoverVariants[variant]}
            whileTap={{ scale: 0.97 }}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
}
