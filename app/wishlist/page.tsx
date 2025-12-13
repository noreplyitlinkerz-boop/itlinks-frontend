"use client";

import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem(item.product);
    toast.success(`Added ${item.product.name} to cart`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Heart className="w-24 h-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground">
              Save products you love for later by adding them to your wishlist.
            </p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">
              {items.length} item{items.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="group relative rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:shadow-xl"
              >
                {/* Product Image */}
                <Link href={`/products/${item.product.id}`}>
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.product.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.product.stock === 0}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => {
                        removeItem(item.product.id);
                        toast.info(
                          `Removed ${item.product.name} from wishlist`
                        );
                      }}
                      variant="outline"
                      size="sm"
                      className="px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
