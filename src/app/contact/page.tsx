"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Building2, ArrowRight, Navigation } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactPage() {
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
        {/* Hero Section */}


        {/* Contact Information & Map */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16" data-aos="fade-up">
              <Badge variant="secondary" className="mb-4 bg-[#87E9FF]/20 text-black border-black/10">
                Contact Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Get in Touch
              </h2>
              <p className="text-lg text-medium-gray max-w-2xl mx-auto">
                Visit us at Emall or reach out through any of the following channels.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side: Contact Information Cards */}
              <div className="space-y-6" data-aos="fade-up">
                {/* Address Card with Special Styling */}
                <Card className="border-2 border-[#87E9FF]/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#87E9FF] p-4 rounded-xl">
                        <MapPin className="w-6 h-6 text-black" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-dark-navy mb-3" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          Visit Us
                        </CardTitle>
                        <CardContent className="p-0 text-medium-gray leading-relaxed">
                          <p className="font-semibold text-dark-navy mb-2">Emal Manjeri Global LLP (EMALCO)</p>
                          <p>Thurakkal Baputty Bypass,<br />
                          Manjeri, Pin: 676121,<br />
                          Malappuram Dt., Kerala, India</p>
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      asChild 
                      className="bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 rounded-lg font-semibold"
                      style={{ fontFamily: '"Red Hat Display", sans-serif' }}
                    >
                      <a
                        href="https://maps.app.goo.gl/Snao92thQXErENgh8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Phone Card */}
                <Card className="border border-gray-200 hover:border-[#87E9FF]/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#87E9FF]/20 p-3 rounded-lg">
                        <Phone className="w-5 h-5 text-[#87E9FF]" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-dark-navy mb-1" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          Phone
                        </CardTitle>
                        <CardContent className="p-0">
                          <a href="tel:+917736446513" className="text-lg font-medium text-medium-gray hover:text-[#87E9FF] transition-colors">
                            +91 7736446513
                          </a>
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Email Card */}
                <Card className="border border-gray-200 hover:border-[#87E9FF]/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#87E9FF]/20 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-[#87E9FF]" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-dark-navy mb-1" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          Email
                        </CardTitle>
                        <CardContent className="p-0">
                          <a href="mailto:info@emalmanjeri.com" className="text-base text-medium-gray hover:text-[#87E9FF] transition-colors break-all">
                            info@emalmanjeri.com
                          </a>
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Business Hours Card */}
                <Card className="border border-gray-200 hover:border-[#87E9FF]/50 transition-all duration-300 bg-gradient-to-br from-[#87E9FF]/5 to-white">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#87E9FF]/20 p-3 rounded-lg">
                        <Clock className="w-5 h-5 text-[#87E9FF]" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-dark-navy mb-1" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          Business Hours
                        </CardTitle>
                        <CardContent className="p-0 text-medium-gray font-medium">
                          Monday - Sunday: 10:00 AM - 10:00 PM
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Right Side: Interactive Map Section */}
              <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                {/* Map Card with Enhanced Design */}
                <Card className="overflow-hidden border-2 border-[#87E9FF]/30 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-[#87E9FF]/10 to-white pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-dark-navy mb-2" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          Mall Location
                        </CardTitle>
                        <p className="text-medium-gray text-sm">
                          Find us on the map or get directions to Emall
                        </p>
                      </div>
                      <div className="bg-[#87E9FF] p-3 rounded-xl">
                        <Navigation className="w-5 h-5 text-black" strokeWidth={2.5} />
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Enhanced Embedded Google Map */}
                  <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.5!2d76.1197!3d11.1179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEwJzA0LjQiTiA3NsKwMDcnMTAuOSJF!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                      title="Emall Location - Thurakkal Baputty Bypass, Manjeri, Kerala"
                    />
                    {/* Map Overlay Gradient */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent"></div>
                    {/* Location Pin Indicator */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 animate-pulse">
                      <div className="bg-[#87E9FF] p-2 rounded-full shadow-lg border-2 border-white">
                        <MapPin className="w-6 h-6 text-black" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 bg-white">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        asChild
                        className="flex-1 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 rounded-lg font-semibold"
                        style={{ fontFamily: '"Red Hat Display", sans-serif' }}
                      >
                        <a
                          href="https://maps.app.goo.gl/Snao92thQXErENgh8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Open in Google Maps
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info Card with Enhanced Design */}
                <Card className="border-2 border-[#87E9FF]/30 bg-gradient-to-br from-[#87E9FF]/5 to-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#87E9FF] p-3 rounded-lg">
                        <Building2 className="w-6 h-6 text-black" strokeWidth={2.5} />
                      </div>
                      <CardTitle className="text-xl font-bold text-dark-navy" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                        About Emall
                      </CardTitle>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-medium-gray text-sm mb-4 leading-relaxed">
                        A multi-purpose commercial hub bringing together shopping, dining, entertainment, and business spaces. Experience the future of retail and business in one place.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-[#87E9FF]/20 text-dark-navy border-[#87E9FF]/30">
                          A Block
                        </Badge>
                        <Badge variant="secondary" className="bg-[#87E9FF]/20 text-dark-navy border-[#87E9FF]/30">
                          B Block
                        </Badge>
                        <Badge variant="secondary" className="bg-[#87E9FF]/20 text-dark-navy border-[#87E9FF]/30">
                          Business Centre
                        </Badge>
                        <Badge variant="secondary" className="bg-[#87E9FF]/20 text-dark-navy border-[#87E9FF]/30">
                          Food Court
                        </Badge>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-dark-navy mb-6">Interested in Renting a Space?</h2>
              <p className="text-lg text-medium-gray mb-8">
                Browse our available commercial spaces and find the perfect location for your business.
              </p>
              <Button asChild size="lg">
                <a href="/rooms">View Available Rooms</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

