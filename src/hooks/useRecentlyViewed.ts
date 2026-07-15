"use client";

import { useEffect, useState } from "react";

const KEY = "aat-recently-viewed";
const MAX_ITEMS = 6;

export function useRecentlyViewed(currentSlug?: string) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    let stored: string[] = [];
    try {
      stored = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    } catch {
      stored = [];
    }

    if (currentSlug) {
      const next = [currentSlug, ...stored.filter((s) => s !== currentSlug)].slice(
        0,
        MAX_ITEMS
      );
      localStorage.setItem(KEY, JSON.stringify(next));
      setSlugs(next.filter((s) => s !== currentSlug));
    } else {
      setSlugs(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug]);

  return slugs;
}
