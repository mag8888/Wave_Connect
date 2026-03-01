import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useTelegram } from '../lib/twa';
import { useTranslation } from 'react-i18next';
import './Onboarding.css';

type Step = 'welcome' | 'role' | 'goal';

export default function Onboarding() {
    const [step, setStep] = useState<Step>('welcome');
    const navigate = useNavigate();
    const { user } = useTelegram();
    const { t } = useTranslation();

    const firstName = user?.first_name || 'Guest';
    const avatarUrl = user?.photo_url;

    const handleNext = (nextStep: Step | 'home') => {
        if (nextStep === 'home') {
            navigate('/home');
        } else {
            setStep(nextStep);
        }
    };

    return (
        <div className="onboarding-page page-content">
            <div className="onboarding-header">
                <h1 className="onboarding-title text-gradient">Wave Match</h1>
                <p className="onboarding-subtitle">Premium Business Networking</p>
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
                        <p className="step-desc">Your Telegram profile is successfully linked.</p>

                        <Button className="mt-8" fullWidth onClick={() => handleNext('role')}>
                            {t('onboarding.complete_profile')}
                        </Button>
                    </div>
                )}

                {step === 'role' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">{t('onboarding.select_role')}</h2>
                        <p className="step-desc">Choose your primary role</p>
                        <div className="options-grid mt-6">
                            {[t('onboarding.role_entrepreneur'), t('onboarding.role_investor'), t('onboarding.role_expert'), t('onboarding.role_creator')].map(role => (
                                <button
                                    key={role}
                                    className="role-option"
                                    onClick={() => handleNext('goal')}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'goal' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">{t('onboarding.select_goal')}</h2>
                        <p className="step-desc">Select what you are looking for</p>
                        <div className="options-grid mt-6">
                            {[t('onboarding.goal_networking'), t('onboarding.goal_investment'), t('onboarding.goal_mentorship'), t('onboarding.goal_hiring')].map(goal => (
                                <button
                                    key={goal}
                                    className="role-option"
                                    onClick={() => handleNext('home')}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <div className="onboarding-footer">
                Step {['welcome', 'role', 'goal'].indexOf(step) + 1} of 3
            </div>
        </div>
    );
}
