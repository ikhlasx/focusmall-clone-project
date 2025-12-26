import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { href: "/rooms", label: "Available Rooms" },
    { href: "https://maps.app.goo.gl/Snao92thQXErENgh8", label: "Floor Map", external: true },
    { href: "/rooms?type=Business Centre", label: "Business Centre" },
    { href: "#events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-secondary text-muted-foreground w-full">
      <div className="container mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and Socials */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/emall.png"
                alt="E-Mall Logo"
                width={160}
                height={42}
                className="h-auto"
              />
            </Link>
            <p className="text-xs text-muted-foreground tracking-wider uppercase">World Class Shopping & Business Destination</p>
            <div className="flex space-x-4 pt-2">
              <a href="https://wa.me/+917736446513" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-foreground hover:text-primary transition-colors">
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

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a 
                      href={link.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-base hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact</h3>
            <div className="space-y-3 text-base">
              <p>
                Emal Manjeri Global LLP (EMALCO)<br />
                Thurakkal Baputty Bypass,<br />
                Manjeri, Pin: 676121,<br />
                Malappuram Dt.<br />
                Kerala, India.
              </p>
              <p>
                <a href="tel:+917736446513" className="hover:text-primary transition-colors">
                 +91 7736446513
                </a>
              </p>
              <p>
                <a href="mailto:info@emalmanjeri.com" className="hover:text-primary transition-colors">
                  info@emalmanjeri.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Mall Map */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Explore Emall</h3>
            <p className="text-base text-muted-foreground mb-6">
              Download our interactive mall map to explore all floors and blocks.
            </p>
            <a
              href="https://maps.app.goo.gl/Snao92thQXErENgh8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black py-3 px-6 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              Get Mall Map
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-16 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024. All rights reserved Emall | designed by rowbest technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;