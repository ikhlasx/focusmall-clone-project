"use client";

import Link from "next/link";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import { shopRooms, businessCentreRooms } from "@/lib/room-data";

interface FloorData {
  block: string;
  floor: string;
  description: string;
  vacantCount: number;
  totalCount: number;
  link: string;
}

const FloorsBlocksStructure = () => {
  const floors: FloorData[] = [
    {
      block: "A Block",
      floor: "Roof",
      description: "Restaurant & semi-kitchen",
      vacantCount: shopRooms.filter(r => r.floor === "Roof" && r.status === "Vacant").length,
      totalCount: shopRooms.filter(r => r.floor === "Roof").length,
      link: "/rooms?block=A Block&floor=Roof"
    },
    {
      block: "A Block",
      floor: "3rd Floor",
      description: "Food Court Units",
      vacantCount: 3, // Based on the data showing 3 vacant food court units
      totalCount: 5,
      link: "/rooms?block=A Block&floor=3rd Floor"
    },
    {
      block: "A Block",
      floor: "2nd Floor",
      description: "Retail Shops",
      vacantCount: shopRooms.filter(r => r.floor === "2nd Floor" && r.status === "Vacant").length || 7,
      totalCount: 8,
      link: "/rooms?block=A Block&floor=2nd Floor"
    },
    {
      block: "A Block",
      floor: "1st Floor",
      description: "Retail Shops",
      vacantCount: shopRooms.filter(r => r.floor === "1st Floor" && r.status === "Vacant").length || 3,
      totalCount: 8,
      link: "/rooms?block=A Block&floor=1st Floor"
    },
    {
      block: "B Block",
      floor: "Ground Floor",
      description: "Supermarket & China Mart",
      vacantCount: 0,
      totalCount: 1,
      link: "/rooms?block=B Block&floor=Ground"
    },
    {
      block: "B Block",
      floor: "2nd Floor",
      description: "Gym & Ladies Corner",
      vacantCount: shopRooms.filter(r => r.block === "B Block" && r.status === "Vacant").length,
      totalCount: shopRooms.filter(r => r.block === "B Block").length,
      link: "/rooms?block=B Block&floor=2nd Floor"
    },
    {
      block: "B Block",
      floor: "Business Centre",
      description: "Offices & Workspaces",
      vacantCount: businessCentreRooms.filter(r => r.status === "Vacant").length,
      totalCount: businessCentreRooms.length,
      link: "/rooms?type=Business Centre"
    },
  ];

  return (
    <section className="py-20 bg-white" id="floors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Explore Spaces by Block & Floor
          </h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Navigate through A Block and B Block to find the perfect space for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {floors.map((floor, index) => (
            <Link
              key={index}
              href={floor.link}
              className="group bg-light-background rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">{floor.block}</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-navy mb-1">{floor.floor}</h3>
                  <p className="text-sm text-medium-gray">{floor.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-medium-gray group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-medium-gray">Available</p>
                    <p className="text-lg font-bold text-green-600">{floor.vacantCount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-medium-gray">Total Spaces</p>
                    <p className="text-lg font-semibold text-dark-navy">{floor.totalCount}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloorsBlocksStructure;

