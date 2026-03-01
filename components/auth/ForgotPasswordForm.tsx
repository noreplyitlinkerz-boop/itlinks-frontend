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
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

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

export function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
}: {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}) {
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
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error("Failed to reset password", {
        description: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Helper to reset internal state if backing out
  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2);
    } else if (onBackToLogin) {
      onBackToLogin();
    }
  };

  return (
    <div className="space-y-6 w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={handleBack}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center flex-1 pr-8">
          <p className="text-sm font-medium text-muted-foreground">
            {step === 1 && "Step 1 of 3: Enter Email"}
            {step === 2 && "Step 2 of 3: Verify OTP"}
            {step === 3 && "Step 3 of 3: New Password"}
          </p>
        </div>
      </div>

      <div className="space-y-4 overflow-hidden relative min-h-[250px]">
        {/* Step 1 Form */}
        {step === 1 && (
          <div className="absolute inset-x-0 animate-in slide-in-from-right-8 fade-in duration-300">
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
          </div>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <div className="absolute inset-x-0 animate-in slide-in-from-right-8 fade-in duration-300">
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
                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl focus:ring-accent/20 focus:border-accent transition-all text-center tracking-widest font-mono text-lg"
                            maxLength={6}
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
          </div>
        )}

        {/* Step 3 Form */}
        {step === 3 && (
          <div className="absolute inset-x-0 animate-in slide-in-from-right-8 fade-in duration-300">
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
          </div>
        )}
      </div>
    </div>
  );
}
