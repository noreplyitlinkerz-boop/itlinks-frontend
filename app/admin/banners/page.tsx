"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  MoreVertical,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
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
import { Badge } from "@/components/ui/badge";
import { bannerService } from "@/lib/api/services/banner-service";
import { Banner } from "@/lib/api/types/endpoints";
import { BannerForm } from "@/components/admin/BannerForm";
import Image from "next/image";
import { getFullImageUrl } from "@/components/shared/ProductImage";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await bannerService.getBanners({ admin: true });
      if (response.success && response.data) {
        setBanners(response.data);
      } else {
        setBanners([]);
      }
    } catch (error: any) {
      toast.error("Failed to fetch banners", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleCreateOrUpdate = async (formData: FormData) => {
    setIsActionLoading(true);
    try {
      if (editingBanner) {
        await bannerService.updateBanner(editingBanner._id, formData);
        toast.success("Banner updated successfully");
      } else {
        await bannerService.createBanner(formData);
        toast.success("Banner created successfully");
      }
      setDialogOpen(false);
      fetchBanners();
    } catch (error: any) {
      toast.error(editingBanner ? "Update failed" : "Creation failed", {
        description:
          error.message || "Please check the form data and try again.",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await bannerService.deleteBanner(id);
      toast.success("Banner deleted successfully");
      fetchBanners();
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error.message || "Could not delete the banner.",
      });
    }
  };

  const openEditDialog = (banner: Banner) => {
    setEditingBanner(banner);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingBanner(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">
            Manage promotional banners for your homepage
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-12 px-6 rounded-xl font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98] border border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Banner
        </Button>
      </div>

      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-bold py-4 pl-6">Image</TableHead>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Link</TableHead>
              <TableHead className="font-bold">Order</TableHead>
              <TableHead className="font-bold">Status</TableHead>
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
                    <Skeleton className="h-16 w-24 rounded-lg bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px] bg-muted" />
                      <Skeleton className="h-3 w-[100px] bg-muted" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[40px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No banners found</p>
                    <p className="text-sm">
                      Create your first banner to showcase promotions.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow
                  key={banner._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="pl-6">
                    <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-muted border border-border/50">
                      {banner.image ? (
                        <Image
                          src={getFullImageUrl(banner.image)}
                          alt={banner.title}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{banner.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {banner.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs font-mono">
                    {banner.link || "-"}
                  </TableCell>
                  <TableCell>{banner.order}</TableCell>
                  <TableCell>
                    {banner.isActive ? (
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-500/20 gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground border-border gap-1"
                      >
                        <XCircle className="w-3 h-3" /> Inactive
                      </Badge>
                    )}
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
                          onClick={() => openEditDialog(banner)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Banner
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(banner._id, banner.title)}
                          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Banner
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
        <DialogContent className="max-w-4xl bg-card border-border/60 rounded-3xl p-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingBanner ? "Edit Banner" : "Create New Banner"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 pt-0">
            <BannerForm
              initialData={editingBanner}
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
