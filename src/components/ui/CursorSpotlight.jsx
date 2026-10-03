import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CursorSpotlight() {
    const { x, y, isActive } = useMousePosition();

    // If disabled or position not yet initialized
    if (!isActive || x === null || y === null) return null;

    return (
        <motion.div
            className="cursor-spotlight-layer pointer-events-none fixed inset-0 z-[9999]"
            animate={{
                background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.055), transparent 40%)`
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        />
    );
}
