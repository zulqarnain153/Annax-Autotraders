import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

export function MapEmbed({ className }: { className?: string }) {
  const query = encodeURIComponent(business.address.full);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10", className)}>
      <iframe
        title={`${business.name} location map`}
        src={`https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 320 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
