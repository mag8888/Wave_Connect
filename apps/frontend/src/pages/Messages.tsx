import { Card } from '../components/Card';
import { Search } from 'lucide-react';
import { Input } from '../components/Input';

export default function Messages() {
    return (
        <div className="messages-page page-content fade-in">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Messages</h1>
            </header>

            <Input
                icon={<Search size={20} />}
                placeholder="Search chats"
                className="mb-6"
            />

            <div className="vertical-list">
                {[
                    { name: 'Sarah J.', msg: 'Sure, we can discuss the SaaS metrics tomorrow.', time: '10:42 AM', unread: 2, img: 12 },
                    { name: 'David S.', msg: 'Send me your pitch deck when ready.', time: 'Yesterday', unread: 0, img: 21 },
                    { name: 'Fundraising Mastermind', msg: 'Alex: Thanks everyone for joining!', time: 'Mon', unread: 0, img: 10, isGroup: true }
                ].map((chat, i) => (
                    <Card key={i} variant="outline" className="chat-card">
                        <div className="chat-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${chat.img})` }} />

                        <div className="chat-info">
                            <div className="flex-between">
                                <h3 className="font-semibold">{chat.name}</h3>
                                <span className={`text-xs ${chat.unread ? 'text-accent font-bold' : 'text-secondary'}`}>
                                    {chat.time}
                                </span>
                            </div>
                            <div className="flex-between mt-1">
                                <p className="text-secondary text-sm truncate pr-4">{chat.msg}</p>
                                {chat.unread > 0 && (
                                    <div className="unread-badge">{chat.unread}</div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <style>{`
        .chat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          cursor: pointer;
        }
        .chat-card:hover {
          background: var(--bg-surface-hover);
        }
        .chat-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-size: cover;
          flex-shrink: 0;
        }
        .chat-info {
          flex: 1;
          min-width: 0;
        }
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pr-4 {
          padding-right: 16px;
        }
        .unread-badge {
          background: var(--accent-base);
          color: white;
          font-size: 11px;
          font-weight: 700;
          height: 20px;
          min-width: 20px;
          padding: 0 6px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
        </div>
    );
}
