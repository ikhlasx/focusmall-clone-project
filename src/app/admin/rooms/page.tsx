"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Building2,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface RoomImage {
  id: string;
  image_url: string;
  cloudinary_id: string | null;
}

interface Room {
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
  room_images: RoomImage[];
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    fetchRooms();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    setUser(user);
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched rooms:", data);
        setRooms(data || []);
        if (!data || data.length === 0) {
          toast.info("No rooms found. Add your first room to get started!");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", response.status, errorData);
        toast.error(`Failed to fetch rooms: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error(`Failed to fetch rooms: ${error instanceof Error ? error.message : 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (roomId: string, currentStatus: string) => {
    const newStatus = currentStatus === "vacant" ? "rented" : "vacant";

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Room status updated to ${newStatus}`);
        fetchRooms();
      } else {
        toast.error("Failed to update room status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update room status");
    }
  };

  const handleDelete = async () => {
    if (!deleteRoomId) return;

    try {
      const response = await fetch(`/api/rooms/${deleteRoomId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Room deleted successfully");
        fetchRooms();
        setDeleteRoomId(null);
      } else {
        toast.error("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const filteredRooms = rooms.filter((room) => {
    const query = searchQuery.toLowerCase();
    return (
      room.room_number.toLowerCase().includes(query) ||
      room.title.toLowerCase().includes(query) ||
      room.block.toLowerCase().includes(query) ||
      room.category.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-medium-gray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <div className="bg-primary/10 p-2 rounded-lg cursor-pointer hover:bg-primary/20 transition">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-dark-navy">Room Management</h1>
                <p className="text-sm text-medium-gray">Manage all rooms</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/rooms/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </Button>
              </Link>
              <span className="text-sm text-medium-gray">{user?.email}</span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray w-5 h-5" />
            <Input
              placeholder="Search rooms by number, title, block, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-dark-navy">
                        {room.title}
                      </h3>
                      <p className="text-sm text-medium-gray">
                        Room #{room.room_number}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        room.status === "vacant"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-medium-gray">Block:</span>
                      <span className="font-medium">{room.block}</span>
                    </div>
                    {room.floor && (
                      <div className="flex justify-between text-sm">
                        <span className="text-medium-gray">Floor:</span>
                        <span className="font-medium">{room.floor}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-medium-gray">Category:</span>
                      <span className="font-medium">{room.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-medium-gray">Rent:</span>
                      <span className="font-medium">₹{room.rent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ImageIcon className="w-4 h-4 text-medium-gray" />
                      <span className="text-medium-gray">
                        {room.room_images?.length || 0} image(s)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-medium-gray">Status:</span>
                      <Switch
                        checked={room.status === "rented"}
                        onCheckedChange={() =>
                          handleStatusToggle(room.id, room.status)
                        }
                      />
                      <span className="text-sm font-medium">
                        {room.status === "rented" ? "Rented" : "Vacant"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/rooms/${room.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteRoomId(room.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <p className="text-medium-gray">
                  {searchQuery
                    ? "No rooms found matching your search"
                    : "No rooms found. Add your first room to get started."}
                </p>
                {!searchQuery && (
                  <Link href="/admin/rooms/new">
                    <Button className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Room
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteRoomId !== null}
        onOpenChange={(open) => !open && setDeleteRoomId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the room
              and all associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


