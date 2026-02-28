import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';

import './Home.css';

export default function Home() {
    return (
        <div className="home-page page-content">
            <header className="home-header">
                <div>
                    <h1 className="text-2xl font-bold">Good evening, Alex</h1>
                    <p className="text-secondary">Here are your best matches today</p>
                </div>
                <div className="avatar-placeholder">A</div>
            </header>

            {/* Recommended Contacts */}
            <section className="dashboard-section mt-8">
                <div className="section-header">
                    <h2 className="section-title flex items-center gap-2">
                        <span className="text-gradient">🔥 Recommendations</span>
                    </h2>
                </div>

                <div className="horizontal-scroll">
                    {[1, 2, 3].map(i => (
                        <Card key={i} variant="elevated" className="match-card">
                            <div className="match-percent">96% MATCH</div>
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
                            <Button size="sm" fullWidth className="mt-4" variant="secondary">View Profile</Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Upcoming Tables */}
            <section className="dashboard-section mt-8">
                <div className="section-header flex-between">
                    <h2 className="section-title">🃏 Upcoming Tables</h2>
                    <span className="see-all">See all</span>
                </div>

                <div className="vertical-list">
                    <Card variant="outline" className="table-card">
                        <div className="table-time">16:00</div>
                        <div className="table-info">
                            <h3 className="font-semibold">Investments in AI</h3>
                            <p className="text-sm text-secondary">2 seats left • 4 joined</p>
                        </div>
                        <Button size="sm" variant="outline">Join</Button>
                    </Card>

                    <Card variant="outline" className="table-card">
                        <div className="table-time">18:00</div>
                        <div className="table-info">
                            <h3 className="font-semibold">Scaling E-commerce</h3>
                            <p className="text-sm text-secondary">5 seats left • 1 joined</p>
                        </div>
                        <Button size="sm" variant="outline">Join</Button>
                    </Card>
                </div>
            </section>

            {/* Masterminds */}
            <section className="dashboard-section mt-8 mb-8">
                <div className="section-header flex-between">
                    <h2 className="section-title">🎯 Masterminds</h2>
                    <span className="see-all">See all</span>
                </div>

                <Card variant="glass" className="mastermind-promoted">
                    <div className="mm-tag">PROMOTED</div>
                    <h3 className="text-xl font-bold mt-2">Fundraising Strategy 2026</h3>
                    <p className="text-sm text-secondary mt-1">With Sarah J., Ex-Partner at YC</p>
                    <div className="flex-between mt-4">
                        <span className="font-bold text-gradient">$150 / seat</span>
                        <Button size="sm">Book Now</Button>
                    </div>
                </Card>
            </section>
        </div>
    );
}
