export default function RaceCardSkeleton() {
  return (
    <div className="bg-surface-dark rounded-xl p-6">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="h-4 bg-gray-700/30 rounded w-32 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <div className="h-4 bg-gray-700/30 rounded w-32 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-700/30 rounded-full w-28 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-5 bg-gray-700/30 rounded w-24 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 bg-gray-700/30 rounded w-28 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          <div className="h-4 bg-gray-700/30 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-4 bg-gray-700/30 rounded w-28 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/30 rounded w-full relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          <div className="h-4 bg-gray-700/30 rounded w-5/6 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="h-3 bg-gray-700/30 rounded w-16 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          <div className="h-5 bg-gray-700/30 rounded w-20 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
        <div>
          <div className="h-3 bg-gray-700/30 rounded w-12 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          <div className="h-5 bg-gray-700/30 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
