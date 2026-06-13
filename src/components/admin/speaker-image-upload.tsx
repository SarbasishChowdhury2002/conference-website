"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  speakerId: string;
};

export default function SpeakerImageUpload({
  speakerId,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const supabase =
      getSupabaseBrowserClient();

    const fileExt =
      file.name.split(".").pop();

    const fileName =
      `${speakerId}.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("speakers")
        .upload(fileName, file, {
          upsert: true,
        });

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("speakers")
      .getPublicUrl(fileName);

    console.log(publicUrl);

    setUploading(false);
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p>Uploading...</p>
      )}
    </div>
  );
}