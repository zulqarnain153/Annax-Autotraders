"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "aat-compare";
const MAX_COMPARE = 3;

export function useCompare() {
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
      if (ids.includes(id)) {
        persist(ids.filter((i) => i !== id));
      } else if (ids.length < MAX_COMPARE) {
        persist([...ids, id]);
      }
    },
    [ids, persist]
  );

  const isComparing = useCallback((id: string) => ids.includes(id), [ids]);
  const isFull = ids.length >= MAX_COMPARE;

  return { ids, toggle, isComparing, isFull, mounted, max: MAX_COMPARE };
}
