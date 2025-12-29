"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

const HeroSection = () => {
  const images = [
    '/emall main 1.jpeg',
    '/emall main 2.jpeg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full bg-white overflow-hidden py-12 lg:py-16">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 pt-[128px] pb-[67px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Side: Image Carousel */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Modern commercial space at Emall"
                fill
                className={`object-cover rounded-2xl transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                priority={index === 0}
                style={{ position: 'absolute' }}
              />
            ))}
          </div>

          {/* Right Side: Light Blue Content Block */}
          <div className="relative order-1 lg:order-2 flex flex-col gap-4" data-aos="fade-left" data-aos-duration="1000">
            {/* Main Blue Box */}
            <div className="bg-[#87E9FF] rounded-2xl p-6 lg:p-10 relative">
              {/* Small Emall Label */}
              <div className="inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-4" style={{ fontFamily: '"Red Hat Display", sans-serif' }}>
                Emall
              </div>
              
              {/* Main Headline */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight text-black mb-4" 
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700 }}
              >
                Everything you need to<br />
                Shop, Dine & Grow -<br />
                All in one place
              </h1>
              
              {/* Sub-headline */}
              <p 
                className="text-base lg:text-lg text-black/80 leading-relaxed" 
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
              >
                A modern commercial destination bringing together retail, food, entertainment, and professional workspaces.
              </p>
            </div>

            {/* Bottom Section: CTA Button and Description */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* CTA Button */}
              <Link 
                href="#explore" 
                className="inline-flex items-center gap-2 bg-[#87E9FF] text-black hover:bg-[#87E9FF]/90 border border-black/10 text-base px-6 py-3 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
              >
                Explore Emall
                <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
              </Link>
              
              {/* Bottom Text */}
              <p 
                className="text-sm text-black/60 font-medium text-right sm:text-left" 
                style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 400 }}
              >
                A growing destination for shopping, dining<br className="hidden sm:block" />
                & business
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
