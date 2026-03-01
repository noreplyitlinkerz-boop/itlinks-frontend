"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  PlusCircle,
  Star,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductSpecsGrid } from "@/components/products/ProductSpecsGrid";
import { TechnicalSpecsTable } from "@/components/products/TechnicalSpecsTable";
import { VariantSelector } from "@/components/products/VariantSelector";
import { safeParse, cn } from "@/lib/utils";
import { ProductImage } from "@/components/shared/ProductImage";
import {
  categoryService,
  brandService,
  ramService,
  storageService,
  productService,
} from "@/lib/api/services";
import {
  Category,
  Brand,
  Ram,
  Storage,
  Product as ApiProduct,
} from "@/lib/api/types/endpoints";
import { ProductCard } from "@/components/shared/ProductCard";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
);

// Helper function to generate a stable number between 0 and 1 based on a string seed
const getStableRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  return (positiveHash % 10000) / 10000;
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState<string>("");

  // Variant States
  const [rams, setRams] = useState<Ram[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);
  const [selectedRam, setSelectedRam] = useState<Ram | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
  const [productCategory, setProductCategory] = useState<Category | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProductBySlug(slug);
      console.log("Product API Response:", response);

      const productData = response.data || response;

      console.log("Product Data:", productData);
      console.log("Has _id?", productData?._id);
      console.log("Type of productData:", typeof productData);

      if (productData && productData._id) {
        console.log("✅ Setting product:", productData);
        setProduct(productData as ApiProduct);
        setActiveMedia(
          productData.product_primary_image_url ||
            productData.images?.[0] ||
            "",
        );

        if (typeof productData.categoryID === "string") {
          try {
            const catRes = await categoryService.getCategoryById(
              productData.categoryID,
            );
            if (catRes.success && catRes.data) {
              setProductCategory(catRes.data);
            }
          } catch (err) {
            console.error("Failed to fetch category", err);
          }
        } else if (
          productData.categoryID &&
          typeof productData.categoryID === "object"
        ) {
          setProductCategory(productData.categoryID as Category);
        }
      } else {
        console.error("❌ No product data in response", response);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
      toast.error("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (ids: string[]) => {
    try {
      if (!ids || ids.length === 0) return;

      console.log("Fetching related products for IDs:", ids);
      const productsData = await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await productService.getProductById(id);
            return res.success ? res.data : null;
          } catch (e) {
            console.error(`Failed to fetch related product ${id}`, e);
            return null;
          }
        }),
      );

      const validProducts = productsData.filter(
        (p) => p !== null,
      ) as ApiProduct[];
      setRelatedProducts(validProducts);
    } catch (error) {
      console.error("Error fetching related products", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchVariants();
  }, [slug]);

  useEffect(() => {
    if (product?.relatedProducts && product.relatedProducts.length > 0) {
      const ids = product.relatedProducts.map((p) =>
        typeof p === "string" ? p : p._id,
      );
      fetchRelatedProducts(ids);
    }
  }, [product]);

  const fetchVariants = async () => {
    try {
      const [ramRes, storageRes] = await Promise.all([
        ramService.getRams(),
        storageService.getStorages(),
      ]);
      const ramData = Array.isArray(ramRes.data)
        ? ramRes.data
        : (ramRes.data as any)?.data || [];
      const storageData = Array.isArray(storageRes.data)
        ? storageRes.data
        : (storageRes.data as any)?.data || [];

      setRams(ramData);
      setStorages(storageData);
    } catch (error) {
      console.error("Failed to fetch variants", error);
    }
  };

  useEffect(() => {
    if (product && rams.length > 0 && storages.length > 0) {
      const specs = safeParse(product.specifications || {}, {}) as Record<
        string,
        string
      >;
      const currentRamLabel = specs["RAM"];
      const currentStorageLabel = specs["Storage"];

      const initialRam =
        rams.find((r) => r.label === "8GB") ||
        rams.find((r) => r.label === currentRamLabel) ||
        rams[0];
      const initialStorage =
        storages.find((s) => s.label === "256GB") ||
        storages.find((s) => s.label === currentStorageLabel) ||
        storages[0];

      setSelectedRam(initialRam || null);
      setSelectedStorage(initialStorage || null);

      const initialPrice =
        product.discount &&
        typeof product.discount === "object" &&
        Number(product.discount.percentage) > 0 &&
        Number(product.discount.discountedPrice) > 0
          ? Number(product.discount.discountedPrice)
          : Number(product.price);

      const initialExtra =
        (initialRam?.extraPrice || 0) + (initialStorage?.extraPrice || 0);
      let calculatedBase = initialPrice - initialExtra;

      if (calculatedBase <= 0) {
        calculatedBase = initialPrice;
      }

      setBasePrice(calculatedBase);
      setCurrentPrice(initialPrice);
    } else if (product) {
      const initialPrice =
        product.discount &&
        typeof product.discount === "object" &&
        Number(product.discount.percentage) > 0 &&
        Number(product.discount.discountedPrice) > 0
          ? Number(product.discount.discountedPrice)
          : Number(product.price);

      setCurrentPrice(initialPrice);
      setBasePrice(initialPrice);
    }
  }, [product, rams, storages]);

  useEffect(() => {
    const extraRam = selectedRam?.extraPrice || 0;
    const extraStorage = selectedStorage?.extraPrice || 0;
    setCurrentPrice(basePrice + extraRam + extraStorage);
  }, [selectedRam, selectedStorage, basePrice]);

  useEffect(() => {
    const ramLabel = selectedRam?.label ? ` ${selectedRam.label}` : "";
    const storageLabel = selectedStorage?.label
      ? ` ${selectedStorage.label}`
      : "";
    document.title = `${product?.name || "Product"}${ramLabel}${storageLabel} | Itlinkers`;
  }, [product?.name, selectedRam, selectedStorage]);

  useEffect(() => {
    socket.on("order_created", (order) => {
      console.log("New order received:", order);
      fetchProduct();
    });

    return () => {
      socket.off("order_created");
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = async () => {
    const modifiedProduct = {
      ...product,
      price: currentPrice,
      specifications: {
        ...(selectedRam && { RAM: selectedRam.label }),
        ...(selectedStorage && { Storage: selectedStorage.label }),
      },
    };
    await addItem(modifiedProduct as ApiProduct, quantity);
  };

  const handleBuyNow = async () => {
    const modifiedProduct = {
      ...product,
      price: currentPrice,
      specifications: {
        ...(selectedRam && { RAM: selectedRam.label }),
        ...(selectedStorage && { Storage: selectedStorage.label }),
      },
    };
    await addItem(modifiedProduct as ApiProduct, quantity);
    router.push("/cart");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const allMedia = [
    ...(product.product_primary_image_url
      ? [product.product_primary_image_url]
      : []),
    ...(product.images || []),
  ].filter(Boolean);

  const discountAmount =
    product.discount &&
    typeof product.discount === "object" &&
    product.discount.percentage > 0 &&
    product.discount.discountedPrice > 0
      ? product.price - product.discount.discountedPrice
      : 0;

  const categoryName = productCategory?.name?.toLowerCase() || "";
  const isComputer =
    categoryName.includes("laptop") || categoryName.includes("desktop");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-3 sm:py-4 pb-28 sm:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Link
            href="/"
            className="hover:text-primary transition-colors shrink-0"
          >
            Home
          </Link>
          <span>›</span>
          <Link
            href="/products"
            className="hover:text-primary transition-colors shrink-0"
          >
            Products
          </Link>
          <span>›</span>
          <span className="truncate">{product.name}</span>
        </div>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 mb-8 items-start">
          {/* ===== LEFT COLUMN: Gallery ===== */}
          <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-4">
            {/* ── DESKTOP: side-by-side (vertical thumbs left, main image right) ── */}
            <div className="hidden sm:flex gap-2 lg:gap-3 min-h-[320px] md:min-h-[420px] lg:min-h-[500px]">
              {/* Vertical Thumbnails */}
              <div className="w-14 md:w-16 lg:w-20 flex flex-col gap-2 lg:gap-3 shrink-0">
                {allMedia.map((media, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveMedia(media)}
                    onClick={() => setActiveMedia(media)}
                    className={cn(
                      "relative aspect-square rounded-md overflow-hidden border-2 transition-all",
                      activeMedia === media
                        ? "border-primary shadow-md"
                        : "border-border/50 hover:border-gray-400",
                    )}
                  >
                    <ProductImage
                      src={media}
                      fill
                      alt={`${product.name} thumbnail ${idx}`}
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative rounded-xl overflow-hidden border border-border/30 bg-white group min-h-[280px] md:min-h-[380px] lg:min-h-[460px]">
                <ProductImage
                  src={activeMedia}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <button
                  onClick={handleToggleWishlist}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors z-20 border border-border/50"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      inWishlist && "fill-red-500 text-red-500",
                    )}
                  />
                </button>
              </div>
            </div>

            {/* ── MOBILE: main image on top, horizontal scrollable thumbnails below ── */}
            <div className="sm:hidden flex flex-col gap-2">
              {/* Main Image — fluid height based on viewport */}
              <div
                className="relative w-full rounded-xl overflow-hidden border border-border/30 bg-white group"
                style={{ height: "calc(100vw - 24px)", maxHeight: "420px" }}
              >
                <ProductImage
                  src={activeMedia}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <button
                  onClick={handleToggleWishlist}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card shadow-lg flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors z-20 border border-border/50"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      inWishlist && "fill-red-500 text-red-500",
                    )}
                  />
                </button>
              </div>

              {/* Horizontal thumbnail strip */}
              {allMedia.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {allMedia.map((media, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(media)}
                      className={cn(
                        "relative shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all",
                        activeMedia === media
                          ? "border-primary shadow-md"
                          : "border-border/50 hover:border-gray-400",
                      )}
                    >
                      <ProductImage
                        src={media}
                        fill
                        alt={`${product.name} thumbnail ${idx}`}
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop only: Action Buttons below gallery */}
            <div className="hidden sm:flex gap-2 lg:gap-4 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-10 md:h-12 lg:h-14 text-xs sm:text-sm lg:text-lg font-bold bg-[#ff9f00] hover:bg-[#ff9f00]/90 text-white shadow-md rounded-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-1 lg:mr-2" />
                ADD TO CART
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 h-10 md:h-12 lg:h-14 text-xs sm:text-sm lg:text-lg font-bold bg-[#fb641b] hover:bg-[#fb641b]/90 text-white shadow-md rounded-lg"
              >
                <PlusCircle className="w-4 h-4 mr-1 lg:mr-2" />
                BUY NOW
              </Button>
            </div>

            {/* Technical Specifications — tablet/desktop: below gallery */}
            {product.technicalSpecifications &&
              Object.entries(
                safeParse(product.technicalSpecifications, {}),
              ).filter(
                ([key, value]) =>
                  value &&
                  String(value).trim() !== "" &&
                  !["id", "_id", "__v", "technical"].includes(
                    key.toLowerCase(),
                  ),
              ).length > 0 && (
                <div className="hidden sm:block pt-5 mt-2 border-t">
                  <h3 className="text-muted-foreground font-medium mb-3 text-sm">
                    Technical Specifications
                  </h3>
                  <TechnicalSpecsTable
                    specifications={
                      safeParse(product.technicalSpecifications, {}) as Record<
                        string,
                        string
                      >
                    }
                  />
                </div>
              )}
          </div>

          {/* ===== RIGHT COLUMN: Product Info ===== */}
          <div className="sm:col-span-7 space-y-3 sm:space-y-4">
            {/* Product Title */}
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-normal leading-snug text-foreground">
                {product.name}
                {isComputer && selectedRam ? `, ${selectedRam.label} RAM` : ""}
                {isComputer && selectedStorage
                  ? `/${selectedStorage.label}`
                  : ""}
              </h1>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {Math.floor(getStableRandom(product._id + "ratings") * 500) +
                    100}{" "}
                  Ratings &{" "}
                  {Math.floor(getStableRandom(product._id + "reviews") * 100) +
                    10}{" "}
                  Reviews
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="space-y-1">
              {discountAmount > 0 && (
                <p className="text-green-600 text-sm font-bold">
                  Extra ₹{discountAmount.toLocaleString()} off
                </p>
              )}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                <p className="text-2xl sm:text-3xl font-bold">
                  ₹{currentPrice.toLocaleString()}
                </p>
                {product.discount &&
                  typeof product.discount === "object" &&
                  product.discount.percentage > 0 && (
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground line-through text-base sm:text-lg">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-green-600 text-base sm:text-lg font-bold">
                        {product.discount.percentage}% off
                      </p>
                    </div>
                  )}
              </div>

              {/* Brand & Rating */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
                  {typeof product.brandID === "object"
                    ? product.brandID.name
                    : "Premium Brand"}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-accent" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Stock / Availability */}
              <div className="pt-1 space-y-1">
                {product.stock < 10 && product.stock > 0 && (
                  <p className="text-red-500 text-sm font-bold animate-pulse">
                    Hurry, Only {product.stock} left!
                  </p>
                )}
                {product.stock === 0 && (
                  <Badge variant="destructive" className="rounded-sm">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <h3 className="text-muted-foreground font-medium text-sm">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-muted border rounded-full px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 hover:bg-background rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-bold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                    className="h-8 w-8 hover:bg-background rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.stock} pieces available
                </span>
              </div>
            </div>

            {/* Variant Selector - Only for Computers */}
            {isComputer && (
              <VariantSelector
                rams={rams}
                storages={storages}
                selectedRam={selectedRam?.label}
                selectedStorage={selectedStorage?.label}
                onRamSelect={setSelectedRam}
                onStorageSelect={setSelectedStorage}
                basePrice={basePrice}
                initialPrice={product.price}
                productImage={
                  product.product_primary_image_url || product.images?.[0]
                }
                showRam={product.hasRam}
                showStorage={product.hasStorage}
              />
            )}

            {/* Specifications */}
            <div className="border-t pt-5 mt-2">
              <h3 className="text-muted-foreground font-medium text-sm mb-3">
                Specifications
              </h3>
              <ProductSpecsGrid
                specifications={
                  safeParse(product.specifications, {}) as Record<
                    string,
                    string
                  >
                }
              />
            </div>

            {/* Description */}
            <div className="pt-1">
              <h3 className="text-muted-foreground font-medium text-sm mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications — mobile only (shown at bottom below quantity) */}
            {product.technicalSpecifications &&
              Object.entries(
                safeParse(product.technicalSpecifications, {}),
              ).filter(
                ([key, value]) =>
                  value &&
                  String(value).trim() !== "" &&
                  !["id", "_id", "__v", "technical"].includes(
                    key.toLowerCase(),
                  ),
              ).length > 0 && (
                <div className="sm:hidden pt-5 mt-2 border-t">
                  <h3 className="text-muted-foreground font-medium mb-3 text-sm">
                    Technical Specifications
                  </h3>
                  <TechnicalSpecsTable
                    specifications={
                      safeParse(product.technicalSpecifications, {}) as Record<
                        string,
                        string
                      >
                    }
                  />
                </div>
              )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 mb-4">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {relatedProducts.map((related) => (
                <div key={related._id} className="h-full">
                  <ProductCard product={related} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ===== MOBILE STICKY BOTTOM CTA BAR ===== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl px-3 py-2 flex gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 h-12 text-sm sm:text-base font-bold bg-[#ff9f00] hover:bg-[#ff9f00]/90 text-white shadow-md rounded-lg"
        >
          <ShoppingCart className="w-4 h-4 mr-1.5" />
          ADD TO CART
        </Button>
        <Button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="flex-1 h-12 text-sm sm:text-base font-bold bg-[#fb641b] hover:bg-[#fb641b]/90 text-white shadow-md rounded-lg"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          BUY NOW
        </Button>
      </div>

      <Footer />
    </div>
  );
}
