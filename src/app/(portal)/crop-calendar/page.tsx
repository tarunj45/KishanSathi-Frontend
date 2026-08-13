import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function CropCalendarPage() {
  const summary = await getModuleSummary("crop-calendar");

  return <ModuleScreen summary={summary} variant="calendar" />;
}