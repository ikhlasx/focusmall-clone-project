"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

const UpcomingAtEmall = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionItems = [
    {
      id: 1,
      title: "Fast-Food & Fried Chicken",
      imageUrl: "/food.jpg",
    },
    {
      id: 2,
      title: "Food Court & Dining",
      imageUrl: "/food court.jpg",
    },
    {
      id: 3,
      title: "Supermarket & Retail",
      imageUrl: "/supermarket.jpg",
    },
    {
      id: 4,
      title: "Shopping & Fashion",
      imageUrl: "/retail 1.jpg",
    },
    {
      id: 5,
      title: "Premium Retail Spaces",
      imageUrl: "/retail 3.jpg",
    },
    {
      id: 6,
      title: "Entertainment & Lifestyle",
      imageUrl: "/retail 5.jpg",
    },
    {
      id: 7,
      title: "Rooftop Experiences",
      imageUrl: "/roof.jpg",
    },
  ];

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 lg:py-28 bg-white" id="upcoming">
      <div className="container mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tighter mb-6">
              Discover What's Coming
            </h3>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 mb-8">
              From fast-food favorites to premium retail experiences, Emall is bringing together the best brands and experiences under one roof.
            </p>
            <div className="mt-8">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-300"
              >
                Explore Business Opportunities
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Accordion Item Component
const AccordionItem = ({ 
  item, 
  isActive, 
  onMouseEnter 
}: { 
  item: { id: number; title: string; imageUrl: string }; 
  isActive: boolean; 
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-80'
        }`}
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; 
        }}
      />
      {/* Very subtle gradient overlay only at bottom for text readability */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-[1] pointer-events-none"></div>
      )}

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap z-[2]
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export default UpcomingAtEmall;
