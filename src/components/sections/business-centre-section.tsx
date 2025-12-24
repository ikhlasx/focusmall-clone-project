"use client";

import Link from "next/link";
import { Building2, IndianRupee, ArrowRight, Users } from "lucide-react";
import { businessCentreRooms } from "@/lib/room-data";

const BusinessCentreSection = () => {
  const businessTypes = [
    {
      type: "MINI ROOMS",
      rate: 10000,
      period: "month",
      available: businessCentreRooms.find(r => r.type === "MINI ROOMS")?.quantity || 13,
      description: "Perfect for startups and small teams"
    },
    {
      type: "LARGE ROOMS",
      rate: 13000,
      period: "month",
      available: businessCentreRooms.find(r => r.type === "LARGE ROOMS")?.quantity || 3,
      description: "Ideal for growing businesses"
    },
    {
      type: "DAILY WORK SPACE",
      rate: 300,
      period: "day",
      available: businessCentreRooms.find(r => r.type === "DAILY WORK SPACE")?.quantity || 2,
      description: "Flexible daily workspace solutions"
    },
    {
      type: "WEEKLY WORK SPACE",
      rate: 3000,
      period: "week",
      available: businessCentreRooms.find(r => r.type === "WEEKLY WORK SPACE")?.quantity || 2,
      description: "Short-term workspace options"
    },
    {
      type: "WORK SPACE MONTHLY",
      rate: 6000,
      period: "month",
      available: businessCentreRooms.find(r => r.type === "WORK SPACE MONTHLY")?.quantity || 12,
      description: "Monthly workspace packages"
    },
    {
      type: "S.P WORK SPACE",
      rate: 8000,
      period: "month",
      available: businessCentreRooms.find(r => r.type === "S.P WORK SPACE")?.quantity || 8,
      description: "Special private workspace solutions"
    },
  ];

  return (
    <section className="py-20 bg-light-background" id="business-centre">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Emall Business Centre
          </h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Flexible office and workspace solutions for professionals, startups, and service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {businessTypes.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-navy">{item.type}</h3>
                  <p className="text-xs text-medium-gray">{item.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-medium-gray mb-1">Rate</p>
                    <p className="text-2xl font-bold text-primary flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {item.rate.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-medium-gray ml-1">/{item.period}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-medium-gray mb-1">Available</p>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-green-600" />
                      <p className="text-lg font-bold text-green-600">{item.available}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/rooms?type=Business Centre"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105"
          >
            Enquire for Business Space
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessCentreSection;

