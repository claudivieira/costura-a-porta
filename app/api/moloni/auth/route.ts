// app/api/moloni/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  try {
    const response = await fetch('https://api.moloni.pt/v1/grant/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.MOLONI_CLIENT_ID!,
        client_secret: process.env.MOLONI_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.MOLONI_REDIRECT_URI!,
      }).toString(),
    })

    const tokens = await response.json()

    if ('access_token' in tokens) {
      // Aqui podes guardar os tokens numa DB ou devolver diretamente
      return NextResponse.json({
        success: true,
        tokens,
      })
    } else {
      return NextResponse.json({ error: tokens }, { status: 400 })
    }
  } catch (err) {
    return NextResponse.json({ error: 'Erro no pedido ao Moloni' }, { status: 500 })
  }
}
