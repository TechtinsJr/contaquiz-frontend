export type JwtPayload = {
    exp: number;
    role?: 'admin' | 'student';
    userId?: string;
    email?: string;
    [key: string]: unknown;
};