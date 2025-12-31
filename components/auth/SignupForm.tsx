"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, Phone, Loader2, ArrowRight } from "lucide-react";
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

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    try {
      const response = await authService.signup(data);

      // Update global auth state
      setAuthUser(response.user);

      toast.success("Account created!", {
        description: `Welcome, ${response.user.firstName}! Your account has been created.`,
      });

      // Redirect based on role
      if (response.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">First Name</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="John"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Last Name</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Doe"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-primary/20"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

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
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">
                Mobile (Optional)
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="+1234567890"
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
              <FormLabel className="text-slate-300">Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder="••••••••"
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
          className="w-full h-11 bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-xl shadow-primary/20 group mt-4 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <div className="text-center text-sm text-slate-400 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
