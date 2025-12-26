"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

const BusinessOpportunitiesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary/5" id="opportunities">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-dark-navy mb-6 leading-tight">
            Ready to grow your brand at Emall?
          </h2>
          <p className="text-lg text-medium-gray leading-relaxed mb-10 max-w-2xl mx-auto">
            Emall offers thoughtfully planned commercial spaces across retail, dining, services, and business centres — suited for both emerging entrepreneurs and established brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 bg-primary text-black font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-lg"
            >
              <Briefcase className="w-5 h-5" />
              View Opportunities by Category
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
            >
              Talk to Our Leasing Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessOpportunitiesSection;


