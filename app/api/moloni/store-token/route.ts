import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const access = searchParams.get("access_token");
  const refresh = searchParams.get("refresh_token");

  if (!access || !refresh) {
    return NextResponse.json(
      { error: "Missing tokens in callback" },
      { status: 400 }
    );
  }

  // Grava tokens no Firebase
  await db.collection("moloni").doc("auth").set({
    access_token: access,
    refresh_token: refresh,
    created_at: Date.now(),
    expires_in: 7200, // ou vem no payload da Moloni
  });

  // Redireciona para a página real
  return NextResponse.redirect(new URL("/products/real", req.url));
}
