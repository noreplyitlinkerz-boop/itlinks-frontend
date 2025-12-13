# TechStore - E-commerce Website with Admin Panel

A fully functional Next.js e-commerce website for selling laptops, laptop parts, and accessories, complete with a comprehensive admin panel.

## ✨ Features

### Public Website

- **Homepage**: Hero section, featured products, and category showcase
- **Product Listing**: Search, filter by category, and sort products
- **Product Details**: Full product information with specs and quantity selector
- **Shopping Cart**: Add/remove items, update quantities, order summary
- **Wishlist**: Save products for later
- **About & Contact**: Company information and contact form

### Admin Panel

- **Dashboard**: Overview with statistics and recent orders
- **Product Management**: Full CRUD operations for products
- **Category Management**: Add, edit, and delete categories
- **Order Management**: View orders and update order status

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd /Users/kundan/Learning/tech_store
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
tech_store/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   │   ├── products/        # Product management
│   │   ├── categories/      # Category management
│   │   └── orders/          # Order management
│   ├── products/            # Product listing and details
│   ├── cart/                # Shopping cart
│   ├── wishlist/            # Wishlist page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   └── page.tsx             # Homepage
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   └── shared/              # Custom shared components
├── context/                 # React Context providers
│   ├── CartContext.tsx      # Cart state management
│   ├── WishlistContext.tsx  # Wishlist state management
│   └── AdminContext.tsx     # Admin/products state
├── lib/                     # Utility functions and data
│   └── data/                # Mock data
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## 🎨 Design Features

- **Dark Theme**: Modern dark mode enabled by default
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Smooth Animations**: Fade-in, slide-in, and scale transitions
- **Futuristic UI**: Premium aesthetic with gradient accents
- **Clean Typography**: Inter font for readability
- **Professional Admin**: Dashboard-style admin panel

## 💾 Data Management

All data is stored in local state (React Context). Changes persist only during the session:

- **Products**: 20 sample products across 5 categories
- **Categories**: Laptops, Components, Storage, Peripherals, Networking
- **Orders**: 10 mock orders for the admin panel
- **Cart & Wishlist**: Session-based storage

## 🔑 Access

- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - No authentication required (as per requirements)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Functionality

### Shopping Features

- ✅ Add products to cart with quantity selection
- ✅ Update cart item quantities
- ✅ Remove items from cart
- ✅ Add/remove items from wishlist
- ✅ Product search and filtering
- ✅ Category-based browsing
- ✅ Sort products by price, name, or date

### Admin Features

- ✅ Add new products with all details
- ✅ Edit existing product information
- ✅ Delete products
- ✅ Manage product categories
- ✅ View all orders
- ✅ Update order status
- ✅ View order details
- ✅ Dashboard with statistics

## 🌟 UI Highlights

- Gradient hero section with animations
- Product cards with hover effects
- Smooth page transitions
- Toast notifications for user actions
- Modal dialogs for forms
- Responsive navigation with mobile menu
- Professional data tables
- Status badges with color coding

## 📦 Dependencies

Key packages used:

- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `@radix-ui/*` - Headless UI components (via shadcn)
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `clsx` & `tailwind-merge` - Utility functions

## 🔧 Configuration

- Dark mode is enabled by default via the `dark` class on the HTML element
- Tailwind is configured with custom animations and theme colors
- TypeScript is configured with path aliases (`@/*`)

## 📄 License

This is a demo project created for educational purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
# TechStore-with-admin
