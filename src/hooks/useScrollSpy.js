import { useCallback, useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view as the user scrolls.
 * @param {string[]} sectionIds - Array of section DOM ids
 * @param {Object} options
 * @param {number} [options.offset=100] - Pixel offset from the top for detection
 * @returns {string} - The id of the currently active section
 */
export function useScrollSpy(sectionIds, { offset = 100 } = {}) {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY + offset;
        let current = sectionIds[0] ?? '';

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollY) {
                current = id;
            }
        }

        setActiveId(current);
    }, [sectionIds, offset]);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return activeId;
}
