"use client";

import Link from "next/link";
import { ArrowUp, Send, Youtube, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917380817676"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group animate-bounce-slow"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
          Need Help? Chat with us!
        </span>
      </a>

      {/* Back to Top */}
      <button
        className="fixed bottom-24 right-6 z-50 text-black "
        onClick={scrollToTop}
      >
        <div className="p-4 rounded-full animate-bounce bg-white border border-black/5 shadow-2xl shadow-gray-500 hover:scale-110 transition-transform active:scale-95 group animate-bounce-slow">
          <ArrowUp className="w-4 h-4" />
        </div>
      </button>

      <footer className="border-t border-border/40 bg-background/95 backdrop-blur relative">
        <div className="container mx-auto px-4 flex pt-6 md:pt-8 ">
          <div className="container mx-auto px-4 ">
            <Image
              className="w-7 h-7 md:w-10 md:h-10 mix-blend-multiply dark:mix-blend-screen dark:invert"
              src="/logo-01.svg"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase text-foreground">
              Follow Us On:
            </h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            {/* 1. ABOUT US */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                ABOUT US
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link
                    href="/products?category=laptops"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    About Itlinkers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=desktops"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    Refurbishing story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=hp-refurbished"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            {/* 2. OUR PRODUCTS */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                Our Products
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link
                    href="/products?category=laptops"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=desktops"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    Desktops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=hp-refurbished"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    HP Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=accessories"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. HELP */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                Help
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Warranty Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4. CONTACTS & NEWSLETTER */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                Contacts
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                    Reach out to us
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    +91 7380817676
                  </p>
                  <p className="text-sm text-primary break-all">
                    contact.itlinkers@gmail.com
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase text-foreground">
                    Sign Up Our Newsletter
                  </h4>
                  <form className="relative flex items-center">
                    <input
                      type="email"
                      placeholder="Enter Email ->"
                      className="w-full h-10 pl-4 pr-10 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-2 text-primary hover:text-primary/80"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <p>
              &copy; {new Date().getFullYear()} ITLINKERS. All rights reserved.
            </p>
            <p className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              Designed & Developed for Excellence
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
