import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, Sparkles, Copy, Check } from 'lucide-react';
import { getAIPrompt } from '../i18n';
import './ProfileEdit.css';

export default function ProfileEdit() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // GPT prompt logic
    const [promptCopied, setPromptCopied] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [parseError, setParseError] = useState(false);
    const [parseSuccess, setParseSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        turnover: '',
        industry: '',
        experience: '',
        helpOffer: '',
        goal1Year: '',
        goal5Year: '',
        mission: '',
        tags: ''
    });

    const handleCopyPrompt = () => {
        const prompt = getAIPrompt(i18n.language);
        navigator.clipboard.writeText(prompt);
        setPromptCopied(true);
        setTimeout(() => setPromptCopied(false), 2000);
    };

    const handleApplyMagic = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setFormData({
                turnover: parsed.turnover || '',
                industry: parsed.industry || '',
                experience: parsed.experience || '',
                helpOffer: parsed.helpOffer || '',
                goal1Year: parsed.goal1Year || '',
                goal5Year: parsed.goal5Year || '',
                mission: parsed.mission || '',
                tags: Array.isArray(parsed.tags) ? parsed.tags.join(', ') : (parsed.tags || '')
            });
            setParseError(false);
            setParseSuccess(true);
            setTimeout(() => setParseSuccess(false), 3000);
        } catch (e) {
            setParseError(true);
            setParseSuccess(false);
        }
    };

    const handleSave = () => {
        // Here we would normally make an API call to save to backend Profile model
        console.log('Saving profile', formData);
        navigate('/profile');
    };

    return (
        <div className="profile-edit-page page-content">
            <header className="edit-header">
                <button onClick={() => navigate('/profile')} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">{t('edit.title')}</h1>
                <div style={{ width: 24 }} /> {/* align center */}
            </header>

            {/* AI Magic Section */}
            <Card variant="glass" className="ai-magic-card mt-6">
                <div className="ai-header flex items-center gap-2 mb-2">
                    <Sparkles className="text-gradient" size={20} />
                    <h2 className="font-bold text-lg">{t('edit.ai_magic_title')}</h2>
                </div>
                <p className="text-sm text-secondary mb-4">{t('edit.ai_magic_desc')}</p>

                <div className="ai-step">
                    <span className="step-number">{t('edit.step1')}</span>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="mt-2 w-full flex items-center justify-center gap-2"
                        onClick={handleCopyPrompt}
                    >
                        {promptCopied ? <Check size={16} /> : <Copy size={16} />}
                        {promptCopied ? t('edit.prompt_copied') : t('edit.copy_prompt')}
                    </Button>
                </div>

                <div className="ai-step mt-4">
                    <span className="step-number">{t('edit.step2')}</span>
                </div>

                <div className="ai-step mt-4">
                    <span className="step-number">{t('edit.step3')}</span>
                    <textarea
                        className="json-input mt-2"
                        placeholder={t('edit.paste_placeholder')}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        rows={4}
                    />
                    <Button
                        className="mt-2 w-full flex items-center justify-center gap-2"
                        onClick={handleApplyMagic}
                        disabled={!jsonInput.trim()}
                    >
                        <Sparkles size={16} />
                        {t('edit.apply_magic')}
                    </Button>

                    {parseError && <p className="text-sm text-danger mt-2">{t('edit.apply_error')}</p>}
                    {parseSuccess && <p className="text-sm text-success mt-2">{t('edit.apply_success')}</p>}
                </div>
            </Card>

            <div className="divider my-6">
                <span>{t('edit.manual_edit')}</span>
            </div>

            {/* Manual Form */}
            <div className="manual-form">
                <div className="form-group">
                    <label>{t('profile.turnover')}</label>
                    <input
                        className="form-input"
                        value={formData.turnover}
                        onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.industry')}</label>
                    <input
                        className="form-input"
                        value={formData.industry}
                        onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.experience')}</label>
                    <input
                        className="form-input"
                        value={formData.experience}
                        onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.how_can_help')}</label>
                    <textarea
                        className="form-input"
                        rows={3}
                        value={formData.helpOffer}
                        onChange={e => setFormData({ ...formData, helpOffer: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.1_year_goal')}</label>
                    <input
                        className="form-input"
                        value={formData.goal1Year}
                        onChange={e => setFormData({ ...formData, goal1Year: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.5_year_goal')}</label>
                    <input
                        className="form-input"
                        value={formData.goal5Year}
                        onChange={e => setFormData({ ...formData, goal5Year: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.mission')}</label>
                    <textarea
                        className="form-input"
                        rows={2}
                        value={formData.mission}
                        onChange={e => setFormData({ ...formData, mission: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.interests')} (comma separated)</label>
                    <input
                        className="form-input"
                        value={formData.tags}
                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    />
                </div>

                <Button className="mt-8 mb-8" fullWidth onClick={handleSave}>
                    {t('edit.save')}
                </Button>
            </div>
        </div>
    );
}
