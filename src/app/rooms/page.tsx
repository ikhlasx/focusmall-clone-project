"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import RoomCard from "@/components/rooms/room-card";
import RoomFilters, { FilterState } from "@/components/rooms/room-filters";
import RoomDetailModal from "@/components/rooms/room-detail-modal";
import { adaptRoomForDisplay, DisplayRoom } from "@/lib/room-adapter";
import { Search, Grid, List, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  
  const [rooms, setRooms] = useState<DisplayRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    block: searchParams.get("block") || "all",
    floor: searchParams.get("floor") || "all",
    status: searchParams.get("status") || "all",
    type: searchParams.get("type") || "all",
    search: searchParams.get("search") || "",
  });
  const [selectedRoom, setSelectedRoom] = useState<DisplayRoom | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Only fetch vacant rooms for public view
        const response = await fetch("/api/rooms?status=vacant");
        if (response.ok) {
          const data = await response.json();
          const adaptedRooms = data.map(adaptRoomForDisplay);
          setRooms(adaptedRooms);
        } else {
          console.error("Failed to fetch rooms");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Get rooms with images for carousel
  const roomsWithImages = useMemo(() => {
    return rooms.filter((room) => room.imageUrl);
  }, [rooms]);

  // Auto-rotate through rooms with images
  useEffect(() => {
    if (roomsWithImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentRoomIndex((prevIndex) => 
        (prevIndex + 1) % roomsWithImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [roomsWithImages.length]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Block filter
      if (filters.block !== "all" && room.block !== filters.block) {
        return false;
      }

      // Status filter (only vacant rooms are shown, but filter can still be applied)
      if (filters.status !== "all") {
        const statusMap: Record<string, string> = {
          vacant: "Vacant",
          rented: "Rented",
          confirmed: "Confirmed",
        };
        if (room.status !== statusMap[filters.status]) {
          return false;
        }
      }

      // Type/Category filter
      if (filters.type !== "all") {
        const categoryLower = room.category.toLowerCase();
        const filterLower = filters.type.toLowerCase();
        
        if (filterLower === "shop room" && !categoryLower.includes("shop")) {
          return false;
        }
        if (filterLower === "business centre" && !categoryLower.includes("business")) {
          return false;
        }
        if (filterLower === "gym" && !categoryLower.includes("gym")) {
          return false;
        }
        if (filterLower === "food court" && !categoryLower.includes("food")) {
          return false;
        }
      }

      // Floor filter
      if (filters.floor !== "all" && room.floor) {
        if (!room.floor.toLowerCase().includes(filters.floor.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableText = `${room.title} ${room.category} ${room.location} ${room.description || ""}`.toLowerCase();
        
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [rooms, filters]);

  const vacantCount = filteredRooms.filter((r) => r.status === "Vacant").length;
  const confirmedCount = filteredRooms.filter((r) => r.status === "Confirmed").length;

  const handleRoomClick = (room: DisplayRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[88px]">
        {/* Hero Section */}
        <section className="relative w-full bg-white overflow-hidden py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              {/* Left Side: Room Image Carousel */}
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
                {roomsWithImages.length > 0 ? (
                  <>
                    {roomsWithImages.map((room, index) => {
                      const isActive = index === currentRoomIndex;
                      return (
                        <div
                          key={room.id}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={room.imageUrl!}
                            alt={room.title}
                            fill
                            className="object-cover rounded-2xl"
                            priority={index === 0}
                          />
                          {/* Room Information Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 rounded-b-2xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="inline-block bg-[#87E9FF] text-black text-xs font-semibold px-3 py-1.5 rounded-md mb-2">
                                  Room #{room.number}
                                </div>
                                <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                                  {room.title}
                                </h3>
                                <p className="text-white/90 text-sm" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                                  {room.location} • {room.category}
                                </p>
                              </div>
                              <div className="bg-[#87E9FF] text-black px-4 py-2 rounded-lg font-semibold text-sm">
                                Available
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* Carousel Indicators */}
                    {roomsWithImages.length > 1 && (
                      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {roomsWithImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentRoomIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentRoomIndex
                                ? 'bg-[#87E9FF] w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to room ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Image
                    src="/emall main 1.jpeg"
                    alt="Modern commercial space at Emall"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                )}
              </div>

              {/* Right Side: Light Blue Content Block */}
              <div className="relative order-1 lg:order-2 flex flex-col gap-4">
                {/* Main Blue Box */}
                <div className="bg-[#87E9FF] rounded-2xl p-6 lg:p-10 relative">
                  {/* Small Label */}
                  <div className="inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                    Available Rooms
                  </div>
                  
                  {/* Main Headline */}
                  <h1 
                    className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight text-black mb-4" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}
                  >
                    Everything you need to<br />
                    Shop, Dine & Grow -<br />
                    All in one place
                  </h1>
                  
                  {/* Sub-headline */}
                  <p 
                    className="text-base lg:text-lg text-black/80 leading-relaxed mb-4" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
                  >
                    A modern commercial destination bringing together retail, food, entertainment, and professional workspaces.
                  </p>
                  
                  {/* Available Rooms Count */}
                  {roomsWithImages.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-black/20">
                      <p className="text-sm text-black/70" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                        <span className="font-semibold text-black">{roomsWithImages.length}</span> rooms available with photos
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Section: CTA Button and Description */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      document.getElementById('rooms-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
                  >
                    Explore Rooms
                    <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </button>
                  
                  {/* Bottom Text */}
                  <p 
                    className="text-sm text-black/60 font-medium text-right sm:text-left" 
                    style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
                  >
                    A growing destination for shopping, dining<br className="hidden sm:block" />
                    & business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Stats */}
        <section id="rooms-content" className="bg-light-background py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <RoomFilters onFilterChange={setFilters} />
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Stats and View Toggle */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-dark-navy mb-3">
                          {filteredRooms.length} Room{filteredRooms.length !== 1 ? "s" : ""} Found
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            <span className="font-semibold">{vacantCount}</span> Vacant
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                            <span className="font-semibold">{confirmedCount}</span> Confirmed
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setViewMode("grid")}
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="icon"
                          className="rounded-sm"
                          aria-label="Grid view"
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => setViewMode("list")}
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="icon"
                          className="rounded-sm"
                          aria-label="List view"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Room Grid/List */}
                {loading ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                      <h3 className="text-xl font-semibold text-dark-navy mb-2">
                        Loading rooms...
                      </h3>
                    </CardContent>
                  </Card>
                ) : filteredRooms.length > 0 ? (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {filteredRooms.map((room) => (
                      <RoomCard
                        key={room.id}
                        room={room}
                        onClick={() => handleRoomClick(room)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-dark-navy mb-2">
                        No rooms found
                      </h3>
                      <p className="text-medium-gray">
                        Try adjusting your filters to see more results.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

