import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function CropRecommendationPage() {
  const summary = await getModuleSummary("crop-recommendation");

  return <ModuleScreen summary={summary} variant="crop-advisory" />;
}