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
  Video,
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
import {
  categoryService,
  brandService,
  ramService,
  storageService,
} from "@/lib/api/services";
import { Category, Brand, Ram, Storage } from "@/lib/api/types/endpoints";
import { safeParse } from "@/lib/utils";
import { getFullImageUrl } from "@/components/shared/ProductImage";

export function ProductForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: AdminProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [rams, setRams] = useState<Ram[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>(
    getFullImageUrl(
      initialData?.product_primary_image_url || initialData?.images?.[0],
    ),
  );
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<
    string[]
  >(initialData?.images?.map((img) => getFullImageUrl(img)) || []);
  const [videos, setVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>(
    initialData?.product_videos_url?.map((vid) => getFullImageUrl(vid)) || [],
  );

  // Default specs for new products
  const defaultSpecs = [
    { key: "Screen size", value: '15.6"' },
    { key: "RAM", value: "16GB" },
    { key: "Processor", value: "Intel i7" },
    { key: "Storage", value: "" },
    { key: "Generation", value: "" },
    { key: "Touch", value: "" },
    { key: "Graphics", value: "" },
  ];

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>(
    initialData?.specifications
      ? Object.entries(safeParse(initialData.specifications, {})).map(
          ([key, value]) => ({
            key,
            value: String(value),
          }),
        )
      : initialData
        ? []
        : defaultSpecs,
  );

  // Default technical specs from backend
  const defaultTechnicalSpecs = [
    { key: "os", value: "" },
    { key: "productDimensions", value: "" },
    { key: "itemModelNumber", value: "" },
    { key: "connectivityTechnologies", value: "" },
    { key: "gps", value: "" },
    { key: "otherDisplayFeatures", value: "" },
    { key: "deviceInterfacePrimary", value: "" },
    { key: "resolution", value: "" },
    { key: "otherCameraFeatures", value: "" },
    { key: "formFactor", value: "" },
    { key: "batteryPowerRating", value: "" },
    { key: "whatsInTheBox", value: "" },
    { key: "manufacturer", value: "" },
    { key: "countryOfOrigin", value: "" },
    { key: "itemWeight", value: "" },
  ];

  const [techSpecs, setTechSpecs] = useState<
    Array<{ key: string; value: string }>
  >(() => {
    let existingRaw =
      initialData?.technicalSpecifications ||
      safeParse(initialData?.technicalSpecifications, {});

    let existing: Record<string, any> = {};

    // Handle array case (legacy/bad data)
    if (Array.isArray(existingRaw)) {
      existingRaw.forEach((item) => {
        if (typeof item === "string") {
          try {
            const parsed = JSON.parse(item);
            existing = { ...existing, ...parsed };
          } catch {
            // treat as value if needed, or ignore
          }
        } else if (typeof item === "object" && item !== null) {
          existing = { ...existing, ...item };
        }
      });
    } else if (typeof existingRaw === "object" && existingRaw !== null) {
      existing = existingRaw;
    }

    const merged = defaultTechnicalSpecs.map((def) => ({
      key: def.key,
      value: String(existing[def.key] || ""),
    }));

    // Add any existing fields that are NOT in defaults
    const defaultKeys = new Set(defaultTechnicalSpecs.map((d) => d.key));
    const internalKeys = new Set(["_id", "id", "__v"]);
    Object.entries(existing).forEach(([key, value]) => {
      // Avoid adding numerical keys from arrays (0, 1, etc.)
      if (
        !defaultKeys.has(key) &&
        !internalKeys.has(key) &&
        isNaN(Number(key))
      ) {
        merged.push({ key, value: String(value) });
      }
    });

    return merged;
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      brandID:
        typeof (initialData as any)?.brandID === "object"
          ? (initialData as any)?.brandID?._id || "" // Handle populated brandID
          : (initialData as any)?.brandID || "", // Handle brandID string
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      featured: initialData?.featured || false,
      isVisible: initialData?.isVisible ?? true,
      isVerified: initialData?.isVerified ?? false,
      modelName: (initialData as any)?.modelName || "",
      keywords: initialData?.keywords?.join(", ") || "",
      discountPercentage:
        safeParse(initialData?.discount, { percentage: 0 }).percentage ?? 0,
      discountedPrice:
        safeParse(initialData?.discount, { discountedPrice: 0 })
          .discountedPrice ?? 0,
      discountStartDate:
        safeParse(initialData?.discount, { startDate: "" }).startDate || "",
      discountEndDate:
        safeParse(initialData?.discount, { endDate: "" }).endDate || "",
      specifications: safeParse(initialData?.specifications, {}),
      technicalSpecifications: safeParse(
        initialData?.technicalSpecifications,
        {},
      ),
      categoryID:
        typeof initialData?.categoryID === "object"
          ? (initialData?.categoryID as any)?._id || ""
          : initialData?.categoryID || "",
    },
  });

  // Sync state when initialData changes
  useEffect(() => {
    if (initialData) {
      const primaryImg = getFullImageUrl(
        initialData?.product_primary_image_url || initialData?.images?.[0],
      );
      setPrimaryImagePreview(primaryImg);
      setPrimaryImage(null);

      // Filter out primary image from additional images to prevent duplication in UI
      const additionalImgs =
        initialData?.images
          ?.map((img) => getFullImageUrl(img))
          .filter((img) => img !== primaryImg) || [];
      setAdditionalImagesPreviews(additionalImgs);
      setAdditionalImages([]);

      const vids =
        initialData?.product_videos_url?.map((vid) => getFullImageUrl(vid)) ||
        [];
      setVideoPreviews(vids);
      setVideos([]);

      if (initialData.specifications) {
        setSpecs(
          Object.entries(safeParse(initialData.specifications, {}))
            .filter(([key]) => key !== "_id" && key !== "id" && key !== "__v")
            .map(([key, value]) => ({
              key,
              value: String(value),
            })),
        );
      } else {
        setSpecs([]);
      }

      const existingTech = safeParse(
        initialData.technicalSpecifications,
        {},
      ) as Record<string, any>;
      const mergedTech = defaultTechnicalSpecs.map((def) => ({
        key: def.key,
        value: String(existingTech[def.key] || ""),
      }));

      // Add any existing fields that are NOT in defaults
      const defaultKeys = new Set(defaultTechnicalSpecs.map((d) => d.key));
      const internalKeys = new Set(["_id", "id", "__v"]);
      Object.entries(existingTech).forEach(([key, value]) => {
        if (!defaultKeys.has(key) && !internalKeys.has(key)) {
          mergedTech.push({ key, value: String(value) });
        }
      });

      setTechSpecs(mergedTech);

      form.reset({
        name: initialData.name || "",
        brandID:
          typeof (initialData as any)?.brandID === "object"
            ? (initialData as any)?.brandID?._id || ""
            : (initialData as any)?.brandID || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        featured: initialData.featured || false,
        isVisible: initialData.isVisible ?? true,
        isVerified: initialData.isVerified ?? false,
        modelName: (initialData as any).modelName || "",
        keywords: initialData.keywords?.join(", ") || "",
        discountPercentage:
          safeParse(initialData.discount, { percentage: 0 }).percentage ?? 0,
        discountedPrice:
          safeParse(initialData.discount, { discountedPrice: 0 })
            .discountedPrice ?? 0,
        discountStartDate:
          safeParse(initialData.discount, { startDate: "" }).startDate || "",
        discountEndDate:
          safeParse(initialData.discount, { endDate: "" }).endDate || "",
        specifications: safeParse(initialData.specifications, {}),
        technicalSpecifications: safeParse(
          initialData.technicalSpecifications,
          {},
        ),
        categoryID:
          typeof initialData.categoryID === "object"
            ? (initialData.categoryID as any)?._id || ""
            : initialData.categoryID || "",
      });
    } else {
      // Reset for create mode
      setPrimaryImagePreview("");
      setPrimaryImage(null);
      setAdditionalImagesPreviews([]);
      setAdditionalImages([]);
      setVideoPreviews([]);
      setVideos([]);
      setSpecs(defaultSpecs);
      form.reset({
        name: "",
        brandID: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        featured: false,
        isVisible: true,
        isVerified: false,
        modelName: "",
        keywords: "",
        discountPercentage: 0,
        discountedPrice: 0,
        discountStartDate: "",
        discountEndDate: "",
        specifications: {},
        technicalSpecifications: {},
        categoryID: "",
      });
      setTechSpecs(defaultTechnicalSpecs);
    }
  }, [initialData, form]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catResponse, brandResponse, ramResponse, storageResponse] =
          await Promise.all([
            categoryService.getCategories(),
            brandService.getBrands(),
            ramService.getRams(),
            storageService.getStorages(),
          ]);

        const cats: Category[] = Array.isArray(catResponse.data)
          ? catResponse.data
          : (catResponse.data as any)?.data || [];
        const brandsData: Brand[] = Array.isArray(brandResponse.data)
          ? brandResponse.data
          : (brandResponse.data as any)?.data || [];
        const ramsData: Ram[] = Array.isArray(ramResponse.data)
          ? ramResponse.data
          : (ramResponse.data as any)?.data || [];
        const storagesData: Storage[] = Array.isArray(storageResponse.data)
          ? storageResponse.data
          : (storageResponse.data as any)?.data || [];

        setCategories(cats);
        setBrands(brandsData);
        setRams(ramsData);
        setStorages(storagesData);

        // Handle Category pre-selection
        if (initialData?.categoryID && cats.length > 0) {
          const categoryId =
            typeof initialData.categoryID === "object"
              ? (initialData.categoryID as any)._id
              : initialData.categoryID;
          const categoryExists = cats.find((c) => c._id === categoryId);
          if (categoryExists) {
            form.setValue("categoryID", categoryId, { shouldValidate: false });
          }
        }

        // Handle Brand pre-selection
        let initialBrandId = "";
        if (initialData?.brandID) {
          initialBrandId =
            typeof initialData.brandID === "object"
              ? (initialData.brandID as any)._id
              : initialData.brandID;
        }

        if (initialBrandId && brandsData.length > 0) {
          const brandExists = brandsData.find((b) => b._id === initialBrandId);
          if (brandExists) {
            form.setValue("brandID", initialBrandId, { shouldValidate: false });
          }
        }
      } catch (error) {
        console.error("ProductForm: Failed to load data", error);
        toast.error("Failed to load categories or brands");
      }
    }
    fetchData();
  }, [initialData, form]);

  // Auto-generate slug from name
  const productName = form.watch("name");
  useEffect(() => {
    // Only auto-generate slug for new products
    if (!initialData && productName) {
      const generatedSlug = productName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove non-word chars
        .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with -
        .replace(/^-+|-+$/g, ""); // Trim leading/trailing -

      form.setValue("slug", generatedSlug, {
        shouldValidate: true,
      });
    }
  }, [productName, form, initialData]);

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
    e: React.ChangeEvent<HTMLInputElement>,
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
      prev.filter((_, i) => i !== index - (initialData?.images?.length || 0)),
    );
    setAdditionalImagesPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setVideos((prev) => [...prev, ...files]);
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        setVideoPreviews((prev) => [...prev, url]);
      });
    }
  };

  const removeVideo = (index: number) => {
    setVideos((prev) =>
      prev.filter(
        (_, i) => i !== index - (initialData?.product_videos_url?.length || 0),
      ),
    );
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
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

  const addTechSpec = () => {
    setTechSpecs([...techSpecs, { key: "", value: "" }]);
  };

  const updateTechSpec = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newTechSpecs = [...techSpecs];
    newTechSpecs[index][field] = value;
    setTechSpecs(newTechSpecs);
  };

  const removeTechSpec = (index: number) => {
    setTechSpecs(techSpecs.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    // Validate Primary Image
    if (!initialData && !primaryImage) {
      toast.error("Primary image is required");
      return;
    }

    const formData = new FormData();

    // Add basic fields
    Object.entries(values).forEach(([key, value]) => {
      if (
        key !== "specifications" &&
        key !== "technicalSpecifications" &&
        key !== "categoryID" &&
        key !== "brandID" &&
        key !== "discountPercentage" &&
        key !== "discountedPrice" &&
        key !== "discountStartDate" &&
        key !== "discountEndDate" &&
        key !== "keywords"
      ) {
        if (key === "price" || key === "stock") {
          // Ensure numbers are not empty strings
          formData.append(key, String(value || 0));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Add keywords as array
    if (values.keywords) {
      const keywordsArray = values.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k !== "");
      keywordsArray.forEach((keyword) => {
        formData.append("keywords[]", keyword);
      });
      // Also potentially send as simple 'keywords' if backend expects it differently
      // formData.append("keywords", JSON.stringify(keywordsArray));
    }

    // Explicitly append IDs
    formData.append("categoryID", values.categoryID);
    formData.append("brandID", values.brandID);

    // Add discount
    formData.append(
      "discount",
      JSON.stringify({
        percentage: values.discountPercentage || 0,
        discountedPrice: values.discountedPrice || 0,
        startDate: values.discountStartDate || undefined,
        endDate: values.discountEndDate || undefined,
      }),
    );

    // Add videos
    videos.forEach((file) => {
      formData.append("videos", file);
    });

    if (initialData) {
      formData.append(
        "existingVideos",
        JSON.stringify(videoPreviews.filter((p) => p.startsWith("http"))),
      );
    }

    // Add specifications as JSON string if backend expects it or handles it
    const specsObj = specs.reduce(
      (acc, curr) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    formData.append("specifications", JSON.stringify(specsObj));

    // Add technical specifications
    const techSpecsObj = techSpecs.reduce(
      (acc, curr) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    formData.append("technicalSpecifications", JSON.stringify(techSpecsObj));

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
        initialData.product_primary_image_url || "",
      );
      formData.append(
        "existingImages",
        JSON.stringify(
          additionalImagesPreviews.filter((p) => p.startsWith("http")),
        ),
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
          <div className="p-8 bg-muted/40 dark:bg-muted/10 rounded-2xl border border-border/50 space-y-6">
            <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">
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
                control={form.control as any}
                name="brandID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand._id} value={brand._id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. A2833" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="categoryID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
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

            <FormField
              control={form.control as any}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (Comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. laptop, gaming, dell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Product Media */}
          <div className="p-8 bg-muted/40 dark:bg-muted/10 rounded-2xl border border-border/50 space-y-6">
            <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">
              Product Media
            </h3>

            {/* Primary Image */}
            <div className="space-y-2">
              <Label>
                Primary Image <span className="text-red-500">*</span>
              </Label>
              <div
                className="relative h-64 w-full border-2 border-dashed border-border/50 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex items-center justify-center bg-secondary/50 dark:bg-secondary/20 cursor-pointer"
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
                  className="aspect-square rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 flex items-center justify-center transition-all bg-secondary/50 dark:bg-secondary/20"
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

          {/* Videos */}
          <div className="space-y-2">
            <Label>Product Videos</Label>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {videoPreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden border border-border group bg-black md:col-span-2"
                >
                  <video
                    src={preview}
                    className="h-full w-full object-cover"
                    controls={false}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white/80" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-100 shadow-sm hover:bg-red-600 transition-colors z-10"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("videos-upload")?.click()
                }
                className="aspect-video md:col-span-2 rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center transition-all bg-secondary/50 dark:bg-secondary/20 gap-1"
              >
                <Video className="w-6 h-6 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">
                  Add Video
                </span>
              </button>
              <input
                id="videos-upload"
                type="file"
                multiple
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
            </div>
          </div>

          {/* Inventory & Status */}
          <div className="p-8 bg-muted/40 dark:bg-muted/10 rounded-2xl border border-border/50 space-y-6">
            <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">
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

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visible</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="discountedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="discountStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="discountEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="p-8 bg-muted/40 dark:bg-muted/10 rounded-2xl border border-border/50 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">
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
                  {spec.key.toLowerCase() === "ram" ? (
                    <Select
                      value={spec.value}
                      onValueChange={(value) =>
                        updateSpec(index, "value", value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="flex-1 h-9 text-xs">
                          <SelectValue placeholder="Select RAM" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rams.map((ram) => (
                          <SelectItem key={ram._id} value={ram.label}>
                            {ram.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : spec.key.toLowerCase() === "storage" ? (
                    <Select
                      value={spec.value}
                      onValueChange={(value) =>
                        updateSpec(index, "value", value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="flex-1 h-9 text-xs">
                          <SelectValue placeholder="Select Storage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {storages.map((storage) => (
                          <SelectItem key={storage._id} value={storage.label}>
                            {storage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder="e.g. Space Gray"
                      className="flex-1 h-9 text-xs"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpec(index, "value", e.target.value)
                      }
                    />
                  )}
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

          {/* Technical Specifications */}
          <div className="p-8 bg-muted/40 dark:bg-muted/10 rounded-2xl border border-border/50 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">
                Technical Specifications
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addTechSpec}
                className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                <PlusCircle className="mr-1 w-3 h-3" />
                Add Tech Specification
              </Button>
            </div>

            <div className="space-y-3">
              {techSpecs.length === 0 && (
                <p className="text-xs text-center text-muted-foreground/60 py-4">
                  No technical specifications added yet
                </p>
              )}
              {techSpecs.map((spec, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Input
                    placeholder="e.g. Manufacturer"
                    className="flex-1 h-9 text-xs"
                    value={spec.key}
                    onChange={(e) =>
                      updateTechSpec(index, "key", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Value"
                    className="flex-1 h-9 text-xs"
                    value={spec.value}
                    onChange={(e) =>
                      updateTechSpec(index, "value", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTechSpec(index)}
                    className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 border-t border-border/50">
          <Button
            type="submit"
            className="flex-1 h-14 rounded-xl text-lg font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : initialData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-14 border-border/50 flex-1 rounded-xl text-lg font-bold hover:bg-muted transition-all active:scale-[0.98]"
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
