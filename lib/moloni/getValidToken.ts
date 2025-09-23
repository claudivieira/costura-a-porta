import { db } from "../firebaseAdmin";

async function getValidToken() {
  const tokensRef = db.collection("moloni").doc("auth");
  const tokensSnap = await tokensRef.get();
  const tokens = tokensSnap.data();

  if (!tokens) throw new Error("No Moloni tokens saved");

  const { access_token, refresh_token, created_at, expires_in } = tokens;

  const isExpired = Date.now() > created_at + expires_in * 1000;

  if (!isExpired) {
    return access_token; // ✅ ainda válido
  }

  // 🚨 expirou → pedir novo
  const res = await fetch("https://api.moloni.pt/v1/grant/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.MOLONI_CLIENT_ID!,
      client_secret: process.env.MOLONI_CLIENT_SECRET!,
      refresh_token,
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Failed to refresh Moloni token: " + JSON.stringify(data));
  }

  // 🔄 atualizar no Firebase
  await tokensRef.set({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    created_at: Date.now(),
    expires_in: data.expires_in,
  });

  return data.access_token;
}

export default getValidToken;
