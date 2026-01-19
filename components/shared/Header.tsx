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
  ChevronDown,
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

const NAVIGATION_CATEGORIES = [
  {
    name: "Buy Refurbished Laptop",
    href: "/products?category=laptops",
    subcategories: ["Apple Macbook", "HP", "Lenovo", "Dell"],
  },
  {
    name: "Buy Refurbished Desktop",
    href: "/products?category=desktops",
    subcategories: ["HP", "Lenovo", "Dell"],
  },
  {
    name: "HP Brand Refurbished",
    href: "/products?category=hp-refurbished",
    subcategories: ["Elitebook", "Probook", "ZBook"],
  },
  {
    name: "Elite Desktop",
    href: "/products?category=elite-desktop",
    subcategories: ["Elitedesk", "Prodesk"],
  },
  {
    name: "Accessories",
    href: "/products?category=accessories",
    subcategories: [
      "Motherboard",
      "Processors",
      "SSD's/HDD's",
      "RAM",
      "Monitors",
      "Graphics Card",
      "Antivirus Software",
      "Cartridges/Ink",
      "Cable",
      "Pendrives",
      "Keyboard",
      "Mouse",
      "Cameras",
      "DVR/NVR",
      "CCTV Racks",
      "Headphones",
      "Speakers",
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, openLoginModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  const userInitials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  return (
    <>
      {/* Background Overlay / Backdrop */}
      {(mobileMenuOpen || activeCategory) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 animate-in fade-in duration-300"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveCategory(null);
          }}
        />
      )}

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          mobileMenuOpen || activeCategory
            ? "border-border/60 bg-background shadow-2xl"
            : "border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        )}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 md:gap-2 group shrink-0"
            >
              <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Image
                  className="w-7 h-7 md:w-10 md:h-10 mix-blend-multiply dark:mix-blend-screen dark:invert"
                  src="/logo-01.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col -gap-0.5 md:-gap-1">
                <span className="text-lg md:text-2xl font-bold bg-linear-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent leading-none">
                  ITLINKERS
                </span>
                <span className="text-[7px] md:text-[10px] text-muted-foreground font-medium tracking-wider uppercase leading-none">
                  wired for your world
                </span>
              </div>
            </Link>

            {/* Search Bar - Center */}
            <div className="hidden lg:flex flex-1 max-w-md relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for Products, Categories or Brands..."
                  className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hidden" />
                <Menu className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex flex-col items-end mr-2 text-[11px] leading-tight text-muted-foreground">
                <span>Contact:</span>
                <span className="font-semibold text-foreground">
                  +91 7380817676
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9"
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
                    "relative w-9 h-9",
                    pathname === "/wishlist" && "text-primary bg-primary/10",
                  )}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      pathname === "/wishlist" && "fill-current",
                    )}
                  />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
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
                    "relative w-9 h-9",
                    pathname === "/cart" && "text-primary bg-primary/10",
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      <span className="text-xs font-bold">{userInitials}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    {user?.role === "admin" && (
                      <Link href="/admin">
                        <DropdownMenuItem>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <Link href="/orders">
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500 cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openLoginModal}
                    className="hidden md:flex text-sm font-semibold"
                  >
                    Sign in
                  </Button>
                  <span className="hidden md:inline text-muted-foreground/30">
                    |
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openLoginModal}
                    className="hidden md:flex text-sm font-semibold"
                  >
                    Account
                  </Button>
                </div>
              )}

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

          {/* Categories Navigation - Desktop */}
          <div className="hidden md:flex items-center justify-between border-t border-border/40 mt-3 pt-2">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={cn(
                  "text-sm font-bold uppercase tracking-tight transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-foreground",
                )}
              >
                Home
              </Link>
              {NAVIGATION_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="relative group py-1"
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === cat.name ? null : cat.name,
                      )
                    }
                    className={cn(
                      "text-sm font-bold uppercase tracking-tight flex items-center gap-1 transition-colors hover:text-primary",
                      activeCategory === cat.name
                        ? "text-primary"
                        : "text-foreground",
                    )}
                  >
                    {cat.name}
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Dropdown / Mega-menu */}
                  {activeCategory === cat.name && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border shadow-2xl rounded-xl z-50 py-5 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[70vh] overflow-y-auto custom-scrollbar">
                      <div className="grid gap-1.5 px-3">
                        <div className="px-3 mb-2 pb-2 border-b border-border/50">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Explore {cat.name}
                          </p>
                        </div>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/products?category=${cat.name
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-",
                              )}&subcategory=${sub.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-3 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-all font-medium flex items-center justify-between group/item"
                            onClick={() => setActiveCategory(null)}
                          >
                            {sub}
                            <Package className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-bold uppercase tracking-tight transition-colors hover:text-primary",
                  pathname === "/contact" ? "text-primary" : "text-foreground",
                )}
              >
                Contactus
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-6 flex flex-col gap-3 border-t border-border/40 pt-4 animate-slide-in-down max-h-[80vh] overflow-y-auto">
              <Link
                href="/"
                className={cn(
                  "text-sm font-bold uppercase tracking-tight transition-colors py-3 px-3 rounded-xl",
                  pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {NAVIGATION_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="flex flex-col border-b border-border/10 last:border-0"
                >
                  <button
                    onClick={() =>
                      setExpandedMobileCategory(
                        expandedMobileCategory === cat.name ? null : cat.name,
                      )
                    }
                    className={cn(
                      "flex items-center justify-between py-4 px-3 hover:bg-muted/50 transition-colors text-left rounded-xl",
                      expandedMobileCategory === cat.name && "bg-primary/5",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-bold uppercase tracking-tight transition-colors",
                        expandedMobileCategory === cat.name
                          ? "text-primary"
                          : "text-foreground",
                      )}
                    >
                      {cat.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        expandedMobileCategory === cat.name
                          ? "rotate-180 text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </button>

                  {expandedMobileCategory === cat.name && (
                    <div className="pl-6 pb-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-300">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/products?category=${cat.name
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-",
                            )}&subcategory=${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm py-2.5 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setExpandedMobileCategory(null);
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-bold uppercase tracking-tight transition-colors py-3 px-3 rounded-xl",
                  pathname === "/contact"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full text-sm font-bold uppercase tracking-wider text-red-500 border-red-500 hover:bg-red-50 rounded-xl px-4 py-4 mt-4"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full text-sm font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-4 mt-4 shadow-lg shadow-primary/20"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                >
                  Login / Sign up
                </Button>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
