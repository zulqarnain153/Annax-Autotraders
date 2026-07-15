"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const KEY = "aat-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const respond = (value: "accepted" | "rejected") => {
    localStorage.setItem(KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-navy-900/95 p-5 shadow-card backdrop-blur-lg sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
              <p className="font-body text-sm text-steel-300">
                We use cookies to improve your browsing experience and understand how you use
                our site. Read our{" "}
                <Link href="/faq" className="text-ignition-400 underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={() => respond("rejected")}>
                Reject
              </Button>
              <Button variant="primary" size="sm" onClick={() => respond("accepted")}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
