"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  MoreVertical,
  Map,
  BadgeAlert,
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
import { navigationService } from "@/lib/api/services/navigation-service";
import { NavigationItem } from "@/lib/api/types/endpoints";
import { NavigationForm } from "@/components/admin/NavigationForm";

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

  const fetchNavigation = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await navigationService.getNavigation({ admin: true });
      if (response.success && response.data) {
        setNavItems(response.data);
      } else {
        setNavItems([]);
      }
    } catch (error: any) {
      toast.error("Failed to fetch navigation", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNavigation();
  }, [fetchNavigation]);

  const handleCreateOrUpdate = async (data: Partial<NavigationItem>) => {
    setIsActionLoading(true);
    try {
      if (editingItem) {
        await navigationService.updateNavigation(editingItem._id, data);
        toast.success("Navigation updated successfully");
      } else {
        await navigationService.createNavigation(data);
        toast.success("Navigation created successfully");
      }
      setDialogOpen(false);
      fetchNavigation();
    } catch (error: any) {
      toast.error(editingItem ? "Update failed" : "Creation failed", {
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
        `Are you sure you want to delete "${label}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await navigationService.deleteNavigation(id);
      toast.success("Navigation item deleted successfully");
      fetchNavigation();
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error.message || "Could not delete the item.",
      });
    }
  };

  const openEditDialog = (item: NavigationItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Navigation</h1>
          <p className="text-muted-foreground">
            Manage your main menu structure
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-12 px-6 rounded-xl font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98] border border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-bold py-4 pl-6">Label</TableHead>
              <TableHead className="font-bold">URL</TableHead>
              <TableHead className="font-bold">Order</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Children</TableHead>
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
                    <Skeleton className="h-4 w-[150px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[40px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : navItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Map className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No navigation items</p>
                    <p className="text-sm">
                      Create your first menu item to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              navItems.map((item) => (
                <TableRow
                  key={item._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-medium pl-6">
                    {item.label}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {item.url}
                  </TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    {item.isActive ? (
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
                  <TableCell>
                    <span className="text-muted-foreground">
                      {item.children?.length || 0} items
                    </span>
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
                          onClick={() => openEditDialog(item)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(item._id, item.label)}
                          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Item
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
        <DialogContent className="max-w-2xl bg-card border-border/60 rounded-3xl p-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingItem ? "Edit Navigation" : "New Menu Item"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 pt-0">
            <NavigationForm
              initialData={editingItem}
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
