import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    // 👉 buscar tokens guardados
    const snap = await db.collection("moloni").doc("tokens").get();
    const stored = snap.data();

    if (!stored?.access_token) {
      return NextResponse.json(
        { error: "No access token available" },
        { status: 401 }
      );
    }

    // 👉 chamar Moloni com o access_token atual
    const res = await fetch("https://api.moloni.pt/v1/products/getAll/?company_id=XXX", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stored.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_id: process.env.MOLONI_COMPANY_ID,
      }),
    });

    if (res.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await res.json();
    return NextResponse.json(products);
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
