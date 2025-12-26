"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  cloudinary_id: string | null;
  is_visible: boolean;
  created_at: string;
}

const categories = ["All", "Exterior", "Dining", "Fitness", "Shopping", "Facilities", "Meetings", "Media"];

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image_url: "",
    cloudinary_id: "",
    is_visible: true,
  });
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    fetchGallery();
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

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery?admin=true");
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category || "",
        image_url: item.image_url,
        cloudinary_id: item.cloudinary_id || "",
        is_visible: item.is_visible,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        category: "",
        image_url: "",
        cloudinary_id: "",
        is_visible: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      category: "",
      image_url: "",
      cloudinary_id: "",
      is_visible: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "emall/gallery");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData({
        ...formData,
        image_url: data.imageUrl,
        cloudinary_id: data.publicId,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      alert("Title and image are required");
      return;
    }

    setUploading(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category || null,
        image_url: formData.image_url,
        cloudinary_id: formData.cloudinary_id || null,
        is_visible: formData.is_visible,
      };

      const url = editingItem ? `/api/gallery/${editingItem.id}` : "/api/gallery";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        handleCloseDialog();
        fetchGallery();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save gallery item");
      }
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Failed to save gallery item");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchGallery();
      } else {
        alert("Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert("Failed to delete gallery item");
    }
  };

  const handleToggleVisibility = async (item: GalleryItem) => {
    try {
      const response = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_visible: !item.is_visible }),
      });

      if (response.ok) {
        fetchGallery();
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

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
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark-navy">Gallery Management</h1>
                <p className="text-sm text-medium-gray">Manage gallery images</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <span className="text-sm text-medium-gray">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark-navy">Gallery Images</h2>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Image
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {!item.is_visible && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Hidden</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.category && (
                  <p className="text-sm text-medium-gray">Category: {item.category}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(item)}
                    title={item.is_visible ? "Hide" : "Show"}
                  >
                    {item.is_visible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredItems.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center">
                <p className="text-medium-gray">
                  {selectedCategory === "All"
                    ? "No gallery items found. Add your first image!"
                    : `No items found in category "${selectedCategory}"`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Add/Edit Gallery Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-navy mb-1">Image Name (Caption) *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-navy mb-1">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-navy mb-1">Image *</label>
              {formData.image_url ? (
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={formData.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, image_url: "", cloudinary_id: "" })
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-2"
                    disabled={uploading}
                  />
                  {uploading && <p className="text-sm text-medium-gray">Uploading...</p>}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_visible"
                checked={formData.is_visible}
                onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_visible" className="text-sm font-medium text-dark-navy">
                Visible on website
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading || !formData.image_url}>
                {uploading ? "Saving..." : editingItem ? "Update" : "Add Image"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}






