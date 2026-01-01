"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Plus,
  Image as ImageIcon,
  Loader2,
  Trash2,
  PlusCircle,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  productSchema,
  ProductFormValues,
  AdminProductFormProps,
} from "@/types/admin-product-types";
import { categoryService } from "@/lib/api/services";
import { Category } from "@/lib/api/types/endpoints";
import { safeParse } from "@/lib/utils";

export function ProductForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: AdminProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>(
    initialData?.product_primary_image_url || ""
  );
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<
    string[]
  >(initialData?.images || []);
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>(
    initialData?.specifications
      ? Object.entries(safeParse(initialData.specifications, {})).map(
          ([key, value]) => ({
            key,
            value: String(value),
          })
        )
      : []
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      brand: initialData?.brand || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      featured: initialData?.featured || false,
      isVisible: initialData?.isVisible ?? true,
      specifications: safeParse(initialData?.specifications, {}),
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAdditionalImages((prev) => [...prev, ...files]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagesPreviews((prev) => [
            ...prev,
            reader.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) =>
      prev.filter((_, i) => i !== index - (initialData?.images?.length || 0))
    );
    setAdditionalImagesPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    const formData = new FormData();

    // Add basic fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "specifications") {
        formData.append(key, String(value));
      }
    });

    // Add specifications as JSON string if backend expects it or handles it
    const specsObj = specs.reduce((acc, curr) => {
      if (curr.key && curr.value) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {} as Record<string, string>);
    formData.append("specifications", JSON.stringify(specsObj));

    // Add images
    if (primaryImage) {
      formData.append("product_primary_image", primaryImage);
    }

    additionalImages.forEach((file) => {
      formData.append("images", file);
    });

    // Handle existing images for update
    if (initialData) {
      formData.append(
        "existingPrimaryImageUrl",
        initialData.product_primary_image_url || ""
      );
      formData.append(
        "existingImages",
        JSON.stringify(
          additionalImagesPreviews.filter((p) => p.startsWith("http"))
        )
      );
    }

    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit as any)}
        className="space-y-8"
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          {/* Basic Information */}
          <div className="p-6 bg-muted/20 rounded-xl space-y-6">
            <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Basic Information
            </h3>

            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. iPhone 15 Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Apple" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="iphone-15-pro" {...field} />
                    </FormControl>
                    <FormDescription className="text-[10px]"></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed product description..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product Media */}
          <div className="p-6 bg-muted/20 rounded-xl space-y-6">
            <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Product Media
            </h3>

            {/* Primary Image */}
            <div className="space-y-2">
              <Label>Primary Image</Label>
              <div
                className="relative h-64 w-full border-2 border-dashed border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-colors flex items-center justify-center bg-secondary/30 cursor-pointer"
                onClick={() =>
                  document.getElementById("primary-image-upload")?.click()
                }
              >
                {primaryImagePreview ? (
                  <>
                    <img
                      src={primaryImagePreview}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="w-10 h-10" />
                    <span className="text-xs">Click to upload main image</span>
                  </div>
                )}
                <input
                  id="primary-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePrimaryImageChange}
                />
              </div>
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <Label>Additional Images</Label>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {additionalImagesPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                  >
                    <img
                      src={preview}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("additional-images-upload")?.click()
                  }
                  className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors bg-secondary/30"
                >
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </button>
                <input
                  id="additional-images-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImagesChange}
                />
              </div>
            </div>
          </div>

          {/* Inventory & Status */}
          <div className="p-6 bg-muted/20 rounded-xl space-y-6">
            <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Inventory & Status
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="space-y-0.5">
                <Label>Featured Product</Label>
                <p className="text-[10px] text-muted-foreground">
                  Highlight on homepage
                </p>
              </div>
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="p-6 bg-muted/20 rounded-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
                Specifications
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addSpec}
                className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                <PlusCircle className="mr-1 w-3 h-3" />
                Add Specification
              </Button>
            </div>

            <div className="space-y-3">
              {specs.length === 0 && (
                <p className="text-xs text-center text-muted-foreground/60 py-4">
                  No specifications added yet
                </p>
              )}
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Input
                    placeholder="e.g. Color"
                    className="flex-1 h-9 text-xs"
                    value={spec.key}
                    onChange={(e) => updateSpec(index, "key", e.target.value)}
                  />
                  <Input
                    placeholder="e.g. Space Gray"
                    className="flex-1 h-9 text-xs"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, "value", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpec(index)}
                    className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-border/50">
          <Button
            type="submit"
            className="flex-1 h-12 bg-primary hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : initialData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 border-border flex-1 hover:bg-muted"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
