import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import { useTelegram } from '../lib/twa';
import { useTranslation } from 'react-i18next';
import './Home.css';

export default function Home() {
    const { user } = useTelegram();
    const { t } = useTranslation();
    const firstName = user?.first_name || 'Alex';
    const avatarUrl = user?.photo_url || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    return (
        <div className="home-page page-content">
            <header className="home-header">
                <div>
                    <h1 className="text-2xl font-bold">{t('home.greeting')}, {firstName}</h1>
                    <p className="text-secondary">{t('home.subtitle')}</p>
                </div>
                <div
                    className="avatar-placeholder"
                    style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none' } : {}}
                >
                    {!avatarUrl && firstName.charAt(0)}
                </div>
            </header>

            {/* Top Leaders */}
            <section className="dashboard-section mt-8">
                <div className="section-header flex-between">
                    <h2 className="section-title flex items-center gap-2">
                        <span className="text-gradient">🔥 {t('home.top_leaders')}</span>
                    </h2>
                    <span className="see-all">{t('home.see_all')}</span>
                </div>

                <div className="horizontal-scroll">
                    {[1, 2, 3].map(i => (
                        <Card key={i} variant="elevated" className="match-card">
                            <div className="match-percent">96% {t('home.match')}</div>
                            <div className="match-card-header">
                                <div className="match-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${i})` }} />
                                <div>
                                    <h3 className="match-name">David S.</h3>
                                    <p className="match-role">Angel Investor</p>
                                </div>
                            </div>
                            <div className="match-tags mt-4">
                                <Tag size="sm">FinTech</Tag>
                                <Tag size="sm">Seed</Tag>
                            </div>
                            <Button size="sm" fullWidth className="mt-4" variant="secondary">{t('home.view_profile')}</Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Upcoming Tables */}
            <section className="dashboard-section mt-8">
                <div className="section-header flex-between">
                    <h2 className="section-title">🃏 {t('home.upcoming_tables')}</h2>
                    <span className="see-all">{t('home.see_all')}</span>
                </div>

                <div className="vertical-list">
                    <Card variant="outline" className="table-card">
                        <div className="table-time">16:00</div>
                        <div className="table-info">
                            <h3 className="font-semibold">Investments in AI</h3>
                            <p className="text-sm text-secondary">2 {t('home.seats_left')} • 4 {t('home.joined')}</p>
                        </div>
                        <Button size="sm" variant="outline">{t('home.join')}</Button>
                    </Card>

                    <Card variant="outline" className="table-card">
                        <div className="table-time">18:00</div>
                        <div className="table-info">
                            <h3 className="font-semibold">Scaling E-commerce</h3>
                            <p className="text-sm text-secondary">5 {t('home.seats_left')} • 1 {t('home.joined')}</p>
                        </div>
                        <Button size="sm" variant="outline">{t('home.join')}</Button>
                    </Card>
                </div>
            </section>

            {/* Masterminds */}
            <section className="dashboard-section mt-8 mb-8">
                <div className="section-header flex-between">
                    <h2 className="section-title">🎯 {t('home.masterminds')}</h2>
                    <span className="see-all">{t('home.see_all')}</span>
                </div>

                <Card variant="glass" className="mastermind-promoted">
                    <div className="mm-tag">{t('home.promoted')}</div>
                    <h3 className="text-xl font-bold mt-2">Fundraising Strategy 2026</h3>
                    <p className="text-sm text-secondary mt-1">With Sarah J., Ex-Partner at YC</p>
                    <div className="flex-between mt-4">
                        <span className="font-bold text-gradient">$150 / {t('home.seat')}</span>
                        <Button size="sm">{t('home.book_now')}</Button>
                    </div>
                </Card>
            </section>
        </div>
    );
}
