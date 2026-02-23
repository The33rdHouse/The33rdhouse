/**
 * Skeleton loading components for various card types
 * Provides visual feedback while content is loading
 */

export function SkeletonBookCard() {
  return (
    <div className="border border-purple-900/30 bg-black/40 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gradient-to-b from-purple-950/50 to-black" />
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="h-4 bg-purple-900/30 rounded w-3/4" />
        <div className="h-3 bg-purple-900/20 rounded w-1/2" />
        <div className="h-3 bg-purple-900/20 rounded w-full" />
        <div className="h-3 bg-purple-900/20 rounded w-5/6" />
        <div className="flex gap-2 mt-3">
          <div className="h-8 bg-purple-900/30 rounded flex-1" />
          <div className="h-8 w-8 bg-purple-900/30 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGateCard() {
  return (
    <div className="border border-purple-900/30 bg-black/40 rounded-lg p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-purple-900/30 rounded w-24" />
        <div className="h-6 w-6 bg-purple-900/30 rounded-full" />
      </div>
      <div className="h-8 bg-purple-900/30 rounded w-3/4" />
      <div className="h-4 bg-purple-900/20 rounded w-full" />
      <div className="h-4 bg-purple-900/20 rounded w-5/6" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-purple-900/20 rounded-full w-20" />
        <div className="h-6 bg-purple-900/20 rounded-full w-24" />
      </div>
    </div>
  );
}

export function SkeletonRealmCard() {
  return (
    <div className="border border-purple-900/30 bg-black/40 rounded-lg overflow-hidden animate-pulse">
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="aspect-square bg-gradient-to-br from-purple-950/50 to-black rounded-lg" />
        <div className="text-center space-y-2">
          <div className="h-5 bg-purple-900/30 rounded w-12 mx-auto" />
          <div className="h-4 bg-purple-900/20 rounded w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="border border-purple-900/30 bg-black/40 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gradient-to-b from-purple-950/50 to-black" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-purple-900/30 rounded w-3/4" />
        <div className="h-4 bg-purple-900/20 rounded w-1/2" />
        <div className="h-4 bg-purple-900/20 rounded w-full" />
        <div className="h-4 bg-purple-900/20 rounded w-5/6" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-purple-900/30 rounded w-20" />
          <div className="h-10 bg-purple-900/30 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDashboardCard() {
  return (
    <div className="border border-purple-900/30 bg-black/40 rounded-lg p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-purple-900/20 rounded w-32" />
      <div className="h-10 bg-purple-900/30 rounded w-24" />
      <div className="h-3 bg-purple-900/20 rounded w-full" />
    </div>
  );
}
