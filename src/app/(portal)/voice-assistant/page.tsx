import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function VoiceAssistantPage() {
  const summary = await getModuleSummary("voice-assistant");

  return <ModuleScreen summary={summary} variant="voice" />;
}