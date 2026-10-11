import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo';
import { Mail, Phone, Send } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

function GithubIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.2-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6 1.6 4.8 2 4.8 2c-.8 1.8-.3 3.1-.2 3.4-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
        </svg>
    );
}

function LinkedinIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

export default function Contact() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Structural form feedback
        setTimeout(() => setStatus('success'), 1200);
    };

    return (
        <motion.section
            id="contact"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
        >
            <div className="section-inner">
                <motion.div className="section-marker" variants={fadeUp}>
                    <span className="section-marker-num">10</span>
                    <span className="section-marker-line" />
                    <span className="section-marker-label">Contact</span>
                </motion.div>

                <motion.h2 className="font-display text-5xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-12" variants={fadeUp}>
                    Get In Touch
                </motion.h2>

                <div className="contact-grid">
                    {/* Contact Form */}
                    <motion.div className="contact-form-column" variants={fadeUp}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="John Doe" required disabled={status === 'loading'} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="john@example.com" required disabled={status === 'loading'} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="5" placeholder="Let's build something together..." required disabled={status === 'loading'}></textarea>
                            </div>

                            <button type="submit" className={`form-submit-btn ${status}`} disabled={status !== 'idle'}>
                                {status === 'idle' && <><Send size={16} /> Send Message</>}
                                {status === 'loading' && 'Sending...'}
                                {status === 'success' && 'Message Sent!'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div className="contact-links-column" variants={fadeUp}>
                        <h3 className="contact-links-title">Connect with me</h3>
                        <p className="contact-links-text">I'm currently looking for internships and new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>

                        <div className="contact-socials">
                            <a href={personalInfo.email.includes('PLACEHOLDER') ? '#' : `mailto:${personalInfo.email}`} className="contact-social-link" aria-label={`Email ${personalInfo.email}`}>
                                <div className="contact-social-icon"><Mail size={20} /></div>
                                <div className="contact-social-details">
                                    <span className="contact-social-label">Email</span>
                                    <span className="contact-social-value">{personalInfo.email === '[PLACEHOLDER]' ? 'hello@example.com' : personalInfo.email}</span>
                                </div>
                            </a>

                            {personalInfo.phone && (
                                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="contact-social-link" aria-label={`Call ${personalInfo.phone}`}>
                                    <div className="contact-social-icon"><Phone size={20} /></div>
                                    <div className="contact-social-details">
                                        <span className="contact-social-label">Phone</span>
                                        <span className="contact-social-value">{personalInfo.phone}</span>
                                    </div>
                                </a>
                            )}

                            <a href={personalInfo.linkedinUrl.includes('PLACEHOLDER') ? '#' : personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn profile">
                                <div className="contact-social-icon"><LinkedinIcon size={20} /></div>
                                <div className="contact-social-details">
                                    <span className="contact-social-label">LinkedIn</span>
                                    <span className="contact-social-value">Connect</span>
                                </div>
                            </a>

                            <a href={personalInfo.githubUrl.includes('PLACEHOLDER') ? '#' : personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub profile">
                                <div className="contact-social-icon"><GithubIcon size={20} /></div>
                                <div className="contact-social-details">
                                    <span className="contact-social-label">GitHub</span>
                                    <span className="contact-social-value">Follow</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
