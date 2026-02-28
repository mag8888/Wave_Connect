import { useState } from 'react';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { ChevronDown, ChevronUp, MapPin, Building, Target, Edit2 } from 'lucide-react';
import { useTelegram } from '../lib/twa';
import './Profile.css';

export default function Profile() {
    const [sections, setSections] = useState({
        business: true,
        goals: false,
        interests: true
    });
    const { user } = useTelegram();

    const firstName = user?.first_name || 'Alex M.';
    const avatarUrl = user?.photo_url || 'https://i.pravatar.cc/300?u=a042581f4e29026704d';

    const toggleSection = (section: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const completion = 70;

    return (
        <div className="profile-page page-content">
            {/* Base Info */}
            <div className="profile-header">
                <div className="profile-avatar-large" style={{ backgroundImage: `url(${avatarUrl})` }} />
                <h1 className="profile-name">{firstName}</h1>
                <p className="profile-role text-accent">Tech Entrepreneur</p>

                <div className="profile-meta mt-4">
                    <span className="meta-item"><MapPin size={16} /> Dubai, UAE</span>
                    <span className="meta-item"><Building size={16} /> Waveform LLC</span>
                </div>
                <button className="edit-profile-btn mt-4 flex items-center gap-2 mx-auto text-sm text-secondary hover:text-primary transition-colors">
                    <Edit2 size={14} /> Edit Data
                </button>
            </div>

            {/* Progress Bar */}
            <Card variant="outline" className="progress-card mt-6">
                <div className="flex-between mb-2">
                    <span className="text-sm font-semibold">Profile Completion</span>
                    <span className="text-gradient font-bold">{completion}%</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>
                <p className="text-xs text-secondary mt-2">Complete your profile to get 2x more matches</p>
            </Card>

            {/* Business Block */}
            <Card variant="elevated" className="section-card mt-6">
                <div className="section-header-toggle" onClick={() => toggleSection('business')}>
                    <h2 className="section-title">Business Avatar</h2>
                    {sections.business ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.business && (
                    <div className="section-body mt-4">
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Turnover</span>
                                <span className="info-value">$1M - $5M</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Industry</span>
                                <span className="info-value">SaaS / Fintech</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Experience</span>
                                <span className="info-value">8 years</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span className="info-label">How can I help</span>
                            <p className="text-sm mt-1">I can share expertise in scaling B2B SaaS, setting up remote sales teams, and early-stage fundraising strategies.</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Goals */}
            <Card variant="elevated" className="section-card mt-4">
                <div className="section-header-toggle" onClick={() => toggleSection('goals')}>
                    <h2 className="section-title">Vision & Goals</h2>
                    {sections.goals ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.goals && (
                    <div className="section-body mt-4">
                        <div className="goal-item mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">1 Year Goal</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Close Seed round of $2M and expand to MENA region.</p>
                        </div>
                        <div className="goal-item mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">5 Year Goal</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Reach $100M valuation and prepare for Series B or acquisition.</p>
                        </div>
                        <div className="goal-item">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">Mission</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Democratize access to tier-1 business networking for emerging founders.</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Interests */}
            <Card variant="elevated" className="section-card mt-4 mb-8">
                <div className="section-header-toggle" onClick={() => toggleSection('interests')}>
                    <h2 className="section-title">Interests</h2>
                    {sections.interests ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.interests && (
                    <div className="section-body mt-4 tags-grid">
                        {['Investments', 'Scaling', 'IT', 'Biohacking', 'Startups', 'Partnership'].map((tag, i) => (
                            <Tag key={tag} active={i < 3}>{tag}</Tag>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}
