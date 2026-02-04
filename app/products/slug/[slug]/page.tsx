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
  ChevronLeft,
  Minus,
  Plus,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { productService } from "@/lib/api/services";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { safeParse, cn } from "@/lib/utils";
import { ProductImage } from "@/components/shared/ProductImage";
import { ProductSpecsGrid } from "@/components/products/ProductSpecsGrid";
import { TechnicalSpecsTable } from "@/components/products/TechnicalSpecsTable";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
);

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
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProductBySlug(slug);
      console.log("Product API Response:", response);

      // API might return data directly or wrapped in response.data
      const productData = response.data || response;

      console.log("Product Data:", productData);
      console.log("Has _id?", productData?._id);
      console.log("Type of productData:", typeof productData);

      if (productData && productData._id) {
        console.log("✅ Setting product:", productData);
        if (productData.technicalSpecifications) {
          console.log(
            "🔧 TEchnical Specs raw:",
            productData.technicalSpecifications,
          );
        }
        setProduct(productData as ApiProduct);
        setActiveMedia(
          productData.product_primary_image_url ||
            productData.images?.[0] ||
            "",
        );
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

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    socket.on("order_created", (order) => {
      console.log("New order received:", order);
      // update UI / reduce quantity / show notification
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
            The product you're looking for doesn't exist.
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
    await addItem(product, quantity);
  };

  const handleBuyNow = async () => {
    await addItem(product, quantity);
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
    product.discount && typeof product.discount === "object"
      ? product.price - product.discount.discountedPrice
      : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          <span>›</span>
          <span className="truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
          {/* Left Column: Vertical Gallery + Main Image + Actions */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex gap-4 min-h-[500px]">
              {/* Vertical Thumbnails */}
              <div className="w-20 flex flex-col gap-3 shrink-0">
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

              {/* Main Image Container */}
              <div className="flex-1 relative aspect-4/5 rounded-xl overflow-hidden border border-border/30 bg-white group">
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

            {/* Sticky-style Bottom Actions (Flipkart Style) */}
            <div className="flex gap-4 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-14 text-lg font-bold bg-[#ff9f00] hover:bg-[#ff9f00]/90 text-white shadow-md rounded-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 h-14 text-lg font-bold bg-[#fb641b] hover:bg-[#fb641b]/90 text-white shadow-md rounded-lg"
                size="lg"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                BUY NOW
              </Button>
            </div>
          </div>

          {/* Right Column: Info & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-xl md:text-2xl font-normal leading-relaxed text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  <span>{product.rating || "4.1"}</span>
                  <span className="text-[10px]">★</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.floor(Math.random() * 500) + 100} Ratings &{" "}
                  {Math.floor(Math.random() * 100) + 10} Reviews
                </span>
                {/* <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                  alt="assured"
                  className="h-4"
                /> */}
              </div>
            </div>

            {/* Price block */}
            <div className="space-y-1">
              {discountAmount > 0 && (
                <p className="text-green-600 text-sm font-bold">
                  Extra ₹{discountAmount.toLocaleString()} off
                </p>
              )}
              <div className="flex items-baseline gap-4">
                <p className="text-3xl font-bold">
                  ₹
                  {(product.discount &&
                  typeof product.discount === "object" &&
                  product.discount.percentage > 0
                    ? product.discount.discountedPrice
                    : product.price
                  ).toLocaleString()}
                </p>
                {product.discount &&
                  typeof product.discount === "object" &&
                  product.discount.percentage > 0 && (
                    <>
                      <p className="text-muted-foreground line-through text-lg">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-green-600 text-lg font-bold">
                        {product.discount.percentage}% off
                      </p>
                    </>
                  )}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
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

            {/* Technical Specifications Section */}
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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t pt-8 mt-8">
                  <div className="md:col-span-3">
                    <h3 className="text-muted-foreground font-medium">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="md:col-span-9">
                    <TechnicalSpecsTable
                      specifications={
                        safeParse(
                          product.technicalSpecifications,
                          {},
                        ) as Record<string, string>
                      }
                    />
                  </div>
                </div>
              )}

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t pt-8 mt-8">
              <div className="md:col-span-3">
                <h3 className="text-muted-foreground font-medium">
                  Description
                </h3>
              </div>
              <div className="md:col-span-9">
                <p className="text-sm leading-relaxed text-foreground">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Specs Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-8">
              <div className="md:col-span-3">
                <h3 className="text-muted-foreground font-medium">
                  Specifications
                </h3>
              </div>
              <div className="md:col-span-9">
                <ProductSpecsGrid
                  specifications={
                    safeParse(product.specifications, {}) as Record<
                      string,
                      string
                    >
                  }
                />
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 pt-6 border-t">
              <h3 className="text-muted-foreground font-medium">Quantity</h3>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
