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
    title: "Parking Information",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
  {
    id: "item-2",
    title: "Safety and Security",
    content: "Our trained security team ensures a safe and secure environment for all visitors.",
  },
  {
    id: "item-3",
    title: "Ambulance Service",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
  {
    id: "item-4",
    title: "Lost and Found",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  },
];

const ServicesAccordion = () => {
  return (
    <section className="bg-white py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          <div className="mb-12 flex flex-col justify-center md:mb-0">
            <h2 className="text-[40px] font-bold text-dark-navy leading-[1.2] mb-[30px]">
              Our friendly staff is here to assist you with all your needs
            </h2>
            <a
              href="#"
              className="bg-primary text-primary-foreground text-base font-semibold py-3 px-[25px] rounded-[5px] self-start inline-block w-auto"
            >
              Mall Services
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