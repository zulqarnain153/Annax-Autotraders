"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck, Gauge, Fuel, Cog, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { soldVehicles, SoldVehicle } from "@/lib/sold";
import { cn } from "@/lib/utils";

function SoldCard({ vehicle, index }: { vehicle: SoldVehicle; index: number }) {
  const [slide, setSlide] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setSlide((s) => (s + 1) % vehicle.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setSlide((s) => (s - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.images[slide]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index === 0}
        />

        <span className="absolute left-3 top-3 rounded-full bg-navy-950/90 px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          Sold
        </span>

        {vehicle.images.length > 1 && (
          <>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {vehicle.images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === slide ? "w-4 bg-ignition" : "w-1.5 bg-white/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="font-body text-sm text-steel-400">{vehicle.variant}</p>

        <div className="mt-4 grid grid-cols-2 gap-y-2 font-body text-xs text-steel-400">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-ignition-400" />
            {new Intl.NumberFormat("en-GB").format(vehicle.mileage)} miles
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-ignition-400" /> {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1.5">
            <Cog className="h-3.5 w-3.5 text-ignition-400" /> {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ignition-400" /> {vehicle.location}
          </span>
        </div>

        <p className="mt-4 font-body text-sm leading-relaxed text-steel-300">
          {vehicle.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {vehicle.highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 font-body text-[11px] text-steel-300"
            >
              <BadgeCheck className="h-3 w-3 text-ignition-400" />
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function RecentlySold() {
  if (soldVehicles.length === 0) return null;

  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sold Stock"
          title="Recently Sold"
          description="A few of the cars we've recently found happy new homes for — real cars, real customers."
          light
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {soldVehicles.map((vehicle, i) => (
            <SoldCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
