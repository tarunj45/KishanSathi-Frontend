import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function IrrigationPlanningPage() {
  const summary = await getModuleSummary("irrigation-planning");

  return <ModuleScreen summary={summary} variant="irrigation" />;
}