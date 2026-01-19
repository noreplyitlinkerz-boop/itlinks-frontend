"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Loader2,
  Package,
  Trash2,
  Pencil,
  MoreVertical,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FilterX,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { API_CONFIG } from "@/lib/api/api-config";

import { Button } from "@/components/ui/button";
import { safeParse } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/shared/ProductImage";

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

import { productService, categoryService } from "@/lib/api/services";
import { Product, Category } from "@/lib/api/types/endpoints";
import { ProductForm } from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch categories once - Using dummy data (API not available)
  useEffect(() => {
    async function fetchCategories() {
      try {
        // TODO: Replace with actual API when available
        // const response = await categoryService.getCategories();
        // setCategories(response.data || []);

        // Dummy categories
        setCategories([
          {
            _id: "1",
            name: "Electronics",
            isVisible: true,
          },
          {
            _id: "2",
            name: "Laptops",
            isVisible: true,
          },
          {
            _id: "3",
            name: "Accessories",
            isVisible: true,
          },
        ]);
      } catch (error) {
        console.error("Failed to load categories", error);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
      });
      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalProducts(response.pagination.total);
    } catch (error: any) {
      toast.error("Failed to fetch products", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateOrUpdate = async (formData: FormData) => {
    setIsActionLoading(true);
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData as any);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(formData as any);
        toast.success("Product created successfully");
      }
      setDialogOpen(false);
      fetchProducts();
    } catch (error: any) {
      toast.error(editingProduct ? "Update failed" : "Creation failed", {
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
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error.message || "Could not delete the product.",
      });
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your store inventory and catalog
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="h-12 px-6 rounded-xl font-bold bg-primary hover:opacity-90 transition-all active:scale-[0.98] border border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/20 p-4 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, brand or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
        <div className="flex items-center px-4 py-2 bg-background/30 rounded-xl border border-border/30 text-xs font-semibold text-muted-foreground whitespace-nowrap shadow-sm">
          {totalProducts} products found
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-[80px] font-bold py-4 pl-6">
                Image
              </TableHead>
              <TableHead className="max-w-[280px] font-bold">
                Product Info
              </TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Stock</TableHead>
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
                    <Skeleton className="h-12 w-12 rounded-lg bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px] bg-muted" />
                      <Skeleton className="h-3 w-[100px] bg-muted" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[40px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FilterX className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">
                      Try adjusting your search or add a new product.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-lg bg-muted border-none overflow-hidden">
                      {product.product_primary_image_url ||
                      (product.images && product.images.length > 0) ? (
                        <ProductImage
                          src={
                            product.product_primary_image_url ||
                            product.images?.[0]
                          }
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <Package className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-normal text-foreground line-clamp-2 leading-snug">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.brand}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discount && (
                        <span className="text-[10px] text-green-500">
                          -
                          {
                            safeParse(product.discount, { percentage: 0 })
                              .percentage
                          }
                          % Off
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          product.stock < 10
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {product.stock}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">
                          Featured
                        </Badge>
                      )}
                      {!product.isVisible && (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground border-border text-[10px]"
                        >
                          Hidden
                        </Badge>
                      )}
                      {product.stock === 0 ? (
                        <Badge variant="destructive" className="text-[10px]">
                          Out of Stock
                        </Badge>
                      ) : product.stock < 10 ? (
                        <Badge
                          variant="secondary"
                          className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]"
                        >
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500/20 text-[10px]"
                        >
                          In Stock
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
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
                        className="w-48 bg-card border-border"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="border-border" />
                        <DropdownMenuItem
                          onClick={() => openEditDialog(product)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <Link
                          href={`/products/slug/${product.slug}`}
                          target="_blank"
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on Store
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator className="border-border" />
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(product._id, product.name)
                          }
                          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Product
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

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="border-border hover:bg-muted"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="border-border hover:bg-muted"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/60 rounded-3xl p-0 shadow-2xl">
          <div className="p-8 pb-4">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-8 pt-0">
            <ProductForm
              initialData={editingProduct}
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
