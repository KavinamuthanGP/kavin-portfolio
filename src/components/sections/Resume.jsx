import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo';
import { Download, FileText } from 'lucide-react';
import Button from '../ui/Button';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Resume() {
    return (
        <motion.section
            id="resume"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="section-inner relative">
                <motion.div className="section-marker" variants={fadeUp}>
                    <span className="section-marker-num">09</span>
                    <span className="section-marker-line" />
                    <span className="section-marker-label">Resume</span>
                </motion.div>

                <div className="resume-cta-container">
                    <motion.div className="resume-cta-content" variants={fadeUp}>
                        <div className="resume-icon-wrapper shadow-lg border border-[var(--border)]">
                            <FileText size={40} className="text-[var(--accent)]" />
                        </div>
                        <h2 className="font-display text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-4">View My Full Resume</h2>
                        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed text-center" style={{ maxWidth: '450px' }}>
                            Get a detailed overview of my academic background, technical skills, and professional experiences.
                        </p>

                        <Button
                            variant="primary"
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-download-btn"
                        >
                            <Download size={18} /> Download Resume
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
