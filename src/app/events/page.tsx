"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Award, Gift, Handshake, Building2, Sparkles, Trophy, Briefcase, Image as ImageIcon } from "lucide-react";
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

const categoryColors: Record<string, string> = {
  Foundation: "bg-blue-100 text-blue-700 border-blue-200",
  Partnership: "bg-green-100 text-green-700 border-green-200",
  Launch: "bg-purple-100 text-purple-700 border-purple-200",
  Honours: "bg-amber-100 text-amber-700 border-amber-200",
  Promotions: "bg-pink-100 text-pink-700 border-pink-200",
  Events: "bg-gray-100 text-gray-700 border-gray-200"
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
    fetchEvents();
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
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 Events at Emall</h1>
              <p className="text-lg md:text-xl text-white/90 mb-2">
                Celebrating Milestones, Partnerships & Community Moments
              </p>
              <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mt-4">
                Emall hosts and supports events that mark important milestones in its journey — from foundation ceremonies and official launches to partnership meets and community celebrations. Each event reflects our commitment to growth, collaboration, and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-light-background">
          <div className="container mx-auto px-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => {
                  const IconComponent = getEventIcon(event.title);
                  const category = getEventCategory(event.title);
                  const firstImage = event.event_images && event.event_images.length > 0 
                    ? event.event_images.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))[0]
                    : null;

                  return (
                    <Card
                      key={event.id}
                      className="bg-white border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      {firstImage && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                          <Image
                            src={firstImage.image_url}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[category] || categoryColors.Events}`}>
                            {category}
                          </span>
                        </div>
                        <CardTitle className="text-xl font-bold text-dark-navy mb-2">
                          {event.title}
                        </CardTitle>
                        {event.event_date && (
                          <div className="flex items-center gap-1 text-sm text-medium-gray mb-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-medium-gray text-base leading-relaxed">
                          {event.description}
                        </CardDescription>
                        {event.event_images && event.event_images.length > 0 && (
                          <div className="pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1 text-sm text-medium-gray">
                              <ImageIcon className="w-4 h-4" />
                              {event.event_images.length} image{event.event_images.length > 1 ? 's' : ''}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-dark-navy mb-6">Explore More</h2>
              <p className="text-lg text-medium-gray mb-8">
                Discover our available spaces and learn more about what Emall has to offer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105"
                >
                  Explore Emall Spaces
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold py-4 px-8 rounded-lg text-base border-2 border-primary transition-all duration-300 ease-in-out hover:bg-primary/5 hover:shadow-lg transform hover:scale-105"
                >
                  Contact Us
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
