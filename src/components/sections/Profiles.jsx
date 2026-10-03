import { motion } from 'framer-motion';
import { codingProfiles } from '../../data/codingProfiles';
import { ExternalLink } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

// Inline SVGs for brand icons not present in lucide-react
function GithubIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.2-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6 1.6 4.8 2 4.8 2c-.8 1.8-.3 3.1-.2 3.4-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
        </svg>
    );
}

function LeetCodeIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.541l5.967 5.68c.231.22.544.326.835.336.236.036.474.07.711.073a.998.998 0 0 0 .708-.279l.114-.112a.972.972 0 0 0 .311-.823c-.03-.228-.104-.454-.217-.655l-5.603-5.333a3.111 3.111 0 0 1-1.042-2.308 3.149 3.149 0 0 1 .435-1.602l3.436-3.684.383-.41.36-.386 4.12-4.413c.279-.297.433-.672.483-1.083.05-.411-.006-.83-.162-1.218-.124-.311-.321-.59-.569-.813-.248-.223-.55-.386-.879-.472a1.442 1.442 0 0 0-.585-.052zm-7.054 9.07l.383.411-.383-.41zm11.396 6.784a.97.97 0 0 0-.705.275l-.115.111a.987.987 0 0 0-.256.444.975.975 0 0 0-.056.402c.009.289.155.556.398.718l5.604 5.334a3.111 3.111 0 0 1 1.043 2.309 3.148 3.148 0 0 1-.433 1.602l-3.437 3.682-.383.41-.36.386-4.12 4.414a1.404 1.404 0 0 0-.482 1.083c-.05.411.006.829.162 1.218.123.311.32.59.568.813.248.223.551.386.88.472a1.439 1.439 0 0 0 .584.052 1.374 1.374 0 0 0 .961-.438l5.405-5.787 3.854-4.127a5.267 5.267 0 0 0 1.21-2.103 5.349 5.349 0 0 0 .124-.514 5.524 5.524 0 0 0-.062-2.361 5.825 5.825 0 0 0-.348-1.018 5.938 5.938 0 0 0-1.272-1.54l-5.967-5.68a1.353 1.353 0 0 0-.834-.336c-.236-.036-.474-.07-.712-.073zm.314-11.23a.965.965 0 0 0-.69.243l-.119.108a.984.984 0 0 0-.295.421.977.977 0 0 0-.083.398.986.986 0 0 0 .313.76l6.396 6.096c.264.252.541.493.834.721.293.228.601.442.92.641l-8.07 8.636a1.411 1.411 0 0 0-.455 1.096c.038.413.225.794.526 1.074.301.28.694.437 1.106.442h.023a1.383 1.383 0 0 0 .957-.457l8.697-9.313c.27-.291.464-.626.574-.99a3.149 3.149 0 0 0 .09-1.026 3.09 3.09 0 0 0-.276-1.01c-.139-.307-.327-.589-.556-.837L18.82 4.887a1.354 1.354 0 0 0-.806-.367 1.417 1.417 0 0 0-.71.042z" />
        </svg>
    );
}

function HackerRankIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.986 6.3h2.38v5h4.156v-5h2.38v11.4h-2.38v-4.707h-4.156v4.707h-2.38V6.3zM2.1 6.3h2.38v5h4.156v-5h2.38v11.4h-2.38v-4.707H4.48v4.707H2.1V6.3z" />
        </svg>
    );
}

const getPlatformIcon = (iconName) => {
    switch (iconName) {
        case 'github': return <GithubIcon size={28} />;
        case 'code': return <LeetCodeIcon size={28} />;
        case 'terminal': return <HackerRankIcon size={28} />;
        default: return <ExternalLink size={28} />;
    }
};

export default function Profiles() {
    return (
        <motion.section
            id="coding-profiles"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
        >
            <div className="section-inner">
                <motion.div className="section-marker" variants={fadeUp}>
                    <span className="section-marker-num">08</span>
                    <span className="section-marker-line" />
                    <span className="section-marker-label">Profiles</span>
                </motion.div>

                <motion.div className="profiles-header flex justify-between items-end flex-wrap gap-4 mb-10" variants={fadeUp}>
                    <div>
                        <h2 className="font-display text-5xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-4">Coding Profiles</h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-[500px]">Continuous learning and algorithmic practice across various platforms.</p>
                    </div>
                </motion.div>

                <motion.div className="profiles-grid" variants={stagger}>
                    {codingProfiles.map((profile) => {
                        const isPlaceholder = profile.url.includes('PLACEHOLDER');
                        const isSpecial = profile.platform === 'GitHub' || profile.platform === 'LinkedIn';
                        return (
                            <motion.a
                                key={profile.id}
                                href={isPlaceholder ? '#' : profile.url}
                                target={isPlaceholder ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                className={`profile-card ${isPlaceholder ? 'pointer-events-none opacity-60' : ''} ${isSpecial ? 'border-2 border-[var(--border-light)] shadow-lg hover:border-[var(--accent)] font-bold' : ''}`}
                                variants={fadeUp}
                                whileHover={!isPlaceholder ? { y: -4, transition: { duration: 0.2 } } : {}}
                            >
                                <div className={`profile-icon ${isSpecial ? 'text-[var(--accent)] bg-[var(--accent)]/5' : ''}`}>
                                    {getPlatformIcon(profile.icon)}
                                </div>
                                <div className="profile-info">
                                    <h3 className={`profile-platform ${isSpecial ? 'text-xl' : ''}`}>{profile.platform}</h3>
                                    <span className={`profile-username ${isSpecial ? 'opacity-90' : ''}`}>
                                        {profile.username === '[PLACEHOLDER]' ? 'Coming soon' : profile.username}
                                    </span>
                                </div>
                                {!isPlaceholder && <ExternalLink size={18} className="profile-link-indicator" />}
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
}
