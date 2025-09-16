// app/api/moloni/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    console.log('req', req)
  const url = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }
console.log('Received code:', code)
console.log('Body being sent to Moloni:', {
  grant_type: 'authorization_code',
  client_id: process.env.MOLONI_CLIENT_ID,
  client_secret: process.env.MOLONI_CLIENT_SECRET,
  code,
  redirect_uri: process.env.MOLONI_REDIRECT_URI,
})


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
      return NextResponse.json({ success: true, tokens: data })
    } else {
      return NextResponse.json({ error: data }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao contactar Moloni' }, { status: 500 })
  }
}
