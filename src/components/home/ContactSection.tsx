import { MapPin, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { business } from "@/lib/business";

export function ContactSection() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Visit The Forecourt"
          description="Pop in, call, or send a message — whichever suits you best."
          light
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <MapEmbed className="h-64 flex-1" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: MapPin, label: "Address", value: business.address.full },
                { icon: Phone, label: "Phone", value: business.contact.phoneDisplay },
                { icon: Mail, label: "Email", value: business.contact.email },
              ].map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4">
                  <item.icon className="h-5 w-5 text-ignition-400" />
                  <p className="mt-2 font-display text-xs font-bold uppercase tracking-wider text-steel-400">
                    {item.label}
                  </p>
                  <p className="mt-1 font-body text-sm text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <ContactForm subject="Homepage Contact Enquiry" />
          </div>
        </div>
      </div>
    </section>
  );
}
