/**
 * API Services
 * Central export point for all API services
 */

// Export services
export { productService } from "./product-service";
export { orderService } from "./order-service";
export { authService } from "./auth-service";
export { userService } from "./user-service";
export { categoryService } from "./category-service";
export { cartService } from "./cart-service";
export { wishlistService } from "./wishlist-service";

// Export types
export * from "../types/endpoints";
export * from "../types/api-types";
export * from "../types/api-roles";

// Export errors
export * from "../errors/api-error";
export { getErrorMessage } from "../errors/error-handler";

// Export utilities
export { TokenStorage, UserStorage, clearAllStorage } from "../utils/storage";
export * from "../utils/api-utils";
export * from "../utils/role-utils";

// Export middleware
export * from "../middleware/auth-middleware";
