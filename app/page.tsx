"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { BrandPromotion } from "@/components/home/BrandPromotion";
import { FaqSection } from "@/components/home/FaqSection";
import { productService } from "@/lib/api/services";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { Product as FrontendProduct } from "@/types";
import { safeParse } from "@/lib/utils";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<FrontendProduct[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await productService.getProducts({
          featured: true,
          limit: 6,
          page: 1,
        });

        setFeaturedProducts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Banner Carousel with Search */}
        <BannerCarousel />

        {/* Brand Promotion */}
        <BrandPromotion />

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked selection of our best sellers and newest arrivals
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <div key={product._id} className="animate-slide-in-up">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-muted-foreground">
                    No featured products found.
                  </div>
                )}
              </div>
            )}

            <div className="text-center">
              <Link href="/products">
                <Button size="lg" variant="outline" className="group">
                  View All Products
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
