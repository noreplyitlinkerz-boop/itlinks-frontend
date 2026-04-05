"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { brandService } from "@/lib/api/services";
import { Brand } from "@/lib/api/types/endpoints";

// Curated mapping to ensure correct SimpleIcons slugs for your preferred brands
const PREFERRED_BRANDS = [
  { name: "Logitech", slug: "logitech" },
  { name: "Dell", slug: "dell" },
  { name: "Apple", slug: "apple" },
  { name: "HP", slug: "hp" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "Crucial", slug: "crucial" },
  { name: "Hikvision", slug: "hikvision" },
  { name: "Gigabyte", slug: "gigabyte" },
  { name: "Canon", slug: "canon" },
  { name: "ASUS", slug: "asus" },
  { name: "AMD", slug: "amd" },
  { name: "Intel", slug: "intel" },
  { name: "NVIDIA", slug: "nvidia" },
];

export function BrandPromotion() {
  const [displayBrands, setDisplayBrands] = useState<{ name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function syncBrands() {
      try {
        const response = await brandService.getBrands();
        const apiBrands = response.data || (response as any).brands || [];
        
        // Filter and map: only show curated brands if they exist in the API
        const matched = PREFERRED_BRANDS.filter(preferred => 
          apiBrands.some((api: Brand) => api.name.toLowerCase() === preferred.name.toLowerCase())
        );

        // Fallback: If API is empty or no matches, use the preferred list (to avoid blank section)
        setDisplayBrands(matched.length > 0 ? matched : PREFERRED_BRANDS);
      } catch (error) {
        console.error("Failed to sync brands:", error);
        setDisplayBrands(PREFERRED_BRANDS);
      } finally {
        setIsLoading(false);
      }
    }
    syncBrands();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="h-10 w-full bg-slate-200/20 animate-pulse rounded-full" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/10">
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
            Trending <span className="text-primary italic">Brands</span>
          </h2>
          <div className="h-1.5 w-32 bg-primary rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium text-lg">
            Certified premium devices from the world&apos;s leading technology manufacturers.
          </p>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee-row whitespace-nowrap py-10">
          {[...displayBrands, ...displayBrands].map((brand, index) => (
            <div
              key={`${brand.slug}-${index}`}
              className="mx-8 md:mx-12 flex flex-col items-center justify-center group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:border-primary/40 transition-all duration-700 transform group-hover:-translate-y-4">
                <img
                  src={`https://cdn.simpleicons.org/${brand.slug}`}
                  alt={brand.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <span className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-row {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
