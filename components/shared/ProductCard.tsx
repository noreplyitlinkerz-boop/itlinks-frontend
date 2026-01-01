"use client";

import Image from "next/image";
import Link from "next/link";
import { API_CONFIG } from "@/lib/api/api-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/api/services";

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
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
            <Image
              src={
                product.product_primary_image_url?.startsWith("http")
                  ? product.product_primary_image_url
                  : `${API_CONFIG.BASE_URL}${
                      product.product_primary_image_url || "/placeholder.png"
                    }`
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
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

        <CardFooter className="flex flex-col gap-3 p-4">
          <div className="w-full space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 group/btn"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant={inWishlist ? "default" : "outline"}
              size="sm"
              className="px-3"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
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
