"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { WishlistItem, Product } from "@/types";
import { wishlistService as apiWishlistService } from "@/lib/api/services";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { safeParse } from "@/lib/utils";

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, openLoginModal, setPendingAction } = useAuth();

  const mapApiWishlistToItems = (apiItems: any[]): WishlistItem[] => {
    return apiItems.map((item) => ({
      product: item.product as ApiProduct,
      addedAt: item.addedAt,
    }));
  };

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiWishlistService.getWishlist();
      if (response.data && response.data.items) {
        setItems(mapApiWishlistToItems(response.data.items));
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addItem = async (product: Product) => {
    if (!isAuthenticated) {
      setPendingAction(() => addItem(product));
      openLoginModal();
      return;
    }
    try {
      const response = await apiWishlistService.addToWishlist(product._id);
      if (response.data && response.data.items) {
        setItems(mapApiWishlistToItems(response.data.items));
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) return;
    try {
      const response = await apiWishlistService.removeFromWishlist(productId);
      if (response.data && response.data.items) {
        setItems(mapApiWishlistToItems(response.data.items));
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product._id === productId);
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) return;
    try {
      await apiWishlistService.clearWishlist();
      setItems([]);
      toast.success("Wishlist cleared");
    } catch (error) {
      console.error("Failed to clear wishlist", error);
      toast.error("Failed to clear wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        isLoading,
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
