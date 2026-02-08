"use client";

import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Ram, CreateRamRequest } from "@/lib/api/types/endpoints";
import { useEffect } from "react";

const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  extraPrice: z.coerce.number().min(0, "Price must be at least 0"),
  isAvailable: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface RamFormProps {
  initialData?: Ram | null;
  onSubmit: (data: CreateRamRequest) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function RamForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: RamFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      label: "",
      extraPrice: 0,
      isAvailable: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        label: initialData.label || "",
        extraPrice: initialData.extraPrice || 0,
        isAvailable: initialData.isAvailable ?? true,
      });
    } else {
      form.reset({
        label: "",
        extraPrice: 0,
        isAvailable: true,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values as CreateRamRequest);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 16GB DDR4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extraPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra Price ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Available</FormLabel>
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
            {initialData ? "Update RAM" : "Create RAM"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
