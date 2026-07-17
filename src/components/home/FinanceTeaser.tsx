"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/business";
import { formatPrice } from "@/lib/utils";

export function FinanceTeaser() {
  const [price, setPrice] = useState(20000);
  const [deposit, setDeposit] = useState(2000);
  const [term, setTerm] = useState(48);

  const monthly = useMemo(() => {
    const principal = Math.max(price - deposit, 0);
    const monthlyRate = business.finance.apr / 100 / 12;
    if (monthlyRate === 0) return principal / term;
    const payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return payment;
  }, [price, deposit, term]);

  return (
    <section className="relative overflow-hidden bg-navy-radial py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-ignition/15 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Finance Made Simple"
              title="Estimate Your Monthly Payments"
              description="Get an instant, no-obligation estimate. We work with a panel of FCA-regulated lenders to find a plan that fits — often with same-day approval."
              light
            />
            <ul className="mt-6 space-y-3">
              {["Representative APR from 9.9%", "Terms from 12 to 60 months", "Decisions in minutes, not days"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-sm text-steel-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <Button href="/finance" className="mt-8" showArrow>
              Full Finance Calculator
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 shadow-card"
          >
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6 text-ignition-400" />
              <h3 className="font-display text-lg font-bold uppercase text-white">
                Quick Estimate
              </h3>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
                  <span>Vehicle Price</span>
                  <span className="font-semibold text-white">{formatPrice(price)}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={35000}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-ignition"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
                  <span>Deposit</span>
                  <span className="font-semibold text-white">{formatPrice(deposit)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={250}
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full accent-ignition"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between font-body text-sm text-steel-300">
                  <span>Term</span>
                  <span className="font-semibold text-white">{term} months</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={60}
                  step={6}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full accent-ignition"
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-ignition-gradient p-6 text-center">
              <p className="font-body text-xs uppercase tracking-wider text-navy-950/70">
                Estimated Monthly Payment
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-navy-950">
                {formatPrice(Math.round(monthly))}
                <span className="text-lg font-normal">/mo</span>
              </p>
            </div>
            <p className="mt-4 font-body text-xs text-steel-500">{business.finance.disclaimer}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
