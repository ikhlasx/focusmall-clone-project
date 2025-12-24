"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import RoomCard from "@/components/rooms/room-card";
import RoomFilters, { FilterState } from "@/components/rooms/room-filters";
import RoomDetailModal from "@/components/rooms/room-detail-modal";
import { adaptRoomForDisplay, DisplayRoom } from "@/lib/room-adapter";
import { Search, Grid, List, Loader2 } from "lucide-react";

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
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Available Rooms</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Explore our available commercial spaces. Find the perfect location for your business.
            </p>
          </div>
        </section>

        {/* Filters and Stats */}
        <section className="bg-light-background py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <RoomFilters onFilterChange={setFilters} />
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Stats and View Toggle */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-dark-navy mb-2">
                        {filteredRooms.length} Room{filteredRooms.length !== 1 ? "s" : ""} Found
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-medium-gray">
                          <span className="font-semibold text-green-600">{vacantCount}</span> Vacant
                        </span>
                        <span className="text-medium-gray">
                          <span className="font-semibold text-blue-600">{confirmedCount}</span> Confirmed
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "grid"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        aria-label="Grid view"
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "list"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        aria-label="List view"
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Room Grid/List */}
                {loading ? (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                    <h3 className="text-xl font-semibold text-dark-navy mb-2">
                      Loading rooms...
                    </h3>
                  </div>
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
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-dark-navy mb-2">
                      No rooms found
                    </h3>
                    <p className="text-medium-gray">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
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

