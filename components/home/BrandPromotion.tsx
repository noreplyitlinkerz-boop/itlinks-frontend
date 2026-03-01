"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BRANDS = [
  "Logitech",
  "Dell",
  "Apple",
  "HP",
  "Lenovo",
  "Crucial",
  "Consistent",
  "Hikvision",
  "Gigabyte",
  "EVM",
  "Canon",
];

export function BrandPromotion() {
  return (
    <section className="py-12 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
          Trending Brands
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm text-muted-foreground animate-pulse">
            We partner with the world's leading technology manufacturers.
          </span>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden mask-linear-gradient">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {BRANDS.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="mx-4 md:mx-8 flex flex-col items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-border group-hover:border-primary/50 bg-card flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all duration-300 transform group-hover:scale-105">
                <span className="font-bold text-lg md:text-xl text-muted-foreground group-hover:text-primary transition-colors">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap py-4">
          {BRANDS.map((brand, index) => (
            <div
              key={`${brand}-${index}-duplicate`}
              className="mx-4 md:mx-8 flex flex-col items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-border group-hover:border-primary/50 bg-card flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all duration-300 transform group-hover:scale-105">
                <span className="font-bold text-lg md:text-xl text-muted-foreground group-hover:text-primary transition-colors">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles injected here for simplicity, typically moving to global css is better */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}
