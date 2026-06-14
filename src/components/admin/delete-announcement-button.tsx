"use client";

import { useTransition } from "react";
import { deleteAnnouncement }
from "@/app/admin/announcements/actions";

export default function DeleteAnnouncementButton({
  id,
}: {
  id: string;
}) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        "Delete announcement?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      await deleteAnnouncement(id);
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