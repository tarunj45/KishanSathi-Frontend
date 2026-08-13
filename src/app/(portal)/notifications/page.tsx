import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function NotificationsPage() {
  const summary = await getModuleSummary("notifications");

  return <ModuleScreen summary={summary} variant="notifications" />;
}