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


useEffect(() => {
const fetchData = async () => {
try {
const res = await fetch('/api/moloni/products');
const products: Product[] = await res.json();


const grouped: GroupedCategory[] = [];


products.forEach((product) => {
if (product.category_name === 'Bolsas') return;


const existing = grouped.find(g => g.category_id === product.category_id);


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


{categories.map((group) => (
    <div key={group.category_id} className="mb-4 border rounded-md shadow-sm">
        <button onClick={() => toggleCategory(group.category_id)} className="w-full p-4 bg-gray-100 hover:bg-gray-200">
            <span>{group.category_name}</span>
            <span>{expanded[group.category_id] ? '−' : '+'}</span>
        </button>
        {expanded[group.category_id] && (
            <ul className="divide-y">
                {group.products.map((product) => (
                    <li key={product.product_id} className="p-4 flex justify-between">
                        <span>{product.name}</span>
                        <span>{product.price.toFixed(2)}€</span>
                    </li>
                ))}
            </ul>
        )}
        </div>
        ))}
    </div>
    );
}