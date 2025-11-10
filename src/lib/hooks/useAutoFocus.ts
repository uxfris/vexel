"use client";

import { RefObject, useEffect } from "react";

export default function <T extends HTMLDivElement | null>(
  ref: RefObject<T>,
  active: boolean = true
) {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => ref.current?.focus(), 100);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [active]);
}
