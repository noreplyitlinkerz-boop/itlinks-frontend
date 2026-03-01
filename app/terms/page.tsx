import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Scale,
  User,
  ShieldAlert,
  AlertTriangle,
  FileSignature,
  Mail,
  Phone,
  ChevronRight,
  Gavel,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Itlinkers",
  description:
    "Read the Terms of Service for using Itlinkers' platform. Understand your rights, responsibilities, and our policies regarding account usage and liability.",
  keywords: [
    "terms of service",
    "user agreement",
    "terms and conditions",
    "itlinkers terms",
    "legal",
    "user responsibility",
  ],
};

const sections = [
  { id: "agreement", title: "User Agreement" },
  { id: "prohibited", title: "Prohibited Activities" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
          {/* Abstract Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <Gavel className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">
                Legal Agreement
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
              Terms of Service
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              By accessing and using Itlinkers' services, you agree to abide by
              the terms and conditions outlined below. Please read them
              carefully.
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
              {/* User Agreement */}
              <section id="agreement" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">User Agreement</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="grid gap-4">
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Age Requirement
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          You must be at least 18 years old to use our services.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Account Information
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          By creating an account, you agree to provide accurate
                          and complete information.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Security
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          You are responsible for maintaining the
                          confidentiality of your account credentials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* Prohibited Activities */}
              <section id="prohibited" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Prohibited Activities</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                    <XCircle className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="font-bold text-lg mb-2">
                      Illegal Activities
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Using our platform for illegal or fraudulent activities is
                      strictly prohibited.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                    <XCircle className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="font-bold text-lg mb-2">
                      Unauthorized Access
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Attempting to gain unauthorized access to other user
                      accounts or systems.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                    <XCircle className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Malware</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Uploading malicious software or harmful content to the
                      platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Limitation of Liability
                  </h2>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                    No Indirect Damages
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 mb-4 leading-relaxed">
                    Itlinkers is not liable for any indirect, incidental, or
                    consequential damages arising from your use of our services.
                  </p>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Operation Guarantee
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                    We do not guarantee uninterrupted access or error-free
                    operation of the platform. Services are provided on an "as
                    is" and "as available" basis.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-bold">Changes to Terms</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Itlinkers reserves the right to modify these terms at any
                    time. Any changes will be posted on this page, and your
                    continued use of our services constitutes acceptance of the
                    updated terms.
                  </p>
                </div>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-32">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-6">
                      Questions about Terms?
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                      If you have any questions about our Terms of Service,
                      legal obligations, or user agreement, please reach out to
                      us.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <a
                        href="mailto:admin@itlinkers.co.in"
                        className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl hover:bg-white/20 transition-colors"
                      >
                        <Mail className="w-6 h-6 text-accent" />
                        <div className="text-left">
                          <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                            Email Us
                          </div>
                          <div className="font-medium">
                            admin@itlinkers.co.in
                          </div>
                        </div>
                      </a>
                      <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl">
                        <Phone className="w-6 h-6 text-accent" />
                        <div className="text-left">
                          <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                            Call Us
                          </div>
                          <div className="font-medium">+91 7380817676</div>
                          <div className="text-xs text-slate-400">
                            Mon-Sat, 10 AM - 7 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
