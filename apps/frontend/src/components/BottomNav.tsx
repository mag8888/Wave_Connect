
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';
import './BottomNav.css';

export function BottomNav() {
    const location = useLocation();

    // Hide nav on onboarding
    if (location.pathname === '/onboarding') return null;

    const items = [
        { icon: Home, label: 'Main', path: '/home' },
        { icon: Search, label: 'Match', path: '/match' },
        { icon: Calendar, label: 'Events', path: '/tables' }, // Merged tables & masterminds mentally or via tabs, using a generic calendar icon for events
        { icon: MessageCircle, label: 'Chat', path: '/messages' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="bottom-nav">
            {items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={cn('nav-item', isActive && 'nav-item-active')}
                    >
                        <item.icon className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}
