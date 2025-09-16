// app/api/moloni/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.MOLONI_CLIENT_ID!,
    client_secret: process.env.MOLONI_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.MOLONI_REDIRECT_URI!,
  })

  try {
    const moloniResponse = await fetch(
      `https://api.moloni.pt/v1/grant/?${params}`,
      { method: 'GET' }
    )

    const data = await moloniResponse.json()

    if (data.access_token) {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/moloni/tokens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_in: data.expires_in
            })
        })
      return NextResponse.json({ success: true, tokens: data })
    } else {
      return NextResponse.json({ error: data }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao contactar Moloni' }, { status: 500 })
  }
}
