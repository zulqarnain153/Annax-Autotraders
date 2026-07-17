import { Metadata } from "next";
import { RefreshCw, TrendingUp, Zap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValuationForm } from "@/components/vehicles/ValuationForm";

export const metadata: Metadata = {
  title: "Part Exchange",
  description:
    "Part exchange your current car towards your next one at Annax Auto Traders. Fast, fair, instant valuation.",
};

const points = [
  { icon: RefreshCw, title: "Simple Swap", description: "Trade in your current car as part of your next purchase." },
  { icon: TrendingUp, title: "Boost Your Deposit", description: "Use your part-exchange value to reduce your finance deposit." },
  { icon: Zap, title: "Instant Estimate", description: "Get an instant ballpark figure before you even visit." },
];

export default function PartExchangePage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="Part Exchange"
        title="Trade In Towards Your Next Car"
        description="Value your current car in minutes and put it towards something better on our forecourt."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading eyebrow="Why Part Exchange" title="Trade Up, The Easy Way" light />
              <div className="mt-8 space-y-5">
                {points.map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ignition-gradient text-navy-950 shadow-glow">
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
              <div className="mt-8 rounded-2xl border border-white/10 bg-navy-900 p-5">
                <p className="font-body text-xs uppercase tracking-wider text-steel-500">
                  Instant Valuation
                </p>
                <p className="mt-2 font-body text-sm text-steel-400">
                  Full instant valuations require a live market-data connection (e.g. CAP HPI or
                  Auto Trader Valuations API). Submit the form and our team will confirm your
                  figure by phone within one working day.
                </p>
              </div>
            </div>

            <ValuationForm mode="part-exchange" />
          </div>
        </div>
      </section>
    </div>
  );
}
