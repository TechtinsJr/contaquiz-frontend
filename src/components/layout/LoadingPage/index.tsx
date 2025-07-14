import React from 'react';
import styles from './LoadingPage.module.scss'
import Image from 'next/image'

export const LoadingPage = () => {
    return (
        <div className={styles.loadingPage}>
            <div className={styles.loadingPage__content}>
                <div className={styles.loadingPage__content__orbital}>
                    <Image width={100} height={100} src={"/images/logo-contaquiz.png"} alt="Logo - ContaQuiz" />
                    <div className={styles.loadingPage__content__orbital__spinner}></div>
                </div>
                <span className={styles.loadingPage__content__text}>Carregando</span>
            </div>
        </div>
    )
}
