"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import AboutSection from "@/components/sections/about-section";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
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
      <main className="flex-1 pt-[88px]">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

