import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917380817676"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group animate-bounce-slow"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
          Need Help? Chat with us!
        </span>
      </a>

      <footer className="border-t border-border/40 bg-background/95 backdrop-blur mt-12 md:mt-20 relative">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 text-center md:text-left">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ITLINKERS</h3>
              <p className="text-sm text-muted-foreground mx-auto md:mx-0 max-w-xs md:max-w-none">
                IT LINKERS - wired for your world. Your trusted source for
                premium laptops, components, and accessories.
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
                  <WhatsAppIcon className="w-5 h-5" />
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
    </>
  );
}
