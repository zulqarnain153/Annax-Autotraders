"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Vehicle } from "@/lib/types";
import { VehicleSilhouette } from "@/components/ui/VehicleSilhouette";
import { useCompare } from "@/hooks/useCompare";
import { formatPrice, formatMileage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const rows: { label: string; get: (v: Vehicle) => string | number }[] = [
  { label: "Price", get: (v) => formatPrice(v.price) },
  { label: "Monthly Finance", get: (v) => `${formatPrice(v.monthlyFinance)}/mo` },
  { label: "Year", get: (v) => v.year },
  { label: "Mileage", get: (v) => formatMileage(v.mileage) },
  { label: "Fuel Type", get: (v) => v.fuelType },
  { label: "Transmission", get: (v) => v.transmission },
  { label: "Body Type", get: (v) => v.bodyType },
  { label: "Engine", get: (v) => v.engineSize },
  { label: "Colour", get: (v) => v.colour },
  { label: "Owners", get: (v) => v.owners },
];

export function CompareBar({ allVehicles }: { allVehicles: Vehicle[] }) {
  const { ids, toggle, mounted } = useCompare();
  const selected = mounted ? allVehicles.filter((v) => ids.includes(v.id)) : [];

  if (!mounted || selected.length === 0) {
    return (
      <div className="my-8 rounded-2xl border border-white/10 bg-navy-900 p-8 text-center">
        <p className="font-body text-sm text-steel-400">
          No vehicles selected for comparison yet. Tap the compare icon on any vehicle card to add it here.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-navy-900">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 p-4 text-left" />
            {selected.map((v) => (
              <th key={v.id} className="p-4 text-left align-top">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <VehicleSilhouette bodyType={v.bodyType} seed={v.silhouetteSeed} angle="hero" />
                  <button
                    onClick={() => toggle(v.id)}
                    aria-label="Remove from comparison"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-950/70 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 font-display text-sm font-bold uppercase text-white">
                  {v.make} {v.model}
                </p>
                <Link href={`/vehicle/${v.slug}`}>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    View
                  </Button>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
              <td className="p-4 font-body text-xs uppercase tracking-wider text-steel-400">
                {row.label}
              </td>
              {selected.map((v) => (
                <td key={v.id} className="p-4 font-body text-sm text-white">
                  {row.get(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
