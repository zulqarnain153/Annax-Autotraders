"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "aat-wishlist";

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      setIds(stored ? JSON.parse(stored) : []);
    } catch {
      setIds([]);
    }
    setMounted(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);
    },
    [ids, persist]
  );

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isSaved, mounted };
}
