import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Search, MapPin, Briefcase, Filter, MessageCircle, BookmarkPlus, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTelegram } from '../lib/twa';
import { API_URL } from '../config';
import './Match.css';

export default function Match() {
    const { user } = useTelegram();
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [analyzingMatches, setAnalyzingMatches] = useState<Record<string, boolean>>({});
    const [matchAnalyses, setMatchAnalyses] = useState<Record<string, string>>({});

    useEffect(() => {
        if (user?.id) {
            fetch(`${API_URL}/api/matches/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setMatches(data);
                    }
                })
                .catch(err => console.error('Failed to load matches', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user?.id]);

    const analyzeMatch = async (theirId: string) => {
        if (!user?.id) return;

        setAnalyzingMatches(prev => ({ ...prev, [theirId]: true }));
        try {
            const res = await fetch(`${API_URL}/api/matches/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ myId: user.id, theirId })
            });
            const data = await res.json();
            if (data.analysis) {
                setMatchAnalyses(prev => ({ ...prev, [theirId]: data.analysis }));
            }
        } catch (e) {
            console.error('Failed to analyze match', e);
        } finally {
            setAnalyzingMatches(prev => ({ ...prev, [theirId]: false }));
        }
    };

    return (
        <div className="match-page page-content">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-2">AI Match</h1>
                <p className="text-secondary text-sm">Find exactly who you need</p>
            </header>

            <div className="search-section mb-6">
                <Input
                    icon={<Search size={20} />}
                    placeholder="e.g. Investor in E-commerce"
                    className="search-input"
                />

                <div className="filters-row mt-4">
                    <button className="filter-btn active">
                        <Briefcase size={14} /> Role
                    </button>
                    <button className="filter-btn">
                        <MapPin size={14} /> Geo
                    </button>
                    <button className="filter-btn">
                        Industry
                    </button>
                    <button className="filter-btn icon-only">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            <div className="results-list">
                {loading ? (
                    <div className="text-center py-10 opacity-60">Loading matches...</div>
                ) : matches.length === 0 ? (
                    <div className="text-center py-10 opacity-60">No matches found right now.</div>
                ) : (
                    matches.map(m => (
                        <Card key={m.id} variant="elevated" className="result-card mb-4">
                            <div className="result-header">
                                <div className="result-avatar" style={{ backgroundImage: `url(${m.photoUrl || `https://i.pravatar.cc/150?u=${m.id}`})` }} />
                                <div className="result-info">
                                    <div className="flex-between">
                                        <h3 className="font-semibold text-lg">{m.firstName} {m.lastName || ''}</h3>
                                        <span className="match-badge">{m.matchPercent}% Match</span>
                                    </div>
                                    <p className="text-sm text-secondary">
                                        {m.profile?.role || 'Entrepreneur'} {m.profile?.company ? `at ${m.profile.company}` : ''}
                                    </p>
                                </div>
                            </div>

                            <p className="result-desc mt-4 text-sm">
                                {m.profile?.helpOffer || m.profile?.mission || 'Looking for new connections and opportunities.'}
                            </p>

                            {m.profile?.hobbies && Array.isArray(m.profile.hobbies) && m.profile.hobbies.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {m.profile.hobbies.slice(0, 3).map((hobby: string) => (
                                        <span key={hobby} className="text-[10px] px-2 py-1 rounded bg-surface border border-white-10 text-secondary">
                                            {hobby}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {matchAnalyses[m.id] ? (
                                <div className="mt-4 p-4 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
                                    <div className="flex items-center gap-2 mb-2 text-accent text-sm font-semibold">
                                        <Sparkles size={14} /> AI Matchmaker
                                    </div>
                                    <p className="text-sm text-secondary whitespace-pre-wrap leading-relaxed">
                                        {matchAnalyses[m.id]}
                                    </p>
                                </div>
                            ) : (
                                <Button
                                    variant="secondary"
                                    className="mt-4 w-full text-sm font-semibold transition-all hover:scale-[1.01]"
                                    style={{ border: '1px dashed rgba(139,92,246,0.4)', color: '#8B5CF6', backgroundColor: 'transparent' }}
                                    onClick={() => analyzeMatch(m.id)}
                                    disabled={analyzingMatches[m.id]}
                                >
                                    {analyzingMatches[m.id] ? (
                                        'Analyzing...'
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <Sparkles size={16} /> Почему мы подходим друг другу?
                                        </div>
                                    )}
                                </Button>
                            )}

                            <div className="result-actions mt-4">
                                <Button variant="primary" className="action-btn">
                                    <MessageCircle size={18} className="mr-2" /> Message
                                </Button>
                                <Button variant="secondary" className="action-btn icon-only-btn">
                                    <BookmarkPlus size={20} />
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
