import { db } from "@/lib/firebaseAdmin";

const GRANT_URL = "https://api.moloni.pt/v1/grant/";

export async function exchangeCodeForTokens(code: string) {
  const url = new URL(GRANT_URL);
  url.searchParams.set("grant_type", "authorization_code");
  url.searchParams.set("client_id", process.env.MOLONI_CLIENT_ID!);
  url.searchParams.set("client_secret", process.env.MOLONI_CLIENT_SECRET!);
  url.searchParams.set("redirect_uri", process.env.MOLONI_REDIRECT_URI!);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString(), { method: "GET" });
  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Moloni exchange failed: " + JSON.stringify(data));
  }

  await saveTokens(data.access_token, data.refresh_token, data.expires_in);
  return data;
}

export async function refreshTokens(refresh_token: string) {
  const url = new URL(GRANT_URL);
  url.searchParams.set("grant_type", "refresh_token");
  url.searchParams.set("client_id", process.env.MOLONI_CLIENT_ID!);
  url.searchParams.set("client_secret", process.env.MOLONI_CLIENT_SECRET!);
  url.searchParams.set("refresh_token", refresh_token);

  const res = await fetch(url.toString(), { method: "GET" });
  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Moloni refresh failed: " + JSON.stringify(data));
  }

  await saveTokens(data.access_token, data.refresh_token, data.expires_in);
  return data;
}

async function saveTokens(access_token: string, refresh_token: string, expires_in: number) {
  await db.collection("moloni").doc("auth").set({
    access_token,
    refresh_token,
    expires_in,
    created_at: Date.now(),
  });
}

export async function getValidMoloniToken() {
  const snap = await db.collection("moloni").doc("auth").get();
  const t = snap.data();
  if (!t) throw new Error("No Moloni tokens saved");

  const expired = Date.now() > t.created_at + t.expires_in * 1000;
  if (!expired) return t.access_token;

  const refreshed = await refreshTokens(t.refresh_token);
  return refreshed.access_token;
}
