import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const snap = await db.collection("moloni").doc("tokens").get();
    const stored = snap.data();

    if (!stored?.refresh_token) {
      return NextResponse.json({ error: "No refresh token stored" }, { status: 400 });
    }

    const res = await fetch("https://api.moloni.pt/v1/grant/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.MOLONI_CLIENT_ID!,
        client_secret: process.env.MOLONI_CLIENT_SECRET!,
        refresh_token: stored.refresh_token,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Failed to refresh token", details: text }, { status: 400 });
    }

    const tokens = await res.json();

    await db.collection("moloni").doc("tokens").set({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? stored.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
    });

    return NextResponse.json(tokens);
  } catch (err: unknown) {
    let details = "Unknown error";

    if (err instanceof Error) {
      details = err.message;
    } else if (typeof err === "string") {
      details = err;
    } else if (typeof err === "object") {
      details = JSON.stringify(err);
    }

    return NextResponse.json(
      { error: "Unexpected error", details },
      { status: 500 }
    );
  }
}
