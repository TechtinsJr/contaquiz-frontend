
import { redirect } from 'next/navigation';
import { isAdminToken } from '@/lib/utils/auth';
import { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const isAdmin = await isAdminToken();

    if (!isAdmin) {
        redirect('/login');
    }

    return (
        <div>
            {children}
        </div>
    );
}