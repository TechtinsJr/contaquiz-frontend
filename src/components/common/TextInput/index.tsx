'use client';

import React, { ReactNode, useState } from 'react';
import styles from './TextInput.module.scss';
import { Button } from '../Button';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { BaseComponentProps } from '@/lib/types/BaseComponentProps';

type TextInputProps = BaseComponentProps &  {
    label?: string | ReactNode;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    variant?: 'outlined' | 'floating';
};

export const TextInput = ({
    label,
    name,
    type = 'text',
    placeholder,
    value = '',
    required = false,
    onChange,
    disabled = false,
    variant = 'outlined',
    darkMode = false,
    className = '',
    style = {},
}: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        if (!value) setIsFocused(false);
    };

    const variantClass = styles[`textInput__content__${variant}`];
    const darkClass = darkMode ? styles.dark : '';

    const showFloatingLabel = variant === 'floating' && (isFocused || value);

    return (
        <div className={`${styles.textInput__content} ${variantClass} ${darkClass} ${className}`} style={style}>
            {variant === 'outlined' && label && (
                <label htmlFor={name} className={styles.textInput__content__label}>
                    {label}
                </label>
            )}
            <div className={styles.textInput__content__inputContainer}>
                {variant === 'floating' && (
                    <label
                        htmlFor={name}
                        className={`${styles.textInput__content__inputContainer__labelFloating} ${showFloatingLabel ? styles.floating : ''}`}
                    >
                        {label}
                    </label>
                )}
                <div className={styles.textInput__content__inputContainer__inputWrapper}>
                    <input
                        id={name}
                        name={name}
                        type={type === 'password' && showPassword ? 'text' : type}
                        placeholder={variant === 'outlined' ? placeholder : ''}
                        value={value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className={styles.textInput__content__inputContainer__inputWrapper__input}
                        required={required}
                    />
                    <div className={styles.textInput__content__inputContainer__inputWrapper__button}>
                        {type === "password" && (
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                variant='text'
                                icon={showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
