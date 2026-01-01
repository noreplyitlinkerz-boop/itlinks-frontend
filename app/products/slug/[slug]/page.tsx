"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ChevronLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { productService } from "@/lib/api/services";
import { API_CONFIG } from "@/lib/api/api-config";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { safeParse } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  useEffect(() => {
    async function fetchProduct() {
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
          setProduct(productData as ApiProduct);
        } else {
          console.error("❌ No product data in response", response);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

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

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border/50">
              <Image
                src={
                  product.images &&
                  product.images.length > 0 &&
                  product.images[0] !== "string" && // Check if not placeholder string
                  product.images[0].trim() !== ""
                    ? product.images[0].startsWith("http")
                      ? product.images[0]
                      : `${API_CONFIG.BASE_URL}${product.images[0]}`
                    : "/placeholder.png"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              {product.discount && typeof product.discount === "object" ? (
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold text-primary">
                    ${product.discount.discountedPrice.toFixed(2)}
                  </p>
                  <div className="flex flex-col">
                    <p className="text-lg text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <Badge variant="destructive" className="w-fit">
                      {product.discount.percentage}% OFF
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <Badge
                  variant="outline"
                  className="text-yellow-600 border-yellow-600"
                >
                  Only {product.stock} left!
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.specifications &&
                Object.entries(safeParse(product.specifications, {})).length >
                  0 ? (
                  Object.entries(
                    safeParse(product.specifications, {}) as Record<
                      string,
                      string
                    >
                  ).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <p className="text-xs text-muted-foreground">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground col-span-2">
                    No specifications available.
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border/50 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-12 text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleToggleWishlist}
                variant={inWishlist ? "default" : "outline"}
                size="lg"
                className="h-12 px-6"
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Related products removed as per request (category api unreliable) */}
      </main>

      <Footer />
    </div>
  );
}
