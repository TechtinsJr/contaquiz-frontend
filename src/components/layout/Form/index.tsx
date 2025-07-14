import { BaseComponentProps } from '@/lib/types/BaseComponentProps';
import React, { FormEventHandler, ReactNode } from 'react';

type FormProps = BaseComponentProps &{
    children: ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const Form = ({ className, style, children, onSubmit }: FormProps) => {
    return (
        <form className={className} onSubmit={onSubmit} style={{ ...style }}>
            {children}
        </form>
    );
}