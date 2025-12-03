import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const findStoresLinks = [
    { href: "#", label: "Shopping" },
    { href: "#", label: "Dinning" },
    { href: "#", label: "Entertainment" },
  ];

  const quickLinks = [
    { href: "#", label: "Mall Services" },
    { href: "#", label: "About" },
    { href: "#", label: "Events" },
    { href: "#", label: "Shop" },
    { href: "#", label: "Floor" },
    { href: "#", label: "Gallery" },
    { href: "#", label: "Contact" },
  ];

  return (
    <footer className="bg-secondary text-muted-foreground w-full">
      <div className="container mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and Socials */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/fcslog-1.webp"
                alt="Focus Mall Logo"
                width={160}
                height={42}
                className="h-auto"
              />
            </Link>
            <p className="text-xs text-muted-foreground tracking-wider uppercase">world class shopping</p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="WhatsApp" className="text-foreground hover:text-primary transition-colors">
                <MessageCircle size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="text-foreground hover:text-primary transition-colors">
                <Instagram size={22} />
              </a>
              <a href="#" aria-label="Facebook" className="text-foreground hover:text-primary transition-colors">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Find Stores */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Find Stores</h3>
            <ul className="space-y-3">
              {findStoresLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-base hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-base hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Find Stores</h3>
            <div className="space-y-3 text-base">
              <p>#417, Rajaji Road, Calicut-673 004, India</p>
              <p>
                <a href="tel:+917736446513" className="hover:text-primary transition-colors">
                  +91 7736 446 513
                </a>
              </p>
              <p>
                <a href="https://www.focusmall.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  www.focusmall.in
                </a>
              </p>
            </div>
            <a
              href="#"
              className="mt-6 inline-block bg-[#1e3a5f] text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Get Mall Map
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-16 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024. All rights reserved focusmall | designed by rowbest technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;