# API Service Documentation

Complete Axios-based API service with comprehensive error management for the tech_store application.

## Features

✅ **Type-Safe API Calls** - Full TypeScript support with typed requests and responses  
✅ **Error Management** - Custom error classes for different scenarios  
✅ **Automatic Retry** - Exponential backoff for failed requests  
✅ **Request/Response Interceptors** - Automatic token injection and logging  
✅ **FormData Support** - File upload handling for images and videos  
✅ **Token Management** - Automatic storage and retrieval of auth tokens  
✅ **SSR Compatible** - Works with Next.js server-side rendering  

## Installation

The required dependencies are already installed:

```bash
npm install axios
```

## Configuration

1. Copy the environment example file:
```bash
cp env.example .env.local
```

2. Update `.env.local` with your API URL:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## Project Structure

```
lib/api/
├── api-client.ts              # Configured Axios instance
├── api-config.ts              # Configuration constants
├── errors/
│   ├── api-error.ts          # Custom error classes
│   ├── error-handler.ts      # Error transformation logic
│   └── error-messages.ts     # User-friendly messages
├── interceptors/
│   ├── request-interceptor.ts   # Request interceptor
│   ├── response-interceptor.ts  # Response interceptor
│   └── retry-logic.ts          # Retry strategy
├── services/
│   ├── base-service.ts       # Abstract base class
│   ├── product-service.ts    # Product operations
│   ├── order-service.ts      # Order operations
│   ├── auth-service.ts       # Authentication
│   ├── user-service.ts       # User/Wishlist operations
│   └── index.ts              # Central exports
├── types/
│   ├── api-types.ts          # Common types
│   └── endpoints.ts          # Endpoint-specific types
├── utils/
│   ├── api-utils.ts          # Helper functions
│   └── storage.ts            # Token/user storage
└── examples/
    └── usage-examples.ts     # Usage demonstrations
```

## Usage

### Import Services

```typescript
import {
  productService,
  orderService,
  authService,
  userService,
  getErrorMessage,
} from '@/lib/api/services';
```

### Authentication

```typescript
// Signup
const response = await authService.signup({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
});

// Login
const response = await authService.login({
  email: 'john@example.com',
  password: 'password123',
});

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Products

```typescript
// Get all products
const products = await productService.getProducts({
  page: 1,
  limit: 10,
  featured: true,
  search: 'laptop',
});

// Search products
const results = await productService.searchProducts({
  query: 'dell',
  limit: 5,
});

// Get product by slug
const product = await productService.getProductBySlug('laptop-dell-xps-15');

// Create product (Admin)
const newProduct = await productService.createProduct({
  slug: 'laptop-dell-xps-15',
  name: 'Dell XPS 15',
  brand: 'Dell',
  description: 'High-performance laptop',
  price: 999.99,
  stock: 10,
  featured: true,
  product_primary_image: imageFile,
  images: [image1, image2],
});
```

### Orders

```typescript
// Create order
const order = await orderService.createOrder({
  items: [
    { product: 'product-id', quantity: 2 }
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+919876543210',
    addressLine1: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pincode: '400001',
  },
  paymentMethod: 'cash_on_delivery',
});

// Get user orders
const orders = await orderService.getUserOrders({
  page: 1,
  limit: 10,
  status: 'pending',
});

// Cancel order
await orderService.cancelOrder('order-id', {
  cancelReason: 'Customer requested',
});
```

### User & Wishlist

```typescript
// Update profile
await userService.updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  mobile: '+919876543210',
});

// Get wishlist
const wishlist = await userService.getWishlist();

// Add to wishlist
await userService.addToWishlist({ productId: 'product-id' });

// Remove from wishlist
await userService.removeFromWishlist('product-id');
```

## Error Handling

### Error Types

- `ApiError` - Base API error
- `NetworkError` - Network connectivity issues
- `ValidationError` - Request validation failures
- `AuthenticationError` - Auth errors (401)
- `AuthorizationError` - Permission errors (403)
- `NotFoundError` - Resource not found (404)
- `ConflictError` - Resource conflict (409)
- `RateLimitError` - Too many requests (429)
- `ServerError` - Server errors (500+)
- `TimeoutError` - Request timeout

### Handling Errors

```typescript
import { 
  getErrorMessage, 
  ValidationError, 
  AuthenticationError 
} from '@/lib/api/services';

try {
  const product = await productService.getProductById('id');
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Redirect to login
  } else if (error instanceof ValidationError) {
    // Show validation errors
    console.log(error.errors);
  } else {
    // Show generic error
    console.error(getErrorMessage(error));
  }
}
```

## React Component Example

```typescript
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
        const response = await productService.getProducts({ 
          page: 1, 
          limit: 10 
        });
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
```

## Advanced Features

### Retry Logic

Failed requests are automatically retried with exponential backoff:
- Max retries: 3
- Base delay: 1 second
- Retryable status codes: 408, 429, 500, 502, 503, 504
- Only GET requests retry on network errors

### Token Management

Tokens are automatically:
- Injected into request headers
- Stored in localStorage (with SSR fallback)
- Cleared on logout

### FormData Handling

File uploads are automatically handled:

```typescript
const product = await productService.createProduct({
  name: 'Product Name',
  product_primary_image: imageFile,
  images: [image1, image2],
  videos: [video1],
});
```

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/search/list` - Search products
- `GET /products/{id}` - Get product by ID
- `GET /products/slug/{slug}` - Get product by slug
- `POST /products` - Create product (Admin)
- `PUT /products/{id}` - Update product (Admin)
- `DELETE /products/{id}` - Delete product (Admin)

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user orders
- `GET /orders/{id}` - Get order by ID
- `DELETE /orders/{id}/cancel` - Cancel order
- `GET /orders/admin/all` - Get all orders (Admin)
- `GET /orders/admin/stats` - Get order stats (Admin)
- `PUT /orders/{id}/status` - Update order status (Admin)
- `PUT /orders/{id}/payment` - Update payment status (Admin)

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### User
- `PATCH /users/profile` - Update profile
- `GET /wishlist` - Get wishlist
- `POST /wishlist` - Add to wishlist
- `DELETE /wishlist/{productId}` - Remove from wishlist
- `DELETE /wishlist` - Clear wishlist

## Configuration Options

Edit `lib/api/api-config.ts` to customize:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },
};
```

## License

MIT
