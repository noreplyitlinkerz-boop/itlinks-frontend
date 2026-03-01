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
  LayoutDashboard,
  Package,
  ChevronDown,
  Search,
  Phone,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { navigationService, productService } from "@/lib/api/services";
import { NavigationItem } from "@/lib/api/types/endpoints";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SearchResultItem {
  _id: string;
  slug: string;
  name: string;
  price: number;
}

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, openLoginModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  const router = useRouter();
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const userInitials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await navigationService.getNavigation();
        if (response.success && response.data) {
          setNavItems(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch navigation", error);
      }
    };
    fetchNavigation();
  }, []);

  const [detectedLocation, setDetectedLocation] = useState<{
    city: string;
    pincode: string;
  } | null>(null);

  // Auto-detect location for non-logged-in users
  useEffect(() => {
    if (!isAuthenticated && !detectedLocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              );
              const data = await res.json();
              if (data.address) {
                setDetectedLocation({
                  city:
                    data.address.city ||
                    data.address.town ||
                    data.address.suburb ||
                    "Unknown City",
                  pincode: data.address.postcode || "",
                });
              }
            } catch (error) {
              console.error("Error fetching location details:", error);
            }
          },
          (error) => {
            console.log("Location permission denied or error:", error.message);
          },
        );
      }
    }
  }, [isAuthenticated, detectedLocation]);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const response = await productService.searchProducts({
            search: searchQuery,
            limit: 10,
          });
          if (response && response.data && Array.isArray(response.data)) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Search failed", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
          setShowResults(true);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Helper to determine the correct URL for navigation items
  const getHref = (navLabel: string, navUrl: string, parentLabel?: string) => {
    const knownBrands = [
      "HP",
      "Lenovo",
      "Dell",
      "Apple",
      "Acer",
      "Asus",
      "MSI",
      "Samsung",
      "Sony",
      "Microsoft",
    ];
    const upperLabel = navLabel.toUpperCase();

    // If it's a known brand and we're under a category like "Laptop"
    if (knownBrands.some((brand) => upperLabel.includes(brand))) {
      const brandName =
        knownBrands.find((brand) => upperLabel.includes(brand)) || navLabel;

      // If the URL is already a products search/filter URL
      if (navUrl.includes("/products")) {
        const url = new URL(navUrl, window.location.origin);
        // If it was previously using subcategory for the brand, replace it with brand parameter
        if (
          url.searchParams.has("subcategory") &&
          url.searchParams
            .get("subcategory")
            ?.toUpperCase()
            .includes(brandName.toUpperCase())
        ) {
          url.searchParams.delete("subcategory");
        }
        url.searchParams.set("brand", brandName);
        return url.pathname + url.search;
      }
    }
    return navUrl;
  };

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
            {/* Left Section: Logo & Location */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-1.5 md:gap-2 group shrink-0"
              >
                <div className="flex flex-col -gap-0.5 md:-gap-1">
                  <div className="flex items-center">
                    <span className="text-lg md:text-2xl font-bold text-[#10BBE6] -mr-[0.1em]">
                      ITL
                    </span>
                    <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-100 mb-2">
                      <Image
                        className="w-3 h-5 md:w-5 md:h-7"
                        src="/logo-01.svg"
                        alt="Logo"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span className="text-lg md:text-2xl font-bold text-[#10BBE6] -ml-[0.1em]">
                      NKERS
                    </span>
                  </div>
                  <span className="text-[6px] md:text-[8px] text-center w-full  text-muted-foreground font-medium tracking-tighter uppercase leading-none">
                    Where Technology Connects
                  </span>
                </div>
              </Link>

              {/* Location Indicator */}
              <div
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer group shrink-0 px-3 py-1.5 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10"
                onClick={() => {
                  if (isAuthenticated) {
                    router.push("/profile");
                  } else {
                    openLoginModal();
                  }
                }}
              >
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform text-[#10BBE6]" />
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[10px] font-medium leading-tight opacity-70">
                    Delivering to{" "}
                    {isAuthenticated ? (
                      <>
                        {user?.address?.city || "Lucknow"}{" "}
                        {user?.address?.pincode || "226021"}
                      </>
                    ) : detectedLocation ? (
                      <>
                        {detectedLocation.city} {detectedLocation.pincode}
                      </>
                    ) : (
                      "Mohali 160062"
                    )}
                  </span>
                  <span className="text-xs font-bold leading-tight group-hover:text-primary">
                    Update location
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar - Center (desktop lg+) */}
            <div className="hidden lg:flex flex-1 max-w-md relative">
              <div className="relative w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      router.push(
                        `/products?search=${encodeURIComponent(searchQuery)}`,
                      );
                      setShowResults(false);
                    }
                  }}
                  className="relative w-full"
                >
                  <input
                    type="text"
                    placeholder="Search for Products, Categories or Brands..."
                    className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                  />
                  <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hidden" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </form>

                {/* Search Results Dropdown */}
                {showResults &&
                  (searchQuery.length >= 2 || searchResults.length > 0) && (
                    <>
                      <div
                        className="fixed inset-0 z-10 bg-transparent"
                        onClick={() => setShowResults(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl z-20 overflow-hidden max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
                        {isSearching ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            Searching...
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="py-2">
                            {searchResults.map((product) => (
                              <div
                                key={product._id}
                                className="flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2 md:py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/10 last:border-0"
                                onClick={() => {
                                  router.push(`/products/slug/${product.slug}`);
                                  setShowResults(false);
                                  setSearchQuery("");
                                }}
                              >
                                <div className="flex-1 flex justify-between items-center min-w-0 gap-2 md:gap-4">
                                  <h4 className="text-sm font-medium text-foreground truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-primary font-semibold whitespace-nowrap">
                                    ₹{product.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : searchQuery.length >= 2 ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No products found
                          </div>
                        ) : null}
                      </div>
                    </>
                  )}
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => window.open("tel:+917380817676")}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10BBE6]/5 border border-[#10BBE6]/10 text-[#10BBE6] hover:bg-[#10BBE6] hover:text-white transition-all duration-300 group mr-2"
              >
                <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-[12px] font-bold tracking-tight">
                  +91 7380817676
                </span>
              </button>

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

              {/* User Profile & Contact Info Group */}
              <div className="flex flex-col items-center">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        <span className="text-xs font-bold">
                          {userInitials}
                        </span>
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
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setMobileSearchOpen(false);
                }}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </nav>

        {/* ── MOBILE SEARCH BAR (always visible) ── */}
        <div className="lg:hidden px-3 pb-3 border-t border-border/30">
          <div className="relative w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(
                    `/products?search=${encodeURIComponent(searchQuery)}`,
                  );
                  setShowResults(false);
                }
              }}
              className="relative w-full"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, brands..."
                className="w-full h-11 pl-10 pr-10 rounded-full bg-muted/60 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-lg leading-none"
                >
                  ×
                </button>
              )}
            </form>

            {/* Mobile Search Results Dropdown */}
            {showResults &&
              (searchQuery.length >= 2 || searchResults.length > 0) && (
                <>
                  <div
                    className="fixed inset-0 z-10 bg-transparent"
                    onClick={() => setShowResults(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background/97 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl z-20 overflow-hidden max-h-[55vh] overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="py-2">
                        <p className="px-4 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/20">
                          Results for &quot;{searchQuery}&quot;
                        </p>
                        {searchResults.map((product) => (
                          <div
                            key={product._id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 active:bg-muted transition-colors cursor-pointer border-b border-border/10 last:border-0"
                            onClick={() => {
                              router.push(`/products/slug/${product.slug}`);
                              setShowResults(false);
                              setSearchQuery("");
                            }}
                          >
                            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <div className="flex-1 flex justify-between items-center min-w-0 gap-2">
                              <h4 className="text-sm font-medium text-foreground truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-primary font-semibold whitespace-nowrap">
                                ₹{product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery.length >= 2 ? (
                      <div className="p-6 text-center">
                        <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No products found for &quot;{searchQuery}&quot;
                        </p>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
          </div>
        </div>

        {/* Categories Navigation - Desktop - Full Width */}
        <div className="hidden md:flex items-center justify-center bg-[#10BBE6] text-white">
          <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-bold uppercase tracking-tight transition-colors hover:text-white/80",
                pathname === "/" ? "text-white" : "text-white/90",
              )}
            >
              Home
            </Link>
            {navItems.map((nav) => (
              <div
                key={nav.label}
                className="relative group py-1"
                onMouseEnter={() => setActiveCategory(nav.label)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={nav.url || "#"}
                  className={cn(
                    "text-sm font-bold uppercase tracking-tight flex items-center gap-1 transition-colors hover:text-white/80",
                    activeCategory === nav.label
                      ? "text-white"
                      : "text-white/90",
                  )}
                >
                  {nav.label}
                  {nav.children && nav.children.length > 0 && (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </Link>

                {/* Dropdown / Mega-menu */}
                {nav.children &&
                  nav.children.length > 0 &&
                  activeCategory === nav.label && (
                    <div className="absolute top-full left-0 mt-0 w-72 bg-card border border-border shadow-2xl rounded-xl z-50 py-5 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[70vh] overflow-y-auto custom-scrollbar">
                      <div className="grid gap-1.5 px-3">
                        <div className="px-3 mb-2 pb-2 border-b border-border/50">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Explore {nav.label}
                          </p>
                        </div>
                        {nav.children.map((child) => (
                          <Link
                            key={child.label}
                            href={getHref(child.label, child.url, nav.label)}
                            className="px-3 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-all font-medium flex items-center justify-between group/item"
                            onClick={() => setActiveCategory(null)}
                          >
                            {child.label}
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
                "text-sm font-bold uppercase tracking-tight transition-colors hover:text-white/80",
                pathname === "/contact" ? "text-white" : "text-white/90",
              )}
            >
              Contactus
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-bold uppercase tracking-tight transition-colors hover:text-white/80",
                pathname === "/about" ? "text-white" : "text-white/90",
              )}
            >
              About us
            </Link>
          </div>
        </div>

        {/* Categories Navigation - Mobile - Fallback/Padding for mobile menu */}
        <nav className="container mx-auto px-4 md:hidden">
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
              {navItems.map((nav) => (
                <div
                  key={nav.label}
                  className="flex flex-col border-b border-border/10 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={nav.url || "#"}
                      onClick={() => {
                        if (!nav.children || nav.children.length === 0)
                          setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 py-4 px-3 hover:bg-muted/50 transition-colors text-left rounded-xl text-sm font-bold uppercase tracking-tight",
                        expandedMobileCategory === nav.label && "bg-primary/5",
                      )}
                    >
                      {nav.label}
                    </Link>
                    {nav.children && nav.children.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedMobileCategory(
                            expandedMobileCategory === nav.label
                              ? null
                              : nav.label,
                          );
                        }}
                        className="p-4"
                      >
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            expandedMobileCategory === nav.label
                              ? "rotate-180 text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {expandedMobileCategory === nav.label && nav.children && (
                    <div className="pl-6 pb-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-300">
                      {nav.children.map((child) => (
                        <Link
                          key={child.label}
                          href={getHref(child.label, child.url, nav.label)}
                          className="text-sm py-2.5 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setExpandedMobileCategory(null);
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                          {child.label}
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
