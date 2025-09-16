// app/api/moloni/tokens/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { access_token, refresh_token, expires_in } = body

  if (!access_token || !refresh_token || !expires_in) {
    return NextResponse.json(
      { error: 'Missing one or more required token fields' },
      { status: 400 }
    )
  }
  
  try {
    await db.collection('moloni_tokens').doc('current').set({
      access_token,
      refresh_token,
      expires_in,
      received_at: Date.now()
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('🔥 Erro a guardar no Firebase:', {
        message: err?.message,
        code: err?.code,
        stack: err?.stack,
        err,
    })
    return NextResponse.json(
        { error: 'Erro Firebase', details: err?.message || err },
        { status: 500 }
    )
    }
}

export async function GET() {
  try {
    const doc = await db.collection('moloni_tokens').doc('current').get()

    if (!doc.exists) {
      return NextResponse.json({})
    }

    return NextResponse.json(doc.data())
  } catch (err) {
    console.error('🔥 Erro a ler do Firebase:', err)
    return NextResponse.json({ error: 'Erro Firebase' }, { status: 500 })
  }
}
