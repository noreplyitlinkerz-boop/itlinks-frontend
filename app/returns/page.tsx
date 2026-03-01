import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  AlertCircle,
  RefreshCw,
  Shield,
  CreditCard,
  Truck,
  FileText,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Return Policy | Itlinkers - Easy Returns & Refunds",
  description:
    "Review Itlinkers' comprehensive return policy. 14-day return window, easy process, and full refunds. Learn about eligibility, conditions, and how to initiate a return.",
  keywords: [
    "return policy",
    "refund policy",
    "product returns",
    "Itlinkers returns",
    "laptop returns",
    "electronics return",
    "14 day return",
  ],
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
          {/* Abstract Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <RefreshCw className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">
                Hassle-Free Returns
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
              Return Policy
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              At Itlinkers, we are committed to ensuring your satisfaction with
              every purchase. If for any reason you are not completely satisfied
              with your order, we invite you to review our returns and refunds
              policy outlined below.
            </p>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">
                14 Days
              </h3>
              <p className="text-muted-foreground font-medium">Return Window</p>
              <p className="text-xs text-muted-foreground mt-2">
                From the day you receive it
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">
                Secure
              </h3>
              <p className="text-muted-foreground font-medium">
                Returns Process
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Verified authentic returns
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">Fast</h3>
              <p className="text-muted-foreground font-medium">Refunds</p>
              <p className="text-xs text-muted-foreground mt-2">
                Processed within 14 days
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 space-y-24">
          {/* Eligibility & Conditions */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Eligibility & Conditions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Please review the criteria below to determine if your item is
                eligible for a return.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Eligibility */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Eligibility for Returns</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  You can return your order within 14 days of receiving it if:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">
                      The product is physically damaged, defective, or
                      significantly different from its description on the
                      product detail page.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">
                      The product is missing parts, accessories, or any included
                      items.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Conditions */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Conditions for Return</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-300">
                      Product must be returned in its original condition with
                      all packaging, tags, and accessories intact.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-300">
                      The product must not have been damaged while in your
                      possession, and it must be the same item that was shipped
                      to you.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-300">
                      Any device that stores personal information must have all
                      such information removed prior to returning. Itlinkers
                      shall not be liable for any misuse or unauthorized use of
                      such information.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-300">
                      Products that were purchased by mistake or for buyer’s
                      remorse (e.g., incorrect model or color) may not be
                      eligible for return.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Process Timeline */}
          <section className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Return Process</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                To initiate a return, contact our customer support. Do not
                return items without authorization, as they will not be
                accepted.
              </p>
            </div>

            <div className="relative">
              {/* Line connection for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-10"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Step 1 */}
                <div className="relative bg-slate-50 dark:bg-slate-950 p-6 rounded-xl md:bg-transparent md:p-0 md:text-center group">
                  <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Request Return</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Contact us at <strong>admin@itlinkers.co.in</strong> or{" "}
                    <strong>+91 7380817676</strong> (Mon-Sat, 10 AM - 7 PM).
                    Items sent without authorization will not be accepted.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative bg-slate-50 dark:bg-slate-950 p-6 rounded-xl md:bg-transparent md:p-0 md:text-center group">
                  <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 border-2 border-primary text-primary rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Evaluation</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    For certain products, a technician visit may be scheduled to
                    evaluate the condition. The technician's report will
                    determine eligibility for return or replacement.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative bg-slate-50 dark:bg-slate-950 p-6 rounded-xl md:bg-transparent md:p-0 md:text-center group">
                  <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 border-2 border-primary text-primary rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Refund</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Once inspected, we process refunds within 14 days via the
                    original payment method. No additional fees for the refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Process & Non-Returnable */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Refund Process */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Refund Process Details
              </h3>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Once we receive and inspect the returned goods, we will
                  process your refund within 14 days. Refunds will be issued
                  using the same method of payment as the original order.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    Original shipping costs will not be refunded, except where
                    the return is due to an error on Itlinkers’ part.
                  </li>
                  <li className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />A
                    restocking fee of 10% of purchase cost may apply in certain
                    cases, depending on the condition of the returned item.
                  </li>
                </ul>
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="w-5 h-5" />
                Non-Returnable Items
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Certain items may not be eligible for return, including but not
                limited to:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Products that have been used or are not in their original
                    condition.
                  </span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Products damaged due to improper use or handling by the
                    customer.
                  </span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Items that were customized or personalized at the time of
                    purchase.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Warranty, Policy Changes, Rights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Truck className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-bold mb-2">Warranty and Service</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Itlinkers reserves the right to change the method by which we
                provide service. Eligibility for return or replacement may vary
                based on your location. Service options and response times may
                differ by state or city.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <FileText className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-bold mb-2">Policy Changes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Itlinkers reserves the right to modify or update this policy at
                any time without prior notice. Changes are effective immediately
                upon posting. Please review this policy periodically.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Scale className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-bold mb-2">Company Rights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Refuse returns if conditions aren't met.</li>
                <li>• Limit excessive returns/exchanges.</li>
                <li>• Determine eligibility at sole discretion.</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <section className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              If you have any questions, reach out to us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:admin@itlinkers.co.in"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-primary font-bold hover:bg-slate-100 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                admin@itlinkers.co.in
              </a>
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-foreground/10 border border-white/20 text-white font-bold backdrop-blur-sm">
                <Phone className="w-5 h-5 mr-2" />
                +91 7380817676
              </div>
            </div>
            <p className="text-sm text-slate-300 mt-6">Mon-Sat, 10 AM - 7 PM</p>
            <p className="text-slate-200 mt-8 font-medium">
              Thank you for choosing Itlinkers. Your satisfaction is our
              priority, and we are here to help with any issues you may
              encounter.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
