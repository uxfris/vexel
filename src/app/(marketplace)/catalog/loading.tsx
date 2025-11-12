import { Skeleton } from "@/components/ui/skeleteon";
import PluginSkeleton from "../components/pluginSkeleton";

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
          <PluginSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
