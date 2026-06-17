"use client";

import { useTransition } from "react";
import { deleteTrack } from "@/app/admin/tracks/actions";

type Props = {
  id: string;
};

export default function DeleteTrackButton({
  id,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this track?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteTrack(id);

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