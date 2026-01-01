"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { openLoginModal } = useAuth();

  useEffect(() => {
    router.replace("/");
    // We'll rely on the query param approach or just open it separately
    // But since context might not persist across the redirect instantly without query params:
    setTimeout(() => openLoginModal(), 100);
  }, [router, openLoginModal]);

  return null;
}
