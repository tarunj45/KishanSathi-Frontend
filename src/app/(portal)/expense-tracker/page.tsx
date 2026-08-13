import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function ExpenseTrackerPage() {
  const summary = await getModuleSummary("expense-tracker");

  return <ModuleScreen summary={summary} variant="expense" />;
}