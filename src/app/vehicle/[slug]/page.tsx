import { notFound } from "next/navigation";
import { Metadata } from "next";
import { vehicles } from "@/lib/vehicles";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";
import { formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} — ${formatPrice(vehicle.price)}`;
  return {
    title,
    description: vehicle.description,
    openGraph: { title, description: vehicle.description },
  };
}

export default async function VehicleDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      <VehicleDetailClient vehicle={vehicle} />
    </div>
  );
}
