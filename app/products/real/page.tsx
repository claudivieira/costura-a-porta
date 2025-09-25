'use client';

import { useEffect, useState } from 'react';

interface Product {
  product_id: number;
  name: string;
  price: number;
  category_id: number;
  category_name: string;
}

interface GroupedCategory {
  category_id: number;
  category_name: string;
  products: Product[];
}

export default function RealProductsPage() {
  const [categories, setCategories] = useState<GroupedCategory[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  // 👉 wrapper para lidar com refresh token
  async function fetchWithRefresh(url: string) {
    let res = await fetch(url);

    if (res.status === 401) {
        const refreshRes = await fetch("/api/moloni/refresh-token");
        const tokens = await refreshRes.json();

        if (tokens.access_token) {
        res = await fetch(url, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        }
    }

    return res.json();
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await fetchWithRefresh('/api/moloni/products');

        const grouped: GroupedCategory[] = [];

        products.forEach((product) => {
          if (product.category_name === 'Bolsas') return;

          const existing = grouped.find((g) => g.category_id === product.category_id);

          if (existing) {
            existing.products.push(product);
          } else {
            grouped.push({
              category_id: product.category_id,
              category_name: product.category_name || 'Sem nome',
              products: [product],
            });
          }
        });

        grouped.sort((a, b) => a.category_name.localeCompare(b.category_name));
        setCategories(grouped);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId: number) => {
    setExpanded((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  if (isLoading) return <p className="text-center">A carregar arranjos...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Arranjos</h1>

      {categories.length > 0 ? (
        categories.map((group) => (
          <div key={group.category_id} className="mb-4 border rounded-md shadow-sm">
            <button
              onClick={() => toggleCategory(group.category_id)}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-t-md"
            >
              <span className="font-semibold text-left">{group.category_name}</span>
              <span className="text-xl">{expanded[group.category_id] ? '−' : '+'}</span>
            </button>

            {expanded[group.category_id] && (
              <ul className="divide-y divide-gray-200">
                {group.products.map((product) => (
                  <li
                    key={`${group.category_id}-${product.product_id}`}
                    className="p-4 flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span>{product.price.toFixed(2)}€</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum arranjo encontrado.</p>
      )}
    </div>
  );
}
