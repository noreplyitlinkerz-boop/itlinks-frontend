"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Zap } from "lucide-react";

export default function SignupPage() {
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
            Starting <br />
            <span className="text-accent italic">Something Great</span>
          </h1>
          <p className="text-lg text-blue-100/80 font-medium leading-relaxed">
            Create your account today and unlock a world of premium tech gadgets
            with global shipping and lifetime support.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-blue-100/60 text-sm font-medium">
          <span>© 2026 TechStore Inc.</span>
          <span className="w-1 h-1 bg-blue-100/30 rounded-full" />
          <span>All rights reserved.</span>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-full gap-2"
          >
            <Link href="/">
              <ChevronLeft className="w-4 h-4" />
              Back to Store
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-muted-foreground font-medium">
              Join our community of tech enthusiasts today
            </p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-accent font-bold hover:underline transition-all"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
