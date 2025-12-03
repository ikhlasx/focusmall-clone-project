"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#shop", label: "Shop" },
  { href: "#floor", label: "Floor" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
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
    : "bg-transparent";
  const linkColor = isScrolled ? "text-dark-navy" : "text-white";
  const iconColor = isScrolled ? "text-dark-navy" : "text-white";
  const logoSrc = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/fa64259f-66bd-430d-84b6-0aa1ec4f01ad-focusmall-in/assets/images/fcslog-1.webp";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle}`}>
        <div className="container mx-auto flex items-center justify-between h-[88px] px-6 lg:px-8">
          <Link href="/" aria-label="Focus Mall Home">
            <Image
              src={logoSrc}
              alt="Focus Mall Logo"
              width={200}
              height={61}
              priority
              style={{ width: '200px', height: 'auto' }}
            />
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = link.label === "Home";
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
            <a href="#" className="hidden lg:inline-block bg-primary text-white text-[15px] font-semibold px-[18px] py-[11px] rounded-[5px] whitespace-nowrap transition hover:bg-orange-600">
              Get Mall Map
            </a>
            <button
              className="lg:hidden z-[101]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-white" size={32} />
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-2xl font-medium transition-colors hover:text-primary ${
                      link.label === "Home" ? "text-primary" : "text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#" className="mt-12 bg-primary text-white text-lg font-semibold px-8 py-3 rounded-md transition hover:bg-orange-600">
            Get Mall Map
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;