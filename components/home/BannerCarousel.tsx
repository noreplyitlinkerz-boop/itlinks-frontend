"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bannerService } from "@/lib/api/services";
import { Banner } from "@/lib/api/types/endpoints";
import { getFullImageUrl } from "@/components/shared/ProductImage";

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const router = useRouter();

  // Fetch Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannerService.getBanners();
        if (response.success && response.data) {
          setBanners(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };
    fetchBanners();
  }, []);

  // Auto-play
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[50vh] md:h-[600px] bg-muted/20 animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground">Loading Banners...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[600px] overflow-hidden bg-background">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((slide) => (
          <div
            key={slide._id}
            className="min-w-full relative h-[50vh] md:h-[600px]"
          >
            <Image
              src={getFullImageUrl(slide.image)}
              alt={slide.title}
              fill
              className="object-cover brightness-[1]"
              priority
              unoptimized={true}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 text-white z-10 pb-16 md:pb-20">
              {/* <h2 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4 animate-fade-in px-2">
                {slide.title}
              </h2>
              <p className="text-sm md:text-2xl mb-6 md:mb-8 max-w-2xl text-gray-200 animate-slide-in-up px-6 md:px-0">
                {slide.description}
              </p> */}

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-4 md:px-8 md:py-6 rounded-full text-base md:text-lg shadow-lg hover:translate-y-[-2px] transition-transform"
                onClick={() => router.push(slide.link)}
              >
                {slide.ctaText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-accent w-6 md:w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
