import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@/lib/types/JwtPayload'

export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    return token || null
}

export async function hasToken(): Promise<boolean> {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    return !!token
}

export async function getDecodedToken(): Promise<JwtPayload | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return null

    try {
        return jwtDecode<JwtPayload>(token)
    } catch (error) {
        console.error('Erro ao decodificar o token:', error)
        return null
    }
}

export async function isTokenExpired(): Promise<boolean> {
    const token = await getDecodedToken()
    if (!token) return true

    const now = Date.now() / 1000
    return token.exp < now
}

export async function isAdminToken(): Promise<boolean> {
    const token = await getDecodedToken()
    if (!token) return false

    const expired = await isTokenExpired()
    return !expired && token.role === 'admin'
}

export async function isStudentToken(): Promise<boolean> {
    const token = await getDecodedToken()
    if (!token) return false

    const expired = await isTokenExpired()
    return !expired && token.role === 'student'
}
