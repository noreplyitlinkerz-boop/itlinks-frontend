"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { openLoginModal } = useAuth();

  useEffect(() => {
    router.replace("/");
    setTimeout(() => openLoginModal(), 100);
  }, [router, openLoginModal]);

  return null;
}
