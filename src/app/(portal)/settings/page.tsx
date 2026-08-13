import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function SettingsPage() {
  const summary = await getModuleSummary("settings");

  return <ModuleScreen summary={summary} variant="settings" ctaHref="/profile" ctaLabel="Back to profile" />;
}