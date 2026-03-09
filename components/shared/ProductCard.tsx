"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/api/services";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/products/slug/${product.slug}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm group-hover:border-primary/50 flex flex-col">
        <CardContent className="p-0">
          {(product.featured || product.stock < 10 || product.stock === 0) && (
            <div className="flex flex-row flex-nowrap items-center gap-1 px-1 pt-1.5 pb-0 w-full z-10 relative">
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground text-[9px] md:text-xs px-1.5 py-0 h-4 md:h-5 pointer-events-auto shrink-0">
                  Featured
                </Badge>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="bg-yellow-600 hover:bg-yellow-600 text-[9px] md:text-xs px-1.5 py-0 h-4 md:h-5 pointer-events-auto shrink-0">
                  Low Stock
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="bg-destructive hover:bg-destructive text-[9px] md:text-xs px-1.5 py-0 h-4 md:h-5 pointer-events-auto shrink-0">
                  Out of Stock
                </Badge>
              )}
            </div>
          )}
          <div className={`relative aspect-video overflow-hidden bg-muted ${(product.featured || product.stock < 10 || product.stock === 0) ? "mt-1" : "rounded-t-lg"}`}>
            <ProductImage
              src={product.product_primary_image_url || product.images?.[0]}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-1 md:gap-3 p-1 md:p-3">
          <div className="w-full space-y-0.5 md:space-y-1.5">
            <h3 className="font-semibold text-[10px] md:text-base group-hover:text-primary transition-colors leading-tight">
              {(() => {
                const catName = typeof product.categoryID === "object" && product.categoryID !== null
                  ? (product.categoryID as any).name?.toLowerCase() || ""
                  : "";
                const isComputer = catName.includes("laptop") || catName.includes("desktop");
                return isComputer ? `${product.name}, 8GB RAM/256GB` : product.name;
              })()}
            </h3>
            <p className="hidden md:line-clamp-2 text-[10px] md:text-xs text-muted-foreground">
              {product.description}
            </p>

            <div className="flex flex-col">
              <p className="text-sm md:text-xl font-bold text-primary">
                ₹
                {(product.discount &&
                  typeof product.discount === "object" &&
                  product.discount.percentage > 0 &&
                  product.discount.discountedPrice > 0
                  ? product.discount.discountedPrice
                  : product.price
                ).toLocaleString()}
              </p>
              {product.discount &&
                typeof product.discount === "object" &&
                product.discount.percentage > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold text-green-600">
                      {product.discount.percentage}% OFF
                    </span>
                  </div>
                )}
            </div>
          </div>

          <div className="flex gap-1 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 group/btn h-6 md:h-8 text-[9px] md:text-xs px-1"
              size="sm"
            >
              <ShoppingCart className="hidden md:inline-flex w-3.5 h-3.5 md:mr-1 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant={inWishlist ? "default" : "outline"}
              size="sm"
              className="px-1 md:px-2 h-6 md:h-8"
            >
              <Heart
                className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 transition-all ${inWishlist ? "fill-current" : ""
                  }`}
              />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
