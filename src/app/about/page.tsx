import { Metadata } from "next";
import { Target, Eye, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Annax Auto Traders — a boutique used car dealership in Staines-upon-Thames built on trust and honesty.",
};

const timeline = [
  { year: "2016", title: "Annax Founded", description: "Opened our first small forecourt in Staines-upon-Thames with just six cars." },
  { year: "2019", title: "New Premises", description: "Moved to a larger site to accommodate growing stock and customer demand." },
  { year: "2022", title: "1,000th Car Sold", description: "Celebrated a major milestone built entirely on referrals and repeat customers." },
  { year: "2026", title: "Today", description: "A trusted independent dealer with a 4.9-star reputation and a loyal local following." },
];

const team = [
  { name: "James Carter", role: "Founder & Managing Director" },
  { name: "Amara Osei", role: "Sales Manager" },
  { name: "Liam Fitzgerald", role: "Vehicle Preparation Lead" },
  { name: "Priya Nair", role: "Finance Specialist" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="About Us"
        title="Driven By Trust Since 2016"
        description={business.shortDescription}
      />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Story" title="How Annax Began" light />
          <p className="mt-6 font-body text-base leading-relaxed text-steel-300">
            Annax Auto Traders started with a simple frustration: buying a used car so often
            meant vague descriptions, pushy sales tactics, and surprises after the fact. Our
            founder set out to do it differently — every car checked properly, every price
            honest, every conversation straightforward.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-steel-300">
            Nearly a decade later, that same principle still runs through everything we do. We&apos;re
            a small, independent team in Staines-upon-Thames, and most of our customers find us
            through a friend or family member who bought here first.
          </p>
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass rounded-2xl p-8">
              <Target className="h-8 w-8 text-ignition-400" />
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
                Our Mission
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-steel-400">
                To make buying and selling a used car straightforward, fair, and genuinely
                enjoyable — for every single customer, every single time.
              </p>
            </div>
            <div className="glass rounded-2xl p-8">
              <Eye className="h-8 w-8 text-ignition-400" />
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
                Our Vision
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-steel-400">
                To be Surrey&apos;s most trusted independent dealership — known as much for
                honesty as for the quality of cars on our forecourt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Journey" title="Timeline" light align="center" className="mx-auto" />
          <div className="mt-14 space-y-10 border-l-2 border-white/10 pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[38px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-ignition-gradient shadow-glow" />
                <span className="font-display text-sm font-bold uppercase tracking-wider text-ignition-400">
                  {item.year}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold uppercase text-white">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-sm text-steel-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Meet The Team" title="The People Behind Annax" light align="center" className="mx-auto" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-white/10 bg-navy-950 p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ignition-gradient text-white">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold uppercase text-white">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-xs text-steel-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
