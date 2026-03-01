"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Loader2, Trash2, Pencil, MoreVertical, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { brandService } from "@/lib/api/services/brand-service";
import { Brand } from "@/lib/api/types/endpoints";
import { BrandForm } from "@/components/admin/BrandForm";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await brandService.getBrands();
      if (response.success && response.data) {
        setBrands(response.data);
      } else {
        setBrands([]);
      }
    } catch (error: any) {
      toast.error("Failed to fetch brands", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleCreateOrUpdate = async (data: { name: string }) => {
    setIsActionLoading(true);
    try {
      if (editingBrand) {
        await brandService.updateBrand(editingBrand._id, data);
        toast.success("Brand updated successfully");
      } else {
        await brandService.createBrand(data);
        toast.success("Brand created successfully");
      }
      setDialogOpen(false);
      fetchBrands();
    } catch (error: any) {
      toast.error(editingBrand ? "Update failed" : "Creation failed", {
        description:
          error.message || "Please check the form data and try again.",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await brandService.deleteBrand(id);
      toast.success("Brand deleted successfully");
      fetchBrands();
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error.message || "Could not delete the brand.",
      });
    }
  };

  const openEditDialog = (brand: Brand) => {
    setEditingBrand(brand);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingBrand(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground">
            Manage brands available in your store
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-12 px-6 rounded-xl font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98] border border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Brand
        </Button>
      </div>

      {/* Brands Table */}
      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-bold py-4 pl-6">Name</TableHead>
              <TableHead className="font-bold">Created At</TableHead>
              <TableHead className="text-right font-bold pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/30">
                  <TableCell>
                    <Skeleton className="h-4 w-[200px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Tag className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No brands found</p>
                    <p className="text-sm">Add a new brand to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow
                  key={brand._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-medium pl-6">
                    {brand.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.createdAt
                      ? new Date(brand.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-muted"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-card border-border"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="border-border" />
                        <DropdownMenuItem
                          onClick={() => openEditDialog(brand)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Brand
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(brand._id, brand.name)}
                          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Brand
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-card border-border/60 rounded-3xl p-0 shadow-2xl">
          <div className="p-6 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingBrand ? "Edit Brand" : "Add New Brand"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 pt-0">
            <BrandForm
              initialData={editingBrand}
              onSubmit={handleCreateOrUpdate}
              isLoading={isActionLoading}
              onCancel={() => setDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
