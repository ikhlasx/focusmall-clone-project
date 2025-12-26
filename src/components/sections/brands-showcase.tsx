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
    <section className="bg-white py-20 lg:py-28 relative">
      <div className="relative container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-dark-navy leading-tight mb-6">
            Explore leading brands at Emall
          </h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto leading-relaxed">
            From fashion to electronics, beauty to home decor, find everything you need in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-6 lg:gap-8 hide-scrollbar pb-4">
            {brandLogos.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white border border-gray-200 rounded-xl w-44 h-24 flex items-center justify-center p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-primary/30"
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