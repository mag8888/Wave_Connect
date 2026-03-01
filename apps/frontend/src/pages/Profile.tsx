import { useState } from 'react';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { ChevronDown, ChevronUp, MapPin, Building, Target, Edit2, Globe, Award, Zap } from 'lucide-react';
import { useTelegram } from '../lib/twa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const [sections, setSections] = useState({
        business: true,
        goals: false,
        interests: true,
        education: true
    });
    const { user } = useTelegram();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

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
                <div className="flex items-center justify-center gap-4 mt-4">
                    <button onClick={() => navigate('/profile/edit')} className="edit-profile-btn flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                        <Edit2 size={14} /> {t('profile.edit_data')}
                    </button>
                    <button
                        onClick={() => {
                            const newLang = i18n.language === 'ru' ? 'en' : 'ru';
                            i18n.changeLanguage(newLang);
                            localStorage.setItem('appLang', newLang);
                        }}
                        className="edit-profile-btn flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
                    >
                        <Globe size={14} /> {i18n.language.toUpperCase()}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <Card variant="outline" className="progress-card mt-6">
                <div className="flex-between mb-2">
                    <span className="text-sm font-semibold">{t('profile.profile_completion')}</span>
                    <span className="text-gradient font-bold">{completion}%</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>
                <p className="text-xs text-secondary mt-2">{t('profile.complete_prompt')}</p>
            </Card>

            {/* Business Block */}
            <Card variant="elevated" className="section-card mt-6">
                <div className="section-header-toggle" onClick={() => toggleSection('business')}>
                    <h2 className="section-title">{t('profile.business_avatar')}</h2>
                    {sections.business ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.business && (
                    <div className="section-body mt-4">
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">{t('profile.turnover')}</span>
                                <span className="info-value">$1M - $5M</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t('profile.industry')}</span>
                                <span className="info-value">SaaS / Fintech</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t('profile.experience')}</span>
                                <span className="info-value">8 years</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span className="info-label">{t('profile.how_can_help')}</span>
                            <p className="text-sm mt-1">I can share expertise in scaling B2B SaaS, setting up remote sales teams, and early-stage fundraising strategies.</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Goals */}
            <Card variant="elevated" className="section-card mt-4">
                <div className="section-header-toggle" onClick={() => toggleSection('goals')}>
                    <h2 className="section-title">{t('profile.vision_goals')}</h2>
                    {sections.goals ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.goals && (
                    <div className="section-body mt-4">
                        <div className="goal-item mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">{t('profile.1_year_goal')}</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Close Seed round of $2M and expand to MENA region.</p>
                        </div>
                        <div className="goal-item mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">{t('profile.5_year_goal')}</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Reach $100M valuation and prepare for Series B or acquisition.</p>
                        </div>
                        <div className="goal-item">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">{t('profile.mission')}</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">Democratize access to tier-1 business networking for emerging founders.</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Education & Hobbies */}
            <Card variant="elevated" className="section-card mt-4">
                <div className="section-header-toggle" onClick={() => toggleSection('education')}>
                    <h2 className="section-title">{t('profile.education')}</h2>
                    {sections.education ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {sections.education && (
                    <div className="section-body mt-4">
                        {/* Mock education data for viewing */}
                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-white-10">
                                <Award className="text-accent" size={20} />
                                <span className="font-medium text-sm">MBA, Harvard Business School</span>
                            </div>
                            <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-white-10">
                                <Zap className="text-warning" size={20} />
                                <span className="font-medium text-sm">Y Combinator Alumni (S21)</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xs uppercase text-secondary font-semibold mb-2 tracking-wider">{t('profile.hobbies')}</h3>
                            <div className="tags-grid">
                                {['Golf', 'Biohacking', 'Sailing'].map((tag) => (
                                    <Tag key={tag} active={false}>{tag}</Tag>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xs uppercase text-secondary font-semibold mb-2 tracking-wider">{t('profile.books')}</h3>
                            <div className="tags-grid">
                                {['Zero to One', 'Thinking Fast and Slow'].map((book) => (
                                    <Tag key={book} active={false}>{book}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Interests */}
            <Card variant="elevated" className="section-card mt-4 mb-8">
                <div className="section-header-toggle" onClick={() => toggleSection('interests')}>
                    <h2 className="section-title">{t('profile.interests')}</h2>
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
