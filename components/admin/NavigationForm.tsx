"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { NavigationItem, Brand, Category } from "@/lib/api/types/endpoints";
import { useEffect, useState } from "react";
import { brandService, categoryService } from "@/lib/api/services";
import { Input } from "../ui/input";

const childSchema = z.object({
  label: z.string().optional(),
  type: z.enum(["category", "brand"]),
  referenceId: z.string().min(1, "Please select a category or brand"),
});

const formSchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters"),
  children: z.array(childSchema).optional(),
});

interface NavigationFormProps {
  initialData?: NavigationItem | null;
  onSubmit: (data: Partial<NavigationItem>) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function NavigationForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: NavigationFormProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuType, setMenuType] = useState<"brand" | "category">("brand");
  const [parentCategory, setParentCategory] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      children: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  // Fetch brands and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          brandService.getBrands(),
          categoryService.getCategories(),
        ]);

        // Helper to extract array from various response structures
        const getArray = (res: any, key: string) => {
          if (!res) return [];
          if (Array.isArray(res)) return res;

          // Check for paginated response structure: res.data.data arrays
          if (res.data && res.data.data && Array.isArray(res.data.data)) {
            return res.data.data;
          }

          if (res.data && Array.isArray(res.data)) return res.data;
          if (res[key] && Array.isArray(res[key])) return res[key];
          return [];
        };

        setBrands(getArray(brandsRes, "brands"));
        setCategories(getArray(categoriesRes, "categories"));
      } catch (error) {
        console.error("Failed to fetch brands/categories", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      // Determine menu type and parent category from URL or data analysis
      // This is a bit complex as we need to reverse engineering the logic
      // For now, let's default to category if we can't tell, or try to guess.
      // If children have "brand=" in URL, it's likely a brand menu.

      const hasBrandChildren = initialData.children?.some((c) =>
        c.url.includes("brand="),
      );
      const detectedType = hasBrandChildren ? "brand" : "category";
      setMenuType(detectedType);

      // Try to extract parent category from parent URL or first child URL
      let detectedParentCategory = "";
      if (detectedType === "brand") {
        // Look for category=ID in the URL
        const urlToSearch = initialData.url || initialData.children?.[0]?.url;
        if (urlToSearch?.includes("category=")) {
          const match = urlToSearch.match(/category=([^&]+)/);
          if (match) detectedParentCategory = match[1];
        }
      }
      setParentCategory(detectedParentCategory);

      const children =
        initialData.children?.map((child) => {
          let referenceId = "";

          if (child.url.includes("brand=")) {
            const brandName = child.url.split("brand=")[1]?.split("&")[0];
            const brand = brands.find(
              (b) => b.name === decodeURIComponent(brandName),
            );
            if (brand) referenceId = brand._id;
          } else if (child.url.includes("category=")) {
            referenceId = child.url.split("category=")[1]?.split("&")[0];
          }

          return {
            label: child.label,
            type: detectedType as "brand" | "category",
            referenceId,
          };
        }) || [];

      form.reset({
        label: initialData.label,
        children,
      });
    } else {
      form.reset({
        label: "",
        children: [],
      });
    }
  }, [initialData, form, brands, categories, setMenuType, setParentCategory]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Transform children to include URL based on type and referenceId
    const transformedChildren = values.children?.map((child) => {
      const selectedItem =
        menuType === "brand"
          ? brands.find((b) => b._id === child.referenceId)
          : categories.find((c) => c._id === child.referenceId);

      let url = "";

      if (menuType === "brand") {
        // Construct combined filter URL
        url = `/products?category=${parentCategory}&brand=${selectedItem?.name || ""}`;
      } else {
        url = `/products?category=${child.referenceId}`;
      }

      return {
        label: selectedItem?.name || child.label || "Unknown",
        url: url,
      };
    });

    // Parent URL construction
    const parentUrl =
      menuType === "brand" && parentCategory
        ? `/products?category=${parentCategory}`
        : ""; // Category menu parent might not have a specific URL or just #

    onSubmit({
      label: values.label,
      url: parentUrl,
      children: transformedChildren as any,
    });
  };

  // Get current selections to filter options
  const currentChildren = form.watch("children") || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Menu Configuration */}
        <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
          <FormLabel className="text-base text-foreground">
            Menu Configuration
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel className="text-xs text-muted-foreground">
                Menu Type
              </FormLabel>
              <Select
                value={menuType}
                onValueChange={(val) => {
                  setMenuType(val as "brand" | "category");
                  setParentCategory("");
                  // Optional: clear children if switching types to clean slate
                  form.setValue("children", []);
                }}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand">Brand Menu</SelectItem>
                  <SelectItem value="category">Category Menu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {menuType === "brand" && (
              <div className="space-y-2">
                <FormLabel className="text-xs text-muted-foreground">
                  Parent Category
                </FormLabel>
                <Select
                  value={parentCategory}
                  onValueChange={setParentCategory}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Category (e.g. Laptops)" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Label Field */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Label</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    menuType === "brand"
                      ? "e.g., Buy Refurbished Laptops"
                      : "e.g., Accessories"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Children Management */}
        <div className="space-y-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {menuType === "brand" ? "Brands in this Menu" : "Sub-Categories"}
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ label: "", type: menuType, referenceId: "" })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {menuType === "brand" ? "Brand" : "Category"}
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
              <FormField
                control={form.control}
                name={`children.${index}.referenceId`}
                render={({ field }) => {
                  const rawOptions = menuType === "brand" ? brands : categories;
                  const allOptions = Array.isArray(rawOptions)
                    ? rawOptions
                    : [];

                  // Filter out options that are already selected in other rows
                  const options = allOptions.filter((option) => {
                    const isSelected = currentChildren.some(
                      (child, childIndex) =>
                        childIndex !== index &&
                        child.referenceId === option._id,
                    );
                    return !isSelected;
                  });

                  return (
                    <FormItem className="col-span-11">
                      <FormLabel className={index !== 0 ? "sr-only" : ""}>
                        {menuType === "brand" ? "Brand" : "Category"}
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          // Ensure type is set correctly (though redundant as we use menuType on submit)
                          form.setValue(`children.${index}.type`, menuType);
                        }}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${menuType}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option._id} value={option._id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 col-span-1"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4 bg-muted/20 rounded-lg">
              No sub-menu items added.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Navigation" : "Create Navigation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
