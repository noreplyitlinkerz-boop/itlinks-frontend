"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Menu,
  Sun,
  Moon,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, openLoginModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userInitials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center p-1 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-sm w-12 h-12 md:w-auto md:h-auto md:border-none md:bg-transparent md:backdrop-blur-none md:shadow-none md:p-0 transition-all duration-300 group-hover:scale-105">
              <Image
                className="w-4 h-6 md:w-7 md:h-8 mix-blend-multiply dark:mix-blend-screen dark:invert"
                src="/logo-01.png"
                alt="Logo"
                width={24}
                height={24}
              />
            </div>
            <span className="hidden md:block text-2xl font-bold bg-linear-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent -ml-3 -mb-2">
              tlinkers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === "/"
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname.startsWith("/products")
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === "/about"
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === "/contact"
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              Contact
            </Link>
          </div>

          {/* Cart and Wishlist Icons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-transform hover:rotate-12"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative transition-colors",
                  pathname === "/wishlist"
                    ? "text-primary bg-primary/10"
                    : "text-foreground",
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    pathname === "/wishlist" && "fill-current",
                  )}
                />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative transition-colors",
                  pathname === "/cart"
                    ? "text-primary bg-primary/10"
                    : "text-foreground",
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Button/User Profile */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
                  >
                    <span className="text-xs font-bold">{userInitials}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground italic">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={openLoginModal}
                className="hidden md:flex rounded-full px-5 bg-linear-to-r from-primary to-blue-600 hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-border/40 pt-4 animate-slide-in-down">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                pathname === "/"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                pathname.startsWith("/products")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                pathname === "/about"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                pathname === "/contact"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {!isAuthenticated && (
              <Button
                variant="default"
                className="w-full text-sm font-medium text-secondary bg-primary rounded-lg px-4 py-2 mt-2 text-center items-center justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
              >
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="justify-start px-0 text-sm font-medium text-red-500 hover:text-red-600 py-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
