import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, Gift, Share2, Copy, Check, Users } from 'lucide-react';
import { useTelegram, tg } from '../lib/twa';
import { API_URL } from '../config';
import './Referral.css';

export default function Referral() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useTelegram();
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ invited: 0, earned: 10 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetch(`${API_URL}/api/users/${user.id}/referrals`)
                .then(res => res.json())
                .then(data => {
                    if (data && typeof data.invited === 'number') {
                        setStats({ invited: data.invited, earned: data.earned });
                    }
                })
                .catch(err => console.error('Failed to load referral stats', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user?.id]);

    // Replace BOT_USERNAME with the actual bot username
    const botUrl = `https://t.me/WaveMatchBot?start=ref_${user?.id || 'guest'}`;
    const shareText = "Join Wave Match - Premium Business Networking! Let's connect and find the best partners.";

    const handleCopy = () => {
        navigator.clipboard.writeText(botUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (tg) {
            const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(botUrl)}&text=${encodeURIComponent(shareText)}`;
            tg.openTelegramLink(shareUrl);
        } else {
            handleCopy();
        }
    };

    return (
        <div className="referral-page page-content">
            <header className="referral-header mb-6">
                <button onClick={() => navigate('/profile')} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">{t('referral.title')}</h1>
                <div style={{ width: 24 }} />
            </header>

            <div className="referral-hero fade-in text-center py-6 pb-8">
                <div className="referral-icon-wrapper mb-6 mx-auto flex items-center justify-center">
                    <Gift size={48} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t('referral.get_matches')}</h2>
                <p className="text-secondary px-4 text-sm leading-relaxed">
                    {t('referral.subtitle')}
                </p>
            </div>

            <Card variant="glass" className="referral-card mt-2">
                <div className="flex gap-4 mb-6">
                    <div className="stat-box flex-1 bg-surface p-4 rounded-xl border border-white-10 text-center">
                        <span className="block text-2xl font-bold text-gradient mb-1">
                            {loading ? '...' : stats.invited}
                        </span>
                        <span className="text-xs text-secondary font-medium uppercase">{t('referral.stats_invited')}</span>
                    </div>
                    <div className="stat-box flex-1 bg-surface p-4 rounded-xl border border-white-10 text-center">
                        <span className="block text-2xl font-bold text-accent mb-1">
                            {loading ? '...' : stats.earned}
                        </span>
                        <span className="text-xs text-secondary font-medium uppercase">{t('referral.stats_earned')}</span>
                    </div>
                </div>

                <div className="share-actions flex flex-col gap-3">
                    <Button
                        size="lg"
                        fullWidth
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 font-bold shadow-glow"
                    >
                        <Share2 size={18} />
                        {t('referral.share_link')}
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2"
                    >
                        {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                        {copied ? t('referral.copied') : t('referral.copy_link')}
                    </Button>
                </div>
            </Card>

            <div className="mt-8 text-center text-sm text-secondary flex items-center justify-center gap-2 opacity-60">
                <Users size={16} />
                <span>Wave Match Partnership Program</span>
            </div>
        </div>
    );
}
