"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
              className={`hidden lg:inline-block text-[15px] font-semibold px-[18px] py-[11px] rounded-[5px] whitespace-nowrap transition ${
                pathname === "/contact" 
                  ? "bg-primary/90 text-white" 
                  : "bg-primary text-white hover:opacity-90"
              }`}
            >
              Contact
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
          <Link href="/contact" className="mt-12 bg-primary text-white text-lg font-semibold px-8 py-3 rounded-md transition hover:opacity-90">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;