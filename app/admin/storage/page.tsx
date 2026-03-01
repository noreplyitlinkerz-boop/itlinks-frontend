"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  MoreVertical,
  HardDrive,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { storageService } from "@/lib/api/services";
import { Storage, CreateStorageRequest } from "@/lib/api/types/endpoints";
import { StorageForm } from "@/components/admin/StorageForm";

export default function AdminStoragePage() {
  const [storages, setStorages] = useState<Storage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStorage, setEditingStorage] = useState<Storage | null>(null);

  const fetchStorages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await storageService.getStorages();
      if (response.success && response.data) {
        setStorages(response.data);
      } else {
        setStorages([]);
      }
    } catch (error: any) {
      toast.error("Failed to fetch Storage options", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStorages();
  }, [fetchStorages]);

  const handleCreateOrUpdate = async (data: CreateStorageRequest) => {
    setIsActionLoading(true);
    try {
      if (editingStorage) {
        await storageService.updateStorage(editingStorage._id, data);
        toast.success("Storage updated successfully");
      } else {
        await storageService.createStorage(data);
        toast.success("Storage created successfully");
      }
      setDialogOpen(false);
      fetchStorages();
    } catch (error: any) {
      toast.error(editingStorage ? "Update failed" : "Creation failed", {
        description:
          error.message || "Please check the form data and try again.",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (
      !confirm(
        `Are you sure you want to delete Storage "${label}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await storageService.deleteStorage(id);
      toast.success("Storage deleted successfully");
      fetchStorages();
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error.message || "Could not delete the Storage.",
      });
    }
  };

  const openEditDialog = (storage: Storage) => {
    setEditingStorage(storage);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingStorage(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Storage Management
          </h1>
          <p className="text-muted-foreground">
            Manage Storage options available for products
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-12 px-6 rounded-xl font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98] border border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Storage
        </Button>
      </div>

      {/* Storage Table */}
      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-bold py-4 pl-6">Label</TableHead>
              <TableHead className="font-bold">Extra Price</TableHead>
              <TableHead className="font-bold">Available</TableHead>
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
                    <Skeleton className="h-4 w-[100px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : storages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <HardDrive className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">
                      No Storage options found
                    </p>
                    <p className="text-sm">
                      Add a new Storage option to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              storages.map((storage) => (
                <TableRow
                  key={storage._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-medium pl-6">
                    {storage.label}
                  </TableCell>
                  <TableCell>${storage.extraPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {storage.isAvailable ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {storage.createdAt
                      ? new Date(storage.createdAt).toLocaleDateString()
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
                          onClick={() => openEditDialog(storage)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Storage
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(storage._id, storage.label)
                          }
                          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Storage
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
                {editingStorage ? "Edit Storage" : "Add New Storage"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 pt-0">
            <StorageForm
              initialData={editingStorage}
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
