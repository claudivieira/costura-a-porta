// app/api/moloni/auth/route.ts
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/')
  }

  // Trocar código por token
  const tokenRes = await fetch('https://api.moloni.pt/v1/grant/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.MOLONI_CLIENT_ID,
      client_secret: process.env.MOLONI_CLIENT_SECRET,
      redirect_uri: 'https://costuraaporta.pt/api/moloni/auth',
    }),
  })

  const tokenData = await tokenRes.json()

  if (!tokenData.access_token) {
    return NextResponse.redirect('/')
  }

  // Esperar cookies (obrigatório com await em API routes)
  const cookieStore = await cookies()
  const redirectTo = cookieStore.get('moloni_redirect')?.value || '/'

  const response = NextResponse.redirect(redirectTo)

  response.cookies.set('moloni_access_token', tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: tokenData.expires_in || 3600,
    path: '/',
  })

  response.cookies.set('moloni_refresh_token', tokenData.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/',
  })

  response.cookies.delete('moloni_redirect')

  return response
}
