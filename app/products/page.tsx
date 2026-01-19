"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ProductCard } from "@/components/shared/ProductCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { toast } from "sonner";
import {
  SearchX,
  PackageSearch,
  ArrowRight,
  RefreshCcw,
  Laptop,
  Monitor,
  MousePointer2,
  Cpu,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, Product as FrontendProduct } from "@/types";
import { productService } from "@/lib/api/services";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { safeParse } from "@/lib/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const subcategoryFromUrl = searchParams.get("subcategory");

  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build API params
        const params: any = {
          limit: 50,
          page: 1,
        };

        if (searchQuery) params.search = searchQuery;
        if (categoryFromUrl) params.category = categoryFromUrl;
        if (subcategoryFromUrl) params.subcategory = subcategoryFromUrl;

        const response = await productService.getProducts(params);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, searchQuery ? 500 : 0);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categoryFromUrl, subcategoryFromUrl]);

  // Client-side filter and sort for the fetched batch
  const sortedProducts = useMemo(() => {
    let filtered = [...products];

    // Client-side fallback filter if API doesn't strictly filter by subcategory
    if (subcategoryFromUrl) {
      const subName = subcategoryFromUrl.replace(/-/g, " ").toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(subName) ||
          (p.description && p.description.toLowerCase().includes(subName)) ||
          (p.keywords &&
            p.keywords.some((k) => k.toLowerCase().includes(subName))),
      );
    } else if (categoryFromUrl) {
      // Basic category name match if needed
      const catName = categoryFromUrl.replace(/-/g, " ").toLowerCase();
      // Only filter if we have some products that definitely don't belong
      // This is a safety measure
    }

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    });
  }, [products, sortOption]);

  return (
    <div className="space-y-8">
      {/* Premium Category Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1A2B3C] via-[#1A2B3C]/95 to-[#0B1120] dark:from-[#0B1120] dark:via-[#0B1120]/95 dark:to-black text-white p-8 md:p-12 shadow-2xl">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-accent transition-colors"
            >
              Products
            </Link>
            {categoryFromUrl && (
              <>
                <span>/</span>
                <span className="text-white italic">
                  {categoryFromUrl.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              {categoryFromUrl
                ? categoryFromUrl.replace(/-/g, " ")
                : "All Collection"}
            </h1>
            {subcategoryFromUrl && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest">
                {subcategoryFromUrl.replace(/-/g, " ")}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xl text-white">
                {sortedProducts.length}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-tight">
                Premium Items
                <br />
                Available
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Filter within results..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 transition-all rounded-2xl h-12"
                />
              </div>

              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-white/10 text-white rounded-2xl h-12">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Featured First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">A - Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedProducts.length} product
        {sortedProducts.length !== 1 ? "s" : ""}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[300px] rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {sortedProducts.map((product) => (
            <div key={product._id} className="animate-scale-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 md:py-20 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="relative w-full max-w-lg aspect-square mb-8 group">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
            <Image
              src="/images/no_result.png"
              alt="No products found"
              width={220}
              height={220}
              className="relative w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>

          <div className="max-w-xl px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent italic uppercase">
              Opps! Nothing Here Yet
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed font-medium">
              We couldn't find any products matching your current selection. Our
              team is constantly updating our inventory with premium refurbished
              tech.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setSearchQuery("");
                  window.history.replaceState(null, "", "/products");
                  window.location.reload();
                }}
                className="rounded-full px-8 h-12 text-sm font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin-slow" />
                Reset All Filters
              </Button>
            </div>
          </div>

          <div className="w-full max-w-5xl pt-16 border-t border-border/40 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-background">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
                Explore Our Best Sellers
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              {[
                {
                  name: "Premium Laptops",
                  icon: Laptop,
                  slug: "refurbished-laptop",
                  color: "from-blue-500/10",
                },
                {
                  name: "Workstations",
                  icon: Monitor,
                  slug: "refurbished-desktop",
                  color: "from-purple-500/10",
                },
                {
                  name: "Pro Components",
                  icon: Cpu,
                  slug: "accessories",
                  color: "from-emerald-500/10",
                },
                {
                  name: "Accessories",
                  icon: MousePointer2,
                  slug: "accessories",
                  color: "from-orange-500/10",
                },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.slug}`}
                  className={cn(
                    "group relative overflow-hidden p-8 rounded-3xl bg-linear-to-br transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 border border-border/50 flex flex-col items-center",
                    cat.color.replace("/10", "/20"),
                    "to-transparent",
                  )}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-4 rounded-2xl bg-background shadow-sm mb-4 group-hover:scale-110 transition-transform duration-500">
                    <cat.icon className="w-8 h-8 text-foreground/80 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="relative font-bold text-sm tracking-tight">
                    {cat.name}
                  </span>
                  <div className="relative mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Browse <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }
        >
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
