import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { LatestArrivals } from "@/components/home/LatestArrivals";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PartExchangeTeaser } from "@/components/home/PartExchangeTeaser";
import { RecentlySold } from "@/components/home/RecentlySold";
import { LatestNews } from "@/components/home/LatestNews";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <LatestArrivals />
      <WhyChooseUs />
      <PartExchangeTeaser />
      <RecentlySold />
      <LatestNews />
      <ContactSection />
    </>
  );
}
