"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authService } from "@/lib/api/services";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await authService.login(data);

      // Validate that we actually have user data
      if (!response || !response.user) {
        throw new Error("Login succeeded but user data was not received.");
      }

      const user = response.user;

      // Update global auth state
      setAuthUser(user);

      toast.success("Welcome back!", {
        description: `Logged in as ${user.firstName || "User"}.`,
      });

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin");
        if (onSuccess) onSuccess(); // Close modal if used as modal
        return;
      }

      // For non-admin users, if modal usage (onSuccess), just close it and stay
      if (onSuccess) {
        onSuccess();
        return;
      }

      // Default redirect for standalone page (though removed) or fallback
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "Invalid email or password.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin();
  };

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        type="button"
        className="w-full h-12 rounded-xl flex items-center justify-center gap-3 border-border hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all font-semibold"
        onClick={handleGoogleLogin}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground font-medium tracking-widest">
            or use email
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <FormLabel className="text-sm font-semibold text-muted-foreground">
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-accent hover:text-accent/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
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

          <Button
            type="submit"
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg shadow-accent/20 font-bold text-lg group transition-all duration-300 active:scale-[0.98] mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
