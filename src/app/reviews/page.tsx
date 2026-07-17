import { Metadata } from "next";
import { Star, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { reviews } from "@/lib/vehicles";
import { business } from "@/lib/business";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `Read what our customers say about Annax Auto Traders — ${business.reviewsSummary.average} out of 5 from ${business.reviewsSummary.count} Google reviews.`,
};

const distribution = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="Reviews"
        title="What Our Customers Say"
        description="Honest, unfiltered feedback from the people who matter most."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-navy-900 p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="text-center">
              <p className="font-display text-6xl font-bold text-white">
                {business.reviewsSummary.average}
              </p>
              <div className="mt-2 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="#E4C567" stroke="#E4C567" />
                ))}
              </div>
              <p className="mt-2 font-body text-xs text-steel-400">
                {business.reviewsSummary.count} {business.reviewsSummary.source}
              </p>
            </div>

            <div className="space-y-1.5">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-3">
                  <span className="w-3 font-body text-xs text-steel-400">{d.stars}</span>
                  <Star className="h-3.5 w-3.5" fill="#E4C567" stroke="#E4C567" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-ignition-gradient" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="w-8 font-body text-xs text-steel-400">{d.pct}%</span>
                </div>
              ))}
            </div>

            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="justify-self-center md:justify-self-end"
            >
              <Button icon={ExternalLink} showArrow>
                Write a Review
              </Button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ignition-gradient font-display text-sm font-bold text-navy-950">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-white">{review.name}</p>
                      <p className="font-body text-xs text-steel-500">{formatDate(review.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5"
                      fill={s < review.rating ? "#E4C567" : "none"}
                      stroke={s < review.rating ? "#E4C567" : "#84848C"}
                    />
                  ))}
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-steel-300">{review.text}</p>
                {review.vehicle && (
                  <p className="mt-3 font-body text-xs text-steel-500">Purchased: {review.vehicle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
