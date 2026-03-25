"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mzqthgujaqfdulqgkeqf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cXRoZ3VqYXFmZHVscWdrZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDM4NTEsImV4cCI6MjA5MDAxOTg1MX0.F2PJItLxriayeUWB5fa00J7413JqLllnccfzZ_8_ihY"
);

export default function Screen() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();

    const channel = supabase
      .channel("songs-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "songs" },
        fetchSongs
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from("songs")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    setSongs(data || []);
  };

  return (
    <div style={{
      background: "black",
      color: "gold",
      minHeight: "100vh",
      padding: 40
    }}>
      <h1 style={{ fontSize: 50 }}>POD NASYPEM</h1>

      <h2>🎵 KOLEJKA</h2>

      {songs.map((s, i) => (
        <div key={s.id} style={{ fontSize: 24 }}>
          {i + 1}. {s.title}
        </div>
      ))}

      <div style={{ marginTop: 50 }}>
        📱 Zeskanuj QR i dodaj swoją piosenkę
      </div>
    </div>
  );
}
