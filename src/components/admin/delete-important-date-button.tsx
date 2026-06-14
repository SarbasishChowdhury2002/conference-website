"use client";

import { useTransition } from "react";
import { deleteImportantDate }
from "@/app/admin/important-dates/actions";

export default function DeleteImportantDateButton({
  id,
}: {
  id: string;
}) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        "Delete this date?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      await deleteImportantDate(id);
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