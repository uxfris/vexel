"use client";

import { useEffect } from "react";

export default function useBodyLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add("overflow-hidden");
      return () => document.body.classList.remove("overflow-hidden");
    }
    document.body.classList.remove("overflow-hidden");
  }, [isLocked]);
}
