"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  GitCompare,
  Gauge,
  Fuel,
  Cog,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Vehicle } from "@/lib/types";
import { VehicleSilhouette } from "@/components/ui/VehicleSilhouette";
import { PlateBadge } from "@/components/ui/PlateBadge";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { formatPrice, formatMileage, cn } from "@/lib/utils";

const angles: Array<"hero" | "front" | "side" | "rear"> = ["hero", "front", "side", "rear"];

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const [slide, setSlide] = useState(0);
  const { isSaved, toggle: toggleWishlist, mounted: wMounted } = useWishlist();
  const { isComparing, toggle: toggleCompare, isFull, mounted: cMounted } = useCompare();
  const hasRealPhotos = !!vehicle.images && vehicle.images.length > 0;
  const slideCount = hasRealPhotos ? vehicle.images!.length : angles.length;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setSlide((s) => (s + 1) % slideCount);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setSlide((s) => (s - 1 + slideCount) % slideCount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ignition/40 hover:shadow-glow"
    >
      <Link href={`/vehicle/${vehicle.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
          {hasRealPhotos ? (
            <Image
              src={vehicle.images![slide]}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover"
            />
          ) : (
            <VehicleSilhouette bodyType={vehicle.bodyType} seed={vehicle.silhouetteSeed} angle={angles[slide]} />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {vehicle.status !== "In Stock" && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide",
              vehicle.status === "Just Arrived" && "bg-ignition-gradient text-navy-950",
              vehicle.status === "Reserved" && "bg-plate-gradient text-navy-950",
              vehicle.status === "Sold" && "bg-steel-500 text-white"
            )}
          >
            {vehicle.status}
          </span>
        )}

        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: slideCount }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === slide ? "w-4 bg-ignition" : "w-1.5 bg-white/40"
              )}
            />
          ))}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-lg font-bold uppercase leading-tight text-white">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="truncate font-body text-sm text-steel-400">{vehicle.variant}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button
              onClick={() => toggleWishlist(vehicle.id)}
              aria-label="Save to wishlist"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors",
                wMounted && isSaved(vehicle.id)
                  ? "bg-ignition text-white"
                  : "text-steel-400 hover:text-ignition-400"
              )}
            >
              <Heart className="h-4 w-4" fill={wMounted && isSaved(vehicle.id) ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => toggleCompare(vehicle.id)}
              disabled={cMounted && isFull && !isComparing(vehicle.id)}
              aria-label="Add to compare"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors disabled:opacity-30",
                cMounted && isComparing(vehicle.id)
                  ? "bg-plate-yellow text-navy-950"
                  : "text-steel-400 hover:text-ignition-400"
              )}
            >
              <GitCompare className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 font-body text-xs text-steel-400">
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-ignition-400" /> {vehicle.year}
          </span>
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            <Gauge className="h-3.5 w-3.5 shrink-0 text-ignition-400" /> {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            <Fuel className="h-3.5 w-3.5 shrink-0 text-ignition-400" /> {vehicle.fuelType}
          </span>
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            <Cog className="h-3.5 w-3.5 shrink-0 text-ignition-400" /> {vehicle.transmission}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <PlateBadge size="sm">{formatPrice(vehicle.price)}</PlateBadge>
            <p className="mt-1.5 font-body text-xs text-steel-400">
              or {formatPrice(vehicle.monthlyFinance)}/mo
            </p>
          </div>
          <Button href={`/vehicle/${vehicle.slug}`} size="sm" variant="primary" showArrow>
            View
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
