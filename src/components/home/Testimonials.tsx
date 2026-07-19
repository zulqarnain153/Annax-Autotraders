"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            description="Real reviews from real customers — unedited, unfiltered."
            light
          />
          <Button href="/reviews" variant="outline" showArrow className="shrink-0">
            All Reviews
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="rounded-2xl border border-white/10 bg-navy-800 p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4"
                      fill={s < review.rating ? "#E4C567" : "none"}
                      stroke={s < review.rating ? "#E4C567" : "#84848C"}
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/10" />
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-steel-300">
                {review.text}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-white">{review.name}</p>
                  {review.vehicle && (
                    <p className="font-body text-xs text-steel-500">Bought a {review.vehicle}</p>
                  )}
                </div>
                <span className="font-body text-xs text-steel-500">{formatDate(review.date)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
