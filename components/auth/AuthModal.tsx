"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AuthModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const [view, setView] = useState<"login" | "signup" | "forgot-password">(
    "login",
  );

  const resetAndClose = () => {
    setView("login");
    closeLoginModal();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[450px] p-0 border-none rounded-3xl shadow-2xl bg-card overflow-hidden max-h-[95vh] flex flex-col">
        <div className="overflow-y-auto flex-1 custom-scrollbar p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center text-3xl font-black tracking-tight">
              {view === "login" && "Welcome Back"}
              {view === "signup" && "Join the Future"}
              {view === "forgot-password" && "Reset Password"}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground mt-2">
              {view === "login" &&
                "Experience the best in tech with your personalized account"}
              {view === "signup" &&
                "Sign up to start your journey with our premium products"}
              {view === "forgot-password" &&
                "Securely recover access to your account"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 relative min-h-[400px]">
            {view === "login" && (
              <div className="absolute inset-x-0 animate-in fade-in slide-in-from-left-4 duration-300">
                <LoginForm
                  onSuccess={resetAndClose}
                  onForgotPassword={() => setView("forgot-password")}
                />
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-accent font-bold hover:underline h-auto"
                    onClick={() => setView("signup")}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {view === "signup" && (
              <div className="absolute inset-x-0 animate-in fade-in slide-in-from-right-4 duration-300">
                <SignupForm onSuccess={resetAndClose} />
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Already part of the family?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-accent font-bold hover:underline h-auto"
                    onClick={() => setView("login")}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}

            {view === "forgot-password" && (
              <div className="absolute inset-x-0 animate-in fade-in slide-in-from-right-4 duration-300">
                <ForgotPasswordForm
                  onSuccess={() => setView("login")}
                  onBackToLogin={() => setView("login")}
                />
              </div>
            )}
          </div>
        </div>
        <div className="bg-muted/30 p-4 text-center text-[10px] text-muted-foreground border-t border-border/50 shrink-0">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
}
