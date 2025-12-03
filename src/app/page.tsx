"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import StoreCategoriesCarousel from "@/components/sections/store-categories-carousel";
import WelcomeSection from "@/components/sections/welcome-section";
import UpcomingEventsCarousel from "@/components/sections/upcoming-events-carousel";
import BrandsShowcase from "@/components/sections/brands-showcase";
import OffersCarousel from "@/components/sections/offers-carousel";
import RecentEventsCarousel from "@/components/sections/recent-events-carousel";
import ServicesAccordion from "@/components/sections/services-accordion";
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
        <StoreCategoriesCarousel />
        <WelcomeSection />
        <UpcomingEventsCarousel />
        <BrandsShowcase />
        <OffersCarousel />
        <RecentEventsCarousel />
        <ServicesAccordion />
      </main>
      <Footer />
    </div>
  );
}