"use client";

import { useTransition } from "react";
import { deleteSpeaker } from "@/app/admin/speakers/actions";

type Props = {
  id: string;
};

export default function DeleteSpeakerButton({
  id,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this speaker?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteSpeaker(id);

      window.location.reload();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-red-600"
    >
      {pending
        ? "Deleting..."
        : "Delete"}
    </button>
  );
}