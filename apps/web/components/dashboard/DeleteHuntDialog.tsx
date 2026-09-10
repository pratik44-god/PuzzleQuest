"use client";

import { Trash2 } from "lucide-react";

import Button from "~/components/ui/buttton";

type DeleteHuntDialogProps = {
  open: boolean;
  huntTitle: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteHuntDialog({
  open,
  huntTitle,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteHuntDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close delete confirmation"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-hunt-title"
        className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0D0D14] p-6 shadow-2xl shadow-black/40"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <Trash2 size={22} />
        </div>

        <h2
          id="delete-hunt-title"
          className="text-xl font-bold text-white"
        >
          Are you sure you want to do this?
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          You are about to delete{" "}
          <span className="font-semibold text-zinc-300">
            {huntTitle}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={onConfirm}
            disabled={isDeleting}
            className="border-red-500/30 bg-red-500/10 text-red-300 hover:border-red-500/50 hover:bg-red-500/20"
          >
            {isDeleting ? "Deleting…" : "Yes, delete hunt"}
          </Button>
        </div>
      </div>
    </div>
  );
}
