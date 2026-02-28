import React from 'react';
import { cn } from '../lib/utils';
import './Tag.css';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    active?: boolean;
    size?: 'sm' | 'md';
}

export function Tag({ className, active = false, size = 'md', children, ...props }: TagProps) {
    return (
        <span
            className={cn(
                'tag',
                `tag-${size}`,
                active ? 'tag-active' : 'tag-default',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
