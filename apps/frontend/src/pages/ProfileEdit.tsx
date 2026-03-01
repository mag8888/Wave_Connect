import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, Sparkles, Copy, Check, Award, Book, Star, Zap, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useTelegram } from '../lib/twa';
import { getAIPrompt } from '../i18n';
import './ProfileEdit.css';

export default function ProfileEdit() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useTelegram();

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
        tags: '',
        hobbies: '',
        books: '',
        education: [] as { name: string, icon: string }[]
    });

    const [newEduName, setNewEduName] = useState('');
    const [newEduIcon, setNewEduIcon] = useState('Award');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetch(`https://wave-match-production.up.railway.app/api/profile/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.profile) {
                        const p = data.profile;
                        // Map arrays or strings safely
                        setFormData({
                            turnover: p.turnover || '',
                            industry: p.industry || '',
                            experience: p.experience || '',
                            helpOffer: p.helpOffer || '',
                            goal1Year: p.goal1Year || '',
                            goal5Year: p.goal5Year || '',
                            mission: p.mission || '',
                            tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
                            hobbies: Array.isArray(p.hobbies) ? p.hobbies.join(', ') : (p.hobbies || ''),
                            books: Array.isArray(p.books) ? p.books.join(', ') : (p.books || ''),
                            // Prisma doesn't natively have JSON list of objects unless configured, so assume education is stored as JSON
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

    // Lucide Icons Map
    const IconMap: Record<string, any> = {
        Award, Book, Star, Zap, GraduationCap
    };

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
                tags: Array.isArray(parsed.tags) ? parsed.tags.join(', ') : (parsed.tags || ''),
                hobbies: Array.isArray(parsed.hobbies) ? parsed.hobbies.join(', ') : (parsed.hobbies || ''),
                books: Array.isArray(parsed.books) ? parsed.books.join(', ') : (parsed.books || ''),
                education: Array.isArray(parsed.education) ? parsed.education : []
            });
            setParseError(false);
            setParseSuccess(true);
            setTimeout(() => setParseSuccess(false), 3000);
        } catch (e) {
            setParseError(true);
            setParseSuccess(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch('https://wave-match-production.up.railway.app/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telegramId: user?.id,
                    ...formData,
                    tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
                    hobbies: formData.hobbies.split(',').map(s => s.trim()).filter(Boolean),
                    books: formData.books.split(',').map(s => s.trim()).filter(Boolean),
                    education: formData.education // this will be JSON
                })
            });
            navigate('/profile');
        } catch (e) {
            console.error('Failed to save profile', e);
            setIsSaving(false);
        }
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
                    <label>{t('profile.hobbies')} (comma separated)</label>
                    <input
                        className="form-input"
                        value={formData.hobbies}
                        onChange={e => setFormData({ ...formData, hobbies: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.books')} (comma separated)</label>
                    <input
                        className="form-input"
                        value={formData.books}
                        onChange={e => setFormData({ ...formData, books: e.target.value })}
                    />
                </div>

                <div className="form-group mt-4">
                    <label>{t('profile.education')}</label>
                    <div className="education-list mb-3">
                        {formData.education.map((edu, idx) => {
                            const IconCmp = IconMap[edu.icon] || Award;
                            return (
                                <div key={idx} className="flex items-center justify-between bg-surface p-3 rounded border border-white-10 mb-2">
                                    <div className="flex items-center gap-2">
                                        <IconCmp size={16} className="text-secondary" />
                                        <span className="text-sm">{edu.name}</span>
                                    </div>
                                    <button
                                        className="text-danger opacity-70 hover:opacity-100"
                                        onClick={() => setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }))}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="form-input w-auto p-2"
                            value={newEduIcon}
                            onChange={(e) => setNewEduIcon(e.target.value)}
                        >
                            <option value="Award">Award 🏆</option>
                            <option value="Book">Book 📖</option>
                            <option value="Star">Star ⭐</option>
                            <option value="Zap">Zap ⚡</option>
                            <option value="GraduationCap">Cap 🎓</option>
                        </select>
                        <input
                            className="form-input flex-1"
                            placeholder="e.g. MBA Skolkovo"
                            value={newEduName}
                            onChange={(e) => setNewEduName(e.target.value)}
                        />
                        <Button
                            variant="secondary"
                            className="px-4"
                            onClick={() => {
                                if (newEduName.trim()) {
                                    setFormData(prev => ({ ...prev, education: [...prev.education, { name: newEduName.trim(), icon: newEduIcon }] }));
                                    setNewEduName('');
                                }
                            }}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>

                <Button className="mt-8 mb-8" fullWidth onClick={handleSave} disabled={isSaving || isLoading}>
                    {isSaving ? '...' : t('edit.save')}
                </Button>
            </div>
        </div>
    );
}
