'use client';

import { useEffect } from 'react';
import styles from './LoadingComp.module.scss';

export const Loading = () => {
  useEffect(() => {
    document.body.classList.add('loading-active');
    return () => {
      document.body.classList.remove('loading-active');
    };
  }, []);

  return (
    <div
      className={styles.loading__component}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <div className={styles.loading__component__loader} />
    </div>
  );
};