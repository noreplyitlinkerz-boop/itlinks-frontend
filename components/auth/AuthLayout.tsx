"use client";

import React from "react";
import Link from "next/link";
import { Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-950 px-4 py-12">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-slide-in-down">
          <Link href="/" className="flex items-center gap-2 group mb-4">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 group-hover:rotate-12 transition-transform shadow-2xl shadow-primary/20">
              <Laptop className="w-8 h-8 text-primary" />
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">
              Itlinkers
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-400 text-center">{subtitle}</p>
        </div>

        {/* Content Card with Glassmorphism */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 animate-fade-in animation-delay-1000">
          &copy; {new Date().getFullYear()} Itlinkers. All rights reserved.
        </div>
      </div>
    </div>
  );
}
