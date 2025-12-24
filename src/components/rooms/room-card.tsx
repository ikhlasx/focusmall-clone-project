"use client";

import Image from "next/image";
import { DisplayRoom } from "@/lib/room-adapter";
import { MapPin, IndianRupee, Building2 } from "lucide-react";

interface RoomCardProps {
  room: DisplayRoom;
  onClick: () => void;
}

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const isVacant = room.status === "Vacant";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 group"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
        {room.imageUrl ? (
          <Image
            src={room.imageUrl}
            alt={room.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-16 h-16 text-primary/30" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isVacant
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {room.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-dark-navy mb-1 line-clamp-1">
              {room.title}
            </h3>
            <p className="text-sm text-medium-gray">{room.category}</p>
          </div>
          <span className="text-2xl font-bold text-primary">#{room.number}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-medium-gray">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="line-clamp-1">{room.location}</span>
          </div>
          <div className="flex items-center text-sm text-medium-gray">
            <Building2 className="w-4 h-4 mr-2 text-primary" />
            <span>{room.block}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-medium-gray">Rent</p>
              <p className="text-lg font-bold text-dark-navy">
                <IndianRupee className="w-4 h-4 inline" />
                {room.rent.toLocaleString("en-IN")}
              </p>
            </div>
            {room.floor && (
              <div className="text-right">
                <p className="text-xs text-medium-gray">Floor</p>
                <p className="text-sm font-medium text-dark-navy">{room.floor}</p>
              </div>
            )}
          </div>
        </div>

        {isVacant && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;

