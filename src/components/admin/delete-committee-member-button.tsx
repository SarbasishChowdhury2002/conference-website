"use client";

import { useTransition } from "react";
import { deleteCommitteeMember }
from "@/app/admin/committee-members/actions";

export default function DeleteCommitteeMemberButton({
  id,
}: {
  id: string;
}) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        "Delete committee member?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      await deleteCommitteeMember(id);
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