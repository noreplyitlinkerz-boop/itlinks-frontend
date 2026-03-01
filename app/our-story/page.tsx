import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  History,
  Target,
  Users2,
  Award,
  Heart,
  Globe2,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | Itlinkers - The Journey of Excellence",
  description:
    "Learn about the origins of Itlinkers, our mission to democratize high-end technology, and the journey that made us a trusted name in refurbished electronics.",
};

const milestones = [
  {
    year: "2020",
    title: "The Humble Beginning",
    description:
      "Itlinkers was born out of a small garage with a big vision: to make premium technology affordable for everyone.",
  },
  {
    year: "2021",
    title: "The First Tech Hub",
    description:
      "We opened our first dedicated restoration facility, bringing together certified technicians and state-of-the-art diagnostic tools.",
  },
  {
    year: "2022",
    title: "Digital Expansion",
    description:
      "Launched our first e-commerce platform, serving customers beyond city limits and establishing national trust.",
  },
  {
    year: "2023",
    title: "Sustainability Milestone",
    description:
      "We officially saved over 500 tons of electronic waste through our circular economy initiatives.",
  },
  {
    year: "2024",
    title: "The Next Chapter",
    description:
      "Expanded our catalog to include enterprise-grade servers and specialized workstations for creative professionals.",
  },
];

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Modern Split Hero */}
        <section className="relative pt-20 lg:pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
                  Established 2020
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                  BUILT ON TRUST, <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#10BBE6] to-blue-600">
                    DRIVEN BY TECH.
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Our journey hasn't been about selling products; it's about
                  empowering individuals with the tools they need to create,
                  learn, and grow.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-bold">Lucknow, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    <span className="font-bold">Nationwide Support</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                    alt="Our Team"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative Shapes */}
                <div className="absolute top-0 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="p-12 rounded-[3.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  To become the world's most trusted partner for sustainable,
                  high-performance technology. We envision a future where
                  high-end computing power is accessible to every ambitious
                  mind, regardless of their budget.
                </p>
              </div>
              <div className="p-12 rounded-[3.5rem] bg-primary text-white shadow-xl hover:shadow-primary/20 transition-all group">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform backdrop-blur-md">
                  <History className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  We are on a mission to bridge the digital divide by restoring
                  premium corporate gear to its former glory. Through rigorous
                  engineering and unwavering integrity, we deliver technology
                  that works reliably and builds value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                Milestones of Progress
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                A look back at the moments that shaped our journey.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative px-6 md:px-0">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-16">
                {milestones.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Circle on line */}
                    <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950 z-10 shadow-sm" />

                    <div className="flex-1 md:w-1/2">
                      <div
                        className={`p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900 ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-black px-3 py-1 bg-primary/10 text-primary rounded-full">
                            {item.year}
                          </span>
                          <Calendar className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-10 h-10 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold">People-First</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our relationships with customers, employees, and partners are
                  built on mutual respect and transparency.
                </p>
              </div>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold">Excellence</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We don't settle for 'good enough.' Every device we ship is a
                  testament to our high quality standards.
                </p>
              </div>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">Innovation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We constantly evolve our refurbishing techniques to keep pace
                  with rapidly advancing hardware.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Image & CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">
              BE PART OF OUR STORY.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/products"
                className="px-12 py-5 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:shadow-2xl transition-all"
              >
                See Our Products
              </a>
              <a
                href="/contact"
                className="px-12 py-5 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-white rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all"
              >
                Contact Us
              </a>
              <a
                href="/warranty"
                className="px-10 py-4 bg-white border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Learn About Our Warranty
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
