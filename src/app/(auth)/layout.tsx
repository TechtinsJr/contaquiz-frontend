import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAdminToken, isStudentToken } from "@/lib/utils/auth";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const isAdmin = await isAdminToken();
    if (isAdmin) {
        redirect('/admin');
    }

    const isStudent = await isStudentToken();
    if (isStudent) {
        redirect('/home');
    }

    return (
        <div>
            {children}
        </div>
    );
}