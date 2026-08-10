import { Metadata } from "next";
import { ShieldCheck, Zap, PoundSterling, FileCheck2, Search, Handshake, Car } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinanceCalculator } from "@/components/vehicles/FinanceCalculator";
import { ContactForm } from "@/components/ui/ContactForm";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Car Finance",
  description:
    "Flexible car finance from Annax Auto Traders. Instant calculator, same-day decisions, and a panel of FCA-regulated lenders.",
};

const benefits = [
  { icon: Zap, title: "Fast Decisions", description: "Most applications are approved within minutes." },
  { icon: PoundSterling, title: "Flexible Deposits", description: "From £0 deposit depending on your circumstances." },
  { icon: ShieldCheck, title: "FCA Regulated", description: "We work only with trusted, regulated lenders." },
  { icon: Handshake, title: "No Pressure", description: "Take the figures away — there's no obligation to proceed." },
];

const process = [
  { icon: Car, title: "Choose Your Car", description: "Pick a vehicle from our stock, or tell us what you're after." },
  { icon: FileCheck2, title: "Apply Online", description: "Fill in our short application — takes about 3 minutes." },
  { icon: Search, title: "We Find Your Rate", description: "We check our lender panel for your best available rate." },
  { icon: Handshake, title: "Drive Away", description: "Sign your agreement and collect your car, often same-day." },
];

const faqs = [
  {
    question: "What credit score do I need?",
    answer:
      "There's no fixed minimum — our lender panel covers a wide range of credit profiles. The best way to find out is to apply; a soft search won't affect your credit score.",
  },
  {
    question: "Can I part-exchange as part of finance?",
    answer:
      "Yes. Your part-exchange value can be used to reduce your deposit or lower your monthly payments. Get a valuation on our Part Exchange page.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most applications receive a decision within minutes during business hours. More complex applications may take up to one working day.",
  },
  {
    question: "Is there an early repayment option?",
    answer:
      "Most of our finance agreements allow early settlement. Any settlement figure will depend on your specific lender and agreement terms.",
  },
];

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="Finance"
        title="Flexible Car Finance"
        description="Instant estimates, fast decisions, and a panel of FCA-regulated lenders working to find your best rate."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <FinanceCalculator />
            <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
              <h2 className="font-display text-lg font-bold uppercase text-white">Apply Now</h2>
              <p className="mt-1 font-body text-sm text-steel-400">
                No obligation — a soft search only, it won&apos;t affect your credit score.
              </p>
              <ContactForm subject="Finance Application" className="mt-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Benefits" title="Why Finance With Annax" light align="center" className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="glass rounded-2xl p-6 text-center">
                <b.icon className="mx-auto h-8 w-8 text-ignition-400" />
                <h3 className="mt-4 font-display text-base font-bold uppercase text-white">{b.title}</h3>
                <p className="mt-2 font-body text-sm text-steel-400">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="The Finance Process" light align="center" className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-navy-900 p-6">
                <span className="font-display text-5xl font-bold text-ignition-400">{i + 1}</span>
                <step.icon className="absolute right-6 top-6 h-6 w-6 text-ignition-400" />
                <h3 className="mt-2 font-display text-base font-bold uppercase text-white">{step.title}</h3>
                <p className="mt-2 font-body text-sm text-steel-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Finance Questions" light align="center" className="mx-auto" />
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
