import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-radial pb-16 pt-36">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
        <pattern id="pagehero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#A3A3AA" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#pagehero-grid)" />
      </svg>
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-ignition/15 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light />
      </div>
    </section>
  );
}
