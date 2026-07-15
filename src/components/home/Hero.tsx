"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { vehicles } from "@/lib/vehicles";

const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
const budgets = [
  { label: "Any Budget", value: "" },
  { label: "Under £15,000", value: "0-15000" },
  { label: "£15,000 – £22,000", value: "15000-22000" },
  { label: "£22,000 – £28,000", value: "22000-28000" },
  { label: "£28,000+", value: "28000-999999" },
];

export function Hero() {
  const router = useRouter();
  const [reg, setReg] = useState("");
  const [make, setMake] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (budget) params.set("budget", budget);
    router.push(`/stock${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-radial pt-20">
      {/* Ambient floodlight glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-ignition/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-plate-band/30 blur-[120px]" />

      {/* Blueprint grid */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B93A6" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-widest text-steel-300">
              Staines-upon-Thames · Est. 2016
            </span>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Quality Cars,
              <br />
              <span className="text-ignition-400">Driven By Trust</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-steel-300">
              Every car on our forecourt is hand-picked, fully checked, and sold with honest
              advice — no pressure, no nonsense. Just straightforward car buying done properly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/stock" size="lg" showArrow>
                View Our Stock
              </Button>
              <Button href="/sell-your-car" variant="outline" size="lg">
                Sell Your Car
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="glass rounded-3xl p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Find Your Next Car
            </h2>

            {/* Registration lookup styled like a real UK plate */}
            <div className="mt-5">
              <label className="mb-2 block font-body text-xs uppercase tracking-wider text-steel-400">
                Search by registration
              </label>
              <div className="flex overflow-hidden rounded-plate border-2 border-navy-950 shadow-card">
                <div className="flex items-center bg-plate-band px-2">
                  <span className="font-display text-xs font-bold text-plate-yellow">GB</span>
                </div>
                <input
                  value={reg}
                  onChange={(e) => setReg(e.target.value.toUpperCase())}
                  placeholder="AX22 NNX"
                  maxLength={8}
                  className="w-full bg-plate-yellow px-3 py-3 font-display text-lg font-bold uppercase tracking-plate text-navy-950 placeholder:text-navy-950/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-body text-xs uppercase tracking-wider text-steel-500">or browse</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative">
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white focus:border-ignition focus:outline-none"
                >
                  <option value="" className="text-navy-950">Any Make</option>
                  {makes.map((m) => (
                    <option key={m} value={m} className="text-navy-950">
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
              </div>
              <div className="relative">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white focus:border-ignition focus:outline-none"
                >
                  {budgets.map((b) => (
                    <option key={b.value} value={b.value} className="text-navy-950">
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
              </div>
              <Button type="submit" icon={Search} className="sm:col-span-2">
                Search {vehicles.length} Vehicles
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
