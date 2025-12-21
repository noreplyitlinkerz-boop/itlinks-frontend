import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AdminProvider } from "@/context/AdminContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Itlinkers - Premium Laptops & Accessories",
  description:
    "Your one-stop shop for high-performance laptops, components, and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider>
          <AdminProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
