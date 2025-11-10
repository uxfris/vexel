"use client";

import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLDivElement | null>(
  ref: RefObject<T>,
  onClickOutside: () => void,
  active: boolean = true
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside, active]);
}
