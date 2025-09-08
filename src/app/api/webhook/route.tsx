import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("📩 Incoming Webhook:", JSON.stringify(body, null, 2));

  // Check if user sent "verify"
  const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (message?.text?.body?.toLowerCase() === "verify") {
    // TODO: send "welcome" back
    await fetch(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: message.from, // user’s number
          type: "text",
          text: { body: "Welcome 🎉" },
        }),
      }
    );
  }

  return NextResponse.json({ status: "ok" });
}
