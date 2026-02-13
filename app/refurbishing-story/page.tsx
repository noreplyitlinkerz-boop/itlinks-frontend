import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  ShieldCheck,
  Settings2,
  Recycle,
  Search,
  Wrench,
  Cpu,
  CheckCircle2,
  Zap,
  Leaf,
  Layers,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Refurbishing Story | Itlinkers - Excellence Restored",
  description:
    "Discover how Itlinkers transforms pre-owned technology into high-performance, like-new devices through our rigorous 50-point inspection and restoration process.",
};

const stages = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Rigorous Sourcing",
    description:
      "We only source from trusted corporate partners and authorized channels, ensuring every device has a clear history and genuine components.",
  },
  {
    icon: <Settings2 className="w-6 h-6" />,
    title: "50-Point Inspection",
    description:
      "Our certified technicians perform an exhaustive diagnostic, testing everything from CPU stability to pixel-perfect screen clarity.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Expert Restoration",
    description:
      "We don't just 'fix' things. We deep clean, apply premium thermal paste, and replace any components that don't meet our 'Grade A' standards.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Performance Upgrades",
    description:
      "Where possible, we enhance the hardware with faster SSDs and expanded RAM to ensure your device handles modern workloads with ease.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Final Certification",
    description:
      "A final round of stress tests ensures the device remains stable under heavy use. Only then does it receive the Itlinkers Seal of Quality.",
  },
];

export default function RefurbishingStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
              alt="Lab background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10BBE6]/20 border border-[#10BBE6]/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#10BBE6]" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Second Life, Better Performance
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Giving Tech a <span className="text-[#10BBE6]">Second Life</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We believe that high-performance technology shouldn't cost the
              Earth. Our restoration process turns yesterday's high-end gear
              into tomorrow's powerhouse.
            </p>
          </div>
        </section>

        {/* The Impact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Sustainable Innovation <br />
                  <span className="text-primary tracking-tight">
                    Redefining Refurbished
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Most people see a 'used' laptop and think of wear and tear. At
                  Itlinkers, we see undiscovered potential. Every device we
                  refurbish saves over 200kg of CO2 emissions and prevents
                  valuable rare-earth metals from entering landfills.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl shrink-0 h-fit">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Eco-Friendly Tech</h4>
                      <p className="text-muted-foreground italic">
                        Reduces electronic waste and minimizes carbon footprint.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl shrink-0 h-fit">
                      <Layers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">
                        Premium Grade-A Quality
                      </h4>
                      <p className="text-muted-foreground italic">
                        Cosmetically superior units that look and feel almost
                        brand new.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop"
                  alt="Technician working"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-white font-medium text-lg italic">
                    "We don't just sell refurbished; we sell peace of mind."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Process - Horizontal Scroll/Grid */}
        <section className="py-24 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our restoration journey
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                A meticulous step-by-step process that guarantees performance,
                reliability, and longevity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 relative group"
                >
                  <div className="absolute top-0 right-0 p-4 text-4xl font-black text-slate-100 dark:text-slate-700 group-hover:text-primary/10 transition-colors">
                    0{index + 1}
                  </div>
                  <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    {stage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{stage.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 50-Point Highlight */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex-1 space-y-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold">
                  The 50-Point Inspection
                </h2>
                <p className="text-xl text-primary-foreground/90">
                  Every device undergoes a checklist more rigorous than many
                  brand-new manufacturers. If it doesn't pass 100%, it doesn't
                  leave our lab.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Stress Testing",
                    "Pixel Check",
                    "Battery Cycle Test",
                    "Keyboard Fatigue",
                    "Port Connectivity",
                    "Wi-Fi & Bluetooth",
                    "BIOS/Firmware Updates",
                    "Internal Thermal Cleaning",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/3 flex justify-center relative z-10">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-20" />
                  <div className="absolute inset-4 bg-white/10 rounded-full backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6 border border-white/20">
                    <Zap className="w-12 h-12 text-accent mb-4" />
                    <span className="text-4xl font-black">100%</span>
                    <span className="text-sm uppercase tracking-widest font-bold">
                      Guaranteed Performance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 italic">
              Ready to experience premium refurbished?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="px-10 py-4 bg-[#10BBE6] text-white rounded-full font-bold shadow-lg shadow-[#10BBE6]/30 hover:scale-105 transition-transform"
              >
                Shop Our Collection
              </a>
              <a
                href="/warranty"
                className="px-10 py-4 bg-white border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Learn About Warranty
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
