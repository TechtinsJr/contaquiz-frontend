export type JwtPayload = {
    exp: number;
    role?: string;
    userId?: string;
    email?: string;
    [key: string]: unknown;
};