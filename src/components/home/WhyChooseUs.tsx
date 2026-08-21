"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgePoundSterling, Wrench, Clock, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "150-Point Inspection",
    description: "Every vehicle passes a rigorous multi-point check before it reaches the forecourt.",
  },
  {
    icon: BadgePoundSterling,
    title: "Transparent Pricing",
    description: "The price you see is the price you pay — no hidden admin fees, ever.",
  },
  {
    icon: Wrench,
    title: "Full Service History",
    description: "We only stock cars with verifiable service records and provenance.",
  },
  {
    icon: Handshake,
    title: "No-Pressure Approach",
    description: "Take your time, ask questions, and test drive without a hard sell.",
  },
  {
    icon: Clock,
    title: "Fast Finance Decisions",
    description: "Same-day finance approval from our panel of FCA-regulated lenders.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Annax"
          title="Why Choose Annax Auto Traders"
          description="We built our reputation on honesty — here's what that looks like in practice."
          align="center"
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-navy-900 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ignition/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ignition-gradient text-navy-950 shadow-glow transition-transform duration-300 group-hover:scale-110">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-white">
                {reason.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-steel-400">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
