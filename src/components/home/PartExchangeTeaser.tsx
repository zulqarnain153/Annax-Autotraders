"use client";

import { motion } from "framer-motion";
import { RefreshCw, Camera, FileCheck, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const steps = [
  { icon: FileCheck, title: "Enter Reg & Mileage", description: "Tell us the basics — takes 30 seconds." },
  { icon: Camera, title: "Upload Photos", description: "A few quick photos of the exterior & interior." },
  { icon: Wallet, title: "Get Your Valuation", description: "A fair, honest offer within one working day." },
];

export function PartExchangeTeaser() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 grid grid-cols-1 gap-4 lg:order-1"
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="glass flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ignition-gradient font-display text-sm font-bold text-navy-950">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold uppercase text-white">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-steel-400">{step.description}</p>
                </div>
                <step.icon className="ml-auto h-6 w-6 shrink-0 text-ignition-400" />
              </div>
            ))}
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Part Exchange"
              title="Swap Your Old Car The Easy Way"
              description="Put your current car towards your next one. Our valuations are fair, fast, and there's zero obligation to accept."
              light
            />
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ignition/30 bg-ignition/10 p-4">
              <RefreshCw className="h-5 w-5 shrink-0 text-ignition-400" />
              <p className="font-body text-sm text-steel-300">
                Most valuations are ready within 24 hours — often the same day.
              </p>
            </div>
            <Button href="/part-exchange" className="mt-8" showArrow>
              Value My Car
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
