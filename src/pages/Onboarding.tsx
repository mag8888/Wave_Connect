import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import './Onboarding.css';

type Step = 'phone' | 'sms' | 'role' | 'goal';

export default function Onboarding() {
    const [step, setStep] = useState<Step>('phone');
    const navigate = useNavigate();

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
                {step === 'phone' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">Enter your phone</h2>
                        <p className="step-desc">We'll send you a confirmation code</p>
                        <Input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            autoFocus
                            className="mt-6"
                        />
                        <Button className="mt-6" fullWidth onClick={() => handleNext('sms')}>
                            Continue
                        </Button>
                    </div>
                )}

                {step === 'sms' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">Enter code</h2>
                        <p className="step-desc">Sent to your number</p>
                        <div className="sms-inputs mt-6">
                            {[1, 2, 3, 4].map(i => (
                                <input key={i} type="text" maxLength={1} className="sms-char-input" />
                            ))}
                        </div>
                        <Button className="mt-6" fullWidth onClick={() => handleNext('role')}>
                            Verify
                        </Button>
                    </div>
                )}

                {step === 'role' && (
                    <div className="step-content fade-in">
                        <h2 className="step-title">Who are you?</h2>
                        <p className="step-desc">Choose your primary role</p>
                        <div className="options-grid mt-6">
                            {['Entrepreneur', 'Investor', 'Expert', 'Mentor'].map(role => (
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
                        <h2 className="step-title">What is your goal?</h2>
                        <p className="step-desc">Select what you are looking for</p>
                        <div className="options-grid mt-6">
                            {['Investments', 'Partners', 'Mentor', 'Scaling'].map(goal => (
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
                Step {['phone', 'sms', 'role', 'goal'].indexOf(step) + 1} of 4
            </div>
        </div>
    );
}
