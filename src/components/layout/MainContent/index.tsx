import React from 'react';
import styles from './MainContent.module.scss'
import { BaseComponentProps } from '@/lib/types/BaseComponentProps';

type MainContentProps = BaseComponentProps & {
    children: React.ReactNode;
}

export const MainContent = ({ children, style, className }: MainContentProps) => {
    return (
        <main className={`${styles.main__content} ${className}`} style={{ ...style }}>
            {children}
        </main>
    )
}