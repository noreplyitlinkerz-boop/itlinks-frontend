"use client";

import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, ShoppingBag, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { products, categories, orders } = useAdmin();

  // Calculate stats
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "cancelled")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "pending"
  ).length;

  // Recent orders (last 5)
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      description: `${products.filter((p) => p.stock > 0).length} in stock`,
    },
    {
      title: "Categories",
      value: categories.length,
      icon: FolderTree,
      description: "Active categories",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: ShoppingBag,
      description: "Awaiting processing",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(0)}`,
      icon: DollarSign,
      description: "All time",
    },
  ];

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your store's performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium font-mono text-xs">
                    {order._id}
                  </TableCell>
                  <TableCell>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
