import { dashboardSummary, moduleSummaries } from "@/lib/mock-data";
import type { DashboardSummary, ModuleSlug, ModuleSummary } from "@/lib/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await delay(120);
  return dashboardSummary;
}

export async function getModuleSummary(
  slug: ModuleSlug,
): Promise<ModuleSummary> {
  await delay(80);
  return moduleSummaries[slug];
}