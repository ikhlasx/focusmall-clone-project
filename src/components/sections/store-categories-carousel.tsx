"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  title: string;
  description: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    title: "🛍 Shopping",
    description: "Fashion, jewellery, footwear, mobile shops, tailoring, opticals, and daily essentials.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/1-4.webp",
    link: "/rooms?type=Shop Room"
  },
  {
    title: "🍽 Dining",
    description: "Food court units, juice centres, restaurants, snack & tea concepts, rooftop dining.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/31-2.webp",
    link: "/rooms?type=Food Court"
  },
  {
    title: "🎮 Entertainment & Services",
    description: "Gaming centre, gym, salon, studio, laundry, travel agency, business services.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/74-3.webp",
    link: "/rooms"
  },
];

const StoreCategoryCard = ({ category }: { category: Category }) => (
  <div className="px-3 py-2">
    <div className="group relative block overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={category.image}
          alt={category.title}
          width={413}
          height={413}
          className="aspect-square w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-black/30"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-3xl font-semibold text-white leading-tight">{category.title}</h3>
        <p className="mt-2 text-sm text-gray-200 leading-relaxed">{category.description}</p>
        <a 
          href={category.link} 
          className="mt-4 text-base font-semibold text-white hover:text-primary transition-colors duration-300"
        >
          Explore Spaces
        </a>
      </div>
    </div>
  </div>
);

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} !flex items-center justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-md hover:!bg-gray-100 !-left-6 z-10`}
      style={{ ...style, display: "flex"}}
    >
      <ChevronLeft className="text-dark-navy" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} !flex items-center justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-md hover:!bg-gray-100 !-right-6 z-10`}
      style={{ ...style, display: "flex"}}
    >
      <ChevronRight className="text-dark-navy" />
    </button>
  );
};

const StoreCategoriesCarousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 2,
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
              }
          }
      ]
  };

  return (
    <section className="bg-secondary py-20 lg:py-24" data-aos="fade-in" data-aos-duration="1500">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <div className="overflow-hidden">
             <h2 
                className="text-4xl lg:text-[42px] font-semibold text-dark-navy tracking-[-0.3px] leading-tight"
                data-aos="fade-up" 
                data-aos-duration="1000"
              >
                Explore Emall by Experience
              </h2>
          </div>
        </div>
        <div className="relative -mx-3">
          <Slider {...settings}>
            {categories.map((category, index) => (
              <StoreCategoryCard key={index} category={category} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default StoreCategoriesCarousel;