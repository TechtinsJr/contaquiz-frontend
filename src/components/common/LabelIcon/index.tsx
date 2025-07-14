import React from 'react';
import styles from './LabelIcon.module.scss'

type LabelIconProps = {
    label?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
}

export const LabelIcon = ({ label, icon, iconPosition, className }: LabelIconProps) => {
    return (
        <div className={`${styles.labelIcon__content} ${styles.labelIcon__content__default} ${className}`} style={{ flexDirection: iconPosition === 'left' ? 'row-reverse' : 'row' }}>
            <span className={styles.labelIcon__content__label}>
                {label}
            </span>
            {icon && <span className={styles.labelIcon__content__icon}>
                {icon}
            </span>}
        </div>
    );
}