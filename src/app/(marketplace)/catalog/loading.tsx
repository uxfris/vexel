import { Skeleton } from "@/components/ui/skeleteon";

export default function Loading() {
  return (
    <div className="animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="h-15"></div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-40" /> {/* Breadcrumb */}
        <Skeleton className="h-10 w-72" /> {/* Category title */}
        <Skeleton className="h-5 w-96" /> {/* Subtitle */}
      </div>

      {/* Tags (Animation, Text, etc.) */}
      <div className="flex flex-wrap gap-3 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex justify-between items-center mt-10 mb-6">
        <Skeleton className="h-9 w-32 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      <div className="h-px border-b border-border mb-10"></div>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col w-full">
            <div className="group flex flex-col">
              {/* Thumbnail */}
              <Skeleton className="w-full h-64 rounded-lg" />

              {/* Title + Price */}
              <div className="flex justify-between items-center mt-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>

              {/* Description */}
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </div>

            {/* Seller & Category */}
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
