'use server'
import jwt from 'jsonwebtoken'
import { createToken } from '@/app/utils/session'

export interface LoginInterface {
  email: string
  password: string
}

export interface ILoginResponse {
  success: boolean
  token?: string
}

export async function userLogin(payload: LoginInterface): Promise<ILoginResponse> {
  const user = users.find(
    (user) => user.email === payload.email && user.password === payload.password
  )

  if (user) {
    const token = createToken(payload)
    return { success: true, token }
  }
  return { success: false }
}

const users = [
  {
    email: 'victor.mahe.pro@gmail.com',
    password: 'azertyuiop' // Clé d'API OpenAI
  }
]
