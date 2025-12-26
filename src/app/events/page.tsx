"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Gift, Handshake, Building2, Sparkles, Briefcase, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";

interface EventImage {
  id: string;
  image_url: string;
  cloudinary_id: string | null;
  display_order: number;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string | null;
  status: "published" | "draft";
  display_order: number;
  created_at: string;
  event_images?: EventImage[];
}

// Icon mapping based on category keywords
const getEventIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("foundation")) return Building2;
  if (lowerTitle.includes("partnership") || lowerTitle.includes("partner")) return Handshake;
  if (lowerTitle.includes("launch") || lowerTitle.includes("speech")) return Sparkles;
  if (lowerTitle.includes("honour") || lowerTitle.includes("shareholder") || lowerTitle.includes("supporter")) return Award;
  if (lowerTitle.includes("raffle") || lowerTitle.includes("winner") || lowerTitle.includes("promotion")) return Gift;
  if (lowerTitle.includes("business") || lowerTitle.includes("expo")) return Briefcase;
  return Calendar;
};

// Category mapping based on title keywords
const getEventCategory = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("foundation")) return "Foundation";
  if (lowerTitle.includes("partnership") || lowerTitle.includes("partner")) return "Partnership";
  if (lowerTitle.includes("launch") || lowerTitle.includes("speech")) return "Launch";
  if (lowerTitle.includes("honour") || lowerTitle.includes("shareholder") || lowerTitle.includes("supporter")) return "Honours";
  if (lowerTitle.includes("raffle") || lowerTitle.includes("winner") || lowerTitle.includes("promotion")) return "Promotions";
  return "Events";
};

const categoryColors: Record<string, "default" | "secondary" | "outline"> = {
  Foundation: "default",
  Partnership: "secondary",
  Launch: "default",
  Honours: "secondary",
  Promotions: "outline",
  Events: "secondary"
};

const eventImages = [
  "/events/1.jpeg",
  "/events/2.jpeg",
  "/events/4-1.jpeg",
  "/events/4.jpg",
  "/events/5-1.jpeg",
  "/events/6-1024x606.jpeg",
  "/events/7-1.jpeg",
  "/events/Audiance-1-1.jpeg",
  "/events/Audiance-1024x585.jpeg",
  "/events/Audiance.jpeg",
  "/events/Foudation-Stone-Laying-1024x585.jpeg",
  "/events/Launching.jpeg",
  "/events/Partners-ID-Presentatiln.jpeg",
  "/events/SHERIF.jpeg",
  "/events/WhatsApp-Image-2020-03-05-at-17.28.20-1024x682.jpeg",
  "/events/WhatsApp-Image-2020-03-05-at-17.28.20.jpeg",
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events?status=published");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[88px]">
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Side: Image */}
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
                <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={eventImages[currentImageIndex]}
                      alt={`Event image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover transition-opacity duration-500"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Light Blue Content Block */}
              <div className="relative order-1 lg:order-2 flex flex-col gap-4" data-aos="fade-left" data-aos-duration="1000">
                <div className="bg-[#87E9FF] rounded-2xl p-6 lg:p-10 relative">                  
                  {/* Main Headline */}
                  <h1 
                    className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight text-black mb-4" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}
                  >
                    Events at Emall
                  </h1>
                  
                  {/* Sub-headline */}
                  <p 
                    className="text-base lg:text-lg text-black/80 leading-relaxed mb-4 font-medium" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
                  >
                    Celebrating Milestones, Partnerships & Community Moments
                  </p>
                  
                  {/* Description */}
                  <p 
                    className="text-sm lg:text-base text-black/70 leading-relaxed" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
                  >
                    Emall hosts and supports events that mark important milestones in its journey — from foundation ceremonies and official launches to partnership meets and community celebrations. Each event reflects our commitment to growth, collaboration, and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-medium-gray">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-medium-gray text-lg">No events available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {events.map((event, index) => {
                  const IconComponent = getEventIcon(event.title);
                  const category = getEventCategory(event.title);
                  const firstImage = event.event_images && event.event_images.length > 0 
                    ? event.event_images.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))[0]
                    : null;

                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      {firstImage && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                          <Image
                            src={firstImage.image_url}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-[#87E9FF]/10 p-3 rounded-xl">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <Badge 
                            variant={categoryColors[category] || categoryColors.Events} 
                            className="text-xs bg-primary/10 text-dark-navy border-primary/20"
                          >
                            {category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-dark-navy mb-3 leading-tight" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          {event.title}
                        </h3>
                        {event.event_date && (
                          <div className="flex items-center gap-2 text-sm text-medium-gray mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.event_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        <p className="text-medium-gray text-base leading-relaxed mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                          {event.description}
                        </p>
                        {event.event_images && event.event_images.length > 0 && (
                          <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-medium-gray">
                              <ImageIcon className="w-4 h-4" />
                              <span>{event.event_images.length} image{event.event_images.length > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-6" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Explore More
              </h2>
              <p className="text-lg text-medium-gray mb-8 max-w-2xl mx-auto" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Discover our available spaces and learn more about what Emall has to offer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/rooms"
                  className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
                >
                  Explore Emall Spaces
                  <div className="w-6 h-6 rounded-full bg-dark-navy flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-dark-navy hover:bg-gray-50 border border-gray-300 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 text-dark-navy" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
