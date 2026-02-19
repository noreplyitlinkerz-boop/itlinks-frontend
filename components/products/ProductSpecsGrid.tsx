"use client";

import React from "react";
import {
  Monitor,
  Cpu,
  CircuitBoard,
  HardDrive,
  CheckCircle2,
  Smartphone,
  Battery,
  Shield,
  Zap,
  Box,
  Globe,
  Camera,
  Layers,
  TouchpadIcon as Touch,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const SpecCard = ({ label, value, icon }: SpecItemProps) => (
  <div className="bg-gray-100 rounded-xl p-2 flex items-center gap-2 border border-transparent hover:border-border/60 transition-all duration-300 group">
    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
      {icon || <Box className="w-4 h-4" />}
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider line-clamp-1">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground line-clamp-2">
        {value}
      </span>
    </div>
  </div>
);

const getSpecIcon = (label: string) => {
  const loweredLabel = label.toLowerCase();

  if (loweredLabel.includes("screen") || loweredLabel.includes("display"))
    return <Monitor className="w-6 h-6" />;
  if (loweredLabel.includes("cpu") || loweredLabel.includes("processor"))
    return <Cpu className="w-6 h-6" />;
  if (loweredLabel.includes("ram") || loweredLabel.includes("memory"))
    return <CircuitBoard className="w-6 h-6" />;
  if (
    loweredLabel.includes("storage") ||
    loweredLabel.includes("disk") ||
    loweredLabel.includes("ssd") ||
    loweredLabel.includes("hdd")
  )
    return <HardDrive className="w-6 h-6" />;
  if (loweredLabel.includes("generation"))
    return <Layers className="w-6 h-6" />;
  if (loweredLabel.includes("touch")) return <Touch className="w-6 h-6" />;
  if (
    loweredLabel.includes("gpu") ||
    loweredLabel.includes("graphics") ||
    loweredLabel.includes("card")
  )
    return <Zap className="w-6 h-6" />;
  if (loweredLabel.includes("battery")) return <Battery className="w-6 h-6" />;
  if (loweredLabel.includes("camera")) return <Camera className="w-6 h-6" />;
  if (
    loweredLabel.includes("os") ||
    loweredLabel.includes("operating system") ||
    loweredLabel.includes("windows") ||
    loweredLabel.includes("linux") ||
    loweredLabel.includes("macos")
  )
    return <Globe className="w-6 h-6" />;
  if (
    loweredLabel.includes("security") ||
    loweredLabel.includes("fingerprint") ||
    loweredLabel.includes("shield")
  )
    return <Shield className="w-6 h-6" />;

  return <CheckCircle2 className="w-6 h-6" />;
};

interface ProductSpecsGridProps {
  specifications: Record<string, string>;
}

const formatKey = (key: string) => {
  // If it's already got spaces or is all caps (like RAM), return it
  if (key.includes(" ") || (key === key.toUpperCase() && key.length > 1))
    return key;

  // Handle camelCase or underscore_case
  return key
    .replace(/([A-Z])/g, " $1") // insert a space before all caps
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()) // capitalize the first letter
    .trim();
};

export const ProductSpecsGrid = ({ specifications }: ProductSpecsGridProps) => {
  const specsEntries = Object.entries(specifications).filter(
    ([key, value]) =>
      value &&
      String(value).trim() !== "" &&
      String(value).toLowerCase() !== "undefined" &&
      String(value).toLowerCase() !== "null" &&
      String(value).toLowerCase() !== "empty" &&
      !["id", "_id", "__v", "technical"].includes(key.toLowerCase()),
  );

  if (specsEntries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No technical specifications available for this product.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {specsEntries.map(([key, value]) => (
        <SpecCard
          key={key}
          label={formatKey(key)}
          value={value}
          icon={getSpecIcon(key)}
        />
      ))}
    </div>
  );
};
