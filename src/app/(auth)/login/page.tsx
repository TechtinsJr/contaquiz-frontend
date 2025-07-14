'use client';

import React, { useState } from "react";
import styles from './styles.module.scss'
import { MainContent } from "@/components/layout/MainContent";
import { Form } from "@/components/layout/Form";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { LabelIcon } from "@/components/common/LabelIcon";
import { AlternateEmailOutlined, LockOutlined } from "@mui/icons-material";


export default function LoginPage() {
    const [formState, setFormState] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: '',
    });

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <MainContent>
            <div className={styles.login__container}>
                <Form className={styles.login__container__form} onSubmit={handleLogin}>
                    {/* <Link className={styles.login__container__form__header} href={"/home"}>
                        <Image width={100} height={100} src={"/images/paroquia-logo.png"} alt="Logo - Paroquia" />
                    </Link> */}
                    <div className={styles.login__container__form__body}>
                        <div className={styles.login__container__form__body__title}>
                            <h1>Login</h1>
                            <p>Faça login para acessar o ContaQuiz</p>
                        </div>
                        <div className={styles.login__container__form__body__inputs}>
                            <TextInput
                                name="email"
                                label={<LabelIcon
                                    label="Email"
                                    icon={<AlternateEmailOutlined />}
                                    iconPosition="left"
                                />}
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                variant="floating"
                                type="email"
                            />
                            <TextInput
                                name="password"
                                label={<LabelIcon
                                    label="Senha"
                                    icon={<LockOutlined />}
                                    iconPosition="left"
                                />}
                                value={formState.password}
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                variant="floating"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className={styles.login__container__form__footer}>
                        <Button
                            type="submit"
                            label="Login"
                            variant="contained"
                        />
                    </div>
                </Form>
            </div>
        </MainContent>
    );
}