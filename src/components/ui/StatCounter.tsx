"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export function StatCounter({ value, suffix = "", label, decimals = 0 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <span ref={ref} className="font-display text-4xl font-bold text-white sm:text-5xl">
        {display.toFixed(decimals)}
        <span className="text-ignition">{suffix}</span>
      </span>
      <span className="mt-2 font-body text-sm uppercase tracking-wider text-steel-400">
        {label}
      </span>
    </motion.div>
  );
}
