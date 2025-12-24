"use client";

import { Sparkles, ShoppingBag, Utensils, Gamepad2, Briefcase, Eye, Smartphone, Monitor } from "lucide-react";

const UpcomingAtEmall = () => {
  const upcomingItems = [
    {
      icon: Utensils,
      title: "Burger & Fried Chicken Brands",
      description: "Premium fast-food concepts coming soon"
    },
    {
      icon: Utensils,
      title: "Tea & Snack Concepts",
      description: "Variety of snacks with tea options"
    },
    {
      icon: Eye,
      title: "Optical Store",
      description: "Eyewear and vision care services"
    },
    {
      icon: Smartphone,
      title: "Mobile & Computer Shop",
      description: "Latest gadgets and tech solutions"
    },
    {
      icon: ShoppingBag,
      title: "Ladies Footwear & Fancy Centre",
      description: "Fashion-forward footwear and accessories"
    },
    {
      icon: Gamepad2,
      title: "Gaming & Entertainment Zone",
      description: "Computer game centre and fun activities"
    },
    {
      icon: Briefcase,
      title: "Co-working & Startup Offices",
      description: "Flexible workspace for entrepreneurs"
    },
  ];

  return (
    <section className="py-20 bg-white" id="upcoming">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy">
              What's Coming Soon at Emall
            </h2>
          </div>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Discover exciting new brands and services launching at Emall. Join us in building a vibrant commercial community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-medium-gray">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-medium-gray mb-4">
            Interested in opening your business at Emall?
          </p>
          <a
            href="/rooms"
            className="inline-block text-primary font-semibold text-lg hover:text-dark-navy transition-colors duration-300"
          >
            <span className="border-b-2 border-primary pb-1">View Available Spaces</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingAtEmall;

