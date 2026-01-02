"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";
import { cartService as apiCartService } from "@/lib/api/services";
import { Product as ApiProduct } from "@/lib/api/types/endpoints";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { safeParse } from "@/lib/utils";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, openLoginModal, setPendingAction } = useAuth();

  const mapApiCartToItems = (apiItems: any[]): CartItem[] => {
    return apiItems.map((item) => {
      const p = item.product as ApiProduct;
      return {
        product: p,
        quantity: item.quantity,
      };
    });
  };

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiCartService.getCart();
      const cartData = response.data || response;
      if (cartData && cartData.items) {
        setItems(mapApiCartToItems(cartData.items));
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addItem = async (product: Product, quantity: number = 1) => {
    if (!isAuthenticated) {
      setPendingAction(() => addItem(product, quantity));
      openLoginModal();
      return;
    }
    try {
      console.log("CartContext: Adding item...", product._id, quantity);
      const response = await apiCartService.addToCart(product._id, quantity);
      console.log("CartContext: API Response", response);
      const cartData = response.data || response;

      if (cartData && cartData.items) {
        setItems(mapApiCartToItems(cartData.items));
        toast.success("Added to cart");
      } else {
        console.warn("CartContext: Response items missing, refetching cart");
        await fetchCart();
        toast.success("Added to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error("Failed to add to cart");
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) return;
    try {
      const response = await apiCartService.removeFromCart(productId);
      const cartData = response.data || response;
      if (cartData && cartData.items) {
        setItems(mapApiCartToItems(cartData.items));
        toast.success("Removed from cart");
      }
    } catch (error) {
      console.error("Failed to remove from cart", error);
      toast.error("Failed to remove from cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      const response = await apiCartService.updateQuantity(productId, quantity);
      const cartData = response.data || response;
      if (cartData && cartData.items) {
        setItems(mapApiCartToItems(cartData.items));
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    try {
      await apiCartService.clearCart();
      setItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Failed to clear cart", error);
      toast.error("Failed to clear cart");
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    if (!item.product) return sum;
    const price =
      item.product.discount && typeof item.product.discount === "object"
        ? item.product.discount.discountedPrice
        : item.product.price;
    return sum + (price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
