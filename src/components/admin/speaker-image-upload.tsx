"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { updateSpeakerPhoto } from "@/app/admin/speakers/actions";

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
        .from("speaker_photos")
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
      .from("speaker_photos")
      .getPublicUrl(fileName);

    await updateSpeakerPhoto(
      speakerId,
      publicUrl
    );

    window.location.reload();

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