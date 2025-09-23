import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/moloni";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Missing code in callback" }, { status: 400 });

  try {
    await exchangeCodeForTokens(code);
    return NextResponse.redirect(new URL("/products/real", req.url));
  } catch (e) {
  let message = "Unknown error";
  if (e instanceof Error) {
    message = e.message;
  }
  return NextResponse.json(
    { error: "Failed to exchange code", details: message },
    { status: 400 }
  );
}
}
