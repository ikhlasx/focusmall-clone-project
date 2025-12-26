"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium">
                Get in touch with us for inquiries about available spaces, business opportunities, or general information.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Map */}
        <section className="py-20 bg-light-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8" data-aos="fade-up">
                <div>
                  <h2 className="text-3xl font-bold text-dark-navy mb-4">Get in Touch</h2>
                  <p className="text-medium-gray text-lg mb-8">
                    Visit us at Emall or reach out through any of the following channels.
                  </p>
                </div>

                <div className="grid gap-4">
                  {/* Address */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-sm">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">Address</CardTitle>
                          <CardContent className="p-0 text-medium-gray">
                            Emal Manjeri Global LLP (EMALCO)<br />
                            Thurakkal Baputty Bypass,<br />
                            Manjeri, Pin: 676121,<br />
                            Malappuram Dt.<br />
                            Kerala, India.
                          </CardContent>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Phone */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-sm">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">Phone</CardTitle>
                          <CardContent className="p-0">
                            <a href="tel:+917736446513" className="text-medium-gray hover:text-primary transition-colors">
                              +91 7736446513
                            </a>
                          </CardContent>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Email */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-sm">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">Email</CardTitle>
                          <CardContent className="p-0">
                            <a href="mailto:info@emalmanjeri.com" className="text-medium-gray hover:text-primary transition-colors">
                              info@emalmanjeri.com
                            </a>
                          </CardContent>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Business Hours */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-sm">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">Business Hours</CardTitle>
                          <CardContent className="p-0 text-medium-gray">
                            Monday - Sunday: 10:00 AM - 10:00 PM
                          </CardContent>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
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
                <Card className="overflow-hidden">
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
                  <CardContent className="p-6 bg-light-background">
                    <Button asChild>
                      <a
                        href="https://maps.app.goo.gl/Snao92thQXErENgh8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">Emall</CardTitle>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-medium-gray text-sm mb-4">
                        A multi-purpose commercial hub bringing together shopping, dining, entertainment, and business spaces.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">A Block</Badge>
                        <Badge variant="secondary">B Block</Badge>
                        <Badge variant="secondary">Business Centre</Badge>
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

