"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import { orderService } from "@/lib/api/services";
import { Order } from "@/lib/api/types/endpoints";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, cn } from "@/lib/utils";
import { ProductImage } from "@/components/shared/ProductImage";
import { toast } from "sonner";

export default function MyOrdersPage() {
  const { isAuthenticated, isLoading: authLoading, openLoginModal } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders();
        // Handle both wrapped and flat responses from the backend
        const rawResponse = response as any;
        const orderData = rawResponse.data || rawResponse.orders || rawResponse;

        if (Array.isArray(orderData)) {
          setOrders(orderData);
        } else if (orderData && Array.isArray(orderData.data)) {
          setOrders(orderData.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load your orders");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "shipped":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto space-y-6 bg-card p-8 rounded-2xl shadow-sm border border-border/50">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">
              Please log in to view your orders
            </h1>
            <p className="text-muted-foreground">
              You need to be authenticated to access your order history and
              tracking details.
            </p>
            <Button
              onClick={openLoginModal}
              className="w-full h-12 text-lg font-semibold"
            >
              Log In Now
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage your recent purchases
              </p>
            </div>
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-medium bg-card"
            >
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </Badge>
          </div>

          {orders.length === 0 ? (
            <Card className="border-dashed border-2 py-20 bg-card">
              <CardContent className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">No orders yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Your order history is empty. Time to start shopping for the
                    best tech deals!
                  </p>
                </div>
                <Link href="/products">
                  <Button size="lg" className="h-12 px-8 font-semibold">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card
                  key={order._id}
                  className="overflow-hidden hover:shadow-md transition-shadow bg-card border-border/50"
                >
                  <CardHeader className="bg-muted/30 border-b border-border/50 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Order ID
                          </p>
                          <p className="font-mono text-sm font-semibold">
                            #
                            {order._id
                              .substring(order._id.length - 8)
                              .toUpperCase()}
                          </p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Date
                          </p>
                          <p className="text-sm font-semibold">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-none",
                          getStatusColor(order.orderStatus)
                        )}
                      >
                        {getStatusIcon(order.orderStatus)}
                        <span className="capitalize font-bold text-xs">
                          {order.orderStatus}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-6 flex items-center gap-4 hover:bg-muted/30 transition-colors"
                        >
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted/50 shrink-0 border border-border/30">
                            <ProductImage
                              src={
                                item.product?.product_primary_image_url ||
                                item.product?.images?.[0]
                              }
                              alt={item.product?.name || "Product"}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-bold text-base line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                              {item.product?.name || "Product Unvailable"}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <p>
                                Qty:{" "}
                                <span className="font-bold text-foreground">
                                  {item.quantity}
                                </span>
                              </p>
                              <p>•</p>
                              <p>
                                Price:{" "}
                                <span className="font-bold text-foreground">
                                  {formatPrice(item.price)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block text-right">
                            <p className="font-bold text-lg">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-muted/20 p-6 flex flex-wrap items-center justify-between border-t border-border/50 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Amount
                        </p>
                        <p className="text-2xl font-black text-primary">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-10 px-6 font-bold bg-card"
                        >
                          <Link href={`/orders/${order._id}`}>
                            View Details
                          </Link>
                        </Button>
                        {order.orderStatus === "delivered" && (
                          <Button
                            variant="default"
                            size="sm"
                            className="h-10 px-6 font-bold"
                          >
                            Rate & Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
