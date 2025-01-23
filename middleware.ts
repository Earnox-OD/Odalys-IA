// middleware.ts
import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.id as string)
    response.headers.set('x-user-role', payload.role as string)

    return response
  } catch (error) {
    console.log('Error verifying token:', error)
    return
  }
}

export const config = {
  matcher: ['/chat/:path*']
}
