"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { WishlistItem, Product } from "@/types";

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Add item to wishlist
  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.product.id === product.id);
      if (exists) return prevItems;

      return [...prevItems, { product, addedAt: new Date().toISOString() }];
    });
  };

  // Remove item from wishlist
  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  // Clear all items from wishlist
  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
