"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";

type ProfilePicture = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type SloganSliderProps = React.ComponentProps<"div"> & {
  slogan: string;
  profilePictures: ProfilePicture[];
};

export function SloganSlider({ 
  slogan, 
  profilePictures,
  className,
  ...props 
}: SloganSliderProps) {
  // Create items array: slogan, profile, slogan, profile, etc.
  const items: React.ReactNode[] = [];
  
  // We'll create multiple repetitions of the pattern
  // Pattern: slogan, profile, slogan, profile, etc.
  for (let i = 0; i < 15; i++) {
    items.push(
      <span 
        key={`slogan-${i}`}
        className="text-black font-medium text-base md:text-lg whitespace-nowrap inline-flex items-center"
        style={{ fontFamily: '"Red Hat Display", sans-serif' }}
      >
        {slogan}
      </span>
    );
    
    // Add profile pictures after each slogan
    profilePictures.forEach((profile, idx) => {
      items.push(
        <div
          key={`profile-${i}-${idx}`}
          className="flex-shrink-0 rounded-full overflow-hidden inline-flex items-center"
          style={{ width: '48px', height: '48px' }}
        >
          <Image
            src={profile.src}
            alt={profile.alt}
            width={profile.width || 48}
            height={profile.height || 48}
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        </div>
      );
    });
  }

  return (
    <div 
      className={`relative mx-auto max-w-full bg-white py-4 md:py-6 ${className || ''}`}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-black/10" />

      <InfiniteSlider gap={24} reverse speed={60} speedOnHover={20}>
        {items}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-black/10" />
    </div>
  );
}

