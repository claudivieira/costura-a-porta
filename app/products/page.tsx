'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function ProductsPage() {
const router = useRouter();


useEffect(() => {
const token = localStorage.getItem('moloni_access_token');


if (!token) {
const redirectUri = encodeURIComponent('https://f355e064a9c2.ngrok-free.app/api/moloni/auth');
const clientId = '263814238';


window.location.href = `https://api.moloni.pt/v1/authorize/?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
} else {
router.push('/products/real');
}
}, []);


return <p>A redirecionar…</p>;
}