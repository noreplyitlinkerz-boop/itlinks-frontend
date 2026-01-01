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
import { Button } from "@/components/ui/button";

export function AuthModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const [view, setView] = useState<"login" | "signup">("login");

  const resetAndClose = () => {
    setView("login");
    closeLoginModal();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {view === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === "login"
              ? "Enter your credentials to access your account"
              : "Sign up to start shopping with us"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {view === "login" ? (
            <>
              <LoginForm onSuccess={resetAndClose} />
              <div className="mt-4 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-primary font-semibold hover:underline"
                  onClick={() => setView("signup")}
                >
                  Sign up
                </Button>
              </div>
            </>
          ) : (
            <>
              <SignupForm onSuccess={resetAndClose} />
              <div className="mt-4 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-primary font-semibold hover:underline"
                  onClick={() => setView("login")}
                >
                  Sign in
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
