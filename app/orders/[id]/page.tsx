"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ChevronLeft,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { orderService } from "@/lib/api/services";
import { Order } from "@/lib/api/types/endpoints";
import { formatPrice, cn } from "@/lib/utils";
import { ProductImage } from "@/components/shared/ProductImage";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderById(id);
        // Handle both wrapped { data: order } and flat order responses
        const rawResponse = response as any;
        const orderData =
          rawResponse.data || (rawResponse._id ? rawResponse : null);
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        toast.error("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order || isCancelling) return;

    if (!confirm("Are you sure you want to cancel this order?")) return;

    setIsCancelling(true);
    try {
      await orderService.cancelOrder(order._id, {
        cancelReason: "Cancelled by user via web interface",
      });
      toast.success("Order cancelled successfully");
      // Refresh order data
      const response = await orderService.getOrderById(order._id);
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  const statusTimeline = [
    { status: "pending", icon: Clock, label: "Order Placed" },
    { status: "confirmed", icon: ShieldCheck, label: "Confirmed" },
    { status: "processing", icon: Package, label: "Processing" },
    { status: "shipped", icon: Truck, label: "Shipped" },
    { status: "delivered", icon: CheckCircle2, label: "Delivered" },
  ];

  const getStatusIndex = (status: string) => {
    const index = statusTimeline.findIndex((s) => s.status === status);
    return index === -1 ? (status === "cancelled" ? -1 : 0) : index;
  };

  const currentStatusIndex = order ? getStatusIndex(order.orderStatus) : -1;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid md:grid-cols-3 gap-6">
              <Skeleton className="h-64 md:col-span-2" />
              <Skeleton className="h-64" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Order not found</h1>
            <p className="text-muted-foreground">
              Wait, we couldn't find the order you're looking for. It might have
              been deleted or the ID is incorrect.
            </p>
            <Button asChild>
              <Link href="/orders">Back to My Orders</Link>
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
          {/* Navigation & Header */}
          <div className="flex flex-col gap-4">
            <Link
              href="/orders"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors w-fit"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to My Orders
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  Order Details
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      order.orderStatus === "pending" &&
                        "bg-orange-500/10 text-orange-600 border-orange-500/20",
                      order.orderStatus === "confirmed" &&
                        "bg-blue-500/10 text-blue-600 border-blue-500/20",
                      order.orderStatus === "processing" &&
                        "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
                      order.orderStatus === "shipped" &&
                        "bg-purple-500/10 text-purple-600 border-purple-500/20",
                      order.orderStatus === "delivered" &&
                        "bg-green-500/10 text-green-600 border-green-500/20",
                      order.orderStatus === "cancelled" &&
                        "bg-red-500/10 text-red-600 border-red-500/20"
                    )}
                  >
                    {order.orderStatus}
                  </Badge>
                </h1>
                <p className="text-muted-foreground font-mono">
                  #{order._id.toUpperCase()}
                </p>
              </div>
              <div className="flex gap-3">
                {order.orderStatus === "pending" && (
                  <Button
                    variant="outline"
                    className="border-red-500/20 text-red-600 hover:bg-red-500/5 hover:text-red-700"
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Order
                  </Button>
                )}
                <Button variant="outline" className="hidden sm:flex">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Buy Again
                </Button>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          {order.orderStatus !== "cancelled" && (
            <Card className="bg-card border-border/50 overflow-hidden">
              <CardContent className="p-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-muted rounded-full overflow-hidden hidden md:block">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${
                          (currentStatusIndex / (statusTimeline.length - 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  {/* Status Steps */}
                  <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
                    {statusTimeline.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;

                      return (
                        <div
                          key={step.status}
                          className="flex md:flex-col items-center gap-4 md:gap-3 text-center"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 z-10",
                              isCompleted
                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-card border-muted text-muted-foreground",
                              isCurrent && "ring-4 ring-primary/20 scale-110"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col md:items-center text-left md:text-center space-y-0.5">
                            <span
                              className={cn(
                                "text-sm font-bold",
                                isCompleted
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {step.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">
                                Current State
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Details Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Order Items */}
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-lg font-bold">
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="p-6 flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted/30 shrink-0 border border-border/30">
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
                          <h4 className="font-bold text-base line-clamp-1">
                            {item.product?.name || "Product Unavailable"}
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
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-1 text-sm">
                    <p className="font-bold text-base">
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {order.shippingAddress.addressLine1}
                    </p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-muted-foreground font-medium">
                        {order.shippingAddress.addressLine2}
                      </p>
                    )}
                    <p className="text-muted-foreground font-medium">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {order.shippingAddress.country}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="font-semibold">
                        {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Payment Summary */}
              <Card className="bg-card border-border/50 sticky top-24">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-lg font-bold">
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        Subtotal
                      </span>
                      <span className="font-bold">
                        {formatPrice(order.subtotal || order.totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        Shipping
                      </span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    {order.taxAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Tax
                        </span>
                        <span className="font-bold">
                          {formatPrice(order.taxAmount)}
                        </span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-border/50 flex justify-between items-baseline">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-black text-primary">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div className="text-xs">
                        <p className="text-muted-foreground uppercase font-black tracking-widest text-[9px]">
                          Method
                        </p>
                        <p className="font-bold capitalize">
                          {order.paymentMethod.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div className="text-xs">
                        <p className="text-muted-foreground uppercase font-black tracking-widest text-[9px]">
                          Ordered On
                        </p>
                        <p className="font-bold">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.razorpayOrderId && (
                    <div className="pt-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 px-1">
                        Gateway Reference
                      </p>
                      <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[10px] font-mono break-all text-orange-600/70 font-bold">
                        {order.razorpayOrderId}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Support/Need Help */}
              <Card className="bg-primary/5 border-primary/10 overflow-hidden">
                <CardContent className="p-6 space-y-3">
                  <h4 className="font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Need help?
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    If you have any issues with your order, please contact our
                    support team. We're here 24/7.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs font-bold flex items-center gap-1 group"
                  >
                    Visit Support Center
                    <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
