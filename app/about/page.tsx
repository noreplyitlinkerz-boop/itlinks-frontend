import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Laptop,
  Users,
  Award,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Gem,
  Cpu,
  Globe,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Itlinkers | Wired for Your World",
  description:
    "Learn how Itlinkers is redefining the refurbished technology market with premium quality, expert restoration, and a customer-first approach.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10BBE6]/10 text-[#10BBE6] text-xs font-bold tracking-widest uppercase mb-4">
                Since 2020
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                WIRED FOR <br />
                <span className="text-[#10BBE6]">YOUR WORLD.</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                At Itlinkers, we don't just sell electronics. We deliver
                performance, reliability, and the power to achieve your digital
                goals without compromise.
              </p>
            </div>
          </div>
          {/* Abstract background decorations */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#10BBE6]/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </section>

        {/* Brand Philosophy Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#10BBE6]/20 to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop"
                    alt="Premium Technology"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Our Philosophy
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    We believe that premium technology should be accessible, not
                    exclusive. In a world where new hardware prices are
                    skyrocketing, Itlinkers stands as a bridge between top-tier
                    corporate performance and your personal aspirations.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <Gem className="w-8 h-8 text-[#10BBE6] mb-4" />
                    <h4 className="font-bold mb-2">Uncompromising Quality</h4>
                    <p className="text-sm text-slate-500">
                      Only Grade-A++ units enter our inventory. If it doesn't
                      look new, we don't sell it.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <ShieldCheck className="w-8 h-8 text-[#10BBE6] mb-4" />
                    <h4 className="font-bold mb-2">Vested Integrity</h4>
                    <p className="text-sm text-slate-500">
                      Honesty is our core. Every component is genuine, every
                      claim is verified.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    "Curated selection of enterprise-grade hardware",
                    "Certified multi-stage diagnostic testing",
                    "Full lifecycle support and expert warranty",
                    "Nationwide shipping including tier-2 and tier-3 cities",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Counters */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#10BBE6] via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-6xl font-black text-[#10BBE6]">
                  25K+
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Devices Delivered
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-6xl font-black text-[#10BBE6]">
                  98%
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Customer Satisfaction
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-6xl font-black text-[#10BBE6]">
                  500+
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Tons of e-Waste Saved
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-6xl font-black text-[#10BBE6]">
                  24/7
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Technical Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Itlinkers */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-bold tracking-tight">
                The Itlinkers Advantage
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Discover why thousands of professionals and creators trust us
                for their technology needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-[#10BBE6]/10 transition-all duration-500">
                <div className="w-16 h-16 bg-[#10BBE6]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8 text-[#10BBE6]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Enterprise Specs</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We specialize in corporate series hardware (Latitude,
                  ThinkPad, EliteBook) that is built to last significantly
                  longer than consumer-grade models.
                </p>
              </div>

              <div className="group p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-[#10BBE6]/10 transition-all duration-500">
                <div className="w-16 h-16 bg-[#10BBE6]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-[#10BBE6]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Performance Ready</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every storage drive is upgraded to high-speed NVMe SSDs and
                  memory is maximized to ensure your device handles modern
                  multitasking effortlessly.
                </p>
              </div>

              <div className="group p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-[#10BBE6]/10 transition-all duration-500">
                <div className="w-16 h-16 bg-[#10BBE6]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-[#10BBE6]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">India's Tech Hub</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Strategically located in New Delhi's Nehru Place with a vast
                  support network, we ensure your tech journey is worry-free
                  from order to delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
              READY TO POWER UP?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/products"
                className="px-12 py-5 bg-[#10BBE6] text-white rounded-2xl font-bold shadow-xl shadow-[#10BBE6]/30 hover:shadow-2xl transition-all"
              >
                Browse Inventory
              </a>
              <a
                href="/contact"
                className="px-12 py-5 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-white rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all"
              >
                Get Expert Advice
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
