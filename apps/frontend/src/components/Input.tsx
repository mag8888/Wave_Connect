import React from 'react';
import { cn } from '../lib/utils';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
    label?: string;
}

export function Input({ className, icon, error, label, ...props }: InputProps) {
    return (
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <div className={cn('input-wrapper', error && 'input-error', className)}>
                {icon && <div className="input-icon">{icon}</div>}
                <input className={cn('input-field', icon && 'input-with-icon')} {...props} />
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
}
