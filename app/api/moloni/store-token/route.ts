import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code in callback" }, { status: 400 });
  }

  // Trocar o code por tokens
  const res = await fetch("https://api.moloni.pt/v1/grant/", {
    method: "GET",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.MOLONI_CLIENT_ID!,
      client_secret: process.env.MOLONI_CLIENT_SECRET!,
      redirect_uri: process.env.MOLONI_REDIRECT_URI!,
      code,
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    return NextResponse.json({ error: "Failed to exchange code", details: data }, { status: 400 });
  }

  await db.collection("moloni").doc("auth").set({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    created_at: Date.now(),
    expires_in: data.expires_in,
  });

  return NextResponse.redirect(new URL("/products/real", req.url));
}
