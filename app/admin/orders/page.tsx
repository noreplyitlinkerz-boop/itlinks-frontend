"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/10";
      case "shipped":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/10";
      case "processing":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10";
      case "pending":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/10";
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
      default:
        return undefined;
    }
  };

  const handleStatusChange = (
    orderId: string,
    newStatus: Order["orderStatus"]
  ) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-2">
          Manage customer orders and their statuses
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        {orders.length} total orders
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium font-mono text-xs">
                  {order._id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order.shippingAddress.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell className="font-semibold">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.orderStatus}
                    onValueChange={(value) =>
                      handleStatusChange(
                        order._id,
                        value as Order["orderStatus"]
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <Badge className={getStatusColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order Details - {order._id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">
                            Customer Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Name</p>
                              <p className="font-medium">
                                {order.shippingAddress.firstName}{" "}
                                {order.shippingAddress.lastName}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Phone</p>
                              <p className="font-medium">
                                {order.shippingAddress.phone}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Order Items</h3>
                          <div className="border rounded-lg divide-y">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="p-4 flex justify-between"
                              >
                                <div>
                                  <p className="font-medium">
                                    {item.product.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Status:
                            </span>
                            <Badge
                              className={getStatusColor(order.orderStatus)}
                            >
                              {order.orderStatus}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
