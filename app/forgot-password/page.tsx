"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Lock,
  Key,
  Loader2,
  ArrowRight,
  ChevronLeft,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authService } from "@/lib/api/services";

// Schemas
const step1Schema = z.object({
  email: z.string().email("Invalid email address"),
});

const step2Schema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const step3Schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const form1 = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  const form2 = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { otp: "" },
  });

  const form3 = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function onStep1Submit(data: z.infer<typeof step1Schema>) {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email: data.email });
      setEmail(data.email);
      toast.success("OTP sent to your email.");
      setStep(2);
    } catch (error: any) {
      toast.error("Failed to send OTP", {
        description: error.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onStep2Submit(data: z.infer<typeof step2Schema>) {
    setIsLoading(true);
    try {
      await authService.verifyResetOtp({ email, otp: data.otp });
      setOtp(data.otp);
      toast.success("OTP verified!");
      setStep(3);
    } catch (error: any) {
      toast.error("Invalid OTP", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onStep3Submit(data: z.infer<typeof step3Schema>) {
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Password reset successful!", {
        description: "You can now log in with your new password.",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Failed to reset password", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-blue-900 opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white group">
            <Zap className="w-8 h-8 fill-accent text-accent transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter">
              TECHSTORE
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-6xl font-black text-white leading-[1.1] mb-6">
            Secure Your <br />
            <span className="text-accent italic">Account</span>
          </h1>
          <p className="text-lg text-blue-100/80 font-medium leading-relaxed">
            Quickly recover access to your account with our secure password
            reset process. We care about the safety of your data.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-blue-100/60 text-sm font-medium">
          <span>© 2026 TechStore Inc.</span>
          <span className="w-1 h-1 bg-blue-100/30 rounded-full" />
          <span>All rights reserved.</span>
        </div>
      </div>

      {/* Right Side: Flow Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-full gap-2"
          >
            <Link href="/login">
              <ChevronLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              Password Reset
            </h2>
            <p className="text-muted-foreground font-medium">
              {step === 1 && "Enter your email to receive an OTP"}
              {step === 2 && "Enter the OTP sent to your email"}
              {step === 3 && "Create a new secure password"}
            </p>
          </div>

          {/* Step 1 Form */}
          {step === 1 && (
            <Form {...form1}>
              <form
                onSubmit={form1.handleSubmit(onStep1Submit)}
                className="space-y-5"
              >
                <FormField
                  control={form1.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-semibold text-muted-foreground ml-1">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-accent transition-colors" />
                          <Input
                            placeholder="name@example.com"
                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg shadow-accent/20 font-bold text-lg group transition-all duration-300 active:scale-[0.98] mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Send OTP
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit(onStep2Submit)}
                className="space-y-5"
              >
                <FormField
                  control={form2.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-semibold text-muted-foreground ml-1">
                        One-Time Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-accent transition-colors" />
                          <Input
                            placeholder="Enter 6-digit OTP"
                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg shadow-accent/20 font-bold text-lg group transition-all duration-300 active:scale-[0.98] mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Verify OTP
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 3 Form */}
          {step === 3 && (
            <Form {...form3}>
              <form
                onSubmit={form3.handleSubmit(onStep3Submit)}
                className="space-y-5"
              >
                <FormField
                  control={form3.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-semibold text-muted-foreground ml-1">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-accent transition-colors" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form3.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-semibold text-muted-foreground ml-1">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-accent transition-colors" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg shadow-accent/20 font-bold text-lg group transition-all duration-300 active:scale-[0.98] mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Reset Password
                      <CheckCircle2 className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
