"use client";

import { SloganSlider } from "@/components/ui/slogan-slider";

// Example profile picture - replace this with your actual profile image
const defaultProfilePictures = [
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    alt: "Profile",
    width: 48,
    height: 48,
  },
];

type SloganBannerProps = {
  slogan?: string;
  profilePictures?: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
};

export function SloganBanner({ 
  slogan = "Shopping, Dining & Business Spaces - All Under One Roof",
  profilePictures = defaultProfilePictures 
}: SloganBannerProps) {
  return (
    <section className="w-full bg-white">
      <SloganSlider 
        slogan={slogan}
        profilePictures={profilePictures}
      />
    </section>
  );
}

