"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

import { updateCommitteeMemberPhoto }
from "@/app/admin/committee-members/actions";

type Props = {
  memberId: string;
};

export default function CommitteeMemberImageUpload({
  memberId,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const supabase =
      getSupabaseBrowserClient();

    const ext =
      file.name.split(".").pop();

    const fileName =
      `${memberId}.${ext}`;

    const { error } =
      await supabase.storage
        .from("committee-members")
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
      .from("committee-members")
      .getPublicUrl(fileName);

    await updateCommitteeMemberPhoto(
      memberId,
      publicUrl
    );

    window.location.reload();
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