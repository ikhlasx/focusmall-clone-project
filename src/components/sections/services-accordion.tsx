"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

const accordionItems = [
  {
    id: "item-1",
    title: "Parking Facility",
    content:
      "Convenient parking spaces available for visitors and tenants. Secure parking area with easy access to all blocks and floors.",
  },
  {
    id: "item-2",
    title: "24×7 Security",
    content: "Round-the-clock security surveillance and trained security personnel ensure a safe and secure environment for all visitors, tenants, and their businesses.",
  },
  {
    id: "item-3",
    title: "Lift & Accessibility",
    content:
      "Modern elevator systems and accessible facilities throughout A Block and B Block, ensuring easy movement for all visitors and tenants.",
  },
  {
    id: "item-4",
    title: "Ambulance Access",
    content:
      "Emergency medical services and ambulance access available for immediate response to any medical emergencies on the premises.",
  },
  {
    id: "item-5",
    title: "Power Backup",
    content:
      "Uninterrupted power supply with backup generators to ensure business continuity and comfort for all tenants and visitors.",
  },
  {
    id: "item-6",
    title: "Maintenance Support",
    content:
      "Dedicated maintenance team available for regular upkeep, repairs, and support services to keep the mall in excellent condition.",
  },
  {
    id: "item-7",
    title: "Lost & Found",
    content:
      "Centralized lost and found service to help visitors recover misplaced items. Contact mall management for assistance.",
  },
];

const ServicesAccordion = () => {
  return (
    <section className="bg-white py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          <div className="mb-12 flex flex-col justify-center md:mb-0">
            <h2 className="text-[40px] font-bold text-dark-navy leading-[1.2] mb-[30px]">
              Mall Services & Facilities
            </h2>
            <p className="text-medium-gray text-base leading-[1.7] mb-6">
              Emall provides comprehensive facilities and services to ensure a seamless experience for tenants and visitors.
            </p>
            <a
              href="/rooms"
              className="bg-primary text-primary-foreground text-base font-semibold py-3 px-[25px] rounded-[5px] self-start inline-block w-auto hover:bg-primary/90 transition-colors"
            >
              View Available Spaces
            </a>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {accordionItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="group text-left text-xl font-medium text-dark-navy hover:no-underline py-5 [&>svg]:hidden">
                    <span className="flex-1">{item.title}</span>
                    <div className="relative h-6 w-6 shrink-0 ml-4">
                      <Plus className="h-full w-full transition-opacity duration-300 group-data-[state=open]:opacity-0" />
                      <Minus className="absolute inset-0 h-full w-full transition-opacity duration-300 opacity-0 group-data-[state=open]:opacity-100" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-5">
                    <p className="text-base text-muted-foreground leading-[1.7]">
                      {item.content}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;