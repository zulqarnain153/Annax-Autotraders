"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  subject?: string;
  compact?: boolean;
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ subject = "New Website Enquiry", compact = false, className }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", business.web3formsAccessKey);
    formData.append("subject", subject);
    formData.append("from_name", business.name);

    try {
      const res = await fetch(business.formSubmitEndpoint, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-ignition/30 bg-ignition/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-ignition-400" />
        <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
          Message Sent
        </h3>
        <p className="mt-2 font-body text-sm text-steel-300">
          Thanks for reaching out — we&apos;ll be in touch within one working day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-body text-sm text-ignition-400 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`grid grid-cols-1 gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
            Full Name
          </label>
          <input
            name="name"
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="07123 456789"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="Tell us what you're looking for..."
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
        />
      </div>
      <Button
        type="submit"
        icon={status === "submitting" ? Loader2 : Send}
        className={`mt-5 w-full ${status === "submitting" ? "[&_svg]:animate-spin" : ""}`}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="mt-3 font-body text-sm text-ignition-400">
          Something went wrong sending your message — please call us instead on{" "}
          {business.contact.phoneDisplay}.
        </p>
      )}
    </form>
  );
}
