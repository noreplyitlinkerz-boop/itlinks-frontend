"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  UserCircle,
  ShoppingBag,
  Heart,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/lib/api/services";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TabType = "personal" | "address";

export default function ProfilePage() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    refreshUser,
    openLoginModal,
  } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const [addressData, setAddressData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  // Refresh user data on mount to ensure we have the latest from /auth/me
  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated]);

  // Sync form state when user data is loaded
  useEffect(() => {
    console.log("ProfilePage: User data changed:", user);
    if (user) {
      console.log(
        "ProfilePage: Setting form data from user:",
        user.firstName,
        user.lastName
      );
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        mobile: user.mobile || "",
      });

      if (user.address) {
        console.log(
          "ProfilePage: Setting address data from user:",
          user.address
        );
        setAddressData({
          addressLine1: user.address.addressLine1 || "",
          addressLine2: user.address.addressLine2 || "",
          city: user.address.city || "",
          state: user.address.state || "",
          country: user.address.country || "India",
          pincode: user.address.pincode || "",
        });
      }
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload =
        activeTab === "personal"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              mobile: formData.mobile,
            }
          : {
              address: {
                addressLine1: addressData.addressLine1,
                addressLine2: addressData.addressLine2,
                city: addressData.city,
                state: addressData.state,
                country: addressData.country,
                pincode: addressData.pincode,
              },
            };

      const response = await userService.updateProfile(payload as any);
      if (response.success) {
        toast.success("Profile updated successfully");
        await refreshUser();
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
          <div className="max-w-md mx-auto space-y-6 bg-card p-10 rounded-3xl shadow-xl border border-border/50">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Your Account</h1>
            <p className="text-muted-foreground">
              Log in to view your profile, manage addresses, and track orders.
            </p>
            <Button
              onClick={openLoginModal}
              className="w-full h-12 text-lg font-bold rounded-xl active:scale-95 transition-transform"
            >
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "address", label: "Shipping Address", icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar / Navigation */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center border-4 border-background ring-2 ring-primary/20">
                  <span className="text-3xl font-black text-primary">
                    {user?.firstName?.[0].toUpperCase()}
                    {user?.lastName?.[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="flex gap-2 w-full pt-2">
                  <Link href="/orders" className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl text-xs gap-1.5 h-9"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Orders
                    </Button>
                  </Link>
                  <Link href="/wishlist" className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl text-xs gap-1.5 h-9"
                    >
                      <Heart className="w-3.5 h-3.5" /> Wishlist
                    </Button>
                  </Link>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <form onSubmit={handleUpdateProfile}>
              <Card className="rounded-3xl border-border/50 overflow-hidden shadow-sm">
                <CardHeader className="bg-muted/30 pb-8 pt-8 px-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {activeTab === "personal"
                          ? "Personal Information"
                          : "Shipping Address"}
                      </CardTitle>
                      <CardDescription>
                        {activeTab === "personal"
                          ? "Update your name and contact details used for orders."
                          : "Your primary address for deliveries and billing."}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {activeTab === "personal" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-bold pl-1"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="John"
                          className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                          required
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-bold pl-1"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Doe"
                          className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                          required
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="email"
                          className="text-sm font-bold pl-1"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            value={user?.email || ""}
                            className="h-12 pl-11 rounded-xl bg-muted/40 border-border/50 grayscale opacity-70 cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground pl-1 italic">
                          Email cannot be changed.
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="mobile"
                          className="text-sm font-bold pl-1"
                        >
                          Mobile Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => {
                              const val = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              setFormData({
                                ...formData,
                                mobile: val,
                              });
                            }}
                            placeholder="9876543210"
                            className="h-12 pl-11 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="address1"
                          className="text-sm font-bold pl-1"
                        >
                          Address Line 1
                        </Label>
                        <Input
                          id="address1"
                          value={addressData.addressLine1}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              addressLine1: e.target.value,
                            })
                          }
                          placeholder="House No, Building, Street"
                          className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                          required
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label
                          htmlFor="address2"
                          className="text-sm font-bold pl-1"
                        >
                          Address Line 2 (Optional)
                        </Label>
                        <Input
                          id="address2"
                          value={addressData.addressLine2}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              addressLine2: e.target.value,
                            })
                          }
                          placeholder="Area, Landmark"
                          className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-2.5">
                          <Label
                            htmlFor="city"
                            className="text-sm font-bold pl-1"
                          >
                            City
                          </Label>
                          <Input
                            id="city"
                            value={addressData.city}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                city: e.target.value,
                              })
                            }
                            placeholder="Kolkata"
                            className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                            required
                          />
                        </div>
                        <div className="space-y-2.5">
                          <Label
                            htmlFor="state"
                            className="text-sm font-bold pl-1"
                          >
                            State
                          </Label>
                          <Input
                            id="state"
                            value={addressData.state}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                state: e.target.value,
                              })
                            }
                            placeholder="West Bengal"
                            className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                            required
                          />
                        </div>
                        <div className="space-y-2.5 col-span-2 md:col-span-1">
                          <Label
                            htmlFor="pincode"
                            className="text-sm font-bold pl-1"
                          >
                            Pincode
                          </Label>
                          <Input
                            id="pincode"
                            value={addressData.pincode}
                            onChange={(e) => {
                              const val = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6);
                              setAddressData({
                                ...addressData,
                                pincode: val,
                              });
                            }}
                            placeholder="700001"
                            className="h-12 rounded-xl bg-muted/20 focus-visible:ring-primary border-border/50"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-8 bg-muted/10 border-t border-border/50 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 px-10 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
