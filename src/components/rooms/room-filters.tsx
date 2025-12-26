"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { RoomStatus } from "@/lib/room-data";

interface RoomFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  block: string;
  floor: string;
  status: string;
  type: string;
  search: string;
}

const RoomFilters = ({ onFilterChange }: RoomFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    block: "all",
    floor: "all",
    status: "all",
    type: "all",
    search: "",
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      block: "all",
      floor: "all",
      status: "all",
      type: "all",
      search: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = 
    filters.block !== "all" ||
    filters.floor !== "all" ||
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.search !== "";

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold text-dark-navy">Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 bg-primary text-black text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          {isMobileFiltersOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Filter className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isMobileFiltersOpen ? "block" : "hidden"
        } lg:block bg-white rounded-lg shadow-md p-6 mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark-navy">Filter Rooms</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-dark-navy mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, details, or location..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Block Filter */}
          <div>
            <label className="block text-sm font-medium text-dark-navy mb-2">
              Block
            </label>
            <select
              value={filters.block}
              onChange={(e) => handleFilterChange("block", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Blocks</option>
              <option value="A Block">A Block</option>
              <option value="B Block">B Block</option>
            </select>
          </div>

          {/* Floor Filter */}
          <div>
            <label className="block text-sm font-medium text-dark-navy mb-2">
              Floor
            </label>
            <select
              value={filters.floor}
              onChange={(e) => handleFilterChange("floor", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Floors</option>
              <option value="Ground">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
              <option value="Roof">Roof</option>
              <option value="Ladies Corner">Ladies Corner</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-dark-navy mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="Vacant">Vacant</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-dark-navy mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="Shop Room">Shop Room</option>
              <option value="Business Centre">Business Centre</option>
              <option value="Food Court">Food Court</option>
              <option value="Gym">Gym</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomFilters;

