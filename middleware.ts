// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('moloni_token')?.value

  const isProductsPage = request.nextUrl.pathname.startsWith('/products')

  if (isProductsPage && !token) {
    const redirectUrl = new URL('https://api.moloni.pt/v1/authorize/', request.url)
    redirectUrl.searchParams.set('response_type', 'code')
    redirectUrl.searchParams.set('client_id', process.env.MOLONI_CLIENT_ID!)
    redirectUrl.searchParams.set('redirect_uri', 'https://costuraaporta.pt/api/moloni/auth')

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/products'],
}