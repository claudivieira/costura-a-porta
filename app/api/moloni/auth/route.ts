import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const code = searchParams.get('code');


if (!code) {
return NextResponse.redirect(new URL('/', req.url));
}


const tokenRes = await fetch('https://api.moloni.pt/v1/grant/', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  grant_type: 'authorization_code',
  code,
  client_id: process.env.MOLONI_CLIENT_ID,
  client_secret: process.env.MOLONI_CLIENT_SECRET,
  redirect_uri: 'https://costuraaporta.pt/api/moloni/store-token',
  }),
});


const data = await tokenRes.json();


if (!data.access_token) {
  return NextResponse.redirect(new URL('/erro', req.url));
}


  const redirectTo = new URL('/products/real', req.url);
  redirectTo.searchParams.set('access_token', data.access_token);
  redirectTo.searchParams.set('refresh_token', data.refresh_token);
  return NextResponse.redirect(redirectTo);
}