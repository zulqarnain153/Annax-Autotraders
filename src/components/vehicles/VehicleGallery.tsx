"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Vehicle } from "@/lib/types";
import { VehicleSilhouette } from "@/components/ui/VehicleSilhouette";
import { cn } from "@/lib/utils";

const angles: Array<{ key: "hero" | "front" | "side" | "rear" | "interior"; label: string }> = [
  { key: "hero", label: "Front 3/4" },
  { key: "front", label: "Front" },
  { key: "side", label: "Side" },
  { key: "rear", label: "Rear" },
  { key: "interior", label: "Interior" },
];

export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState<(typeof angles)[number]["key"] | "360">("hero");

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
        {active === "360" ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-navy-radial text-center">
            <RotateCw className="h-10 w-10 animate-spin text-ignition-400" style={{ animationDuration: "3s" }} />
            <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-white">
              360° Tour Coming Soon
            </p>
            <p className="mt-1 font-body text-xs text-steel-400">
              Drag-to-rotate imagery will appear here once photographed
            </p>
          </div>
        ) : (
          <VehicleSilhouette
            bodyType={vehicle.bodyType}
            seed={vehicle.silhouetteSeed}
            angle={active}
          />
        )}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {angles.map((a) => (
          <button
            key={a.key}
            onClick={() => setActive(a.key)}
            className={cn(
              "relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
              active === a.key ? "border-ignition" : "border-white/10 opacity-60 hover:opacity-100"
            )}
          >
            <VehicleSilhouette bodyType={vehicle.bodyType} seed={vehicle.silhouetteSeed} angle={a.key} />
          </button>
        ))}
        <button
          onClick={() => setActive("360")}
          className={cn(
            "flex aspect-[4/3] w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 bg-navy-900 transition-colors",
            active === "360" ? "border-ignition" : "border-white/10 opacity-60 hover:opacity-100"
          )}
        >
          <RotateCw className="h-4 w-4 text-ignition-400" />
          <span className="font-body text-[9px] uppercase text-steel-400">360°</span>
        </button>
      </div>
    </div>
  );
}
