"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { useAdmin } from "@/context/AdminContext";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

export default function HomePage() {
  const { products, categories } = useAdmin();

  // Get featured products
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Elevate Your Tech Experience
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover premium laptops, cutting-edge components, and
                accessories from the world's leading brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="group">
                    Shop Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative gradient blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 transition-all hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  High-performance products designed for speed and efficiency
                </p>
              </div>

              <div className="text-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 transition-all hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Trusted Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Only genuine products with manufacturer warranty
                </p>
              </div>

              <div className="text-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 transition-all hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and free delivery on all orders above $99
                </p>
              </div>
            </div>
          </div>
        </section>

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

        {/* Categories */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Shop by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our wide range of tech products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-center transition-all hover:scale-105 hover:shadow-xl hover:bg-card">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
