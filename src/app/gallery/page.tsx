"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { X } from "lucide-react";

type GalleryCategory = "All" | "Exterior" | "Dining" | "Fitness" | "Shopping" | "Facilities" | "Meetings" | "Media";

interface GalleryItem {
  id: number;
  name: string;
  category: GalleryCategory;
  imageUrl: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  cloudinary_id: string | null;
  is_visible: boolean;
  created_at: string;
}

const categories: GalleryCategory[] = ["All", "Exterior", "Dining", "Fitness", "Shopping", "Facilities", "Meetings", "Media"];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
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

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedImage?.id);
        if (e.key === "ArrowLeft" && currentIndex > 0) {
          setSelectedImage(filteredItems[currentIndex - 1]);
        } else if (e.key === "ArrowRight" && currentIndex < filteredItems.length - 1) {
          setSelectedImage(filteredItems[currentIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImage, filteredItems]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[88px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">📸 Emall Gallery</h1>
              <p className="text-lg md:text-xl text-white/90">
                A Visual Glimpse of Emall Spaces & Milestones
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-b border-gray-200 sticky top-[88px] z-40">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-dark-navy hover:bg-gray-200"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={categories.indexOf(category) * 50}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-light-background">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-medium-gray">Loading gallery...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-medium-gray text-lg">
                  {selectedCategory === "All"
                    ? "No gallery images available at the moment."
                    : `No images found in category "${selectedCategory}"`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => openLightbox(item)}
                  data-aos="fade-up"
                  data-aos-delay={index % 6 * 100}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-dark-navy font-medium text-sm md:text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {selectedImage && (
              <>
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
                
                {/* Previous Button */}
                {filteredItems.findIndex(item => item.id === selectedImage.id) > 0 && (
                  <button
                    onClick={() => {
                      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                      setSelectedImage(filteredItems[currentIndex - 1]);
                    }}
                    className="absolute left-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {filteredItems.findIndex(item => item.id === selectedImage.id) < filteredItems.length - 1 && (
                  <button
                    onClick={() => {
                      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                      setSelectedImage(filteredItems[currentIndex + 1]);
                    }}
                    className="absolute right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                  <div className="relative w-full h-full max-w-5xl">
                    <Image
                      src={selectedImage.image_url}
                      alt={selectedImage.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white text-lg font-medium">{selectedImage.title}</p>
                    <p className="text-white/70 text-sm mt-1">
                      {filteredItems.findIndex(item => item.id === selectedImage.id) + 1} of {filteredItems.length}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

