"use client";

import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        size="sm"
        className="transition-all"
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category._id}
          variant={selectedCategory === category._id ? "default" : "outline"}
          onClick={() => onSelectCategory(category._id)}
          size="sm"
          className="transition-all"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
