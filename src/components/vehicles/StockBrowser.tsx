"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Heart } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { CompareBar } from "@/components/vehicles/CompareBar";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice, cn } from "@/lib/utils";

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage" | "year";

const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
const bodyTypes = Array.from(new Set(vehicles.map((v) => v.bodyType))).sort();
const fuelTypes = Array.from(new Set(vehicles.map((v) => v.fuelType))).sort();
const transmissions = Array.from(new Set(vehicles.map((v) => v.transmission))).sort();
const colours = Array.from(new Set(vehicles.map((v) => v.colour))).sort();
const maxPrice = Math.max(...vehicles.map((v) => v.price));
const maxMileage = Math.max(...vehicles.map((v) => v.mileage));

export function StockBrowser() {
  const params = useSearchParams();
  const showSavedOnly = params.get("saved") === "1";
  const showCompareOnly = params.get("compare") === "1";

  const [make, setMake] = useState(params.get("make") ?? "");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [colour, setColour] = useState("");
  const [priceMax, setPriceMax] = useState(maxPrice);
  const [mileageMax, setMileageMax] = useState(maxMileage);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { ids: wishlistIds, mounted: wMounted } = useWishlist();

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (make && v.make !== make) return false;
      if (bodyType && v.bodyType !== bodyType) return false;
      if (fuelType && v.fuelType !== fuelType) return false;
      if (transmission && v.transmission !== transmission) return false;
      if (colour && v.colour !== colour) return false;
      if (v.price > priceMax) return false;
      if (v.mileage > mileageMax) return false;
      return true;
    });

    if (showSavedOnly && wMounted) {
      result = result.filter((v) => wishlistIds.includes(v.id));
    }

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        result = [...result].sort((a, b) => a.mileage - b.mileage);
        break;
      case "year":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      default:
        result = [...result].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    return result;
  }, [make, bodyType, fuelType, transmission, colour, priceMax, mileageMax, sort, showSavedOnly, wMounted, wishlistIds]);

  const clearFilters = () => {
    setMake("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setColour("");
    setPriceMax(maxPrice);
    setMileageMax(maxMileage);
  };

  const activeCount = [make, bodyType, fuelType, transmission, colour].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-4xl font-bold uppercase text-white sm:text-5xl">
          {showSavedOnly ? "Saved Vehicles" : "Our Stock"}
        </h1>
        <p className="font-body text-sm text-steel-400">
          {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {showCompareOnly && <CompareBar allVehicles={vehicles} />}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filter sidebar (desktop) */}
        <aside className="hidden lg:block">
          <FilterPanel
            {...{
              make, setMake, bodyType, setBodyType, fuelType, setFuelType,
              transmission, setTransmission, colour, setColour,
              priceMax, setPriceMax, mileageMax, setMileageMax, clearFilters, activeCount,
            }}
          />
        </aside>

        <div>
          {/* Mobile filter trigger + sort bar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-body text-sm text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="font-body text-xs uppercase tracking-wider text-steel-400">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-body text-sm text-white focus:border-ignition focus:outline-none"
              >
                <option value="newest" className="text-navy-950">Newest</option>
                <option value="price-asc" className="text-navy-950">Price: Low to High</option>
                <option value="price-desc" className="text-navy-950">Price: High to Low</option>
                <option value="mileage" className="text-navy-950">Mileage</option>
                <option value="year" className="text-navy-950">Year</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-navy-900 py-20 text-center">
              <Heart className="h-8 w-8 text-steel-500" />
              <p className="mt-4 font-display text-lg font-bold uppercase text-white">
                No vehicles match
              </p>
              <p className="mt-1 font-body text-sm text-steel-400">
                Try widening your filters or clearing them entirely.
              </p>
              <button onClick={clearFilters} className="mt-4 font-body text-sm text-ignition-400 underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-navy-900 p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold uppercase text-white">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <FilterPanel
                {...{
                  make, setMake, bodyType, setBodyType, fuelType, setFuelType,
                  transmission, setTransmission, colour, setColour,
                  priceMax, setPriceMax, mileageMax, setMileageMax, clearFilters, activeCount,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterPanelProps {
  make: string;
  setMake: (v: string) => void;
  bodyType: string;
  setBodyType: (v: string) => void;
  fuelType: string;
  setFuelType: (v: string) => void;
  transmission: string;
  setTransmission: (v: string) => void;
  colour: string;
  setColour: (v: string) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  mileageMax: number;
  setMileageMax: (v: number) => void;
  clearFilters: () => void;
  activeCount: number;
}

function FilterPanel({
  make, setMake, bodyType, setBodyType, fuelType, setFuelType,
  transmission, setTransmission, colour, setColour,
  priceMax, setPriceMax, mileageMax, setMileageMax, clearFilters, activeCount,
}: FilterPanelProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-navy-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold uppercase text-white">Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="font-body text-xs text-ignition-400 underline">
            Clear ({activeCount})
          </button>
        )}
      </div>

      <FilterSelect label="Make" value={make} onChange={setMake} options={makes} />
      <FilterSelect label="Body Type" value={bodyType} onChange={setBodyType} options={bodyTypes} />
      <FilterSelect label="Fuel Type" value={fuelType} onChange={setFuelType} options={fuelTypes} />
      <FilterSelect label="Transmission" value={transmission} onChange={setTransmission} options={transmissions} />
      <FilterSelect label="Colour" value={colour} onChange={setColour} options={colours} />

      <div>
        <div className="mb-2 flex justify-between font-body text-xs uppercase tracking-wider text-steel-400">
          <span>Max Price</span>
          <span className="text-white">{formatPrice(priceMax)}</span>
        </div>
        <input
          type="range"
          min={5000}
          max={maxPrice}
          step={500}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-ignition"
        />
      </div>

      <div>
        <div className="mb-2 flex justify-between font-body text-xs uppercase tracking-wider text-steel-400">
          <span>Max Mileage</span>
          <span className="text-white">{mileageMax.toLocaleString()} mi</span>
        </div>
        <input
          type="range"
          min={5000}
          max={maxMileage}
          step={1000}
          value={mileageMax}
          onChange={(e) => setMileageMax(Number(e.target.value))}
          className="w-full accent-ignition"
        />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-xs uppercase tracking-wider text-steel-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-body text-sm text-white focus:border-ignition focus:outline-none"
        )}
      >
        <option value="" className="text-navy-950">Any {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-navy-950">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
