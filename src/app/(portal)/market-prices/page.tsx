import { ModuleScreen } from "@/components/layout/module-screen";
import { getModuleSummary } from "@/lib/api";

export default async function MarketPricesPage() {
  const summary = await getModuleSummary("market-prices");

  return <ModuleScreen summary={summary} variant="market" />;
}