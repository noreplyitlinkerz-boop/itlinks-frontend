"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TechnicalSpecsTableProps {
  specifications: Record<string, string>;
  className?: string;
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

export const TechnicalSpecsTable = ({
  specifications,
  className,
}: TechnicalSpecsTableProps) => {
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
    return null;
  }

  return (
    <div className={cn("w-full border rounded-lg overflow-hidden", className)}>
      <div className="flex flex-col">
        {specsEntries.map(([key, value], index) => (
          <div
            key={key}
            className={cn(
              "flex flex-col sm:flex-row border-b last:border-0",
              index % 2 === 0 ? "bg-muted/30" : "bg-transparent",
            )}
          >
            <div className="sm:w-1/3 p-3 sm:px-4 sm:py-3 text-sm font-medium text-muted-foreground bg-muted/10 sm:bg-transparent">
              {formatKey(key)}
            </div>
            <div className="sm:w-2/3 p-3 sm:px-4 sm:py-3 text-sm text-foreground wrap-break-word">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
