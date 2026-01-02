"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductImage } from "@/components/shared/ProductImage";
import { RazorpayScript } from "@/components/checkout/RazorpayScript";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { orderService } from "@/lib/api/services";
import { ShippingAddress, PaymentMethod } from "@/lib/api/types/endpoints";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");

  const [address, setAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.mobile || "",
    addressLine1: user?.address?.addressLine1 || "",
    addressLine2: user?.address?.addressLine2 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "India",
    pincode: user?.address?.pincode || "",
  });

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      toast.error("Please login to proceed with checkout");
      router.push("/cart");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName,
        lastName: prev.lastName || user.lastName,
        phone: prev.phone || user.mobile || "",
        ...(user.address || {}),
      }));
    }
  }, [user]);

  if (isAuthLoading || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    const required: (keyof ShippingAddress)[] = [
      "firstName",
      "lastName",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];
    for (const field of required) {
      if (!address[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    return true;
  };

  const handleRazorpayPayment = async (
    orderId: string,
    razorpayOrderId: string,
    amount: number
  ) => {
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      console.error(
        "Razorpay Key ID is missing! Please ensure NEXT_PUBLIC_RAZORPAY_KEY_ID is set in your .env.local file."
      );
      toast.error("Payment initialization failed: Missing API Key", {
        description:
          "Please check if NEXT_PUBLIC_RAZORPAY_KEY_ID is set in environment variables.",
      });
      setIsProcessing(false);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(amount * 100), // Use backend provided amount in paise
      currency: "INR",
      name: "TechStore",
      description: `Payment for Order #${orderId}`,
      order_id: razorpayOrderId,
      handler: async function (response: any) {
        try {
          setIsProcessing(true);
          console.log("Verifying payment for order:", orderId, response);

          await orderService.verifyRazorpayPayment(orderId, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Payment successful!");
          await clearCart();
          setTimeout(() => {
            router.push(`/orders?id=${orderId}`);
          }, 1500);
        } catch (error: any) {
          console.error("Payment verification failed details:", error);
          const errorMsg =
            error?.response?.data?.message ||
            error?.message ||
            "Payment verification failed";
          toast.error(errorMsg, {
            description: "Please contact support if your amount was deducted.",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: `${address.firstName} ${address.lastName}`,
        email: user?.email,
        contact: address.phone,
      },
      theme: {
        color: "#F97316", // Accent color (Orange)
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      toast.error(response.error.description || "Payment failed");
      setIsProcessing(false);
    });
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) return;

    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const orderResponse = await orderService.createOrder({
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        paymentMethod: paymentMethod,
      });

      const order = orderResponse.data || orderResponse;

      if (paymentMethod === "razorpay" || paymentMethod === "upi") {
        // 2. Create Razorpay order
        const rzpResponse = await orderService.createRazorpayOrder(order._id);
        const rzpOrder = rzpResponse.data || rzpResponse;

        // 3. Trigger Razorpay Checkout
        await handleRazorpayPayment(order._id, rzpOrder.id, order.totalAmount);
      } else {
        // COD logic
        toast.success("Order placed successfully!");
        await clearCart();
        setTimeout(() => {
          router.push(`/orders?id=${order._id}`);
        }, 1500);
      }
    } catch (error: any) {
      console.error("Checkout failed", error);
      toast.error(error.message || "Something went wrong during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30">
      <RazorpayScript />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Link
            href="/cart"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Cart
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="font-bold text-lg">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <Truck className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-black tracking-tight">
                  Shipping Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-semibold ml-1">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={address.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-semibold ml-1">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={address.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone" className="font-semibold ml-1">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={address.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="addressLine1" className="font-semibold ml-1">
                    Address Line 1
                  </Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={address.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House No, Street, Landmark"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="addressLine2" className="font-semibold ml-1">
                    Address Line 2 (Optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={address.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartment, Studio, Floor"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-semibold ml-1">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode" className="font-semibold ml-1">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit Pincode"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-semibold ml-1">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="font-semibold ml-1">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="h-12 bg-muted/20 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <CreditCard className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-black tracking-tight">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${
                    paymentMethod === "razorpay"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                      : "border-border/50 bg-muted/10 hover:border-border"
                  }`}
                  onClick={() => setPaymentMethod("razorpay")}
                >
                  <div className="flex justify-between items-start">
                    <CreditCard
                      className={`w-8 h-8 ${
                        paymentMethod === "razorpay"
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "razorpay"
                          ? "border-accent bg-accent"
                          : "border-muted-foreground"
                      }`}
                    >
                      {paymentMethod === "razorpay" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Razorpay Checkout</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Card, UPI, Netbanking, Wallet
                    </p>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${
                    paymentMethod === "cash_on_delivery"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                      : "border-border/50 bg-muted/10 hover:border-border"
                  }`}
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                >
                  <div className="flex justify-between items-start">
                    <Truck
                      className={`w-8 h-8 ${
                        paymentMethod === "cash_on_delivery"
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cash_on_delivery"
                          ? "border-accent bg-accent"
                          : "border-muted-foreground"
                      }`}
                    >
                      {paymentMethod === "cash_on_delivery" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar side */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-all group-hover:bg-accent/10" />

                <h2 className="text-2xl font-black tracking-tight mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex gap-4 items-center group/item"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted/30 border border-border/30 group-hover/item:border-accent/30 transition-colors">
                        <ProductImage
                          src={item.product.product_primary_image_url || ""}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-background">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate group-hover/item:text-accent transition-colors">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                          ₹
                          {(item.product.discount &&
                          typeof item.product.discount === "object"
                            ? item.product.discount.discountedPrice
                            : item.product.price
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm tracking-tight">
                          ₹
                          {(
                            (item.product.discount &&
                            typeof item.product.discount === "object"
                              ? item.product.discount.discountedPrice
                              : item.product.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-border/50">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-black text-xs uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">
                      Estimated Tax (18%)
                    </span>
                    <span className="font-bold">
                      ₹{(totalPrice * 0.18).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                        Total Amount
                      </p>
                      <h3 className="text-3xl font-black text-accent tracking-tighter mt-1">
                        ₹{(totalPrice * 1.18).toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full h-16 mt-8 rounded-2xl bg-accent hover:bg-accent/90 text-white text-xl font-black shadow-xl shadow-accent/20 transition-all active:scale-[0.98] group"
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-3">
                      Complete Order
                      <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Secure encrypted checkout
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-dashed border-border/50 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-muted-foreground shrink-0 mt-1" />
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  By completing your order, you agree to TechStore's{" "}
                  <Link href="/tos" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                  . Returns are accepted within 30 days of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
