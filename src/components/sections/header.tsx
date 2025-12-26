"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/rooms", label: "Available Rooms" },
];

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const headerStyle = isScrolled
    ? "bg-white shadow-md"
    : "bg-white";
  const linkColor = "text-dark-navy";
  const iconColor = "text-dark-navy";
  const logoSrc = "/emall.png";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle}`}>
        <div className="container mx-auto flex items-center justify-between h-[88px] px-6 lg:px-8">
          <Link href="/" aria-label="E-Mall Home">
            <Image
              src={logoSrc}
              alt="E-Mall Logo"
              width={200}
              height={61}
              priority
              style={{ width: '200px', height: 'auto' }}
            />
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative group text-[18px] font-medium transition-colors duration-300 hover:text-primary ${
                        isActive ? "text-primary" : linkColor
                      }`}
                    >
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-center transition-transform duration-300 ease-out transform ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-[#87E9FF] text-black border border-black/10 text-base pl-6 pr-[52px] py-3 h-auto font-semibold rounded-lg transition-all duration-300 overflow-hidden hidden lg:inline-flex"
              style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 500 }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Contact
              </span>
              <div className="absolute right-[12px] top-[50%] h-8 w-8 -translate-y-1/2 rounded-full bg-dark-navy transition-all duration-300 group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0 group-hover:rounded-lg"></div>
              <div className="absolute right-[12px] top-[50%] h-8 w-8 -translate-y-1/2 flex items-center justify-center z-10">
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </Link>
            <button
              className="lg:hidden z-[101]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-dark-navy" size={32} />
              ) : (
                <Menu className={iconColor} size={32} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/95 z-[100] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className="flex flex-col items-center justify-center h-full text-center p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <nav>
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-2xl font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary" : "text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Button asChild className="mt-12" size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;