"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import { SloganBanner } from "@/components/sections/slogan-banner";
import WhyEmallSection from "@/components/sections/why-emall-section";
import VisualStorytellingSection from "@/components/sections/visual-storytelling-section";
import BusinessOpportunitiesSection from "@/components/sections/business-opportunities-section";
import FloorsBlocksStructure from "@/components/sections/floors-blocks-structure";
import BusinessCentreSection from "@/components/sections/business-centre-section";
import UpcomingAtEmall from "@/components/sections/upcoming-at-emall";
import ServicesAccordion from "@/components/sections/services-accordion";
import UpcomingEventsCarousel from "@/components/sections/upcoming-events-carousel";
import Footer from "@/components/sections/footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SloganBanner />
        <WhyEmallSection />
        <VisualStorytellingSection />
        <BusinessOpportunitiesSection />
        <FloorsBlocksStructure />
        <BusinessCentreSection />
        <UpcomingAtEmall />
        <ServicesAccordion />
        <UpcomingEventsCarousel />
      </main>
      <Footer />
    </div>
  );
}