"use client";

import { useEffect } from "react";

export default function useEscapeModal(
  open: boolean = true,
  close: () => void
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);
}
