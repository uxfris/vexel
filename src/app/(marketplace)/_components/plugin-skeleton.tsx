import { Skeleton } from "@/components/ui/skeleteon";

// components/pluginSkeleton.tsx
export default function PluginSkeleton() {
  return (
    <div className="flex flex-col w-full">
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
  );
}
