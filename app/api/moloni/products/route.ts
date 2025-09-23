import { NextResponse } from 'next/server'
import { getValidMoloniToken } from '@/lib/moloni'


interface MoloniCategory {
  category_id: number
  name: string
}


interface MoloniProduct {
  product_id: number
  name: string
  price: string
  category_id: number
}


export const runtime = 'nodejs'


export async function GET() {
  try {
  const access_token = await getValidMoloniToken()

  if (!access_token) throw new Error('Token inválido ou inexistente')

  const companiesRes = await fetch('https://api.moloni.pt/v1/companies/getAll/?access_token=' + access_token)
  const companies = await companiesRes.json()
  const company_id = companies?.[0]?.company_id
  if (!company_id) throw new Error('❌ company_id não encontrado.')


  const categoriesRes = await fetch(`https://api.moloni.pt/v1/productCategories/getAll/?access_token=${access_token}&json=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_id: Number(company_id), parent_id: 0 })
  })

  const categoriesBody = await categoriesRes.json()

  const categories: MoloniCategory[] = Array.isArray(categoriesBody)
  ? categoriesBody
  : categoriesBody?.data || categoriesBody?.categories || []

  const filteredCategories = categories
  .filter((cat) => cat.name.toLowerCase() !== 'bolsas')
  .sort((a, b) => a.name.localeCompare(b.name))

  const allProducts = (
    await Promise.all(
    filteredCategories.map(async (cat) => {
      const prodRes = await fetch(`https://api.moloni.pt/v1/products/getAll/?access_token=${access_token}&json=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_id, category_id: cat.category_id, with_invisible: 0, qty: 50 })
  })

  const products: MoloniProduct[] = await prodRes.json()
    return products.map((p) => ({
        product_id: p.product_id,
        name: p.name,
        price: parseFloat(p.price),
        category_id: p.category_id,
        category_name: cat.name
      }))
      })
    )
  ).flat()

    return NextResponse.json(allProducts)
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('🔥 Erro a obter artigos:', err)
    return NextResponse.json({ error: 'Erro ao obter artigos', details: error }, { status: 500 })
  }
}