"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product, Category, Order } from "@/types";
import {
  productService,
  categoryService,
  orderService,
} from "@/lib/api/services";
import { toast } from "sonner";

interface AdminContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  isLoading: boolean;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: string, product: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  updateCategory: (id: string, category: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateOrderStatus: (
    id: string,
    status: Order["orderStatus"]
  ) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesRes, ordersRes] = await Promise.all([
        productService.getProducts({ limit: 100 }), // Get a good amount for the dashboard/context
        categoryService.getCategories(),
        orderService.getAllOrders(),
      ]);

      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
      toast.error("Failed to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Product operations
  const addProduct = async (product: any) => {
    // Note: complex product adding is usually handled in the ProductForm directly,
    // but we can update the list here if needed.
    await fetchData();
  };

  const updateProduct = async (id: string, updatedProduct: any) => {
    await fetchData();
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => (p as any)._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Category operations
  const addCategory = async (category: any) => {
    try {
      await categoryService.createCategory(category);
      await fetchData();
    } catch (error) {
      console.error("Failed to add category", error);
      toast.error("Failed to add category");
      throw error;
    }
  };

  const updateCategory = async (id: string, updatedCategory: any) => {
    try {
      await categoryService.updateCategory(id, updatedCategory);
      await fetchData();
    } catch (error) {
      console.error("Failed to update category", error);
      toast.error("Failed to update category");
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      // API deletion for categories might not be implemented in service yet, but we'll follow previous pattern
      await categoryService.deleteCategory(id); // Assuming a deleteCategory method exists
      setCategories((prev) => prev.filter((c) => (c as any)._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  // Order operations
  const updateOrderStatus = async (
    id: string,
    status: Order["orderStatus"]
  ) => {
    try {
      await orderService.updateOrderStatus(id, { orderStatus: status });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, orderStatus: status } : order
        )
      );
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        orders,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
