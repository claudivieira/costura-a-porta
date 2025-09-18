// app/api/moloni/products/route.ts
import { NextResponse } from 'next/server'
import { getValidToken } from '@/lib/moloni/getValidToken'

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

// interface Product {
//   product_id: number
//   name: string
//   price: number
//   category_id: number
// }


export const runtime = 'nodejs'

export async function GET() {
  try {
    const access_token = await getValidToken()

    if (!access_token) {
    const redirectUri = `https://api.moloni.pt/v1/authorize/?response_type=code&client_id=263814238&redirect_uri=https://costuraaporta.pt/api/moloni/auth`

    const response = NextResponse.redirect(redirectUri)

    response.cookies.set('moloni_redirect', '/products', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 300,
    })

      return response
    }
    // 1. Buscar company_id
    const companiesRes = await fetch('https://api.moloni.pt/v1/companies/getAll/?access_token=' + access_token)
    const companies = await companiesRes.json()
    const company_id = companies?.[1]?.company_id
    if (!company_id) throw new Error('❌ company_id não encontrado.')

    // 2. Buscar categorias
    const categoriesRes = await fetch(`https://api.moloni.pt/v1/productCategories/getAll/?access_token=${access_token}&json=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_id: Number(company_id), parent_id: 0 })
    })

    const categoriesBody = await categoriesRes.json()

    const categories: MoloniCategory[] = Array.isArray(categoriesBody)
      ? categoriesBody
      : categoriesBody?.data || categoriesBody?.categories || []

    // Filtrar "Bolsas"
    const filteredCategories = categories
      .filter((cat) => cat.name.toLowerCase() !== 'bolsas')
      .sort((a, b) => a.name.localeCompare(b.name))

    // 3. Buscar produtos para cada categoria
    const allProducts = (
      await Promise.all(
        filteredCategories.map(async (cat) => {
          const prodRes = await fetch(
            `https://api.moloni.pt/v1/products/getAll/?access_token=${access_token}&json=true`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                company_id,
                category_id: cat.category_id,
                with_invisible: 0,
                qty: 50
              })
            }
          )

          const products: MoloniProduct[] = await prodRes.json()
          return products.map((p) => ({
            product_id: p.product_id,
            name: p.name,
            price: parseFloat(p.price),
            category_id: p.category_id,
            category_name: cat.name // adiciona o nome da categoria aqui
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
