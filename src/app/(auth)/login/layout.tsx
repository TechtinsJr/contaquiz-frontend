import React, { ReactNode } from "react";

export default async function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}