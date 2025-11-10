import Brand from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="max-w-xl mx-auto mt-20 p-4">
      <Brand className="w-8" />
      <h1 className="text-2xl md:text-4xl font-bold my-4">
        404 — Page Not Found
      </h1>
      <p className="text-base md:text-lg text-muted-foreground font-medium">
        It seems like the page you were looking for has moved, changed, or
        perhaps it was never here to begin with. No worries though, we can help
        you navigate back!
      </p>
      <div className="mt-12 flex flex-col gap-3">
        <div className="border border-border rounded-sm p-4 font-semibold">
          Try checking the URL for any errors, then hit refresh.
        </div>
        <div className="border border-border rounded-sm p-4 font-semibold">
          Use the search bar at the top of the page to find what you were
          looking for.
        </div>
        <div className="flex flex-col gap-4 border border-border rounded-sm p-4 font-semibold">
          Or simply head back to our homepage
          <Link href="/">
            <Button
              variant="outline"
              className="flex gap-1 bg-muted font-bold text-foreground w-full shadow-sm"
            >
              Go to Vexel Homepage <ArrowRight className="w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <p className="md:text-lg font-medium text-muted-foreground mt-12">
        Sorry for the detour. Happy browsing!
      </p>
      <Footer
        isWithLetterSubscription={false}
        isWithNavigation={false}
        isMobileOnly={true}
      />
    </div>
  );
}
