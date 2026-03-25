"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mzqthgujaqfdulqgkeqf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cXRoZ3VqYXFmZHVscWdrZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDM4NTEsImV4cCI6MjA5MDAxOTg1MX0.F2PJItLxriayeUWB5fa00J7413JqLllnccfzZ_8_ihY"
);

export default function Home() {
  const [url, setUrl] = useState("");

  const addSong = async () => {
    if (!url) return;

    await supabase.from("songs").insert({
      url,
      title: url,
      status: "pending"
    });

    setUrl("");
    alert("Dodano!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pod Nasypem 🎵</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Wklej link YouTube"
      />
      <button onClick={addSong}>Dodaj</button>
    </div>
  );
}
