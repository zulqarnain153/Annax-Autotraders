"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LatestArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const latest = [...vehicles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };

  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Just In"
            title="Latest Arrivals"
            description="Fresh to the forecourt this month — get in early on our newest stock."
            light
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-ignition hover:text-ignition-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-ignition hover:text-ignition-400"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide mt-12 flex snap-x gap-6 overflow-x-auto pb-4"
        >
          {latest.map((vehicle, i) => (
            <div key={vehicle.id} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
              <VehicleCard vehicle={vehicle} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
