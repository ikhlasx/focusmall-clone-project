"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main About Section - Hero Style */}
        <div className="mb-20 lg:mb-32" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                About Emall
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-dark-navy mb-6 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
                A Destination Built for Business, Shopping & Community
              </h2>
              <p className="text-[18px] lg:text-[20px] text-medium-gray max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Emall is a growing commercial hub designed to bring together retail, dining, entertainment, and professional business spaces under one roof. Strategically structured into A Block and B Block, Emall offers thoughtfully planned shops, food court units, business rooms, and workspaces that support both emerging entrepreneurs and established brands.
              </p>
            </div>
          </div>
        </div>

        {/* Empower Your Business Section - Image Right, Text Left */}
        <div className="mb-20 lg:mb-32" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Text Content */}
              <div className="order-2 lg:order-1">
                <div className="inline-block border border-medium-gray/30 text-dark-navy text-xs font-medium px-4 py-1.5 rounded-full mb-6" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                  The Vision
                </div>
                <h3 className="text-[32px] lg:text-[42px] font-bold text-dark-navy mb-6 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
                  Empower Your Business with Cutting-Edge Features.
                </h3>
                <p className="text-[16px] lg:text-[18px] text-medium-gray leading-relaxed mb-8" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                  Manage your team effortlessly with our user-friendly reports. Filter, export, and drill down on data to measure what matters. Amplify your marketing impact and unlock insights with data-driven solutions.
                </p>
                <Link 
                  href="/rooms"
                  className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
                >
                  Explore Available Spaces
                  <div className="w-8 h-8 bg-dark-navy rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </Link>
              </div>
              
              {/* Right: Image */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-1 lg:order-2">
                <Image
                  src="/emall main 1.jpeg"
                  alt="Modern business workspace at Emall"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Your All-in-One Solution Section - Image Right, Text Left */}
        <div className="mb-20 lg:mb-32" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h3 className="text-[32px] lg:text-[42px] font-bold text-dark-navy mb-6 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
                  Your All-in-One Solution for Business Success
                </h3>
                <p className="text-[16px] lg:text-[18px] text-medium-gray leading-relaxed mb-8" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                  Integrate our solution seamlessly into your workflow for enhanced efficiency and productivity.
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
                >
                  Contact
                  <div className="w-8 h-8 bg-dark-navy rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </Link>
              </div>
              
              {/* Right: Image */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/emall main 2.jpeg"
                  alt="Collaborative workspace at Emall"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* What Makes Emall Different - Clean Grid */}
        <div className="mb-20 lg:mb-32" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-[32px] lg:text-[42px] font-bold text-dark-navy mb-6 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
                What Makes Emall Different
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                "Purpose-driven spaces designed for retail, food, services, and offices",
                "Flexible room options across multiple floors and blocks",
                "Clear zoning for shopping, dining, ladies corner, business centre & services",
                "Future-ready planning with upcoming brands and concepts",
                "Prime location & easy accessibility for customers and businesses",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#87E9FF]/10 p-6 rounded-xl border border-[#87E9FF]/20 hover:shadow-md transition-shadow"
                >
                  <p className="text-medium-gray text-[15px] leading-relaxed" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/rooms"
                className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
              >
                Find the Right Space for Your Business
                <div className="w-8 h-8 bg-dark-navy rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Streamline Your Workflow Section */}
        <div className="mb-20 lg:mb-32" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-[32px] lg:text-[42px] font-bold text-dark-navy mb-6 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
              Streamline Your Workflow with Seamless Integration
            </h3>
            <p className="text-[16px] lg:text-[18px] text-medium-gray leading-relaxed mb-8" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
              Integrate our solution seamlessly into your workflow for enhanced efficiency and productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
              >
                Contact
                <div className="w-8 h-8 bg-dark-navy rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </Link>
              <span className="text-medium-gray text-sm" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                • Learn More
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information - Simplified */}
        <div className="bg-white border border-medium-gray/20 rounded-2xl p-8 lg:p-12" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-[28px] lg:text-[36px] font-bold text-dark-navy mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}>
                Contact Us
              </h3>
              <p className="text-[16px] text-medium-gray" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Get in Touch with Emall
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-dark-navy mb-2" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>Email</h4>
                <a
                  href="mailto:info@emalmanjeri.com"
                  className="text-medium-gray hover:text-[#87E9FF] transition-colors"
                  style={{ fontFamily: '"Red Hat Display", sans-serif' }}
                >
                  info@emalmanjeri.com
                </a>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-dark-navy mb-2" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>Phone</h4>
                <a
                  href="tel:+917736446513"
                  className="text-medium-gray hover:text-[#87E9FF] transition-colors"
                  style={{ fontFamily: '"Red Hat Display", sans-serif' }}
                >
                  +91 7736446513
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-dark-navy mb-3" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>Address</h4>
              <address className="text-medium-gray not-italic leading-relaxed" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Emal Manjeri Global LLP (EMALCO)
                <br />
                Thurakkal Baputty Bypass,
                <br />
                Manjeri, Pin: 676121,
                <br />
                Malappuram Dt., Kerala, India.
              </address>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/rooms"
                className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
              >
                View Available Rooms
                <div className="w-8 h-8 bg-dark-navy rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

