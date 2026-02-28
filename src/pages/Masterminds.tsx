import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, Users } from 'lucide-react';

export default function Masterminds() {
    return (
        <div className="masterminds-page page-content fade-in">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Masterminds</h1>
                <p className="text-secondary text-sm">Deep dives with industry experts</p>
            </header>

            <div className="vertical-list">
                {[
                    { img: 31, host: 'Sarah J.', expert: 'Ex-Partner at YC', title: 'Fundraising Strategy 2026', date: 'Oct 24 • 19:00', price: 150, seats: 12 },
                    { img: 32, host: 'Mark C.', expert: 'Founder at ScaleUp', title: 'B2B Sales Automation', date: 'Oct 26 • 18:00', price: 100, seats: 8 }
                ].map((mm, i) => (
                    <Card key={i} variant="elevated" className="mm-card">
                        <div className="mm-header">
                            <div className="mm-host-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${mm.img})` }} />
                            <div>
                                <div className="font-semibold">{mm.host}</div>
                                <div className="text-xs text-secondary">{mm.expert}</div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mt-4 mb-3">{mm.title}</h3>

                        <div className="flex gap-4 mb-5 text-sm text-secondary">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {mm.date}</span>
                            <span className="flex items-center gap-1"><Users size={14} /> {mm.seats} seats</span>
                        </div>

                        <div className="flex-between">
                            <span className="font-bold text-gradient-purple text-xl">${mm.price}</span>
                            <Button>Take Part</Button>
                        </div>
                    </Card>
                ))}
            </div>

            <style>{`
        .mm-card {
          padding: 24px;
        }
        .mm-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mm-host-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-size: cover;
        }
        .text-xs { font-size: 12px; }
      `}</style>
        </div>
    );
}
