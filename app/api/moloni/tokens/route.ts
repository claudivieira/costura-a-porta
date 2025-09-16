// app/api/moloni/tokens/route.ts

export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'

let storedTokens: {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  received_at?: number
} = {}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { access_token, refresh_token, expires_in } = body

  if (!access_token || !refresh_token || !expires_in) {
    return NextResponse.json(
      { error: 'Missing one or more required token fields' },
      { status: 400 }
    )
  }

  storedTokens = {
    access_token,
    refresh_token,
    expires_in,
    received_at: Date.now()
  }

  console.log('✅ Tokens saved:', storedTokens)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json(storedTokens)
}
