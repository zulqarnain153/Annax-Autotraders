import { Suspense } from "react";
import { Metadata } from "next";
import { StockBrowser } from "@/components/vehicles/StockBrowser";

export const metadata: Metadata = {
  title: "Used Cars For Sale",
  description:
    "Browse our full range of hand-picked used cars in Staines-upon-Thames. Filter by make, price, year, mileage, and more.",
};

export default function StockPage() {
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24 text-steel-400">Loading stock...</div>}>
        <StockBrowser />
      </Suspense>
    </div>
  );
}
