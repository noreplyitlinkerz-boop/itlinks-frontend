"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  Mail,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Phone,
  User,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { contactService } from "@/lib/api/services";
import { ContactMessage } from "@/lib/api/services/contact-service";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null
  );
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  // Date formatter
  const formatDate = (
    dateString: string,
    formatStr: "short" | "long" = "short"
  ) => {
    const date = new Date(dateString);
    if (formatStr === "long") {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(date);
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await contactService.getContacts({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
      });
      setContacts(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalContacts(response.pagination.total);
    } catch (error: any) {
      console.error("Failed to fetch contacts", error);
      // We don't want to show toast error here if it's a 403 because AdminGuard should handle it,
      // but if we are here, we are supposed to be admin.
      if (error?.response?.status !== 403) {
        toast.error("Failed to fetch contact messages");
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const openDetailsDialog = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Contact Messages
          </h1>
          <p className="text-muted-foreground">
            View and manage inquiries from your customers
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/20 p-4 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
        <div className="flex items-center px-4 py-2 bg-background/30 rounded-xl border border-border/30 text-xs font-semibold text-muted-foreground whitespace-nowrap shadow-sm">
          {totalContacts} messages found
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-hidden border border-border/50 rounded-2xl bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-bold py-4 pl-6">Customer</TableHead>
              <TableHead className="font-bold">Contact Info</TableHead>
              <TableHead className="font-bold">Message Preview</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="text-right font-bold pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/30">
                  <TableCell className="pl-6">
                    <Skeleton className="h-4 w-[120px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-[150px] bg-muted" />
                      <Skeleton className="h-3 w-[100px] bg-muted" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px] bg-muted" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-muted" />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Skeleton className="h-8 w-8 ml-auto rounded-full bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FilterX className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No messages found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow
                  key={contact._id}
                  className="border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => openDetailsDialog(contact)}
                >
                  <TableCell className="pl-6 font-medium">
                    {contact.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs space-y-1">
                      <span className="flex items-center text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" /> {contact.email}
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" /> {contact.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="text-sm truncate text-muted-foreground">
                      {contact.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </TableCell>
                  <TableCell
                    className="text-right pr-6"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                          onClick={() => openDetailsDialog(contact)}
                          className="cursor-pointer"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          View Details
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

      {/* Message Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-border/60 rounded-3xl p-0 shadow-2xl">
          <div className="p-8 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">
                Message Details
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-8 pt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Customer
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    {selectedContact?.name}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Mail className="w-4 h-4 text-primary" />
                    {selectedContact?.email}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Phone className="w-4 h-4 text-primary" />
                    {selectedContact?.phone}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Received Date
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    {selectedContact &&
                      formatDate(selectedContact.createdAt, "long")}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Message Content
              </p>
              <div className="bg-muted/30 p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap min-h-[150px]">
                {selectedContact?.message}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setDetailsDialogOpen(false)}
                variant="outline"
                className="rounded-xl px-8"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
