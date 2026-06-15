"use client";

import { useTransition } from "react";
import { deleteProgrammeItem }
from "@/app/admin/programme/actions";

export default function DeleteProgrammeItemButton({
  id,
}: {
  id: string;
}) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        "Delete programme item?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      await deleteProgrammeItem(id);
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