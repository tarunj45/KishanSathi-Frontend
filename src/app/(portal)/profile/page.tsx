import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function ProfilePage() {
  const summary = await getModuleSummary("profile");

  return <ModuleScreen summary={summary} variant="profile" ctaHref="/settings" ctaLabel="Open settings" />;
}