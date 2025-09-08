"use client";

import { useState } from "react";
import { supabase } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");

    // basic validation
    const name = username.trim();
    const phone = whatsappNo.trim();
    if (!name || !phone) {
      setErrorMsg("Please enter both username and WhatsApp number.");
      setLoading(false);
      return;
    }

    try {
      // 1) Use maybeSingle() — it won't throw if no rows found
      const { data: existingUser, error: fetchError } = await supabase
        .from("user4")
        .select("id, username, whatsapp_no")
        .match({ username: name, whatsapp_no: phone })
        .maybeSingle();

      if (fetchError) {
        // Supabase returned an error (could be RLS, network, etc.)
        setErrorMsg(fetchError.message ?? JSON.stringify(fetchError));
        setLoading(false);
        return;
      }

      if (existingUser) {
        // returning user → go to user page
        router.push("/user");
        return;
      }

      // 2) Not found → insert new user
      const { error: insertError } = await supabase.from("user4").insert([
        { username: name, whatsapp_no: phone },
      ]);

      if (insertError) {
        setErrorMsg(insertError.message ?? JSON.stringify(insertError));
        setLoading(false);
        return;
      }

      // success → go to whatsapp page
      router.push("/whatsapp");
    } catch (err: unknown) {
  if (err instanceof Error) {
    setErrorMsg(err.message);
  } else {
    setErrorMsg("Unexpected error occurred.");
  }
} finally {
  setLoading(false);
}

  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <Input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        placeholder="Enter WhatsApp number"
        value={whatsappNo}
        onChange={(e) => setWhatsappNo(e.target.value)}
        required
      />

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Please wait..." : "Continue"}
      </Button>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
}
