"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const WhyEmallSection = () => {
  const valueCards = [
    {
      id: "high-footfall",
      title: "High-Footfall Commercial Hub",
      summary: "Strategically designed spaces that attract daily shoppers, diners, and professionals.",
      url: "#explore",
      image: "/commercial.jpg"
    },
    {
      id: "curated-mix",
      title: "Curated Food & Retail Mix",
      summary: "From food courts to lifestyle brands — every floor is purpose-planned.",
      url: "#explore",
      image: "/food court.jpg"
    },
    {
      id: "flexible-spaces",
      title: "Flexible Business Spaces",
      summary: "Offices, co-working, and service zones designed for modern businesses.",
      url: "#explore",
      image: "/spaces.jpg"
    },
    {
      id: "convenience",
      title: "Convenience & Infrastructure",
      summary: "Parking, power backup, accessibility, and maintenance support.",
      url: "#explore",
      image: "/parking.jpg"
    },
  ];

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-20 lg:py-32 bg-white" id="why-emall">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <h2 className="mb-3 text-3xl font-semibold text-dark-navy md:mb-4 md:text-4xl lg:mb-6">
              Shop, dine, and work at Emall , all in one place
            </h2>
            <p className="mb-4 max-w-lg text-medium-gray md:mb-6">
              An all-in-one commercial destination for retail, dining, entertainment, and professional workspaces — built to help businesses grow and thrive.
            </p>
            <Link
              href="#explore"
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg text-dark-navy hover:text-primary transition-colors"
            >
              Explore Emall
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2 md:mt-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {valueCards.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <Link
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium text-dark-navy md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-medium-gray md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm text-dark-navy">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default WhyEmallSection;


