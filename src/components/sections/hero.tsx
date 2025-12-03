import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          src="https://www.focusmall.in/video/fcs-video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 px-4 flex flex-col items-center">
        <h1
          className="text-white text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight max-w-5xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Shopping, Dining, and Entertainment <br /> at your
          <span className="text-primary"> Favourite destination.</span>
        </h1>
        <div className="mt-8">
          <a
            href="#"
            className="inline-block bg-primary text-primary-foreground font-semibold py-[14px] px-8 rounded-lg text-base transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;