"use client";

import Image, { ImageProps } from "next/image";
import { API_CONFIG } from "@/lib/api/api-config";
import { cn } from "@/lib/utils";

/**
 * Utility to get full image URL from a path
 */
export function getFullImageUrl(path?: string) {
  if (!path) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const baseUrl = API_CONFIG.BASE_URL.endsWith("/")
    ? API_CONFIG.BASE_URL.slice(0, -1)
    : API_CONFIG.BASE_URL;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function ProductImage({
  src,
  alt = "Product image",
  fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E",
  className,
  unoptimized = true,
  ...props
}: ProductImageProps) {
  const imageUrl = src ? getFullImageUrl(src) : fallback;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={cn("object-cover", className)}
      unoptimized={unoptimized}
      {...props}
    />
  );
}
