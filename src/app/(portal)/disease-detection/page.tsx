import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function DiseaseDetectionPage() {
  const summary = await getModuleSummary("disease-detection");

  return <ModuleScreen summary={summary} variant="disease" />;
}