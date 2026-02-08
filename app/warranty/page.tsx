import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Phone,
  Truck,
  FileText,
  Scale,
  RefreshCw,
  Ban,
  Laptop,
  Mail,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warranty Policy | Itlinkers - Quality Guaranteed",
  description:
    "Terms and conditions of Itlinkers warranty service for refurbished hardware products. Coverage details, exclusions, and claim process.",
  keywords: [
    "warranty policy",
    "refurbished warranty",
    "itlinkers warranty",
    "hardware coverage",
    "extended warranty",
    "repair service",
  ],
};

const sections = [
  { id: "overview", title: "Overview" },
  { id: "period", title: "Warranty Period" },
  { id: "covered", title: "What is Covered?" },
  { id: "not-covered", title: "What is Not Covered?" },
  { id: "exclusions", title: "Exclusions" },
  { id: "responsibilities", title: "Your Responsibilities" },
  { id: "service", title: "Obtain Service" },
  { id: "shipping", title: "Shipping & Handling" },
  { id: "limitations", title: "Limitations" },
  { id: "changes", title: "Policy Changes" },
];

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
          {/* Abstract Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <ShieldCheck className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">
                Quality Guaranteed
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
              Warranty Policy
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Itlinkers is committed to delivering high-quality refurbished
              products that meet your expectations. Review the terms and
              conditions of our warranty coverage below.
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
              {/* Overview Card */}
              <div
                id="overview"
                className="scroll-mt-32 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Overview</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      This warranty applies only to products purchased directly
                      from Itlinkers' official website or physical store.
                      Products purchased from third-party marketplaces where
                      Itlinkers is a seller are not covered under this warranty.
                    </p>
                  </div>
                </div>
              </div>

              {/* Warranty Period */}
              <section id="period" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Warranty Period</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      Standard Warranty
                    </h3>
                    <div className="text-3xl font-bold mb-2">6 Months</div>
                    <p className="text-sm text-muted-foreground">
                      Valid from the date of original retail purchase by the
                      end-user for all refurbished products.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 bg-accent text-white text-xs font-bold rounded-bl-lg">
                      UPGRADE
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      Extended Warranty
                    </h3>
                    <div className="text-3xl font-bold mb-2">Up to 2 Years</div>
                    <p className="text-sm text-muted-foreground">
                      Additional coverage available for purchase. Extends the
                      total coverage period.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* What is Covered */}
              <section id="covered" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">What is Covered?</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
                    Itlinkers warrants that the refurbished hardware product and
                    accessories contained in the original packaging are free
                    from defects in materials and workmanship when used
                    normally.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Screen",
                      "Motherboard",
                      "Keyboard",
                      "Hard drive and memory (RAM)",
                      "Accessories included in original packaging",
                      "Manufacturing defects coverage",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20"
                      >
                        <Laptop className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* What is Not Covered */}
              <section id="not-covered" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm">
                    <Ban className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">What is Not Covered?</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Third-Party Accessories
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Components used with the product, even if purchased from
                        Itlinkers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Software</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Operating systems, applications, and other software are
                        not covered. Refer to licensing agreements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">User Damage</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Accidents, misuse, or unauthorized modifications.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Exclusions */}
              <section id="exclusions" className="scroll-mt-32">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Exclusions from Warranty
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                  <ul className="space-y-3">
                    {[
                      "Consumable parts (batteries) unless due to defect.",
                      "Superficial damage (scratches, dents, ports).",
                      "Damage from third-party components.",
                      "External factors (accidents, fire, liquid, etc.).",
                      "Operating outside published guidelines.",
                      "Unauthorized repairs or modifications.",
                      "Normal wear and tear or aging.",
                      "Products with removed/defaced serial numbers.",
                      "Stolen products or those locked by security measures.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* User Responsibilities */}
              <section id="responsibilities" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Your Responsibilities</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Data Backup:</strong> You are responsible for
                      maintaining periodic backup copies of information stored
                      on the product. Itlinkers is not responsible for data loss
                      during service.
                    </li>
                    <li>
                      <strong>Cooperation:</strong> Provide proof of purchase,
                      answer diagnostic questions, and follow troubleshooting
                      instructions before receiving service.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Obtain Service */}
              <section id="service" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    How to Obtain Warranty Service
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="space-y-8 relative">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-primary rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-bold text-primary">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Contact Support</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Email{" "}
                          <span className="text-foreground font-medium">
                            admin@itlinkers.co.in
                          </span>{" "}
                          or call{" "}
                          <span className="text-foreground font-medium">
                            +91 7380817676
                          </span>
                          . Provide proof of purchase.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-primary rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-bold text-primary">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Remote Diagnosis</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          We attempt to resolve issues remotely within 24-48
                          hours via guided troubleshooting.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-primary rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-bold text-primary">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Repair or Replace</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          If unresolved, send the unit to our facility. We will
                          repair, or if needed, replace the unit with equivalent
                          value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Shipping & Limitations */}
              <div className="grid md:grid-cols-2 gap-8">
                <section
                  id="shipping"
                  className="scroll-mt-32 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl"
                >
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Shipping & Handling
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Itlinkers covers shipping for covered defects. If
                    ineligible, you cover costs. Ensure proper packaging to
                    prevent transit damage.
                  </p>
                </section>
                <section
                  id="limitations"
                  className="scroll-mt-32 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl"
                >
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Limitations
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    We do not guarantee error-free operation. We are not liable
                    for indirect, incidental, or consequential damages including
                    loss of profits or data.
                  </p>
                </section>
              </div>

              {/* Policy Changes & Conduct */}
              <section id="changes" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Policy Updates & Conduct
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                      <li>
                        • Policy modifications are effective immediately upon
                        posting.
                      </li>
                      <li>
                        • Service depends on parts availability; delays may
                        occur due to unforeseen events.
                      </li>
                      <li>
                        • Warranty is non-transferable and applies only to the
                        original purchaser.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Code of Conduct
                    </h4>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      Itlinkers is committed to a respectful environment.
                      Abusive behavior allows us to limit warranty services. We
                      also hold our employees to high standards; please report
                      inappropriate behavior to management.
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground mt-4">
                    <span className="font-bold">Governing Law:</span> This
                    policy is governed by the laws of the jurisdiction where the
                    purchase was made. Disputes are subject to exclusive
                    jurisdiction of local courts.
                  </div>
                </div>
              </section>

              {/* Bottom CTA */}
              <div className="text-center py-12 border-t border-slate-200 dark:border-slate-800 mt-16">
                <p className="text-muted-foreground mb-6">
                  Need to file a warranty claim?
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
