import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { getDashboardSummary } from "@/lib/api";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return <DashboardOverview summary={summary} />;
}