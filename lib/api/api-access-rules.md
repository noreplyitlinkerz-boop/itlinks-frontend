# 🔐 API Access Rules - Source of Truth

**This document is the definitive source of truth for API access control.**

The API access levels are **already decided**.  
Do **NOT** redesign, reclassify, or reinterpret them.

---

## 🟢 Frontend / User APIs (Non-Admin)

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Get all products with pagination |
| `GET` | `/products/search/list` | Search products |
| `GET` | `/products/{id}` | Get product by ID |
| `GET` | `/products/slug/{slug}` | Get product by slug |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `POST` | `/api/auth/logout` | Logout current user |
| `GET` | `/api/auth/me` | Get current user info |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PATCH` | `/users/profile` | Update user profile |
| `GET` | `/wishlist` | Get user wishlist |
| `POST` | `/wishlist` | Add item to wishlist |
| `DELETE` | `/wishlist/{productId}` | Remove item from wishlist |
| `DELETE` | `/wishlist` | Clear entire wishlist |

### Orders (User Scope Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders` | Create new order |
| `GET` | `/orders` | Get user's orders |
| `GET` | `/orders/{id}` | Get specific order |
| `DELETE` | `/orders/{id}/cancel` | Cancel user's order |

---

## 🔴 Admin-Only APIs (Backend / Dashboard)

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/products` | Create new product |
| `PUT` | `/products/{id}` | Update product |
| `DELETE` | `/products/{id}` | Delete product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders/admin/all` | Get all orders (all users) |
| `GET` | `/orders/admin/stats` | Get order statistics |
| `PUT` | `/orders/{id}/status` | Update order status |
| `PUT` | `/orders/{id}/payment` | Update payment status |

---

## ❗ HARD RULES (NO EXCEPTIONS)

1. **Do NOT guess or assume permissions**
2. **Do NOT mark Admin APIs as frontend-accessible**
3. **Do NOT introduce new roles or endpoints**
4. **Do NOT change routes or HTTP methods**
5. **If an endpoint is listed under Admin, it is Admin ONLY**
6. **If it is not listed under Admin, it is NOT Admin**

---

## 🎯 Usage Guidelines

### When Writing Backend Logic

- Check this document for endpoint classification
- Apply appropriate middleware/guards
- Verify user role before processing admin requests

### When Adding Role-Based Guards

- Use exact endpoint paths as listed
- Apply admin guards only to endpoints in the Admin section
- Apply authentication guards to all non-public endpoints

### When Generating Documentation

- Reference this document as the source of truth
- Include access level indicators in API docs
- Link to this file for clarification

### When Validating API Usage

- Frontend should only call non-admin endpoints
- Admin dashboard should use admin-specific endpoints
- Verify role requirements match this classification

---

## 📋 Quick Reference

### Access Levels

- **🟢 Public** - No authentication required (signup, login)
- **🟡 Authenticated** - Requires valid user token (user orders, profile, wishlist)
- **🔴 Admin** - Requires admin role (product management, order management)

### Role Types

- **Customer** - Regular user, can access all non-admin endpoints
- **Admin** - Administrator, can access all endpoints including admin-only

---

**Last Updated:** 2026-01-01  
**Version:** 1.0.0
