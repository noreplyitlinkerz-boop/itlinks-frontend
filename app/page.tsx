"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { useAdmin } from "@/context/AdminContext";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { BrandPromotion } from "@/components/home/BrandPromotion";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  const { products, categories } = useAdmin();

  // Get featured products
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="animate-slide-in-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

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
