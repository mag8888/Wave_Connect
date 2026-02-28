import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
    const navigate = useNavigate();

    return (
        <div className="sub-page page-content fade-in flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-8">
                <div className="premium-icon mb-6" />
                <h1 className="text-3xl font-bold mb-2 text-gradient">Wave Match Premium</h1>
                <p className="text-secondary">Unlock the full power of targeted networking</p>
            </div>

            <Card variant="glass" className="sub-card w-full mb-8 relative overflow-hidden">
                <div className="glow-bg" />
                <div className="relative z-10">
                    <div className="flex items-baseline justify-center gap-1 mb-6">
                        <span className="text-4xl font-bold">$20</span>
                        <span className="text-secondary">/ month</span>
                    </div>

                    <div className="sub-features">
                        {[
                            'Unlimited AI Matches',
                            'Access to all Thematic Tables',
                            'Priority booking for Masterminds',
                            'No hidden fees, cancel anytime'
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-3 mb-4">
                                <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Button fullWidth size="lg" onClick={() => navigate('/home')}>
                Start 10 Days Free
            </Button>
            <p className="text-xs text-secondary mt-4 text-center">
                Then $20/month. Cancel anytime.
            </p>

            <style>{`
        .min-h-\\[80vh\\] { min-height: 80vh; }
        .flex-col { display: flex; flex-direction: column; }
        .justify-center { justify-content: center; }
        .w-full { width: 100%; }
        .text-center { text-align: center; }
        .text-3xl { font-size: 28px; letter-spacing: -0.5px; }
        .text-4xl { font-size: 36px; letter-spacing: -1px; }
        .shrink-0 { flex-shrink: 0; }
        .font-medium { font-weight: 500; }
        
        .premium-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto;
          background: var(--accent-gradient);
          mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>') center/contain no-repeat;
          -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>') center/contain no-repeat;
        }

        .sub-card {
          border: 1px solid rgba(10, 132, 255, 0.3);
        }

        .glow-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(10, 132, 255, 0.15) 0%, transparent 50%);
          animation: rotateGlow 10s linear infinite;
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
