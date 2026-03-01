"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { productService, categoryService } from "@/lib/api/services";
import { Product as ApiProduct, Category } from "@/lib/api/types/endpoints";
import { safeParse } from "@/lib/utils";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const subcategoryFromUrl = searchParams.get("subcategory");
  const brandFromUrl = searchParams.get("brand");

  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // State for display names
  const [categoryDisplayName, setCategoryDisplayName] = useState<string>("");
  const [subcategoryDisplayName, setSubcategoryDisplayName] =
    useState<string>("");
  const [brandDisplayName, setBrandDisplayName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Display Names
        const displayNamesPromises = [];

        if (categoryFromUrl) {
          if (
            categoryFromUrl.length === 24 ||
            /^[0-9a-fA-F]+$/.test(categoryFromUrl)
          ) {
            displayNamesPromises.push(
              categoryService
                .getCategoryById(categoryFromUrl)
                .then((res) => {
                  if (res.data && res.data.name)
                    setCategoryDisplayName(res.data.name);
                  else
                    setCategoryDisplayName(categoryFromUrl.replace(/-/g, " "));
                })
                .catch(() =>
                  setCategoryDisplayName(categoryFromUrl.replace(/-/g, " ")),
                ),
            );
          } else {
            setCategoryDisplayName(categoryFromUrl.replace(/-/g, " "));
          }
        } else {
          setCategoryDisplayName("All Collection");
        }

        if (subcategoryFromUrl) {
          if (
            subcategoryFromUrl.length === 24 ||
            /^[0-9a-fA-F]+$/.test(subcategoryFromUrl)
          ) {
            displayNamesPromises.push(
              categoryService
                .getCategoryById(subcategoryFromUrl)
                .then((res) => {
                  if (res.data && res.data.name)
                    setSubcategoryDisplayName(res.data.name);
                  else
                    setSubcategoryDisplayName(
                      subcategoryFromUrl.replace(/-/g, " "),
                    );
                })
                .catch(() =>
                  setSubcategoryDisplayName(
                    subcategoryFromUrl.replace(/-/g, " "),
                  ),
                ),
            );
          } else {
            setSubcategoryDisplayName(subcategoryFromUrl.replace(/-/g, " "));
          }
        } else {
          setSubcategoryDisplayName("");
        }

        if (brandFromUrl) {
          setBrandDisplayName(brandFromUrl.replace(/-/g, " "));
        } else {
          setBrandDisplayName("");
        }

        if (displayNamesPromises.length > 0)
          await Promise.all(displayNamesPromises);

        // 2. Fetch Products
        const params: any = { limit: 50, page: 1 };
        if (searchQuery) params.search = searchQuery;
        if (categoryFromUrl) params.category = categoryFromUrl;
        if (subcategoryFromUrl) params.subcategory = subcategoryFromUrl;
        if (brandFromUrl) params.brand = brandFromUrl;

        const response = await productService.getProducts(params);
        const getArray = (res: any, key: string) => {
          if (!res) return [];
          if (Array.isArray(res)) return res;
          if (res.data && res.data.data && Array.isArray(res.data.data))
            return res.data.data;
          if (res.data && Array.isArray(res.data)) return res.data;
          if (res[key] && Array.isArray(res[key])) return res[key];
          return [];
        };
        setProducts(getArray(response, "products"));
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, searchQuery ? 500 : 0);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categoryFromUrl, subcategoryFromUrl, brandFromUrl]);

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
      {/* Integrated Header Section */}
      <div className="relative pt-2 pb-6">
        <div className="flex flex-col gap-6">
          {/* Top Row: Breadcrumbs & Results Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <nav className="flex items-center gap-2">
              <Link
                href="/"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-border" />
              <Link
                href="/products"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              {categoryDisplayName &&
                categoryDisplayName !== "All Collection" && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 italic">
                      {categoryDisplayName}
                    </span>
                  </>
                )}
            </nav>

            <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {sortedProducts.length} Premium Items
              </span>
            </div>
          </div>

          {/* Main Action Bar */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            <div className="relative flex-1 group">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search premium inventory..."
                className="bg-white/60 backdrop-blur-md border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary/50 transition-all duration-300 rounded-xl h-12 pl-10 text-sm shadow-sm"
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-white/60 backdrop-blur-md border-slate-200 text-slate-900 rounded-xl h-12 px-4 hover:bg-white transition-colors focus:ring-primary/10 shadow-sm text-sm">
                  <SelectValue placeholder="Sort Results" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <SelectItem value="newest">Featured First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">A - Z (Alphabetical)</SelectItem>
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
        <div className="py-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="relative w-32 h-32 mb-6 group">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <Image
              src="/images/no_result.png"
              alt="No products found"
              width={150}
              height={150}
              className="relative w-full h-full object-contain filter drop-shadow-md opacity-80"
              priority
            />
          </div>

          <div className="max-w-md px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-slate-800 uppercase italic">
              Oops! Nothing Here Yet
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              We couldn't find any products matching your current selection. Try
              resetting your filters to explore our full inventory.
            </p>

            <div className="flex justify-center mb-12">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  router.push("/products");
                }}
                className="rounded-xl px-6 h-10 text-[10px] font-bold uppercase tracking-wider bg-slate-900 shadow-md transition-all hover:bg-primary"
              >
                <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="w-full max-w-4xl pt-10 border-t border-slate-100 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-background">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Popular Categories
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                {
                  name: "Laptops",
                  icon: Laptop,
                  slug: "refurbished-laptop",
                  color: "from-blue-500/5",
                },
                {
                  name: "Workstations",
                  icon: Monitor,
                  slug: "refurbished-desktop",
                  color: "from-purple-500/5",
                },
                {
                  name: "Components",
                  icon: Cpu,
                  slug: "accessories",
                  color: "from-emerald-500/5",
                },
                {
                  name: "Accessories",
                  icon: MousePointer2,
                  slug: "accessories",
                  color: "from-orange-500/5",
                },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.slug}`}
                  className={cn(
                    "group relative p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-sm flex flex-col items-center transition-all duration-300",
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 p-3 rounded-xl bg-linear-to-br transition-colors",
                      cat.color,
                      "to-transparent",
                    )}
                  >
                    <cat.icon className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-[10px] uppercase tracking-wider text-slate-700">
                    {cat.name}
                  </span>
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
