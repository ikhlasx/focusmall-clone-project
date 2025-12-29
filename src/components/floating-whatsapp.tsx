"use client";

import Image from "next/image";

const FloatingWhatsApp = () => {
  const phoneNumber = "917994235131"; // WhatsApp format without + or spaces
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-8 right-15 z-50 flex flex-col items-end gap-2">
      {/* Text label */}
      <div className="bg-white text-[#25D366] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
        Click to chat
      </div>
      
      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
        aria-label="Contact us on WhatsApp"
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={60}
          height={60}
          className="group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;

