import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Search, MapPin, Briefcase, Filter, MessageCircle, BookmarkPlus } from 'lucide-react';
import './Match.css';

export default function Match() {
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
                {[1, 2].map(i => (
                    <Card key={i} variant="elevated" className="result-card mb-4">
                        <div className="result-header">
                            <div className="result-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${i + 10})` }} />
                            <div className="result-info">
                                <div className="flex-between">
                                    <h3 className="font-semibold text-lg">Michael R.</h3>
                                    <span className="match-badge">98% Match</span>
                                </div>
                                <p className="text-sm text-secondary">Managing Partner at VCB</p>
                            </div>
                        </div>

                        <p className="result-desc mt-4 text-sm">
                            Looking for promising e-commerce and retail tech startups for Seed/Series A rounds. Active check size $100k-$500k.
                        </p>

                        <div className="result-actions mt-4">
                            <Button variant="primary" className="action-btn">
                                <MessageCircle size={18} className="mr-2" /> Message
                            </Button>
                            <Button variant="secondary" className="action-btn icon-only-btn">
                                <BookmarkPlus size={20} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
