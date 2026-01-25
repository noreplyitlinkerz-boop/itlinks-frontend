"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Banner } from "@/lib/api/types/endpoints";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

// Helper for file validation (simplified)
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  link: z.string().min(1, "Link URL is required"),
  ctaText: z.string().optional(),
  order: z.coerce.number().min(0, "Order must be a number"),
  isActive: z.boolean(),
  image: z.any().optional(),
});

interface BannerFormProps {
  initialData?: Banner | null;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function BannerForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: BannerFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      link: "",
      ctaText: "",
      order: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        link: initialData.link,
        ctaText: initialData.ctaText,
        order: Number(initialData.order), // Ensure number
        isActive: initialData.isActive,
      });
      setPreviewUrl(initialData.image);
    } else {
      form.reset({
        title: "",
        description: "",
        link: "",
        ctaText: "",
        order: 0,
        isActive: true,
      });
      setPreviewUrl(null);
    }
  }, [initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("image", file);
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Basic image validation for create
    if (!initialData && !values.image) {
      toast.error("Please upload a banner image");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.link) formData.append("link", values.link);
    if (values.ctaText) formData.append("ctaText", values.ctaText);
    formData.append("order", String(values.order));
    formData.append("isActive", String(values.isActive));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (initialData?.image) {
      // Re-append existing image URL if not changed
      formData.append("image", initialData.image);
    }

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Title</FormLabel>
                <FormControl>
                  <Input placeholder="Summer Sale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                  <Input placeholder="/products" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ctaText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input placeholder="Shop Now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of the promotion"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Show this banner on the homepage
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-2 space-y-4">
            <FormLabel>Banner Image</FormLabel>
            <div
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-colors ${previewUrl ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}`}
            >
              {previewUrl ? (
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={previewUrl}
                    alt="Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
                  <p className="font-medium">Click to upload image</p>
                  <p className="text-xs">JPG, PNG, WEBP up to 5MB</p>
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer max-w-xs"
              />
            </div>
          </div>
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
            {initialData ? "Update Banner" : "Create Banner"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
