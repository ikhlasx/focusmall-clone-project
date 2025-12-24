// Adapter to convert database room format to display format

interface DatabaseRoom {
  id: string;
  room_number: string;
  title: string;
  block: string;
  floor: string | null;
  category: string;
  rent: number;
  status: "vacant" | "rented";
  description: string | null;
  created_at: string;
  room_images: Array<{
    id: string;
    image_url: string;
    cloudinary_id: string | null;
  }>;
}

export interface DisplayRoom {
  id: string;
  number: string;
  title: string;
  block: string;
  floor?: string;
  category: string;
  rent: number;
  status: "Vacant" | "Rented" | "Confirmed";
  description?: string;
  imageUrl?: string;
  images?: Array<{ id: string; image_url: string }>;
  location: string;
}

export function adaptRoomForDisplay(room: DatabaseRoom): DisplayRoom {
  // Get first image as primary image
  const primaryImage = room.room_images?.[0]?.image_url;

  // Create location string
  const locationParts = [room.block];
  if (room.floor) {
    locationParts.push(room.floor);
  }
  const location = locationParts.join(" / ");

  // Map status
  const statusMap: Record<string, "Vacant" | "Rented" | "Confirmed"> = {
    vacant: "Vacant",
    rented: "Rented",
    confirmed: "Confirmed",
  };

  return {
    id: room.id,
    number: room.room_number,
    title: room.title,
    block: room.block,
    floor: room.floor || undefined,
    category: room.category,
    rent: room.rent,
    status: statusMap[room.status.toLowerCase()] || "Vacant",
    description: room.description || undefined,
    imageUrl: primaryImage,
    images: room.room_images?.map((img) => ({
      id: img.id,
      image_url: img.image_url,
    })),
    location,
  };
}


