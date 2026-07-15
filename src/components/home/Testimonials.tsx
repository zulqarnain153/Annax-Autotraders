"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="bg-plate-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            description="Real reviews from real customers — unedited, unfiltered."
          />
          <Button href="/reviews" variant="outline" showArrow className="shrink-0 !border-navy-950/20 !text-navy-950 hover:!border-ignition">
            All Reviews
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="rounded-2xl border border-navy-950/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4"
                      fill={s < review.rating ? "#FFD204" : "none"}
                      stroke={s < review.rating ? "#FFD204" : "#B7BECC"}
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-navy-950/10" />
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-steel-500">
                {review.text}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-navy-950/10 pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-navy-950">{review.name}</p>
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
