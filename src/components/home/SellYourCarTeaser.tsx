"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgePoundSterling, Zap, ClipboardCheck, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: BadgePoundSterling,
    title: "Free Vehicle Valuation",
    description: "Receive a fair and competitive valuation based on current market prices.",
  },
  {
    icon: Zap,
    title: "Instant Offer",
    description: "Get a fast no-obligation offer from our experienced team.",
  },
  {
    icon: ClipboardCheck,
    title: "Quick Inspection",
    description: "Simple and transparent vehicle inspection process.",
  },
  {
    icon: Wallet,
    title: "Fast Payment",
    description: "Secure payment with a smooth and stress-free transaction.",
  },
];

export function SellYourCarTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-radial py-24">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-ignition/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sell With Annax"
          title="Sell Your Car"
          description="Get the best market value for your vehicle with a quick, transparent, and hassle-free valuation from Annax Auto Traders."
          align="center"
          light
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-14 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 shadow-card sm:aspect-[21/9]"
        >
          <Image
            src="/sell-your-car/vehicle-showcase.jpg"
            alt="Premium SUV outside a modern dealership at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl border border-white/10 bg-navy-900 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ignition/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ignition-gradient text-navy-950 shadow-glow transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold uppercase text-white">
                {feature.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-steel-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/sell-your-car" size="lg" showArrow>
            Get Free Valuation
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
