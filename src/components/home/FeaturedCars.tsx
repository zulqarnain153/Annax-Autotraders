import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FeaturedCars() {
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  return (
    <section className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured Vehicles"
            description="A curated selection of our finest cars currently on the forecourt — inspected, prepared, and ready to drive away."
            light
          />
          <Button href="/stock" variant="outline" showArrow className="shrink-0">
            View All Stock
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
