import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function HelpPage() {
  const summary = await getModuleSummary("help");

  return <ModuleScreen summary={summary} variant="help" ctaHref="/dashboard" ctaLabel="Explore dashboard" />;
}