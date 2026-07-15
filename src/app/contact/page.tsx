import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${business.name} in ${business.address.city}. Call, email, or visit our forecourt.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        description="Questions about a vehicle, finance, or part exchange? We're here to help."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-white">Address</p>
                    <p className="mt-1 font-body text-sm text-steel-400">{business.address.full}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-white">Phone</p>
                    <a href={`tel:${business.contact.phone}`} className="mt-1 block font-body text-sm text-steel-400">
                      {business.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-white">Email</p>
                    <a href={`mailto:${business.contact.email}`} className="mt-1 block font-body text-sm text-steel-400">
                      {business.contact.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ignition-400" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-white">
                      Working Hours
                    </p>
                    <div className="mt-2 space-y-1">
                      {business.hours.map((h) => (
                        <div key={h.day} className="flex justify-between gap-4 font-body text-xs text-steel-400">
                          <span>{h.day}</span>
                          <span>{h.open} – {h.close}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <MapEmbed className="h-72" />
              <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  Send Us a Message
                </h2>
                <p className="mt-1 font-body text-sm text-steel-400">
                  We typically respond within one working day.
                </p>
                <ContactForm subject="Contact Page Enquiry" className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
