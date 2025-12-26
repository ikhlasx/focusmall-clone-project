"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import { shopRooms, businessCentreRooms, isShopRoom } from "@/lib/room-data";

const AvailableRoomsPreview = () => {
  // Get a few vacant rooms for preview
  const vacantShopRooms = shopRooms
    .filter((room) => room.status === "Vacant")
    .slice(0, 3);
  
  const vacantBusinessRooms = businessCentreRooms
    .filter((room) => room.status === "Vacant")
    .slice(0, 2);

  const previewRooms = [...vacantShopRooms, ...vacantBusinessRooms].slice(0, 6);
  const totalVacant = shopRooms.filter((r) => r.status === "Vacant").length + 
                      businessCentreRooms.filter((r) => r.status === "Vacant").length;

  return (
    <section className="py-20 bg-light-background" id="available-rooms">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Available Commercial Spaces at Emall
          </h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Browse vacant shops, food units, and business rooms across A Block and B Block.
            Each space is curated to suit retail, food, services, and professional businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {previewRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              {/* Image Section */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                {room.imageUrl ? (
                  <Image
                    src={room.imageUrl}
                    alt={isShopRoom(room) ? room.shopDetails : room.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-primary/30" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Vacant
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-navy mb-1 line-clamp-1">
                      {isShopRoom(room) ? room.shopDetails : room.name}
                    </h3>
                    <div className="flex items-center text-sm text-medium-gray mt-2">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      <span>{room.location}</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">#{room.number}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  {isShopRoom(room) ? (
                    <p className="text-sm text-medium-gray">
                      Rent: <span className="font-semibold text-dark-navy">₹{room.rentPerSqFt}/sq.ft</span>
                    </p>
                  ) : (
                    <p className="text-sm text-medium-gray">
                      Rate: <span className="font-semibold text-dark-navy">₹{room.rate.toLocaleString("en-IN")}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" data-aos="fade-up">
          <div className="mb-6">
            <p className="text-lg text-medium-gray mb-2">
              <span className="text-3xl font-bold text-primary">{totalVacant}+</span>{" "}
              <span className="text-dark-navy">Vacant Spaces Available</span>
            </p>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-primary text-black font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105"
          >
            View All Available Rooms
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AvailableRoomsPreview;

