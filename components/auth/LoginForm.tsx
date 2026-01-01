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

      // Update global auth state
      setAuthUser(response.user);

      toast.success("Welcome back!", {
        description: `Logged in as ${response.user.firstName}.`,
      });

      // Redirect based on role
      if (response.user.role === "admin") {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Email</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="name@example.com"
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-primary/20"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-slate-300">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative group">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-primary/20"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-xl shadow-primary/20 group transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {!onSuccess && (
          <div className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
