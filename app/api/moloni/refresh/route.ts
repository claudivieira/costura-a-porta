// app/api/moloni/refresh/route.ts
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  const db = getFirestore();
  const tokensRef = db.collection("moloni").doc("auth");
  const tokens = (await tokensRef.get()).data();

  if (!tokens?.refresh_token) {
    return NextResponse.json({ error: "No refresh token stored" }, { status: 400 });
  }

  const res = await fetch("https://api.moloni.pt/v1/grant/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.MOLONI_CLIENT_ID!,
      client_secret: process.env.MOLONI_CLIENT_SECRET!,
      refresh_token: tokens.refresh_token,
    }),
  });

  const data = await res.json();

  if (data.access_token) {
    await tokensRef.set({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      created_at: Date.now(),
      expires_in: data.expires_in,
    });

    return NextResponse.json({ success: true, token: data.access_token });
  }

  return NextResponse.json({ error: "Failed to refresh token", details: data }, { status: 500 });
}
