import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Users, Clock } from 'lucide-react';

export default function Tables() {
    return (
        <div className="tables-page page-content fade-in">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Thematic Tables</h1>
                <p className="text-secondary text-sm">Join curated networking sessions</p>
            </header>

            <div className="vertical-list">
                {[
                    { time: '16:00', title: 'Investments in AI', seats: 2, joined: 4, active: true },
                    { time: '18:00', title: 'Scaling E-commerce', seats: 5, joined: 1, active: true },
                    { time: '20:00', title: 'Strategic Partnerships', seats: 0, joined: 6, active: false }
                ].map((table, i) => (
                    <Card key={i} variant="elevated" className={`table-card-full p-5 ${!table.active ? 'opacity-50' : ''}`}>
                        <div className="flex-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="time-badge">{table.time}</div>
                                <h3 className="font-semibold text-lg">{table.title}</h3>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-5 text-sm color-secondary">
                            <span className="flex items-center gap-1"><Users size={14} /> {table.joined} joined</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {table.seats} seats left</span>
                        </div>

                        <div className="avatars-row mb-5">
                            {[1, 2, 3].map(a => (
                                <div key={a} className="mini-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${i + a + 20})` }} />
                            ))}
                            <div className="mini-avatar-more">+{(table.joined || 1) - 3 > 0 ? (table.joined || 1) - 3 : 1}</div>
                        </div>

                        <Button fullWidth disabled={!table.active}>
                            {table.active ? 'Join Table' : 'Table Full'}
                        </Button>
                    </Card>
                ))}
            </div>

            <style>{`
        .table-card-full {
          display: flex;
          flex-direction: column;
        }
        .time-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 14px;
        }
        .color-secondary {
          color: var(--text-secondary);
        }
        .avatars-row {
          display: flex;
        }
        .mini-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: cover;
          border: 2px solid var(--bg-surface-elevated);
          margin-right: -8px;
        }
        .mini-avatar-more {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-surface-hover);
          border: 2px solid var(--bg-surface-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          z-index: 10;
        }
        .opacity-50 {
          opacity: 0.5;
        }
        .p-5 {
          padding: 20px;
        }
      `}</style>
        </div>
    );
}
