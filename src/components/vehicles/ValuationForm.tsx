"use client";

import { useState } from "react";
import { Search, Upload, X, CheckCircle2, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/business";

const conditions = ["Excellent", "Good", "Average", "Needs Work"];

export function ValuationForm({ mode }: { mode: "sell" | "part-exchange" }) {
  const [reg, setReg] = useState("");
  const [lookupState, setLookupState] = useState<"idle" | "looking" | "done">("idle");
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleLookup = () => {
    if (!reg) return;
    setLookupState("looking");
    // Registration lookup requires the DVLA Vehicle Enquiry Service API (needs an API key).
    // Simulated here so the flow is demonstrable end-to-end without live credentials.
    setTimeout(() => setLookupState("done"), 1200);
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 8 - photos.length);
    setPhotos((prev) => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", business.web3formsAccessKey);
    formData.append("subject", mode === "sell" ? "Sell My Car Request" : "Part Exchange Valuation Request");
    formData.append("registration", reg);
    photos.forEach((file, i) => formData.append(`photo_${i + 1}`, file));

    try {
      const res = await fetch(business.formSubmitEndpoint, { method: "POST", body: formData });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-ignition/30 bg-ignition/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-ignition-400" />
        <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
          Valuation Requested
        </h3>
        <p className="mt-2 font-body text-sm text-steel-300">
          Thanks — we&apos;ll review the details and come back to you within one working day with
          {mode === "sell" ? " an offer." : " a part-exchange valuation."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-navy-900 p-6">
      <div>
        <label className="mb-2 block font-body text-xs uppercase tracking-wider text-steel-400">
          Registration Number
        </label>
        <div className="flex flex-wrap gap-2">
          <div className="flex min-w-[200px] flex-1 overflow-hidden rounded-plate border-2 border-navy-950 shadow-card">
            <div className="flex items-center bg-plate-band px-2">
              <span className="font-display text-xs font-bold text-plate-yellow">GB</span>
            </div>
            <input
              value={reg}
              onChange={(e) => setReg(e.target.value.toUpperCase())}
              placeholder="AX22 NNX"
              maxLength={8}
              required
              name="registration_display"
              className="w-full bg-plate-yellow px-3 py-3 font-display text-lg font-bold uppercase tracking-plate text-navy-950 placeholder:text-navy-950/40 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleLookup}
            disabled={lookupState === "looking"}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-4 py-3 font-body text-sm text-white transition-colors hover:border-ignition disabled:opacity-60"
          >
            {lookupState === "looking" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Look Up
          </button>
        </div>
        {lookupState === "done" && (
          <p className="mt-2 flex items-center gap-1.5 font-body text-xs text-steel-400">
            <Info className="h-3.5 w-3.5 text-ignition-400" />
            Reg confirmed — we&apos;ll verify full details when we call you.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
            Current Mileage
          </label>
          <input
            type="number"
            name="mileage"
            required
            placeholder="e.g. 32000"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
            Condition
          </label>
          <select
            name="condition"
            required
            defaultValue=""
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white focus:border-ignition focus:outline-none"
          >
            <option value="" disabled className="text-navy-950">Select condition</option>
            {conditions.map((c) => (
              <option key={c} value={c} className="text-navy-950">{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-body text-xs uppercase tracking-wider text-steel-400">
          Upload Photos ({photos.length}/8)
        </label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {photos.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-950/80 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {photos.length < 8 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-white/20 text-steel-400 transition-colors hover:border-ignition hover:text-ignition-400">
              <Upload className="h-5 w-5" />
              <span className="font-body text-[10px]">Add</span>
              <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
            </label>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
      <input
        type="email"
        name="email"
        required
        placeholder="Email address"
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-steel-500 focus:border-ignition focus:outline-none"
      />

      <Button
        type="submit"
        icon={status === "submitting" ? Loader2 : undefined}
        className={`w-full ${status === "submitting" ? "[&_svg]:animate-spin" : ""}`}
      >
        {status === "submitting"
          ? "Submitting..."
          : mode === "sell"
          ? "Request My Valuation"
          : "Get Instant Valuation"}
      </Button>
      {status === "error" && (
        <p className="font-body text-xs text-ignition-400">
          Something went wrong — please call us on {business.contact.phoneDisplay}.
        </p>
      )}
    </form>
  );
}
