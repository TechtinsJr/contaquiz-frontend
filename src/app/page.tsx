import { redirect } from 'next/navigation';
import { isAdminToken, isStudentToken } from '@/lib/utils/auth';

export default async function IndexPage() {
    const isAdmin = await isAdminToken();
    if (isAdmin) {
        redirect('/admin');
    }

    const isStudent = await isStudentToken();
    if (isStudent) {
        redirect('/home');
    }

    redirect('/login');

    return null;
}