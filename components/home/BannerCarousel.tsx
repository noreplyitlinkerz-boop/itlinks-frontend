"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productService } from "@/lib/api/services";

interface SearchResultItem {
  _id: string;
  slug: string;
  name: string;
  price: number;
}

const BANNER_SLIDES = [
  {
    id: 1,
    title: "Next-Gen Laptops",
    description: "Experience power and portability like never before.",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
    cta: "Shop Laptops",
    link: "/products?category=laptops",
  },
  {
    id: 2,
    title: "Premium Components",
    description: "Build your dream machine with top-tier hardware.",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
    cta: "Explore Components",
    link: "/products?category=components",
  },
  {
    id: 3,
    title: "Essential Accessories",
    description: "Enhance your workflow with professional gear.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
    cta: "View Accessories",
    link: "/products?category=accessories",
  },
];

const TEMP_SUGGESTIONS = [
  "Gaming Laptop",
  "Wireless Mouse",
  "Mechanical Keyboard",
  "4K Monitor",
  "Graphics Card",
  "SSD Storage",
  "Noise Cancelling Headphones",
  "Smart Home Hub",
  "Webcam",
  "USB-C Hub",
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const response = await productService.searchProducts({
            search: searchQuery,
            limit: 10,
          });
          if (response && response.data && Array.isArray(response.data)) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Search failed", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
          setShowResults(true);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-background">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNER_SLIDES.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[600px]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10 pb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-8 max-w-2xl text-gray-200 animate-slide-in-up">
                {slide.description}
              </p>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 rounded-full text-lg shadow-lg hover:translate-y-[-2px] transition-transform"
                onClick={() => router.push(slide.link)}
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Global Search Bar - Static Overlay */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-xl z-30 px-4 animate-scale-in">
        <div className="relative">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              className="w-full h-14 pl-6 pr-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 rounded-full bg-accent hover:bg-accent/90 w-10 h-10"
            >
              <Search className="w-5 h-5" />
            </Button>
            {isSearching && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
          </form>

          {/* Search Results Dropdown */}
          {showResults &&
            (searchQuery.length >= 2 || searchResults.length > 0) && (
              <>
                <div
                  className="fixed inset-0 z-10 bg-transparent"
                  onClick={() => setShowResults(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden max-h-[60vh] overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-sm text-gray-300">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5 last:border-0"
                          onClick={() => {
                            router.push(`/products/slug/${product.slug}`);
                            setShowResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex-1 flex justify-between items-center min-w-0 gap-4">
                            <h4 className="text-base font-medium text-primary truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-accent font-semibold whitespace-nowrap">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    <div className="p-4 text-center text-sm text-gray-300">
                      No products found
                    </div>
                  ) : null}
                </div>
              </>
            )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {BANNER_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-accent w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
