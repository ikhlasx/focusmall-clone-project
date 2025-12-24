"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
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
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Get in touch with us for inquiries about available spaces, business opportunities, or general information.
            </p>
          </div>
        </section>

        {/* Contact Information & Map */}
        <section className="py-20 bg-light-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8" data-aos="fade-up">
                <div>
                  <h2 className="text-3xl font-bold text-dark-navy mb-6">Get in Touch</h2>
                  <p className="text-medium-gray text-lg mb-8">
                    Visit us at Emall or reach out through any of the following channels.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-navy mb-2">Address</h3>
                      <p className="text-medium-gray">
                        Emal Manjeri Global LLP (EMALCO)<br />
                        Thurakkal Baputty Bypass,<br />
                        Manjeri, Pin: 676121,<br />
                        Malappuram Dt.<br />
                        Kerala, India.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-navy mb-2">Phone</h3>
                      <p className="text-medium-gray">
                        <a href="tel:+917736446513" className="hover:text-primary transition-colors">
                         +91 7736446513
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-navy mb-2">Email</h3>
                      <p className="text-medium-gray">
                        <a href="mailto:info@emalmanjeri.com" className="hover:text-primary transition-colors">
                          info@emalmanjeri.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-navy mb-2">Business Hours</h3>
                      <p className="text-medium-gray">
                        Monday - Sunday: 10:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mall Map */}
              <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                <div>
                  <h2 className="text-3xl font-bold text-dark-navy mb-2">Mall Location</h2>
                  <p className="text-medium-gray mb-6">
                    Find us on the map or get directions to Emall.
                  </p>
                </div>

                {/* Embedded Google Map */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.5!2d75.7754!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzMxLjciTiA3NcKwNDYnMzEuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6 bg-light-background">
                    <a
                      href="https://maps.app.goo.gl/Snao92thQXErENgh8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                    >
                      <MapPin className="w-5 h-5" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-dark-navy">Emall</h3>
                  </div>
                  <p className="text-medium-gray text-sm mb-4">
                    A multi-purpose commercial hub bringing together shopping, dining, entertainment, and business spaces.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      A Block
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      B Block
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      Business Centre
                    </span>
                  </div>
                </div>
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
              <a
                href="/rooms"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105"
              >
                View Available Rooms
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

