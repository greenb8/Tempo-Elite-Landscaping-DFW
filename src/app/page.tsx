import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Users,
  DollarSign,
  BarChart3,
  Calendar,
  FileText,
  Truck,
  Leaf,
  Target,
  Clock,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Manage Your Landscaping Business
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive CRM tools designed specifically for landscaping
              professionals to streamline operations and grow revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Client Management",
                description:
                  "Centralized database with client profiles, contact information, and detailed property records",
                features: [
                  "Client profiles",
                  "Property details",
                  "Service history",
                  "Contact management",
                ],
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Sales Pipeline",
                description:
                  "Track leads, manage deals, and create professional proposals with detailed line items",
                features: [
                  "Lead tracking",
                  "Deal management",
                  "Proposal generation",
                  "Conversion analytics",
                ],
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Financial Tools",
                description:
                  "Generate invoices, manage recurring billing, and track maintenance accounts",
                features: [
                  "Invoice generation",
                  "Recurring billing",
                  "Payment tracking",
                  "Financial reports",
                ],
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "Resource Tracking",
                description:
                  "Monitor inventory, track service usage, and optimize resource allocation",
                features: [
                  "Inventory management",
                  "Service allocation",
                  "Cost tracking",
                  "Usage reports",
                ],
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Analytics Dashboard",
                description:
                  "Key performance indicators and custom reports for data-driven decisions",
                features: [
                  "Revenue analytics",
                  "Client retention",
                  "Performance metrics",
                  "Custom reports",
                ],
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Project Management",
                description:
                  "Schedule jobs, track progress, and manage your landscaping projects efficiently",
                features: [
                  "Job scheduling",
                  "Progress tracking",
                  "Team coordination",
                  "Timeline management",
                ],
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-green-600 mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Landscaping Business
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Join successful landscaping companies that have streamlined their
              operations and increased profitability.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">40%</div>
              <div className="text-green-100">Increase in Revenue</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">60%</div>
              <div className="text-green-100">Time Saved on Admin</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined setup process gets your landscaping CRM up and
              running quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Users className="w-8 h-8" />,
                title: "Import Your Clients",
                description:
                  "Easily import existing client data or start fresh with our intuitive client management system.",
              },
              {
                step: "02",
                icon: <FileText className="w-8 h-8" />,
                title: "Set Up Services",
                description:
                  "Configure your landscaping services, pricing, and create templates for quick proposal generation.",
              },
              {
                step: "03",
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Track & Grow",
                description:
                  "Monitor your business performance with real-time analytics and grow your revenue systematically.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <div className="text-green-600">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Grow Your Landscaping Business?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join hundreds of landscaping professionals who have transformed
              their business operations with our comprehensive CRM solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Start Your Free Trial
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-lg font-medium"
              >
                Schedule Demo
                <Calendar className="ml-2 w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • 30-day free trial • Setup in under 10
              minutes
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
