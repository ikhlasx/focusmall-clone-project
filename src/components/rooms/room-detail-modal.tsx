"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Building2, IndianRupee, Calendar } from "lucide-react";
import { DisplayRoom } from "@/lib/room-adapter";

interface RoomDetailModalProps {
  room: DisplayRoom | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDetailModal = ({ room, isOpen, onClose }: RoomDetailModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const isVacant = room.status === "Vacant";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-dark-navy">
              Room #{room.number}
            </h2>
            <p className="text-sm text-medium-gray mt-1">
              {room.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            {room.images && room.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.images.map((img, index) => (
                  <div key={img.id || index} className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                    <Image
                      src={img.image_url}
                      alt={`${room.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-20 h-20 text-primary/30" />
                  <p className="ml-4 text-medium-gray">Room images coming soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Status Badge */}
            <div className="md:col-span-2">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  isVacant
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {room.status}
              </span>
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-dark-navy mb-3">Location Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Building2 className="w-5 h-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-medium-gray">Block</p>
                      <p className="font-medium text-dark-navy">{room.block}</p>
                    </div>
                  </div>
                  {room.floor && (
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-medium-gray">Floor</p>
                        <p className="font-medium text-dark-navy">{room.floor}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-medium-gray">Location</p>
                      <p className="font-medium text-dark-navy">{room.location}</p>
                    </div>
                  </div>
                  {room.description && (
                    <div>
                      <p className="text-sm text-medium-gray">Description</p>
                      <p className="font-medium text-dark-navy">{room.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-dark-navy mb-3">
                Rental Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-medium-gray">Category</p>
                  <p className="font-semibold text-dark-navy">{room.category}</p>
                </div>
                <div>
                  <p className="text-sm text-medium-gray">Rent</p>
                  <p className="text-2xl font-bold text-primary flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {room.rent.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isVacant && (
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                Contact for Booking
              </button>
              <button className="flex-1 bg-gray-100 text-dark-navy py-3 px-6 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                Request More Information
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;

