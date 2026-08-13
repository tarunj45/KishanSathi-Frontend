import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function ProfitCalculatorPage() {
  const summary = await getModuleSummary("profit-calculator");

  return <ModuleScreen summary={summary} variant="profit" />;
}