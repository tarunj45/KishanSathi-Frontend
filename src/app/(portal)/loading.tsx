export default function PortalLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <div className="h-32 animate-pulse rounded-3xl border border-slate-200 bg-white" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white" />
        <div className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white" />
        <div className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white" />
        <div className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white" />
      </div>
    </div>
  );
}