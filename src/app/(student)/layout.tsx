
import { redirect } from 'next/navigation';
import { isStudentToken } from '@/lib/utils/auth';
import { ReactNode } from 'react';

export default async function StudentLayout({ children }: { children: ReactNode }) {
    const isStudent = await isStudentToken();

    if (!isStudent) {
        redirect('/login');
    }

    return (
        <div>
            {children}
        </div>
    );
}