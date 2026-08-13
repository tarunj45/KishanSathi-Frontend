import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function WeatherIntelligencePage() {
  const summary = await getModuleSummary("weather-intelligence");

  return <ModuleScreen summary={summary} variant="weather" />;
}