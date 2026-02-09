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
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm group-hover:border-primary/50">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
            <ProductImage
              src={product.product_primary_image_url || product.images?.[0]}
              alt={product.name}
              fill
              className="object-cover p-2 transition-transform duration-300 group-hover:scale-110"
            />
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-3 right-3 bg-yellow-600 hover:bg-yellow-600">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="absolute top-3 right-3 bg-destructive hover:bg-destructive">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 md:gap-3 p-2 md:p-3">
          <div className="w-full space-y-1 md:space-y-1.5">
            <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
            <p className="hidden md:line-clamp-2 text-[10px] md:text-xs text-muted-foreground">
              {product.description}
            </p>
            {/* RAM/Storage Quick Specs */}
            <div className="flex flex-wrap gap-1">
              {product.specifications &&
                typeof product.specifications === "object" && (
                  <>
                    {product.specifications.RAM && (
                      <Badge
                        variant="secondary"
                        className="text-[9px] py-0 h-3.5 bg-primary/10 text-primary border-none"
                      >
                        {String(product.specifications.RAM)}
                      </Badge>
                    )}
                    {product.specifications.Storage && (
                      <Badge
                        variant="secondary"
                        className="text-[9px] py-0 h-3.5 bg-blue-500/10 text-blue-600 border-none"
                      >
                        {String(product.specifications.Storage)}
                      </Badge>
                    )}
                  </>
                )}
            </div>
            <div className="flex flex-col">
              <p className="text-base md:text-xl font-bold text-primary">
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
                  <div className="flex items-center gap-1.5">
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

          <div className="flex gap-1.5 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 group/btn h-7 md:h-8 text-[10px] md:text-xs px-2"
              size="sm"
            >
              <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant={inWishlist ? "default" : "outline"}
              size="sm"
              className="px-1.5 md:px-2 h-7 md:h-8"
            >
              <Heart
                className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-all ${
                  inWishlist ? "fill-current" : ""
                }`}
              />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
