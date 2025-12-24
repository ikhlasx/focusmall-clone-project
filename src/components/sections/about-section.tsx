"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Building2, CheckCircle2, ArrowRight, Target, Sparkles, TrendingUp, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    "Purpose-driven spaces designed for retail, food, services, and offices",
    "Flexible room options across multiple floors and blocks",
    "Clear zoning for shopping, dining, ladies corner, business centre & services",
    "Future-ready planning with upcoming brands and concepts",
    "Prime location & easy accessibility for customers and businesses",
  ];

  const businessTypes = [
    { title: "Launching a food or café concept", icon: "🍽️" },
    { title: "Opening a retail or service outlet", icon: "🛍️" },
    { title: "Expanding into a business office or workspace", icon: "💼" },
  ];

  const upcomingSpaces = [
    "New food brands",
    "Lifestyle & service stores",
    "Professional offices",
    "Co-working & startup spaces",
  ];

  return (
    <section className="relative bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main About Section */}
        <div className="max-w-4xl mx-auto mb-20" data-aos="fade-up">
          <h2 className="text-[36px] lg:text-[42px] font-semibold text-dark-navy mb-6 text-center">
            About Emall
          </h2>
          <p className="text-[20px] lg:text-[22px] font-medium text-dark-navy text-center mb-8">
            A Destination Built for Business, Shopping & Community
          </p>
          <div className="space-y-6 text-medium-gray text-[16px] leading-[1.7]">
            <p>
              Emall is a growing commercial hub designed to bring together retail, dining, entertainment, and professional business spaces under one roof. Strategically structured into A Block and B Block, Emall offers thoughtfully planned shops, food court units, business rooms, and workspaces that support both emerging entrepreneurs and established brands.
            </p>
            <p>
              From street-facing retail shops to food concepts, service outlets, and flexible business centres, Emall is built to adapt to evolving market needs while creating a vibrant experience for visitors and tenants alike.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              Explore Available Spaces
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Our Vision */}
        <div className="bg-secondary py-16 rounded-2xl mb-20" data-aos="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-6">
              Our Vision
            </h3>
            <p className="text-[18px] text-medium-gray leading-[1.7] mb-8">
              To create a dynamic commercial ecosystem where businesses grow, customers engage, and communities connect — all within a well-planned, accessible mall environment.
            </p>
            <Link
              href="#floors"
              className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:text-dark-navy transition-colors duration-300"
            >
              <span className="border-b-2 border-primary pb-1">View Mall Layout</span>
            </Link>
          </div>
        </div>

        {/* What Makes Emall Different */}
        <div className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-4">
              What Makes Emall Different
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-6 rounded-lg border border-border-gray shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                <p className="text-medium-gray text-[15px] leading-[1.6]">{feature}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              Find the Right Space for Your Business
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Spaces That Grow With You */}
        <div className="bg-secondary py-16 rounded-2xl mb-20" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-6">
                Spaces That Grow With You
              </h3>
              <p className="text-[18px] text-medium-gray leading-[1.7] mb-8">
                Whether you are:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {businessTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <p className="text-medium-gray text-[16px] leading-[1.6]">{type.title}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-medium-gray text-[16px] leading-[1.7] mb-6">
                Emall provides scalable options — from compact shops to dedicated business rooms — allowing your business to grow without friction.
              </p>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
              >
                Check Vacant Rooms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* A Hub for What's Coming Next */}
        <div className="mb-20" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-6">
              A Hub for What's Coming Next
            </h3>
            <p className="text-[18px] text-medium-gray leading-[1.7] mb-8">
              Emall is not just about today's stores — it's about what's coming next. We actively curate spaces for:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {upcomingSpaces.map((space, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-secondary p-4 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-medium-gray text-[16px]">{space}</p>
                </div>
              ))}
            </div>
            <p className="text-medium-gray text-[16px] leading-[1.7] mb-8">
              This ensures a balanced mix that benefits both tenants and visitors.
            </p>
            <Link
              href="#upcoming"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              See What's Coming Soon
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-secondary py-16 rounded-2xl mb-20" data-aos="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-6">
              Our Commitment
            </h3>
            <p className="text-[18px] text-medium-gray leading-[1.7] mb-8">
              We are committed to maintaining a secure, accessible, and business-friendly environment supported by essential services, maintenance, and management — ensuring long-term value for every tenant at Emall.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              Contact Us for Enquiry
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white border-2 border-primary/20 rounded-2xl p-8 lg:p-12" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-4">
                Contact Us
              </h3>
              <p className="text-[18px] text-medium-gray">
                Get in Touch with Emall
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-dark-navy mb-2">Email</h4>
                  <a
                    href="mailto:info@emalmanjeri.com"
                    className="text-medium-gray hover:text-primary transition-colors"
                  >
                    info@emalmanjeri.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-dark-navy mb-2">Phone</h4>
                  <a
                    href="tel:+914833562244"
                    className="text-medium-gray hover:text-primary transition-colors"
                  >
                    +91 7736446513
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 mb-12">
              <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-dark-navy mb-3">Address</h4>
                <address className="text-medium-gray not-italic leading-[1.7]">
                  Emal Manjeri Global LLP (EMALCO)
                  <br />
                  Thurakkal Baputty Bypass,
                  <br />
                  Manjeri, Pin: 676121,
                  <br />
                  Malappuram Dt.
                  <br />
                  Kerala, India.
                </address>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg text-center justify-center"
              >
                View Available Rooms
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="https://maps.app.goo.gl/Snao92thQXErENgh8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/5 text-center justify-center"
              >
                Download Mall Map
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ready to Be Part of Emall? */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-[28px] lg:text-[32px] font-semibold text-dark-navy mb-6">
            Ready to Be Part of Emall?
          </h3>
          <p className="text-[18px] text-medium-gray leading-[1.7] mb-8 max-w-3xl mx-auto">
            Discover available rooms, explore floor-wise layouts, and find the space that fits your business vision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

