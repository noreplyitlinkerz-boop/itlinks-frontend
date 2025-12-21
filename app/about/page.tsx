import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Laptop, Users, Award, Zap, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-primary via-accent to-cyan-500 bg-clip-text text-transparent animate-fade-in">
                About Itlinkers
              </h1>
              <p className="text-xl text-muted-foreground animate-slide-in-up">
                Empowering your digital life with premium technology and
                unmatched expertise since 2020.
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6 animate-slide-in-left">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Itlinkers, we believe technology should be an enabler, not
                  a barrier. Our mission is to bridge the gap between people and
                  premium technology, making high-performance computing
                  accessible to creators, professionals, and gamers alike.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-muted-foreground">
                      Curated selection of top-tier brands
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-muted-foreground">
                      Expert guidance for custom builds
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-muted-foreground">
                      Uncompromising quality assurance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold">10K+</p>
                <p className="text-primary-foreground/80">Happy Customers</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold">500+</p>
                <p className="text-primary-foreground/80">Products</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold">50+</p>
                <p className="text-primary-foreground/80">Partner Brands</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold">4.9</p>
                <p className="text-primary-foreground/80">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">Why Choose Itlinkers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We go beyond just selling products. We provide a complete
                ecosystem of support and quality.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all hover:scale-105">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Premium Gear
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Official retailer for industry-leading brands with full
                  authentic warranty.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all hover:scale-105">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 mx-auto text-accent">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Quality First
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Every product is vetted and tested to meet our high standards.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all hover:scale-105">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto text-green-600">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Fast Shipping
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Same-day processing and expedited delivery options worldwide.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all hover:scale-105">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 mx-auto text-purple-600">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Expert Support
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  24/7 technical assistance from our team of certified experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate experts behind your favorite tech store.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  role: "Founder & CEO",
                  image:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                },
                {
                  name: "Sarah Chen",
                  role: "Head of Product",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                },
                {
                  name: "Michael Ross",
                  role: "Lead Technician",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                },
              ].map((member, index) => (
                <div key={index} className="group text-center space-y-4">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-muted group-hover:border-primary transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
