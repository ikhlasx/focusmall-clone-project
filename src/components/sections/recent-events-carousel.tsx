"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/4-19.webp",
    alt: "People playing an arcade game",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/5-20.webp",
    alt: "A musician performing on stage with a microphone",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/6-21.webp",
    alt: "Two people looking at a smartphone together",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/7-22.webp",
    alt: "A person playing a motorcycle arcade racing game",
  },
  // Duplicating for better loop visualization, as loop will clone items
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/4-19.webp",
    alt: "People playing an arcade game",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/5-20.webp",
    alt: "A musician performing on stage with a microphone",
  },
];

export default function RecentEventsCarousel() {
  return (
    <section className="bg-secondary py-20 lg:py-24">
      <div className="container">
        <h2 className="text-center text-4xl font-semibold text-dark-navy lg:text-[42px] lg:leading-[1.3] mb-12">
          Recent Events
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-6">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="overflow-hidden rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="aspect-square h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border-0 bg-white text-dark-navy shadow-md transition-opacity hover:bg-white/90 disabled:opacity-50 lg:flex" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border-0 bg-white text-dark-navy shadow-md transition-opacity hover:bg-white/90 disabled:opacity-50 lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}