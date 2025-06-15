import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Wrench,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch dashboard data
  const [
    clientsData,
    dealsData,
    jobsData,
    invoicesData,
    recentClientsData,
    recentDealsData,
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact" }),
    supabase
      .from("deals")
      .select("*, clients(first_name, last_name)", { count: "exact" }),
    supabase.from("jobs").select("*", { count: "exact" }),
    supabase.from("invoices").select("*", { count: "exact" }),
    supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("deals")
      .select("*, clients(first_name, last_name)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Calculate KPIs
  const totalClients = clientsData.count || 0;
  const totalDeals = dealsData.count || 0;
  const totalJobs = jobsData.count || 0;
  const totalInvoices = invoicesData.count || 0;

  const activeDeals =
    dealsData.data?.filter(
      (deal) => deal.status === "active" || deal.status === "negotiation",
    ) || [];
  const wonDeals =
    dealsData.data?.filter((deal) => deal.status === "won") || [];
  const totalRevenue = wonDeals.reduce(
    (sum, deal) => sum + (deal.actual_value || deal.estimated_value || 0),
    0,
  );
  const pipelineValue = activeDeals.reduce(
    (sum, deal) => sum + (deal.estimated_value || 0),
    0,
  );

  const completedJobs =
    jobsData.data?.filter((job) => job.status === "completed") || [];
  const inProgressJobs =
    jobsData.data?.filter(
      (job) => job.status === "in_progress" || job.status === "scheduled",
    ) || [];

  const paidInvoices =
    invoicesData.data?.filter((invoice) => invoice.status === "paid") || [];
  const pendingInvoices =
    invoicesData.data?.filter(
      (invoice) => invoice.status === "pending" || invoice.status === "sent",
    ) || [];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Elite Landscaping CRM Dashboard
              </h1>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/clients/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/deals/new">
                    <Target className="w-4 h-4 mr-2" />
                    New Deal
                  </Link>
                </Button>
              </div>
            </div>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your business today.
            </p>
          </header>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Clients
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalClients}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active client relationships
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pipeline Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${pipelineValue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {activeDeals.length} active deals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {wonDeals.length} won deals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Jobs
                </CardTitle>
                <Wrench className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {inProgressJobs.length}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {completedJobs.length} completed
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Status Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Deal Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Deals</span>
                  <span className="font-semibold">{activeDeals.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Won Deals</span>
                  <span className="font-semibold text-green-600">
                    {wonDeals.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-semibold">
                    {totalDeals > 0
                      ? Math.round((wonDeals.length / totalDeals) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Job Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-semibold text-orange-600">
                    {inProgressJobs.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {completedJobs.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Jobs</span>
                  <span className="font-semibold">{totalJobs}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Invoicing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {pendingInvoices.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Paid</span>
                  <span className="font-semibold text-green-600">
                    {paidInvoices.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Invoices</span>
                  <span className="font-semibold">{totalInvoices}</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Latest client additions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentClientsData.data?.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          {client.first_name} {client.last_name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {client.email || "N/A"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              client.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {client.status || "New"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/clients/${client.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-gray-500"
                        >
                          No clients found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
                <CardDescription>Latest deal activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deal</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDealsData.data?.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">
                          {deal.deal_name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {deal.clients
                            ? `${deal.clients.first_name} ${deal.clients.last_name}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          ${(deal.estimated_value || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              deal.status === "won"
                                ? "bg-green-100 text-green-800"
                                : deal.status === "active"
                                  ? "bg-blue-100 text-blue-800"
                                  : deal.status === "lost"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {deal.status || "New"}
                          </span>
                        </TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-gray-500"
                        >
                          No deals found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    asChild
                  >
                    <Link href="/clients">
                      <Users className="w-6 h-6" />
                      <span>Manage Clients</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    asChild
                  >
                    <Link href="/deals">
                      <Target className="w-6 h-6" />
                      <span>View Deals</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    asChild
                  >
                    <Link href="/jobs">
                      <Wrench className="w-6 h-6" />
                      <span>Job Management</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    asChild
                  >
                    <Link href="/invoices">
                      <FileText className="w-6 h-6" />
                      <span>Invoices</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
