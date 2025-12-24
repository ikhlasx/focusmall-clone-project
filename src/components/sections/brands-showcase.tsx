import React from 'react';
import Image from 'next/image';

const brandLogos = [
  {
    name: 'Baby Care',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/30-10.webp',
  },
  {
    name: 'Celio',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/31-11.webp',
  },
  {
    name: 'Crocodile',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/32-12.webp',
  },
  {
    name: 'Espanshe',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/33-13.webp',
  },
  {
    name: 'Max',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/34-14.webp',
  },
  {
    name: 'Acre',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/35-15.webp',
  },
];

const BrandsShowcase = () => {
  return (
    <section className="bg-[#1a1a1a] relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        // Since no specific background image is provided in the assets,
        // this is a conceptual placeholder. The dark section background provides the primary visual.
      ></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-white leading-tight">
            Explore an unparalleled selection of the world's leading brands at Focus
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            From fashion to electronics, beauty to home decor, find everything you need in one place.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 max-w-6xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-6 lg:gap-8 hide-scrollbar">
            {brandLogos.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-xl w-44 h-24 flex items-center justify-center p-4 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={60}
                  className="object-contain h-auto w-auto max-h-[50px] max-w-[120px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default BrandsShowcase;