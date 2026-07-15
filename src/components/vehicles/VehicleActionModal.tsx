"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";

interface VehicleActionModalProps {
  open: boolean;
  onClose: () => void;
  mode: "test-drive" | "reserve";
  vehicleName: string;
}

export function VehicleActionModal({ open, onClose, mode, vehicleName }: VehicleActionModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const title = mode === "test-drive" ? "Book a Test Drive" : "Reserve This Vehicle";
  const cta = mode === "test-drive" ? "Confirm Test Drive Request" : "Confirm Reservation Request";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", business.web3formsAccessKey);
    formData.append("subject", `${title}: ${vehicleName}`);
    formData.append("vehicle", vehicleName);

    try {
      const res = await fetch(business.formSubmitEndpoint, { method: "POST", body: formData });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-[70] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-navy-900 p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase text-white">{title}</h2>
              <button onClick={onClose} aria-label="Close">
                <X className="h-5 w-5 text-steel-400" />
              </button>
            </div>
            <p className="mt-1 font-body text-sm text-steel-400">{vehicleName}</p>

            {status === "success" ? (
              <div className="mt-6 flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-ignition-400" />
                <p className="mt-3 font-body text-sm text-steel-300">
                  Request received — a member of the team will call you shortly to confirm.
                </p>
                <Button onClick={onClose} className="mt-5" size="sm">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
                />
                {mode === "test-drive" && (
                  <input
                    type="date"
                    name="preferred_date"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white focus:border-ignition focus:outline-none"
                  />
                )}
                <Button
                  type="submit"
                  icon={status === "submitting" ? Loader2 : undefined}
                  className={`w-full ${status === "submitting" ? "[&_svg]:animate-spin" : ""}`}
                >
                  {status === "submitting" ? "Sending..." : cta}
                </Button>
                {status === "error" && (
                  <p className="font-body text-xs text-ignition-400">
                    Something went wrong — please call us on {business.contact.phoneDisplay}.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
