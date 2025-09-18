// lib/moloni.ts
import { db } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'

const MOLONI_CLIENT_ID = process.env.MOLONI_CLIENT_ID!
const MOLONI_CLIENT_SECRET = process.env.MOLONI_CLIENT_SECRET!

export async function getValidToken(): Promise<string> {
  const docRef = db.collection('moloni_tokens').doc('current')
  const doc = await docRef.get()

  if (!doc.exists) {
    throw new Error('❌ Nenhum token encontrado no Firebase')
  }

  const {
    access_token,
    refresh_token,
    expires_in,
    received_at
  } = doc.data() as {
    access_token: string
    refresh_token: string
    expires_in: number
    received_at: number
  }

  const now = Date.now()
  const expiresAt = received_at + expires_in * 1000
  const isExpiredSoon = expiresAt - now < 5 * 60 * 1000 // 5 minutos

  if (!isExpiredSoon) {
    return access_token
  }

  // ⚠️ Está a expirar ou já expirou → Fazer refresh
  const response = await fetch('https://api.moloni.pt/v1/grant/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: MOLONI_CLIENT_ID,
      client_secret: MOLONI_CLIENT_SECRET,
      refresh_token
    })
  })

  const data = await response.json()

  if (!response.ok || !data.access_token) {
    console.error('❌ Erro ao fazer refresh do token:', data)
    throw new Error('Erro ao renovar token da Moloni')
  }

  // Guardar novo token
  await docRef.set({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    received_at: Date.now(),
    timestamp: Timestamp.now()
  })

  console.log('✅ Token da Moloni atualizado com sucesso')

  return data.access_token
}
