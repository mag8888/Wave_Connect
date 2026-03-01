import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useTelegram } from '../lib/twa';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Onboarding.css';

type Step = 'welcome' | 'role' | 'goal';

export default function Onboarding() {
    const [step, setStep] = useState<Step>('welcome');
    const [showMoreRoles, setShowMoreRoles] = useState(false);
    const [customRole, setCustomRole] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useTelegram();
    const { t } = useTranslation();

    const firstName = user?.first_name || 'Guest';
    const avatarUrl = user?.photo_url;

    const handleNext = (nextStep: Step | 'home', selectionValue?: string) => {
        if (nextStep === 'goal' && selectionValue) {
            setSelectedRole(selectionValue);
            setStep(nextStep);
        } else if (nextStep === 'home') {
            const submitOnboarding = async () => {
                setIsSubmitting(true);
                try {
                    await fetch('https://wave-match-production.up.railway.app/api/users/onboard', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            telegramId: user?.id,
                            role: selectedRole,
                            goal1Year: selectionValue || ''
                        })
                    });
                    navigate('/home');
                } catch (e) {
                    console.error('Failed onboarding sync:', e);
                    setIsSubmitting(false);
                }
            };
            submitOnboarding();
        } else {
            setStep(nextStep);
        }
    };

    return (
        <div className="onboarding-page page-content">
            <div className="onboarding-header">
                <h1 className="onboarding-title text-gradient">Wave Match</h1>
                <p className="onboarding-subtitle">{t('onboarding.subtitle')}</p>
            </div>

            <Card variant="glass" className="onboarding-card">
                {step === 'welcome' && (
                    <div className="step-content fade-in welcome-step">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="welcome-avatar mb-4" />
                        ) : (
                            <div className="welcome-avatar fallback-avatar mb-4">
                                {firstName.charAt(0)}
                            </div>
                        )}
                        <h2 className="step-title">{t('onboarding.welcome')}, {firstName}!</h2>
                        <p className="step-desc">{t('onboarding.tg_linked')}</p>

                        <Button className="mt-8" fullWidth onClick={() => handleNext('role')}>
                            {t('onboarding.complete_profile')}
                        </Button>
                    </div>
                )}

                {step === 'role' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">{t('onboarding.select_role')}</h2>
                        <p className="step-desc">{t('onboarding.choose_role')}</p>
                        <div className="options-grid mt-6">
                            {[t('onboarding.role_entrepreneur'), t('onboarding.role_investor'), t('onboarding.role_expert'), t('onboarding.role_creator')].map(role => (
                                <button
                                    key={role}
                                    className="role-option"
                                    onClick={() => handleNext('goal', role)}
                                >
                                    {role}
                                </button>
                            ))}
                            {showMoreRoles && [t('onboarding.role_developer'), t('onboarding.role_designer'), t('onboarding.role_marketer'), t('onboarding.role_product_manager')].map(role => (
                                <button
                                    key={role}
                                    className="role-option fade-in"
                                    onClick={() => handleNext('goal', role)}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>

                        {!showMoreRoles ? (
                            <button
                                className="mt-4 flex items-center justify-center gap-1 mx-auto text-danger text-lg hover:opacity-80 transition-opacity"
                                onClick={() => setShowMoreRoles(true)}
                                style={{ color: '#ef4444' }} // Matching the red color conceptually indicated by the user
                            >
                                {t('onboarding.more_roles')} <ChevronDown size={20} />
                            </button>
                        ) : (
                            <div className="fade-in">
                                <button
                                    className="mt-4 flex items-center justify-center gap-1 mx-auto text-danger text-lg hover:opacity-80 transition-opacity"
                                    onClick={() => setShowMoreRoles(false)}
                                    style={{ color: '#ef4444' }}
                                >
                                    {t('onboarding.less_roles')} <ChevronUp size={20} />
                                </button>

                                <div className="mt-6 w-full flex gap-2 items-stretch max-w-sm mx-auto">
                                    <input
                                        type="text"
                                        placeholder="Or enter your custom role..."
                                        className="flex-1 bg-surface border border-white-10 rounded-xl px-4 py-3 min-w-0 placeholder:text-secondary text-sm focus:outline-none focus:border-[rgba(139,92,246,0.5)] transition-colors"
                                        value={customRole}
                                        onChange={(e) => setCustomRole(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && customRole.trim() && handleNext('goal', customRole)}
                                    />
                                    <Button
                                        onClick={() => handleNext('goal', customRole)}
                                        disabled={!customRole.trim()}
                                        className="px-6"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 'goal' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">{t('onboarding.select_goal')}</h2>
                        <p className="step-desc">{t('onboarding.select_goal_desc')}</p>
                        <div className="options-grid mt-6">
                            {[t('onboarding.goal_networking'), t('onboarding.goal_investment'), t('onboarding.goal_mentorship'), t('onboarding.goal_hiring')].map(goal => (
                                <button
                                    key={goal}
                                    className="role-option"
                                    disabled={isSubmitting}
                                    onClick={() => handleNext('home', goal)}
                                >
                                    {isSubmitting ? '...' : goal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <div className="onboarding-footer">
                {t('onboarding.step_of', { current: ['welcome', 'role', 'goal'].indexOf(step) + 1, total: 3 })}
            </div>
        </div>
    );
}
