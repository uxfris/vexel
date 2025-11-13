import Divider from "@/components/ui/divider";
import Footer from "@/components/ui/footer";
import Sidebar from "../_components/sidebar";

export default function Loading() {
  return (
    <div className="mt-4 md:mt-0 animate-pulse">
      {/* Breadcrumb placeholder */}
      <div className="flex gap-2 text-sm text-muted-foreground mb-4">
        <div className="h-4 w-12 bg-muted rounded" />
        <span>/</span>
        <div className="h-4 w-16 bg-muted rounded" />
      </div>

      {/* Mobile heading skeleton */}
      <div className="md:hidden space-y-3 mb-6">
        <div className="h-8 w-3/4 bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>

      {/* Main plugin detail skeleton */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnail */}
        <div className="w-full md:w-1/2 aspect-video bg-muted rounded-xl" />

        {/* Plugin info */}
        <div className="flex-1 space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-10 w-40 bg-muted rounded-xl mt-6" />
        </div>
      </div>

      {/* Related plugins section */}
      <div className="mt-12">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <Divider classNames="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl overflow-hidden bg-card"
            >
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <Sidebar isMobileOnly />
    </div>
  );
}
