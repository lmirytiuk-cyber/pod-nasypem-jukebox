"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mzqthgujaqfdulqgkeqf.supabase.co",
  "TWÓJ_KLUCZ"
);

export default function Admin() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from("songs")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    setSongs(data || []);
  };

  const approve = async (id) => {
    await supabase.from("songs").update({ status: "approved" }).eq("id", id);
    fetchSongs();
  };

  const reject = async (id) => {
    await supabase.from("songs").update({ status: "rejected" }).eq("id", id);
    fetchSongs();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ADMIN – Pod Nasypem</h1>

      {songs.map((s) => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          {s.title}
          <button onClick={() => approve(s.id)}> ✅ </button>
          <button onClick={() => reject(s.id)}> ❌ </button>
        </div>
      ))}
    </div>
  );
}
