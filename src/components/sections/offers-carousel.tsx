"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const offersData = [
  {
    src: "https://slelguoygbfzlpylpxfs. supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/1-16.webp",
    alt: "A group of friends shopping, with a 'SALE' sign.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/2-17.webp",
    alt: "A promotional graphic for a 'MEGA SALE 80% OFF' on shoes.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/3-18.webp",
    alt: "A promotional graphic for a 'DISCOUNT 50%' on a pink jacket.",
  },
  // Duplicated for a better looping experience
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/1-16.webp",
    alt: "A group of friends shopping, with a 'SALE' sign.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/2-17.webp",
    alt: "A promotional graphic for a 'MEGA SALE 80% OFF' on shoes.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/3-18.webp",
    alt: "A promotional graphic for a 'DISCOUNT 50%' on a pink jacket.",
  },
];

const OffersCarousel = () => {
  return (
    <section
      aria-label="Promotional Offers"
      className="bg-background w-full py-16 md:py-24"
    >
      <div className="container">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-6">
            {offersData.map((offer, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group overflow-hidden rounded-xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl">
                  <Image
                    src={offer.src}
                    alt={offer.alt}
                    width={387}
                    height={400}
                    className="w-full h-auto object-cover aspect-[387/400] transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-foreground/80 hover:text-foreground shadow-lg border-0 transition-colors hidden md:flex items-center justify-center z-10" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-foreground/80 hover:text-foreground shadow-lg border-0 transition-colors hidden md:flex items-center justify-center z-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default OffersCarousel;