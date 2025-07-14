import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@/lib/types/JwtPayload'

export const getToken = async (): Promise<string | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    return token || null
}

export const hasToken = async (): Promise<boolean> => {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    return !!token
}

export const getDecodedToken = async (): Promise<JwtPayload | null> => {
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

export const isTokenExpired = async (): Promise<boolean> => {
    const token = await getDecodedToken()
    if (!token) return true

    const now = Date.now() / 1000
    return token.exp < now
}

export const deleteToken = async (): Promise<void> => {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
}

export const isAdminToken = async (): Promise<boolean> => {
    const token = await getDecodedToken()
    if (!token) return false

    const expired = await isTokenExpired()
    return !expired && token.role === 'admin'
}

export const isStudentToken = async (): Promise<boolean> => {
    const token = await getDecodedToken()
    if (!token) return false

    const expired = await isTokenExpired()
    return !expired && token.role === 'student'
}
