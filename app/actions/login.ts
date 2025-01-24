'use server'
import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function userLogin({ email, password }: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email, password }
    })

    if (!user) return { success: false, error: 'Invalid credentials' }
    const jwt = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    // Définition du cookie
    cookies().set('jwt', jwt, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      path: '/'
    })
    return { success: true, token: jwt }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Server error' }
  }
}
