import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur mt-12 md:mt-20 relative">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917380817676"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group animate-bounce-slow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
          Need Help? Chat with us!
        </span>
      </a>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 text-center md:text-left">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ITLINKERS</h3>
            <p className="text-sm text-muted-foreground mx-auto md:mx-0 max-w-xs md:max-w-none">
              IT LINKERS - wired for your world. Your trusted source for premium
              laptops, components, and accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  href="/products?category=laptops"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Refurbished Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=desktops"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Refurbished Desktops
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Computer Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=components"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  IT Components
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="https://wa.me/917380817676"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact.itlinkers@gmail.com"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground font-semibold">
                Customer Support:
              </p>
              <p className="text-sm font-bold text-foreground">
                +91 7380817676
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ITLINKERS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
