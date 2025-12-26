"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface EventCardProps {
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  description: string;
}

const eventData: EventCardProps[] = [
  {
    title: "Fashion",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/15-6.webp",
    startDate: "April 25, 2022",
    endDate: "April 25, 2022",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
  },
  {
    title: "Music Show",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/4-7.webp",
    startDate: "April 25, 2022",
    endDate: "April 25, 2022",
    description: "A showcase of various musical genres, featuring local and national artists. Enjoy an evening of melodies and rhythms.",
  },
  {
    title: "Clay modelling",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/3-9.webp",
    startDate: "April 25, 2022",
    endDate: "April 25, 2022",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
  },
  {
    title: "Back to school",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/5-8.webp",
    startDate: "April 25, 2022",
    endDate: "April 25, 2022",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
  },
];


const UpcomingEventsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-dark-navy mb-3" style={{ lineHeight: 1.3, letterSpacing: '-0.3px' }}>
              Upcoming Events
            </h2>
            <p className="text-medium-gray max-w-2xl">
              From fashion showcases to live performances and workshops, Emall hosts experiences that bring people together.
            </p>
          </div>
          <a
            href="/events"
            className="bg-primary hover:opacity-90 text-primary-foreground font-semibold py-[11px] px-[18px] rounded-[5px] transition-colors text-[15px] text-center whitespace-nowrap leading-none tracking-[0.5px]"
          >
            View All Events
          </a>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 -mt-6 w-full flex justify-between z-10 -translate-x-6 -right-12 pointer-events-none max-lg:hidden">
              <button
                onClick={scrollPrev}
                className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white rounded-full border border-border shadow-md transition-all hover:bg-gray-100"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={scrollNext}
                className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-white rounded-full border border-border shadow-md transition-all hover:bg-gray-100"
                aria-label="Next event"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {[...eventData, ...eventData].map((event, index) => (
                <div key={`${event.title}-${index}`} className="pl-6 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 group">
                  <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="overflow-hidden rounded-t-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={267}
                        className="w-full h-auto object-cover aspect-[3/2] transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-dark-navy mb-4 h-16 line-clamp-2" style={{lineHeight: 1.4}}>
                        {event.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-muted-foreground text-sm mb-4" style={{lineHeight: 1.6}}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span>{event.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span>{event.endDate}</span>
                        </div>
                      </div>
                      <p className="text-base leading-relaxed line-clamp-3" style={{color: 'rgb(102, 102, 102)', lineHeight: 1.7}}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsCarousel;