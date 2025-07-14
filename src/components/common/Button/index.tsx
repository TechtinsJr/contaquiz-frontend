'use client';

import React from 'react';
import styles from './Button.module.scss';
import { BaseComponentProps } from '@/lib/types/BaseComponentProps';

type ButtonProps = BaseComponentProps & {
    type?: 'button' | 'submit' | 'reset';
    label?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
}

export const Button = ({
    type = 'button',
    label,
    icon,
    iconPosition = 'right',
    onClick,
    disabled,
    variant = 'contained',
    darkMode = false,
    className = '',
    style
}: ButtonProps) => {
    const variantClass = styles[`button__content__${variant}`];
    const iconClass = !label && icon ? styles[`button__content__onlyIcon`] : '';
    const darkClass = darkMode ? styles['dark'] : '';

    return (
        <button
            className={`${styles.button__content} ${iconClass} ${variantClass} ${darkClass} ${className}`}
            style={{ ...style, flexDirection: iconPosition == 'left' ? 'row-reverse' : 'row' }}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {label && <span className={styles.button__content__label}>
                {label}
            </span>}
            {icon && <span className={styles.button__content__icon}>
                {icon}
            </span>}
        </button>
    )
}