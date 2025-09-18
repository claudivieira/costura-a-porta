// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('moloni_access_token')?.value
  const isProductsPage = request.nextUrl.pathname.startsWith('/products')

  if (isProductsPage && !token) {
    const redirectUrl = new URL('https://api.moloni.pt/v1/authorize/')
    redirectUrl.searchParams.set('response_type', 'code')
    redirectUrl.searchParams.set('client_id', process.env.MOLONI_CLIENT_ID!)
    redirectUrl.searchParams.set('redirect_uri', 'https://costuraaporta.pt/api/moloni/auth')

    const response = NextResponse.redirect(redirectUrl)

    // Guarda página original que o utilizador queria visitar
    response.cookies.set('moloni_redirect', request.nextUrl.pathname, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 300,
      path: '/',
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products'],
}
