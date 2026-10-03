import { useState, useEffect } from 'react';

/**
 * Hook to track mouse position for interactive elements.
 * Utilizes requestAnimationFrame for smooth performance and prevents
 * execution on touch devices or when prefers-reduced-motion is enabled.
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Disable on touch devices and when reduced motion is preferred
        const mediaQueryTouch = window.matchMedia('(hover: none) and (pointer: coarse)');
        const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (mediaQueryTouch.matches || mediaQueryMotion.matches) {
            return;
        }

        setIsActive(true);
        let animationFrameId;

        const updateMousePosition = (ev) => {
            animationFrameId = requestAnimationFrame(() => {
                setMousePosition({
                    x: ev.clientX,
                    y: ev.clientY,
                });
            });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return { ...mousePosition, isActive };
}
