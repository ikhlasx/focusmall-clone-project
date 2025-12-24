"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';

const WelcomeSection = () => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const counterBoxRef = useRef<HTMLDivElement>(null);
  const target = 210;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = counterBoxRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const stepTime = Math.max(1, Math.floor(duration / target));
      let currentCount = 0;
      
      const timer = setInterval(() => {
        currentCount++;
        setCount(currentCount);
        if (currentCount >= target) {
          clearInterval(timer);
          setCount(target);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <section className="relative bg-secondary py-20 lg:py-24 overflow-x-clip">
      <div className="absolute top-0 right-0 w-[250px] h-[250px] md:w-[350px] md:h-[350px] -translate-y-1/4 translate-x-1/4 hidden lg:block z-0">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/rnd-5.webp"
          alt="decorative round element"
          fill
          className="object-contain opacity-50"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[350px] md:h-[350px] translate-y-1/3 -translate-x-1/3 hidden lg:block z-0">
         <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/rnd-5.webp"
          alt="decorative round element"
          fill
          className="object-contain opacity-50"
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
            <video
              src="https://www.focusmall.in/video/mnvid.MP4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div ref={counterBoxRef} className="absolute bottom-5 left-5 bg-primary p-4 rounded-lg text-center w-auto">
                <p className="text-white text-5xl font-bold leading-none">+{count}</p>
                <p className="text-white text-base font-medium mt-1">Commercial Spaces</p>
            </div>
          </div>

          <div className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-[36px] lg:text-[42px] font-semibold text-dark-navy leading-tight mb-5">
              Welcome to Emall — A Growing Commercial Destination
            </h2>
            <p className="text-medium-gray text-[16px] leading-[1.7] mb-8">
              Emall is designed as a multi-purpose commercial hub bringing together shopping, dining, entertainment, and business spaces.
              Strategically divided into A Block and B Block, Emall offers flexible shop sizes, business rooms, and premium locations tailored for both startups and established brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0 w-fit">
              <a href="#floors" className="text-primary font-semibold text-lg hover:text-dark-navy transition-colors duration-300">
                <span className="border-b-2 border-primary pb-1">Explore Floors</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/Snao92thQXErENgh8" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold text-lg hover:text-dark-navy transition-colors duration-300"
              >
                <span className="border-b-2 border-primary pb-1">Download Mall Map</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;