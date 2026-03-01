import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { ChevronDown, ChevronUp, MapPin, Building, Target, Edit2, Globe, Award, Zap, Gift, Book, Star, GraduationCap } from 'lucide-react';
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

    const [profileData, setProfileData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const firstName = user?.first_name || 'Guest';
    const avatarUrl = user?.photo_url;

    useEffect(() => {
        if (user?.id) {
            fetch(`https://wave-match-production.up.railway.app/api/profile/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.profile) {
                        const p = data.profile;
                        setProfileData({
                            ...p,
                            tags: Array.isArray(p.tags) ? p.tags : [],
                            hobbies: Array.isArray(p.hobbies) ? p.hobbies : [],
                            books: Array.isArray(p.books) ? p.books : [],
                            education: typeof p.education === 'string' ? JSON.parse(p.education) : (p.education || [])
                        });
                    }
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [user?.id]);

    const toggleSection = (section: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const completion = profileData?.completion || 0;

    const IconMap: Record<string, any> = {
        Award, Book, Star, Zap, GraduationCap
    };

    if (isLoading) {
        return (
            <div className="profile-page page-content flex items-center justify-center">
                <div className="animate-pulse text-secondary text-sm">Loading Profile...</div>
            </div>
        );
    }

    return (
        <div className="profile-page page-content">
            {/* Base Info */}
            <div className="profile-header">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="profile-avatar-large" />
                ) : (
                    <div className="profile-avatar-large flex-center font-bold text-4xl text-white bg-surface" style={{ backgroundImage: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {firstName.charAt(0)}
                    </div>
                )}
                <h1 className="profile-name">{firstName}</h1>
                <p className="profile-role text-accent">{profileData?.role || 'Entrepreneur'}</p>

                <div className="profile-meta mt-4">
                    <span className="meta-item"><MapPin size={16} /> {profileData?.location || 'Add Location'}</span>
                    <span className="meta-item"><Building size={16} /> {profileData?.company || 'Add Company'}</span>
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

            {/* Referral Promo */}
            <Card variant="glass" className="mt-4 border border-[rgba(139,92,246,0.2)] bg-[linear-gradient(135deg,rgba(139,92,246,0.1),transparent)] cursor-pointer hover:bg-[rgba(139,92,246,0.15)] transition-colors" onClick={() => navigate('/referral')}>
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(139,92,246,0.2)]">
                            <Gift size={20} className="text-accent" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm leading-tight text-white">{t('referral.invite_friends')}</h3>
                            <p className="text-xs text-accent mt-0.5">{t('referral.get_matches')}</p>
                        </div>
                    </div>
                    <div className="text-secondary">
                        <ChevronDown size={18} style={{ transform: 'rotate(-90deg)' }} />
                    </div>
                </div>
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
                                <span className="info-value">{profileData?.turnover || '-'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t('profile.industry')}</span>
                                <span className="info-value">{profileData?.industry || '-'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t('profile.experience')}</span>
                                <span className="info-value">{profileData?.experience || '-'}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span className="info-label">{t('profile.how_can_help')}</span>
                            <p className="text-sm mt-1">{profileData?.helpOffer || '-'}</p>
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
                            <p className="text-sm text-secondary pl-6">{profileData?.goal1Year || '-'}</p>
                        </div>
                        <div className="goal-item mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">{t('profile.5_year_goal')}</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">{profileData?.goal5Year || '-'}</p>
                        </div>
                        <div className="goal-item">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={16} className="text-accent" />
                                <span className="font-semibold">{t('profile.mission')}</span>
                            </div>
                            <p className="text-sm text-secondary pl-6">{profileData?.mission || '-'}</p>
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
                        <div className="flex flex-col gap-3 mb-6">
                            {profileData?.education?.map((edu: any, idx: number) => {
                                const IconCmp = IconMap[edu.icon] || Award;
                                return (
                                    <div key={idx} className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-white-10">
                                        <IconCmp className="text-accent" size={20} />
                                        <span className="font-medium text-sm">{edu.name}</span>
                                    </div>
                                );
                            })}
                            {!profileData?.education?.length && (
                                <p className="text-sm text-secondary">-</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xs uppercase text-secondary font-semibold mb-2 tracking-wider">{t('profile.hobbies')}</h3>
                            <div className="tags-grid">
                                {profileData?.hobbies?.map((tag: string) => (
                                    <Tag key={tag} active={false}>{tag}</Tag>
                                ))}
                                {!profileData?.hobbies?.length && <p className="text-sm text-secondary">-</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xs uppercase text-secondary font-semibold mb-2 tracking-wider">{t('profile.books')}</h3>
                            <div className="tags-grid">
                                {profileData?.books?.map((book: string) => (
                                    <Tag key={book} active={false}>{book}</Tag>
                                ))}
                                {!profileData?.books?.length && <p className="text-sm text-secondary">-</p>}
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
                        {profileData?.tags?.map((tag: string) => (
                            <Tag key={tag} active={false}>{tag}</Tag>
                        ))}
                        {!profileData?.tags?.length && <p className="text-sm text-secondary">-</p>}
                    </div>
                )}
            </Card>
        </div>
    );
}
