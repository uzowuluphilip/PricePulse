export function SkeletonCard() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl
      border border-gray-800 p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-800
        rounded-lg mb-4" />
      <div className="h-4 bg-gray-800 rounded
        w-3/4 mb-2" />
      <div className="h-4 bg-gray-800 rounded
        w-1/2 mb-4" />
      <div className="h-8 bg-gray-800 rounded w-full" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4
      border-b border-gray-800 animate-pulse">
      <div className="w-12 h-12 bg-gray-800
        rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <div className="h-4 bg-gray-800 rounded
          w-3/4 mb-2" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
      </div>
      <div className="h-6 bg-gray-800 rounded w-20" />
    </div>
  );
}

export function SkeletonText({ width = 'w-full' }) {
  return (
    <div className={`h-4 bg-gray-800 rounded
      ${width} animate-pulse`} />
  );
}
