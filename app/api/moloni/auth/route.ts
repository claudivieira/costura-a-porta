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

  // Esperar cookies
  const cookieStore = cookies()
  const redirectTo = (await cookieStore.get('moloni_redirect'))?.value || '/'

  const response = NextResponse.redirect(redirectTo)

  // Guardar token de forma segura
  response.cookies.set('moloni_access_token', tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: tokenData.expires_in || 3600,
    path: '/',
  })

  // Limpar cookie temporário
  response.cookies.delete('moloni_redirect')

  return response
}
