import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
//export const seed = 'vive odalys ia'
//export const createToken = (payload: any) => jwt.sign(payload, seed)

const prisma = new PrismaClient()
export const seed = process.env.JWT_SECRET || 'your-strong-secret-key'

export function createToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, seed, { expiresIn: '7d' })
}

// Add user validation function
export async function validateUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      email: true
    }
  })
}
