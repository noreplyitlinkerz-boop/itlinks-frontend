import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Truck,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  AlertCircle,
  Phone,
  Mail,
  RefreshCw,
  Gift,
  ChevronRight,
  PackageCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy | Itlinkers - Fast & Free Delivery",
  description:
    "Learn about Itlinkers' shipping policy. Free shipping on all orders, handling times, transit estimates, and delivery support.",
  keywords: [
    "shipping policy",
    "delivery time",
    "free shipping",
    "transit time",
    "shipping rates",
    "itlinkers shipping",
  ],
};

const sections = [
  { id: "timelines", title: "Delivery Timelines" },
  { id: "rates", title: "Shipping Rates" },
  { id: "issues", title: "Delivery Issues" },
  { id: "returns", title: "Returns & Refunds" },
];

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
          {/* Abstract Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-64 bg-accent/20 blur-3xl -skew-y-3"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <Truck className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">
                Fast & Free Shipping
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
              Shipping Policy
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              We offer free shipping on all orders. Check our handling and
              transit times to know when to expect your delivery.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar Navigation - Sticky on Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
                <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-wider mb-4 px-3">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md transition-all"
                    >
                      <span className="truncate">{section.title}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12 lg:space-y-16">
              {/* Timelines Section */}
              <section id="timelines" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Delivery Timelines</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Handling Time */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
                      <PackageCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Handling Time</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Shipping Initiated
                    </p>
                    <div className="text-2xl font-bold text-foreground">
                      0 - 3 Days
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mon – Fri
                    </p>
                  </div>

                  {/* Transit Time */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 mb-4">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Transit Time</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      On the Road
                    </p>
                    <div className="text-2xl font-bold text-foreground">
                      2 - 7 Days
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mon – Fri
                    </p>
                  </div>

                  {/* Total Time */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center ring-2 ring-primary/5 dark:ring-primary/20 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Total Delivery</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Estimated Arrival
                    </p>
                    <div className="text-2xl font-bold text-foreground">
                      2 - 10 Days
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Business Days
                    </p>
                  </div>
                </div>
              </section>

              {/* Shipping Rates */}
              <section id="rates" className="scroll-mt-32">
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
                  <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                    <Gift className="w-64 h-64 text-white" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-6 h-6 text-accent" />
                        <h2 className="text-2xl font-bold">Shipping Rates</h2>
                      </div>
                      <p className="text-slate-100 text-lg opacity-90">
                        We believe in transparent pricing. No hidden fees at
                        checkout.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 min-w-[240px] text-center">
                      <div className="text-sm uppercase tracking-widest text-accent font-bold mb-1">
                        All Orders
                      </div>
                      <div className="text-4xl font-bold mb-1">FREE</div>
                      <div className="text-sm text-slate-200">Shipping</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Issues */}
              <section id="issues" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Delivery Issues</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    If you haven’t received your order within{" "}
                    <span className="font-bold text-foreground">15 days</span>{" "}
                    of receiving your shipping confirmation email, please
                    contact us immediately with your name and order number. We
                    will investigate the issue for you.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <a
                      href="mailto:admin@itlinkers.co.in"
                      className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">
                          Email Support
                        </div>
                        <div className="font-semibold">
                          admin@itlinkers.co.in
                        </div>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">
                          Phone Support
                        </div>
                        <div className="font-semibold">+91 7380817676</div>
                        <div className="text-xs text-muted-foreground">
                          Mon-Sat, 10 AM - 7 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* Returns & Refunds */}
              <section id="returns" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Returns & Refunds</h2>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-1">
                      If, for any reason, you are not completely satisfied with
                      a purchase, we invite you to review our policy on refunds
                      and returns.
                    </p>
                  </div>
                  <Link
                    href="/returns"
                    className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  >
                    View Return Policy
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
