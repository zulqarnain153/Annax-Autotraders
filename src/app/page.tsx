import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { LatestArrivals } from "@/components/home/LatestArrivals";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SellYourCarTeaser } from "@/components/home/SellYourCarTeaser";
import { PartExchangeTeaser } from "@/components/home/PartExchangeTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { RecentlySold } from "@/components/home/RecentlySold";
import { StatsSection } from "@/components/home/StatsSection";
import { LatestNews } from "@/components/home/LatestNews";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <LatestArrivals />
      <WhyChooseUs />
      <SellYourCarTeaser />
      <PartExchangeTeaser />
      <Testimonials />
      <RecentlySold />
      <StatsSection />
      <LatestNews />
      <ContactSection />
    </>
  );
}
