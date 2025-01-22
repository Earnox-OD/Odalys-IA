import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { seed } from '@/app/utils/session'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value

  console.log('jwt:', token)

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // jwt.verify(token, seed)
    return NextResponse.next()
  } catch (error) {
    console.log('error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/chat/:path*']
}
