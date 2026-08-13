import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function PestAlertsPage() {
  const summary = await getModuleSummary("pest-alerts");

  return <ModuleScreen summary={summary} variant="pests" />;
}