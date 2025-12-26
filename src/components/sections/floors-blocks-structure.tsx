"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, ArrowRight, Utensils, ShoppingBag, Store, ShoppingCart, Dumbbell, Briefcase } from "lucide-react";
import { useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/flip-reveal";

interface FloorData {
  block: string;
  floor: string;
  emoji: string;
  title: string;
  description: string;
  icon: any;
  link: string;
  image: string;
  flipKey: string;
}

const FloorsBlocksStructure = () => {
  const [activeBlock, setActiveBlock] = useState<"A Block" | "B Block">("A Block");

  const aBlockFloors: FloorData[] = [
    {
      block: "A Block",
      floor: "Roof",
      emoji: "🍽",
      title: "Rooftop Restaurant & Semi-Kitchen",
      description: "Elevated dining experience with premium visibility",
      icon: Utensils,
      link: "/rooms?block=A Block&floor=Roof",
      image: "/roof.jpg",
      flipKey: "a-block-roof"
    },
    {
      block: "A Block",
      floor: "3rd Floor",
      emoji: "🍔",
      title: "Food Court & Quick Bites",
      description: "High-footfall food and snack concepts",
      icon: Utensils,
      link: "/rooms?block=A Block&floor=3rd Floor",
      image: "/food court.jpg",
      flipKey: "a-block-3rd"
    },
    {
      block: "A Block",
      floor: "2nd Floor",
      emoji: "🛍",
      title: "Retail Shops",
      description: "Fashion, lifestyle, electronics & essentials",
      icon: ShoppingBag,
      link: "/rooms?block=A Block&floor=2nd Floor",
      image: "/retail 1.jpg",
      flipKey: "a-block-2nd"
    },
    {
      block: "A Block",
      floor: "1st Floor",
      emoji: "🛒",
      title: "Daily Retail & Services",
      description: "Everyday shopping and service outlets",
      icon: Store,
      link: "/rooms?block=A Block&floor=1st Floor",
      image: "/retail 2.jpg",
      flipKey: "a-block-1st"
    },
  ];

  const bBlockFloors: FloorData[] = [
    {
      block: "B Block",
      floor: "Ground Floor",
      emoji: "🏪",
      title: "Supermarket & China Mart",
      description: "Anchor stores driving consistent footfall",
      icon: ShoppingCart,
      link: "/rooms?block=B Block&floor=Ground",
      image: "/supermarket.jpg",
      flipKey: "b-block-ground"
    },
    {
      block: "B Block",
      floor: "2nd Floor",
      emoji: "🏋️",
      title: "Gym & Ladies Corner",
      description: "Wellness, fashion & women-focused brands",
      icon: Dumbbell,
      link: "/rooms?block=B Block&floor=2nd Floor",
      image: "/BLOCK B/SECOND FLOOR/VIEWS_1 - Photo.jpg",
      flipKey: "b-block-2nd"
    },
    {
      block: "B Block",
      floor: "Business Centre",
      emoji: "🏢",
      title: "Offices & Workspaces",
      description: "Professional offices inside a commercial hub",
      icon: Briefcase,
      link: "/rooms?type=Business Centre",
      image: "/BLOCK B/THIRD FLOOR/VIEWS_1 - Photo.jpg",
      flipKey: "b-block-business"
    },
  ];

  const allFloors = [...aBlockFloors, ...bBlockFloors];
  const currentFloors = activeBlock === "A Block" ? aBlockFloors : bBlockFloors;
  const activeKeys = currentFloors.map(floor => floor.flipKey);

  return (
    <section className="py-20 bg-white" id="floors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-dark-navy mb-4">
            Explore Emall by Block & Floor
          </h2>
          <p className="text-lg text-medium-gray max-w-3xl mx-auto">
            Discover thoughtfully planned retail, dining, and business zones across A Block and B Block — each floor designed for a specific experience.
          </p>
        </div>

        {/* Block Tabs */}
        <div className="flex justify-center mb-10" data-aos="fade-up">
          <div className="inline-flex bg-light-background rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setActiveBlock("A Block")}
              className={`px-6 py-3 rounded-md font-semibold text-base transition-all duration-300 ${
                activeBlock === "A Block"
                  ? "bg-primary text-black shadow-md"
                  : "text-dark-navy hover:text-primary"
              }`}
            >
              A Block
            </button>
            <button
              onClick={() => setActiveBlock("B Block")}
              className={`px-6 py-3 rounded-md font-semibold text-base transition-all duration-300 ${
                activeBlock === "B Block"
                  ? "bg-primary text-black shadow-md"
                  : "text-dark-navy hover:text-primary"
              }`}
            >
              B Block
            </button>
          </div>
        </div>

        {/* Floor Cards with FlipReveal */}
        <FlipReveal
          keys={activeKeys}
          showClass="block"
          hideClass="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allFloors.map((floor) => {
            const Icon = floor.icon;
            
            return (
              <FlipRevealItem
                key={floor.flipKey}
                flipKey={floor.flipKey}
                className="block"
              >
                <Link
                  href={floor.link}
                  className="group bg-light-background rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary hover:-translate-y-1 block"
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={floor.image}
                      alt={floor.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="text-2xl">{floor.emoji}</div>
                      <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <span className="text-xs font-semibold text-black">{floor.block}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-dark-navy mb-1">{floor.floor}</h3>
                        <h4 className="text-base font-semibold text-dark-navy mb-2">{floor.title}</h4>
                        <p className="text-sm text-medium-gray leading-relaxed">{floor.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-medium-gray group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {floor.floor === "Roof" && "View Floor Details"}
                        {floor.floor === "3rd Floor" && "Explore Food Zone"}
                        {floor.floor === "2nd Floor" && floor.block === "A Block" && "View Retail Floor"}
                        {floor.floor === "2nd Floor" && floor.block === "B Block" && "Explore Zone"}
                        {floor.floor === "1st Floor" && "Explore Shops"}
                        {floor.floor === "Ground Floor" && "View Anchor Zone"}
                        {floor.floor === "Business Centre" && "Visit Business Centre"}
                      </span>
                    </div>
                  </div>
                </Link>
              </FlipRevealItem>
            );
          })}
        </FlipReveal>
      </div>
    </section>
  );
};

export default FloorsBlocksStructure;
