"use client";

import Link from "next/link";
import { ProductImage } from "@/components/shared/ProductImage";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/products">
              <Button size="lg">Start Shopping</Button>
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
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              // Priority: item.price (variant) > discounted price > product price
              const displayPrice =
                item.price !== undefined
                  ? item.price
                  : item.product.discount &&
                      typeof item.product.discount === "object"
                    ? item.product.discount.discountedPrice
                    : item.product.price;

              return (
                <div
                  key={item._id || item.product._id}
                  className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/50">
                    <ProductImage
                      src={
                        item.product.product_primary_image_url ||
                        item.product.images?.[0]
                      }
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/slug/${item.product.slug}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.product.description}
                    </p>

                    {/* Specifications (RAM/Storage) - Only for Laptops/Desktops */}
                    {(() => {
                      const isComputer =
                        (typeof item.product.categoryID === "object" &&
                          (item.product.categoryID.name
                            .toLowerCase()
                            .includes("laptop") ||
                            item.product.categoryID.name
                              .toLowerCase()
                              .includes("desktop"))) ||
                        item.product.hasRam ||
                        item.product.hasStorage;

                      return (
                        isComputer &&
                        item.specifications && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {Object.entries(item.specifications).map(
                              ([key, value]) => (
                                <span
                                  key={key}
                                  className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground border border-border"
                                >
                                  {key}: {value}
                                </span>
                              ),
                            )}
                          </div>
                        )
                      );
                    })()}

                    <div className="flex flex-col gap-1 mt-2">
                      <p className="text-lg font-bold text-primary">
                        ₹{displayPrice.toLocaleString()}
                      </p>
                      {/* Show discount only if using standard product price (not custom variant price) OR if even variant is "discounted" (logic undefined, hiding for variants for now or showing generic) */}
                      {item.price === undefined &&
                        item.product.discount &&
                        typeof item.product.discount === "object" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.product.price.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-green-600">
                              {item.product.discount.percentage}% OFF
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col justify-between items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item._id || item.product._id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center border border-border/50 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item._id || item.product._id,
                            item.quantity - 1,
                          )
                        }
                        className="h-8 w-8"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-12 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item._id || item.product._id,
                            item.quantity + 1,
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="h-8 w-8"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="font-semibold">
                    ₹{(totalPrice * 0.1).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold pt-4 border-t border-border/50">
                <span>Total</span>
                <span className="text-primary">
                  ₹{(totalPrice * 1.1).toLocaleString()}
                </span>
              </div>

              <Link href="/checkout">
                <Button className="w-full h-12 text-lg" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <div className="h-1"></div>
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
