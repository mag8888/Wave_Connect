import React from 'react';
import { cn } from '../lib/utils';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'glass' | 'outline';
}

export function Card({ className, variant = 'elevated', children, ...props }: CardProps) {
    return (
        <div className={cn('card', `card-${variant}`, className)} {...props}>
            {children}
        </div>
    );
}
