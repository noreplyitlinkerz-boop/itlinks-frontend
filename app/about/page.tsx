import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Laptop, Users, Award, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background via-background/95 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                About Itlinkers
              </h1>
              <p className="text-xl text-muted-foreground">
                Your trusted partner for premium technology solutions since 2020
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Itlinkers was founded with a simple mission: to make premium
                  technology accessible to everyone. What started as a small
                  online store has grown into a trusted destination for tech
                  enthusiasts, professionals, and businesses looking for quality
                  laptops, components, and accessories.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We carefully curate our product selection, partnering with the
                  world's leading manufacturers to bring you the latest
                  innovations in computing technology. From high-performance
                  gaming laptops to professional workstations, from cutting-edge
                  components to essential accessories - we have everything you
                  need to build, upgrade, or enhance your tech setup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Laptop className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Premium Products</h3>
                <p className="text-muted-foreground">
                  Only authentic products from trusted manufacturers with full
                  warranty coverage
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable team is here to help you find the perfect
                  tech solution
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders over $99 with fast and reliable
                  delivery
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p className="text-muted-foreground">
                  100% satisfaction guarantee with hassle-free returns and
                  exchanges
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  10K+
                </p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  500+
                </p>
                <p className="text-muted-foreground">Products</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  50+
                </p>
                <p className="text-muted-foreground">Brands</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  4.9
                </p>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
