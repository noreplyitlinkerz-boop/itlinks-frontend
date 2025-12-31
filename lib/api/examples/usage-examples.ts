/**
 * API Service Usage Examples
 * Demonstrates how to use the API services
 */

import {
  productService,
  orderService,
  authService,
  userService,
  getErrorMessage,
  ApiError,
  AuthenticationError,
  ValidationError,
} from "@/lib/api/services";

// ============================================================================
// Authentication Examples
// ============================================================================

/**
 * Example: User signup
 */
async function signupExample() {
  try {
    const response = await authService.signup({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "securePassword123",
      mobile: "+919876543210",
    });

    console.log("Signup successful:", response.user);
    console.log("Token stored automatically");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation errors:", error.errors);
    } else {
      console.error("Signup failed:", getErrorMessage(error));
    }
  }
}

/**
 * Example: User login
 */
async function loginExample() {
  try {
    const response = await authService.login({
      email: "john.doe@example.com",
      password: "securePassword123",
    });

    console.log("Login successful:", response.user);
    // Token is automatically stored
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error("Invalid credentials");
    } else {
      console.error("Login failed:", getErrorMessage(error));
    }
  }
}

/**
 * Example: Get current user
 */
async function getCurrentUserExample() {
  try {
    const response = await authService.getCurrentUser();
    console.log("Current user:", response.data);
  } catch (error) {
    console.error("Failed to get user:", getErrorMessage(error));
  }
}

/**
 * Example: Logout
 */
async function logoutExample() {
  try {
    await authService.logout();
    console.log("Logged out successfully");
    // Tokens are automatically cleared
  } catch (error) {
    console.error("Logout failed:", getErrorMessage(error));
  }
}

// ============================================================================
// Product Examples
// ============================================================================

/**
 * Example: Get all products with pagination
 */
async function getProductsExample() {
  try {
    const response = await productService.getProducts({
      page: 1,
      limit: 10,
      featured: true,
      search: "laptop",
    });

    console.log("Products:", response.data);
    console.log("Pagination:", response.pagination);
  } catch (error) {
    console.error("Failed to fetch products:", getErrorMessage(error));
  }
}

/**
 * Example: Search products
 */
async function searchProductsExample() {
  try {
    const products = await productService.searchProducts({
      query: "dell",
      limit: 5,
    });

    console.log("Search results:", products);
  } catch (error) {
    console.error("Search failed:", getErrorMessage(error));
  }
}

/**
 * Example: Get product by slug
 */
async function getProductBySlugExample() {
  try {
    const response = await productService.getProductBySlug(
      "laptop-dell-xps-15"
    );
    console.log("Product:", response.data);
  } catch (error) {
    console.error("Failed to fetch product:", getErrorMessage(error));
  }
}

/**
 * Example: Create product with images (Admin only)
 */
async function createProductExample() {
  try {
    // Assuming you have file inputs
    const primaryImage =
      document.querySelector<HTMLInputElement>("#primary-image")?.files?.[0];
    const additionalImages = Array.from(
      document.querySelector<HTMLInputElement>("#images")?.files || []
    );

    const response = await productService.createProduct({
      slug: "laptop-dell-xps-15",
      name: "Dell XPS 15",
      brand: "Dell",
      description: "High-performance laptop",
      price: 999.99,
      stock: 10,
      featured: true,
      isVisible: true,
      discount: JSON.stringify({ percentage: 10, discountedPrice: 899.99 }),
      specifications: JSON.stringify({
        screenSize: '15.6"',
        ramSize: "16GB",
        cpuModel: "Intel i7",
      }),
      product_primary_image: primaryImage,
      images: additionalImages,
    });

    console.log("Product created:", response.data);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation errors:", error.errors);
    } else {
      console.error("Failed to create product:", getErrorMessage(error));
    }
  }
}

// ============================================================================
// Order Examples
// ============================================================================

/**
 * Example: Create order
 */
async function createOrderExample() {
  try {
    const response = await orderService.createOrder({
      items: [
        {
          product: "507f1f77bcf86cd799439011",
          quantity: 2,
        },
        {
          product: "507f1f77bcf86cd799439012",
          quantity: 1,
        },
      ],
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        phone: "+919876543210",
        addressLine1: "123 Main Street, Sector 15",
        addressLine2: "Apartment 4B, Near City Mall",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
      paymentMethod: "cash_on_delivery",
      notes: "Please handle with care - fragile items",
    });

    console.log("Order created:", response.data);
  } catch (error) {
    console.error("Failed to create order:", getErrorMessage(error));
  }
}

/**
 * Example: Get user orders
 */
async function getUserOrdersExample() {
  try {
    const response = await orderService.getUserOrders({
      page: 1,
      limit: 10,
      status: "pending",
    });

    console.log("Orders:", response.data);
    console.log("Pagination:", response.pagination);
  } catch (error) {
    console.error("Failed to fetch orders:", getErrorMessage(error));
  }
}

/**
 * Example: Cancel order
 */
async function cancelOrderExample() {
  try {
    const response = await orderService.cancelOrder("order-id-here", {
      cancelReason: "Customer requested cancellation",
    });

    console.log("Order cancelled:", response.data);
  } catch (error) {
    console.error("Failed to cancel order:", getErrorMessage(error));
  }
}

/**
 * Example: Get order statistics (Admin only)
 */
async function getOrderStatsExample() {
  try {
    const response = await orderService.getOrderStats();
    console.log("Order statistics:", response.data);
  } catch (error) {
    console.error("Failed to fetch stats:", getErrorMessage(error));
  }
}

// ============================================================================
// User/Wishlist Examples
// ============================================================================

/**
 * Example: Update profile
 */
async function updateProfileExample() {
  try {
    const response = await userService.updateProfile({
      firstName: "John",
      lastName: "Doe",
      mobile: "+919876543210",
      address: {
        firstName: "John",
        lastName: "Doe",
        phone: "+919876543210",
        addressLine1: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
    });

    console.log("Profile updated:", response.data);
  } catch (error) {
    console.error("Failed to update profile:", getErrorMessage(error));
  }
}

/**
 * Example: Get wishlist
 */
async function getWishlistExample() {
  try {
    const response = await userService.getWishlist();
    console.log("Wishlist:", response.data);
  } catch (error) {
    console.error("Failed to fetch wishlist:", getErrorMessage(error));
  }
}

/**
 * Example: Add to wishlist
 */
async function addToWishlistExample() {
  try {
    const response = await userService.addToWishlist({
      productId: "product-id-here",
    });

    console.log("Added to wishlist:", response.data);
  } catch (error) {
    console.error("Failed to add to wishlist:", getErrorMessage(error));
  }
}

/**
 * Example: Remove from wishlist
 */
async function removeFromWishlistExample() {
  try {
    const response = await userService.removeFromWishlist("product-id-here");
    console.log("Removed from wishlist:", response.data);
  } catch (error) {
    console.error("Failed to remove from wishlist:", getErrorMessage(error));
  }
}

// ============================================================================
// Error Handling Examples
// ============================================================================

/**
 * Example: Comprehensive error handling
 */
async function comprehensiveErrorHandlingExample() {
  try {
    const response = await productService.getProductById("some-id");
    console.log("Product:", response.data);
  } catch (error) {
    // Handle specific error types
    if (error instanceof AuthenticationError) {
      console.error("Please log in to continue");
      // Redirect to login page
    } else if (error instanceof ValidationError) {
      console.error("Validation errors:", error.errors);
      // Show validation errors in form
    } else if (error instanceof ApiError) {
      console.error(`API Error (${error.statusCode}):`, error.message);
      // Show error message to user
    } else {
      console.error("Unexpected error:", getErrorMessage(error));
      // Show generic error message
    }
  }
}

// ============================================================================
// React Component Example
// ============================================================================

/**
 * Example: Using API service in a React component
 */
/*
'use client';

import { useEffect, useState } from 'react';
import { productService, Product, getErrorMessage } from '@/lib/api/services';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await productService.getProducts({ page: 1, limit: 10 });
        setProducts(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
*/

export {
  signupExample,
  loginExample,
  getCurrentUserExample,
  logoutExample,
  getProductsExample,
  searchProductsExample,
  getProductBySlugExample,
  createProductExample,
  createOrderExample,
  getUserOrdersExample,
  cancelOrderExample,
  getOrderStatsExample,
  updateProfileExample,
  getWishlistExample,
  addToWishlistExample,
  removeFromWishlistExample,
  comprehensiveErrorHandlingExample,
};
