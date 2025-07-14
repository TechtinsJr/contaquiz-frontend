// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '@/lib/types/JwtPayload';

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

    if (!token) {
        if (isAuthPage) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthPage) {
        try {
            const { role } = jwtDecode<JwtPayload>(token);
            const redirectTo = role === 'admin' ? '/admin' : '/home';
            return NextResponse.redirect(new URL(redirectTo, request.url));
        } catch {
            const response = NextResponse.next();
            response.cookies.delete('auth_token');
            return response;
        }
    }

    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const isExpired = (decodedToken.exp * 1000) < Date.now();

        if (isExpired) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('auth_token');
            return response;
        }

        const userRole = decodedToken.role;

        if (pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        if ((pathname.startsWith('/home') || pathname.startsWith('/quizzes')) && userRole !== 'student') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        console.error('Token inválido:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth_token');
        return response;
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};