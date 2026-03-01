"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  MessageSquare,
  Menu,
  X,
  Tag,
  Image as ImageIcon,
  Map,
  Cpu,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: FolderTree, label: "Categories" },
    { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/admin/brands", icon: Tag, label: "Brands" },
    { href: "/admin/ram", icon: Cpu, label: "RAM" },
    { href: "/admin/storage", icon: HardDrive, label: "Storage" },
    { href: "/admin/banners", icon: ImageIcon, label: "Banners" },
    { href: "/admin/navigation", icon: Map, label: "Navigation" },
    { href: "/admin/contacts", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background admin-theme">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center gap-4 px-6 justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden border border-border/20"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl hidden sm:inline-block">
                  Itlinkers Admin
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-border/20 hover:bg-primary hover:text-primary-foreground"
                >
                  View Store
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex relative">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[calc(100vh-4rem)] md:border-r md:border-border/20 bg-white dark:bg-zinc-950 border-r border-border/20 pt-16 md:pt-6 p-6 shadow-xl md:shadow-none",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <h2 className="text-xl font-bold mb-6 border-b border-border/20 pb-4">
              Admin Panel
            </h2>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
