export const Loading = () => {
  return (
    <div className="flex items-center gap-2 p-4 text-slate-900">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
      <span className="text-sm font-medium">Loading...</span>
    </div>
  );
};
