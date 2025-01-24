import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value

  if (!token) {
    return new Response('Non autorisé', { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
      apiKey: string
      role: string
    }

    return NextResponse.json({
      id: decoded.id,
      email: decoded.email,
      apiKey: decoded.apiKey,
      role: decoded.role
    })
  } catch (error) {
    return new Response('Session invalide', { status: 401 })
  }
}
