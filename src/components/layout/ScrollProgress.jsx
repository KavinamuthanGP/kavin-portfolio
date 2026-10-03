import { useScrollSpy } from '../../hooks/useScrollSpy';

const SECTION_IDS = [
    'hero', 'about', 'education', 'skills',
    'experience', 'projects', 'certifications',
    'coding-profiles', 'resume', 'contact',
];

const DOT_LABELS = {
    hero: 'Hero',
    about: 'About',
    education: 'Education',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    certifications: 'Certifications',
    'coding-profiles': 'Profiles',
    resume: 'Resume',
    contact: 'Contact',
};

export default function ScrollProgress() {
    const activeSection = useScrollSpy(SECTION_IDS);

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="scroll-progress" aria-label="Page progress">
            <div className="scroll-progress-track">
                {SECTION_IDS.map((id) => (
                    <button
                        key={id}
                        className={`scroll-progress-dot ${activeSection === id ? 'active' : ''}`}
                        onClick={() => handleClick(id)}
                        aria-label={`Go to ${DOT_LABELS[id]}`}
                        title={DOT_LABELS[id]}
                    >
                        <span className="scroll-progress-dot-inner" />
                        <span className="scroll-progress-dot-label">{DOT_LABELS[id]}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
