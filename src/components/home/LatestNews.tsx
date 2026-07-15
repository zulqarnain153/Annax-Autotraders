import { Newspaper, ArrowRight } from "lucide-react";
import { news } from "@/lib/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export function LatestNews() {
  return (
    <section className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="From The Forecourt"
          title="Latest News & Guides"
          description="Buying advice, stock updates, and everything in between."
          light
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-navy-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ignition/40"
            >
              <div className="flex items-center gap-2 font-body text-xs uppercase tracking-wider text-ignition-400">
                <Newspaper className="h-3.5 w-3.5" />
                {article.category}
              </div>
              <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-white">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-steel-400">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-body text-xs text-steel-500">{formatDate(article.date)}</span>
                <ArrowRight className="h-4 w-4 text-ignition-400 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
