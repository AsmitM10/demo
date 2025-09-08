"use client";
import { useState } from "react";
import { supabase } from "@/lib/utils";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export default function Register() {
  const [username, setUsername] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // check if user already exists
      const { data: existing } = await supabase
        .from("user4")
        .select("*")
        .eq("username", username)
        .eq("whatsapp_no", whatsapp)
        .single();

      if (existing) {
        // if user already exists → go to user page
        setMessage("Welcome back! Redirecting to your page...");
        window.location.href = "/user"; 
        return;
      }

      // insert new user
      const { error } = await supabase.from("user4").insert([
        {
          username,
          whatsapp_no: whatsapp,
        },
      ]);

      if (error) throw error;

      // send WhatsApp message "verify"
      await sendWhatsAppMessage(process.env.ADMIN_WHATSAPP!, "verify");

      setMessage("✅ Registered! Check WhatsApp for verify message.");
      setUsername("");
      setWhatsapp("");

      // redirect to WhatsApp directly (optional)
      window.location.href = `https://wa.me/${process.env.ADMIN_WHATSAPP}?text=verify`;

    }  catch (err: unknown) {
  console.error("Error:", err);
  if (err instanceof Error) {
    setMessage("❌ " + err.message);
  } else {
    setMessage("❌ Something went wrong");
  }
} finally {
  setLoading(false);
}


  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <input
        type="text"
        placeholder="Enter name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="tel"
        placeholder="Enter WhatsApp number"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
