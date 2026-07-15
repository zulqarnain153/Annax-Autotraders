import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about buying, financing, and part-exchanging a car with Annax Auto Traders.",
};

const buyingFaqs = [
  {
    question: "Do all your cars come with a warranty?",
    answer:
      "Yes, every vehicle we sell includes a minimum 3-month warranty as standard, with extended options available at checkout.",
  },
  {
    question: "Can I have the car independently inspected?",
    answer:
      "Absolutely. We encourage it — you're welcome to arrange an independent inspection (e.g. AA or RAC) before you commit to buying.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes, we offer nationwide delivery for a small fee depending on distance. Collection from our Staines-upon-Thames forecourt is always free.",
  },
];

const financeFaqs = [
  {
    question: "What deposit do I need?",
    answer:
      "Deposits start from £0 depending on your circumstances and the lender's criteria. Our calculator gives you an instant estimate.",
  },
  {
    question: "Will applying affect my credit score?",
    answer:
      "No — our initial application uses a soft search, which is invisible to other lenders and doesn't affect your credit score.",
  },
];

const partExFaqs = [
  {
    question: "Do I need to bring my car in for a valuation?",
    answer:
      "Not necessarily — submit your reg, mileage, and photos online and we'll give you a provisional figure before you visit.",
  },
  {
    question: "What if my finance isn't settled on my current car?",
    answer:
      "That's fine — we handle outstanding finance settlements as part of the part-exchange process directly with your lender.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about buying, financing, and trading in with Annax."
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div>
            <SectionHeading eyebrow="Buying" title="Purchasing a Vehicle" light />
            <div className="mt-6">
              <Accordion items={buyingFaqs} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Finance" title="Finance & Payments" light />
            <div className="mt-6">
              <Accordion items={financeFaqs} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Part Exchange" title="Trading In Your Car" light />
            <div className="mt-6">
              <Accordion items={partExFaqs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
