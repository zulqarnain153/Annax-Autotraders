"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  CalendarCheck,
  BadgeCheck,
  Gauge,
  Fuel,
  Cog,
  Calendar,
  DoorOpen,
  Users,
  Palette,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Vehicle } from "@/lib/types";
import { PlateBadge } from "@/components/ui/PlateBadge";
import { Button } from "@/components/ui/Button";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { FinanceCalculator } from "@/components/vehicles/FinanceCalculator";
import { VehicleActionModal } from "@/components/vehicles/VehicleActionModal";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatPrice, formatMileage, formatDate } from "@/lib/utils";
import { business } from "@/lib/business";
import { vehicles } from "@/lib/vehicles";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5h-.56c-.2 0-.51.07-.78.36-.26.29-1.02.99-1.02 2.42s1.04 2.81 1.19 3c.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.13-.26-.2-.55-.34zM12.04 2C6.5 2 2 6.48 2 12c0 1.85.5 3.6 1.4 5.1L2 22l5.05-1.32A9.96 9.96 0 0 0 12.04 22C17.5 22 22 17.52 22 12S17.5 2 12.04 2zm0 18.13c-1.67 0-3.24-.46-4.58-1.27l-.33-.2-3 .78.8-2.92-.21-.3A8.15 8.15 0 0 1 3.86 12c0-4.5 3.68-8.15 8.18-8.15S20.22 7.5 20.22 12s-3.68 8.13-8.18 8.13z" />
  </svg>
);

export function VehicleDetailClient({ vehicle }: { vehicle: Vehicle }) {
  const [modal, setModal] = useState<"test-drive" | "reserve" | null>(null);
  const recentSlugs = useRecentlyViewed(vehicle.slug);

  const related = vehicles
    .filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.make === vehicle.make))
    .slice(0, 3);

  const recentlyViewed = vehicles.filter((v) => recentSlugs.includes(v.slug)).slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} (${formatPrice(vehicle.price)}). Is it still available?`
  );

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.make} ${vehicle.model} ${vehicle.variant}`,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "SMI" },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "GBP",
      availability:
        vehicle.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />

      <nav className="mb-6 flex items-center gap-1.5 font-body text-xs text-steel-500">
        <Link href="/" className="hover:text-ignition-400">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stock" className="hover:text-ignition-400">Stock</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-steel-300">{vehicle.make} {vehicle.model}</span>
      </nav>

      {/*
        Layout uses named grid-areas instead of relying on DOM order + lg:grid-cols.
        WHY: previously this was a plain 2-column grid that only became 2 columns at
        lg+; below that it silently collapsed to a single column and just followed
        DOM order, which put the full specs block (including Fuel Type / Transmission)
        ahead of the sidebar's quick-specs strip (which repeats Fuel Type / Transmission)
        AND buried the title/price/CTA buttons under the entire details section on
        mobile. Named areas let us control mobile order explicitly (gallery → sidebar →
        details) while keeping the exact desktop layout (details left, sidebar right,
        sticky) untouched.
      */}
      <div className="grid gap-10 [grid-template-areas:'gallery''sidebar''details'] lg:grid-cols-[1.4fr_1fr] lg:[grid-template-areas:'gallery_sidebar''details_sidebar']">
        <div className="[grid-area:gallery]">
          <VehicleGallery vehicle={vehicle} />
        </div>

        <div className="[grid-area:details]">
          <div>
            <h2 className="font-display text-xl font-bold uppercase text-white">Description</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-steel-300">
              {vehicle.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase text-white">Specifications</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { icon: Calendar, label: "Year", value: vehicle.year },
                { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileage) },
                { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
                { icon: Cog, label: "Transmission", value: vehicle.transmission },
                { icon: DoorOpen, label: "Doors", value: vehicle.doors },
                { icon: Users, label: "Seats", value: vehicle.seats },
                { icon: Palette, label: "Colour", value: vehicle.colour },
                { icon: BadgeCheck, label: "Engine", value: vehicle.engineSize },
              ].map((spec) => (
                <div key={spec.label} className="rounded-xl border border-white/10 bg-navy-900 p-4">
                  <spec.icon className="h-4 w-4 text-ignition-400" />
                  <p className="mt-2 font-body text-[10px] uppercase tracking-wider text-steel-500">
                    {spec.label}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase text-white">Features</h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {vehicle.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 font-body text-sm text-steel-300">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-ignition-400" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Vehicle History &amp; MOT
            </h2>
            <div className="mt-4 space-y-3">
              {vehicle.history.map((item) => (
                <div key={item.label} className="flex gap-3 rounded-xl border border-white/10 bg-navy-900 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-white">{item.label}</p>
                    <p className="font-body text-sm text-steel-400">{item.detail}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 rounded-xl border border-white/10 bg-navy-900 p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                <div>
                  <p className="font-display text-sm font-bold uppercase text-white">
                    MOT Status: {vehicle.mot.status}
                  </p>
                  <p className="font-body text-sm text-steel-400">
                    Expires {formatDate(vehicle.mot.expiry)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky sidebar — shows first on mobile (title/price/CTA), right column on desktop */}
        <div className="[grid-area:sidebar] lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
            <h1 className="font-display text-2xl font-bold uppercase leading-tight text-white">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="font-body text-sm text-steel-400">{vehicle.variant}</p>

            <div className="mt-4">
              <PlateBadge size="lg">{formatPrice(vehicle.price)}</PlateBadge>
              <p className="mt-2 font-body text-sm text-steel-400">
                or {formatPrice(vehicle.monthlyFinance)}/month on finance
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 rounded-xl bg-navy-800 p-4">
              <span className="flex min-w-0 items-center gap-2 font-body text-xs text-steel-400">
                <Calendar className="h-4 w-4 shrink-0 text-ignition-400" /> {vehicle.year}
              </span>
              <span className="flex min-w-0 items-center gap-2 font-body text-xs text-steel-400">
                <Gauge className="h-4 w-4 shrink-0 text-ignition-400" /> {formatMileage(vehicle.mileage)}
              </span>
              <span className="flex min-w-0 items-center gap-2 font-body text-xs text-steel-400">
                <Fuel className="h-4 w-4 shrink-0 text-ignition-400" /> {vehicle.fuelType}
              </span>
              <span className="flex min-w-0 items-center gap-2 font-body text-xs text-steel-400">
                <Cog className="h-4 w-4 shrink-0 text-ignition-400" /> {vehicle.transmission}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <Button onClick={() => setModal("reserve")} className="w-full">
                Reserve This Vehicle
              </Button>
              <Button onClick={() => setModal("test-drive")} variant="secondary" icon={CalendarCheck} className="w-full">
                Book Test Drive
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${business.contact.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366]/40 py-3 font-display text-sm font-semibold uppercase text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${business.contact.phone}`}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-white/20 py-3 font-display text-sm font-semibold uppercase text-white transition-colors hover:border-ignition"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </div>

            <p className="mt-4 text-center font-body text-xs text-steel-500">
              Reg: {vehicle.registration} · {vehicle.owners} owner{vehicle.owners !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-6">
            <FinanceCalculator initialPrice={vehicle.price} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            Related Vehicles
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      )}

      {recentlyViewed.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            Recently Viewed
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      )}

      <VehicleActionModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode={modal ?? "reserve"}
        vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
      />
    </div>
  );
}
