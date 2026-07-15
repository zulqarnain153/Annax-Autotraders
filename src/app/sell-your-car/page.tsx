import { Metadata } from "next";
import { PoundSterling, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValuationForm } from "@/components/vehicles/ValuationForm";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description:
    "Get a fair, fast valuation for your car. Tell us your registration, mileage, and condition — no obligation to sell.",
};

const points = [
  { icon: PoundSterling, title: "Fair Market Price", description: "Valuations based on real-time market data, not lowball guesses." },
  { icon: Clock, title: "Fast Turnaround", description: "Most valuations are ready within one working day." },
  { icon: ShieldCheck, title: "No Obligation", description: "Get your offer with zero pressure to accept." },
];

export default function SellYourCarPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="Sell Your Car"
        title="Get a Fair Price, Fast"
        description="Tell us about your car and we'll come back with a genuine offer — whether or not you're buying from us."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading eyebrow="How It Works" title="Sell With Confidence" light />
              <div className="mt-8 space-y-5">
                {points.map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ignition-gradient text-white shadow-glow">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold uppercase text-white">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-body text-sm text-steel-400">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ValuationForm mode="sell" />
          </div>
        </div>
      </section>
    </div>
  );
}
